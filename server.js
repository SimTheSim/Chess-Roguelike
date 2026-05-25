/**
 * Multiplayer Chess Server
 * Uses Socket.IO over Express for real-time room-based PvP.
 *
 * Run:  node server.js
 * Port: 3001 (configure with PORT env var)
 */

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*', // tighten this in production (e.g. 'http://localhost:5173')
    methods: ['GET', 'POST'],
  },
});

// ─── In-memory room store ─────────────────────────────────────────────────────
// rooms[roomCode] = {
//   code: string,
//   players: { white: socketId|null, black: socketId|null },
//   playerNames: { white: string, black: string },
//   gameState: object|null,   // full serialised React state snapshot
//   createdAt: Date,
// }
const rooms = {};

// Housekeeping: delete rooms that have been idle for 2 hours
setInterval(() => {
  const cutoff = Date.now() - 2 * 60 * 60 * 1000;
  for (const code of Object.keys(rooms)) {
    if (rooms[code].createdAt < cutoff) {
      delete rooms[code];
      console.log(`[GC] Removed stale room ${code}`);
    }
  }
}, 15 * 60 * 1000);

// ─── Helpers ──────────────────────────────────────────────────────────────────
function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no ambiguous chars
  let code;
  do {
    code = Array.from({ length: 5 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
  } while (rooms[code]);
  return code;
}

function roomSummary(room) {
  return {
    code: room.code,
    playerNames: room.playerNames,
    players: {
      white: room.players.white !== null,
      black: room.players.black !== null,
    },
    full: room.players.white !== null && room.players.black !== null,
    matchTarget: room.matchTarget,
    upgradePriority: room.upgradePriority,
  };
}

// ─── Socket events ────────────────────────────────────────────────────────────
io.on('connection', (socket) => {
  console.log(`[+] Connected: ${socket.id}`);

  // ── CREATE ROOM ──────────────────────────────────────────────────────────────
  socket.on('create_room', ({ playerName, matchTarget, upgradePriority }, callback) => {
    const code = generateRoomCode();
    rooms[code] = {
      code,
      players: { white: socket.id, black: null },
      playerNames: { white: playerName || 'Host', black: '' },
      upgradePriority: upgradePriority || 'loser-only',
      matchTarget: matchTarget || 5,
      gameState: null,
      createdAt: Date.now(),
    };
    socket.join(code);
    socket.data.roomCode = code;
    socket.data.color = 'white';
    console.log(`[ROOM] Created ${code} by ${socket.id}`);
    callback({ ok: true, code, color: 'white', room: roomSummary(rooms[code]) });
  });

  // ── JOIN ROOM ────────────────────────────────────────────────────────────────
  socket.on('join_room', ({ code, playerName }, callback) => {
    code = code?.toUpperCase();
    const room = rooms[code?.toUpperCase()];
    if (!room) {
      return callback({ ok: false, error: 'Room not found.' });
    }
    if (room.players.white !== null && room.players.black !== null) {
      return callback({ ok: false, error: 'Room is already full.' });
    }

    // Assign the joiner to the empty slot
    const color = room.players.white === null ? 'white' : 'black';
    room.players[color] = socket.id;
    room.playerNames[color] = playerName || 'Challenger';
    socket.join(code);
    socket.data.roomCode = code;
    socket.data.color = color;

    console.log(`[ROOM] ${socket.id} joined ${code} as ${color}`);

    // Tell the joiner their colour + any existing game state
    callback({
      ok: true,
      code,
      color,
      room: roomSummary(room),
      gameState: room.gameState,
    });

    // Tell the host a second player has joined
    socket.to(code).emit('opponent_joined', {
      room: roomSummary(room),
      color,
      playerName: room.playerNames[color],
    });
  });

  // ── GAME STATE SYNC ──────────────────────────────────────────────────────────
  socket.on('game_state', ({ code, state }) => {
    const roomCode = (code || socket.data.roomCode)?.toUpperCase();
    const room = rooms[roomCode];
    if (!room) return;
    
    room.gameState = state;
    
    console.log(`[SYNC] Relaying move in room ${roomCode} (Turn: ${state.turn})`);
    socket.to(roomCode).emit('game_state', { state });
  });

  // ── UPGRADE SELECTED ────────────────────────────────────────────────────────
  // Relays the upgrade choice so both clients stay in sync.
  socket.on('upgrade_selected', ({ code, upgradeId, color }) => {
    socket.to(code).emit('upgrade_selected', { upgradeId, color });
  });

  // ── CHAT / EMOTES ────────────────────────────────────────────────────────────
  socket.on('chat_message', ({ code, message, playerName }) => {
    io.to(code).emit('chat_message', { message, playerName, ts: Date.now() });
  });

  // ── REMATCH REQUEST ──────────────────────────────────────────────────────────
  socket.on('rematch_request', ({ code }) => {
    socket.to(code).emit('rematch_request');
  });

  socket.on('rematch_accept', ({ code }) => {
    const room = rooms[code];
    if (room) {
      room.gameState = null;
    }
    io.to(code).emit('rematch_start');
  });

  // ── DISCONNECT ───────────────────────────────────────────────────────────────
  socket.on('disconnect', () => {
    const { roomCode, color } = socket.data;
    if (!roomCode || !rooms[roomCode]) return;

    const room = rooms[roomCode];
    room.players[color] = null;
    room.playerNames[color] = '';

    console.log(`[-] ${socket.id} (${color}) left room ${roomCode}`);

    // Notify remaining player
    io.to(roomCode).emit('opponent_disconnected', { color });

    // If room is now empty, delete it
    if (room.players.white === null && room.players.black === null) {
      delete rooms[roomCode];
      console.log(`[ROOM] Deleted empty room ${roomCode}`);
    }
  });
});

// ─── Health check endpoint ───────────────────────────────────────────────────
app.get('/health', (_, res) => res.json({ ok: true, rooms: Object.keys(rooms).length }));

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`\n🎮  Chess multiplayer server running on http://localhost:${PORT}\n`);
});