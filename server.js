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

function broadcastPublicRooms() {
  const publicRooms = Object.values(rooms)
    .filter(r => r.isPublic && r.players.black === null)
    .map(roomSummary);
  io.emit('rooms_updated', publicRooms);
}

setInterval(() => {
  const cutoff = Date.now() - 2 * 60 * 60 * 1000;
  for (const code of Object.keys(rooms)) {
    if (rooms[code].createdAt < cutoff) {
      delete rooms[code];
    }
  }
}, 15 * 60 * 1000);

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

io.on('connection', (socket) => {
  console.log(`[+] Connected: ${socket.id}`);

  socket.on('create_room', ({ playerName, matchTarget, upgradePriority, clientId, isPublic }, callback) => {
    const code = generateRoomCode();
    rooms[code] = {
      code,
      isPublic: isPublic || false,
      players: { white: socket.id, black: null },
      clientIds: { white: clientId, black: null },
      playerNames: { white: playerName || 'Host', black: '' },
      upgradePriority: upgradePriority || 'loser-only',
      matchTarget: matchTarget || 5,
      gameState: null,
      createdAt: Date.now(),
      disconnectTimeouts: { white: null, black: null },
    };
    socket.join(code);
    socket.data.roomCode = code;
    socket.data.color = 'white';
    socket.data.clientId = clientId;
    if (isPublic) broadcastPublicRooms();
    callback({ ok: true, code, color: 'white', room: roomSummary(rooms[code]) });
  });

  socket.on('join_room', ({ code, playerName, clientId }, callback) => {
    code = code?.toUpperCase();
    const room = rooms[code?.toUpperCase()];
    if (!room) {
      return callback({ ok: false, error: 'Room not found.' });
    }
    if (room.players.white !== null && room.players.black !== null) {
      return callback({ ok: false, error: 'Room is already full.' });
    }

    const color = room.players.white === null ? 'white' : 'black';
    room.players[color] = socket.id;
    room.clientIds[color] = clientId;
    room.playerNames[color] = playerName || 'Challenger';
    socket.join(code);
    socket.data.roomCode = code;
    socket.data.color = color;
    socket.data.clientId = clientId;

    if (room.disconnectTimeouts[color]) {
      clearTimeout(room.disconnectTimeouts[color]);
      room.disconnectTimeouts[color] = null;
    }

    callback({
      ok: true,
      code,
      color,
      room: roomSummary(room),
      gameState: room.gameState,
    });

    socket.to(code).emit('opponent_joined', {
      room: roomSummary(room),
      color,
      playerName: room.playerNames[color],
    });

    if (room.isPublic && room.players.white !== null && room.players.black !== null) {
      broadcastPublicRooms();
    }
  });

  socket.on('list_rooms', (callback) => {
    const publicRooms = Object.values(rooms)
      .filter(r => r.isPublic && r.players.black === null)
      .map(roomSummary);
    callback({ ok: true, rooms: publicRooms });
  });

  socket.on('reconnect_to_room', ({ code, clientId }, callback) => {
    const roomCode = code?.toUpperCase();
    const room = rooms[roomCode];
    if (!room) return callback({ ok: false });

    let color = null;
    if (room.clientIds.white === clientId) color = 'white';
    else if (room.clientIds.black === clientId) color = 'black';

    if (!color) return callback({ ok: false });

    room.players[color] = socket.id;
    socket.join(roomCode);
    socket.data.roomCode = roomCode;
    socket.data.color = color;
    socket.data.clientId = clientId;

    if (room.disconnectTimeouts[color]) {
      clearTimeout(room.disconnectTimeouts[color]);
      room.disconnectTimeouts[color] = null;
    }

    socket.to(roomCode).emit('opponent_reconnected', { color });

    let stateToSend = room.gameState;
    if (stateToSend && stateToSend.lastSender === color) {
      stateToSend = { 
        ...stateToSend, 
        playerScore: stateToSend.opponentScore, 
        opponentScore: stateToSend.playerScore 
      };
    }

    callback({
      ok: true,
      code: roomCode,
      color,
      room: roomSummary(room),
      gameState: stateToSend,
    });
  });

  socket.on('room_settings_update', ({ code, matchTarget, upgradePriority }) => {
    const room = rooms[code];
    if (room && socket.data.color === 'white') {
      room.matchTarget = matchTarget;
      room.upgradePriority = upgradePriority;
      socket.to(code).emit('room_settings_update', { matchTarget, upgradePriority });
    }
  });

  socket.on('game_state', ({ code, state }) => {
    const roomCode = (code || socket.data.roomCode)?.toUpperCase();
    const room = rooms[roomCode];
    if (!room) return;
    
    room.gameState = { ...state, lastSender: socket.data.color };
    
    console.log(`[SYNC] Relaying move in room ${roomCode} (Turn: ${state.turn})`);
    socket.to(roomCode).emit('game_state', { state });
  });

  socket.on('upgrade_selected', ({ code, upgradeId, color }) => {
    socket.to(code).emit('upgrade_selected', { upgradeId, color });
  });

  socket.on('chat_message', ({ code, message, playerName }) => {
    io.to(code).emit('chat_message', { message, playerName, ts: Date.now() });
  });

  socket.on('rematch_proposal', ({ code, matchTarget, upgradePriority }) => {
    socket.to(code).emit('rematch_proposal', { matchTarget, upgradePriority });
  });

  socket.on('rematch_accept', ({ code, matchTarget, upgradePriority }) => {
    const room = rooms[code];
    if (room) {
      room.gameState = null;
      room.matchTarget = matchTarget;
      room.upgradePriority = upgradePriority;
    }
    io.to(code).emit('rematch_start', { matchTarget, upgradePriority });
  });

  socket.on('rematch_decline', ({ code }) => {
    socket.to(code).emit('rematch_decline');
  });

  socket.on('leave_room', ({ code }) => {
    const roomCode = code?.toUpperCase();
    const room = rooms[roomCode];
    if (!room) return;
    const color = socket.data.color;
    if (color) {
      room.players[color] = null;
      room.clientIds[color] = null;
      room.playerNames[color] = '';
      socket.to(roomCode).emit('opponent_left');
    }
    if (room.players.white === null && room.players.black === null) {
      delete rooms[roomCode];
    } else {
      const isPublic = room.isPublic;
      delete rooms[roomCode];
      if (isPublic) broadcastPublicRooms();
    }
  });

  socket.on('disconnect', () => {
    const { roomCode, color } = socket.data;
    if (!roomCode || !rooms[roomCode]) return;

    const room = rooms[roomCode];
    if (room.players[color] !== socket.id) return;
    room.players[color] = null;

    io.to(roomCode).emit('opponent_temporarily_disconnected', { color, timeout: 60 });

    room.disconnectTimeouts[color] = setTimeout(() => {
      if (rooms[roomCode] && rooms[roomCode].players[color] === null) {
          const isPublic = rooms[roomCode].isPublic;
          rooms[roomCode].clientIds[color] = null;
          rooms[roomCode].playerNames[color] = '';
          io.to(roomCode).emit('opponent_left', { color });
          delete rooms[roomCode];
          if (isPublic) broadcastPublicRooms();
        }
    }, 60000);
  });
});

app.get('/health', (_, res) => res.json({ ok: true, rooms: Object.keys(rooms).length }));

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`\nServer running on http://localhost:${PORT}\n`);
});