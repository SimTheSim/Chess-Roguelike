import { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { motion, AnimatePresence } from 'motion/react';
import { getClientId, getStoredPlayerName, setStoredPlayerName } from '../utils/clientId';

const SERVER_URL = import.meta.env.VITE_MULTIPLAYER_SERVER ?? 'http://localhost:3001';

export interface ReadyPayload {
  socket: Socket;
  color: 'white' | 'black';
  roomCode: string;
  opponentName: string;
  playerName: string;
  matchTarget: number;
  upgradePriority: 'loser-only' | 'loser-then-winner';
  clockMode: string;
}

interface MultiplayerLobbyProps {
  onReady: (payload: ReadyPayload) => void;
  onBack: () => void;
}

type LobbyView = 'menu' | 'create' | 'join' | 'waiting' | 'browse';

export function MultiplayerLobby({ onReady, onBack }: MultiplayerLobbyProps) {
  const [view, setView] = useState<LobbyView>('menu');
  const [playerName, setPlayerName] = useState(getStoredPlayerName());
  const [joinCode, setJoinCode] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [publicRooms, setPublicRooms] = useState<any[]>([]);
  const [roomCode, setRoomCode] = useState('');
  const [myColor, setMyColor] = useState<'white' | 'black'>('white');
  const [opponentName, setOpponentName] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [matchTarget, setMatchTarget] = useState<number>(5);
  const [upgradePriority, setUpgradePriority] = useState<'loser-only' | 'loser-then-winner'>('loser-only');
  const [clockMode, setClockMode] = useState<string>('none');

  const socketRef = useRef<Socket | null>(null);
  const handedOffRef = useRef(false);

  useEffect(() => {
    return () => {
      if (!handedOffRef.current) {
        socketRef.current?.disconnect();
      }
    };
  }, []);

  const getSocket = useCallback((): Socket => {
    if (!socketRef.current || !socketRef.current.connected) {
      socketRef.current = io(SERVER_URL, { autoConnect: true });
    }
    return socketRef.current;
  }, []);

  const handleCreate = () => {
    if (!playerName.trim()) { setError('Enter your name first.'); return; }
    setStoredPlayerName(playerName.trim());
    setError('');
    setConnecting(true);
    const socket = getSocket();

    socket.emit('create_room', { playerName: playerName.trim(), matchTarget, upgradePriority, clockMode, clientId: getClientId(), isPublic }, (res: any) => {
      setConnecting(false);
      if (!res.ok) { setError(res.error ?? 'Server error.'); return; }
      setRoomCode(res.code);
      setMyColor('white');
      setView('waiting');
      localStorage.setItem('chess_room_code', res.code);

      socket.on('opponent_joined', ({ playerName: name }) => {
        setOpponentName(name);
        setTimeout(() => {
          handedOffRef.current = true;
          onReady({ socket, color: 'white', roomCode: res.code, opponentName: name, playerName: playerName.trim(), matchTarget, upgradePriority, clockMode });
        }, 800);
      });
    });
  };

  const handleJoin = (codeToJoin = joinCode) => {
    if (!playerName.trim()) { setError('Enter your name first.'); return; }
    if (!codeToJoin.trim()) { setError('Enter a room code.'); return; }
    setStoredPlayerName(playerName.trim());
    setError('');
    setConnecting(true);
    const socket = getSocket();

    socket.emit(
      'join_room',
      { code: codeToJoin.trim().toUpperCase(), playerName: playerName.trim(), clientId: getClientId() },
      (res: any) => {
        setConnecting(false);
        if (!res.ok) { setError(res.error ?? 'Could not join room.'); return; }
        setRoomCode(res.code);
        setMyColor(res.color);
        localStorage.setItem('chess_room_code', res.code);
        const oppName = res.room.playerNames[res.color === 'white' ? 'black' : 'white'] ?? 'Opponent';
        handedOffRef.current = true;
        const roomMatchTarget = res.room.matchTarget ?? 5;
        const roomUpgradePriority = res.room.upgradePriority ?? 'loser-only';
        const roomClockMode = res.room.clockMode ?? 'none';
        onReady({ socket, color: res.color, roomCode: res.code, opponentName: oppName, matchTarget: roomMatchTarget, upgradePriority: roomUpgradePriority, clockMode: roomClockMode });
      }
    );
  };

  const copyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(roomCode).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      const el = document.createElement('textarea');
      el.value = roomCode;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const navigateTo = (dest: 'create' | 'join' | 'browse') => {
    if (!playerName.trim()) {
      setError('Enter your name before continuing.');
      return;
    }
    setStoredPlayerName(playerName.trim());
    setError('');
    setView(dest);

    if (dest === 'browse') {
      const socket = getSocket();
      socket.emit('list_rooms', (res: any) => {
        if (res.ok) setPublicRooms(res.rooms);
      });
      socket.on('rooms_updated', (rooms: any[]) => {
        setPublicRooms(rooms);
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-pixel">
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)',
        }}
      />

      <AnimatePresence mode="wait">
        {view === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-sm"
          >
            <div className="border-4 border-emerald-400 bg-zinc-950 p-8 shadow-[8px_8px_0px_#10b981]">
              <div className="text-center mb-8">
                <div className="inline-block border-2 border-yellow-400 px-3 py-1 mb-3">
                  <span className="text-yellow-400 text-[9px] uppercase tracking-widest">Online</span>
                </div>
                <h1 className="text-white text-sm uppercase tracking-tight leading-snug">
                  MULTIPLAYER
                </h1>
                <div className="mt-2 text-zinc-600 text-[7px] uppercase tracking-wider">
                  Challenge a friend across the network
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-zinc-500 text-[7px] uppercase tracking-wider mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  maxLength={18}
                  value={playerName}
                  onChange={e => { setPlayerName(e.target.value); setError(''); }}
                  onKeyDown={e => e.key === 'Enter' && navigateTo('create')}
                  placeholder="Enter callsign..."
                  className="w-full bg-black border-2 border-zinc-700 focus:border-emerald-400 outline-none text-white text-[9px] px-3 py-2.5 placeholder-zinc-700 transition-colors uppercase tracking-wide"
                />
              </div>

              {error && (
                <p className="text-rose-400 text-[7px] uppercase mb-4 text-center">{error}</p>
              )}

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigateTo('create')}
                  className="border-4 border-emerald-400 bg-black hover:bg-emerald-950 text-emerald-400 text-[8px] uppercase py-3 tracking-wider shadow-[4px_4px_0px_#10b981] hover:shadow-[2px_2px_0px_#10b981] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
                >
                  Create Room
                </button>
                <button
                  onClick={() => navigateTo('join')}
                  className="border-4 border-zinc-600 bg-black hover:bg-zinc-900 text-zinc-300 text-[8px] uppercase py-3 tracking-wider shadow-[4px_4px_0px_#52525b] hover:shadow-[2px_2px_0px_#52525b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
                >
                  Join by Code
                </button>
                <button
                  onClick={() => navigateTo('browse')}
                  className="border-4 border-blue-500 bg-black hover:bg-blue-950 text-blue-400 text-[8px] uppercase py-3 tracking-wider shadow-[4px_4px_0px_#3b82f6] hover:shadow-[2px_2px_0px_#3b82f6] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
                >
                  Browse Open Rooms
                </button>
              </div>

              <button
                onClick={onBack}
                className="mt-6 w-full text-zinc-700 hover:text-zinc-400 text-[7px] uppercase tracking-wider transition-colors cursor-pointer"
              >
                Back to Menu
              </button>
            </div>
          </motion.div>
        )}

        {view === 'create' && (
          <motion.div
            key="create"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="w-full max-w-sm"
          >
            <div className="border-4 border-emerald-400 bg-zinc-950 p-8 shadow-[8px_8px_0px_#10b981]">
              <div className="text-center mb-8">
                <h2 className="text-white text-xs uppercase tracking-tight">Create Room</h2>
                <p className="text-zinc-500 text-[7px] mt-1 uppercase">
                  Playing as <span className="text-emerald-400">{playerName || '???'}</span>
                </p>
              </div>

              <div className="mb-6">
                <span className="text-[8px] font-pixel text-zinc-400 uppercase block mb-2 text-center">MATCH GOAL (WINS TARGET)</span>
                <div className="flex gap-2">
                  {[3, 5, 7].map(t => (
                    <button
                      key={t}
                      onClick={() => setMatchTarget(t)}
                      className={`flex-1 py-1.5 border-2 text-[8px] font-pixel cursor-pointer ${matchTarget === t
                        ? 'bg-emerald-950 border-emerald-400 text-emerald-400 font-bold'
                        : 'bg-black border-zinc-800 text-zinc-500'
                      }`}
                    >
                      FIRST TO {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <span className="text-[8px] font-pixel text-zinc-400 uppercase block mb-2 text-center">BOON DRAFT MODE</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setUpgradePriority('loser-only')}
                    className={`flex-1 py-1.5 border-2 text-[8px] font-pixel cursor-pointer ${upgradePriority === 'loser-only'
                      ? 'bg-emerald-950 border-emerald-400 text-emerald-400 font-bold'
                      : 'bg-black border-zinc-800 text-zinc-500'
                    }`}
                  >
                    LOSER PICKS
                  </button>
                  <button
                    onClick={() => setUpgradePriority('loser-then-winner')}
                    className={`flex-1 py-1.5 border-2 text-[8px] font-pixel cursor-pointer ${upgradePriority === 'loser-then-winner'
                      ? 'bg-emerald-950 border-emerald-400 text-emerald-400 font-bold'
                      : 'bg-black border-zinc-800 text-zinc-500'
                    }`}
                  >
                    LOSER THEN WINNER
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-[8px] font-pixel text-zinc-400 uppercase block mb-2 text-center">TIME CONTROL</span>
                <div className="flex gap-2">
                  <button onClick={() => setClockMode('none')} className={`flex-1 py-1.5 border-2 text-[8px] font-pixel cursor-pointer ${clockMode === 'none' ? 'bg-emerald-950 border-emerald-400 text-emerald-400 font-bold' : 'bg-black border-zinc-800 text-zinc-500'}`}>NONE</button>
                  <button onClick={() => setClockMode('1|1')} className={`flex-1 py-1.5 border-2 text-[8px] font-pixel cursor-pointer ${clockMode === '1|1' ? 'bg-emerald-950 border-emerald-400 text-emerald-400 font-bold' : 'bg-black border-zinc-800 text-zinc-500'}`}>1|1</button>
                  <button onClick={() => setClockMode('3|2')} className={`flex-1 py-1.5 border-2 text-[8px] font-pixel cursor-pointer ${clockMode === '3|2' ? 'bg-emerald-950 border-emerald-400 text-emerald-400 font-bold' : 'bg-black border-zinc-800 text-zinc-500'}`}>3|2</button>
                  <button onClick={() => setClockMode('5|3')} className={`flex-1 py-1.5 border-2 text-[8px] font-pixel cursor-pointer ${clockMode === '5|3' ? 'bg-emerald-950 border-emerald-400 text-emerald-400 font-bold' : 'bg-black border-zinc-800 text-zinc-500'}`}>5|3</button>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-[8px] font-pixel text-zinc-400 uppercase block mb-2 text-center">ROOM VISIBILITY</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsPublic(false)}
                    className={`flex-1 py-1.5 border-2 text-[8px] font-pixel cursor-pointer ${!isPublic
                      ? 'bg-emerald-950 border-emerald-400 text-emerald-400 font-bold'
                      : 'bg-black border-zinc-800 text-zinc-500'
                    }`}
                  >
                    PRIVATE
                  </button>
                  <button
                    onClick={() => setIsPublic(true)}
                    className={`flex-1 py-1.5 border-2 text-[8px] font-pixel cursor-pointer ${isPublic
                      ? 'bg-emerald-950 border-emerald-400 text-emerald-400 font-bold'
                      : 'bg-black border-zinc-800 text-zinc-500'
                    }`}
                  >
                    PUBLIC
                  </button>
                </div>
              </div>

              <p className="text-zinc-400 text-[8px] leading-relaxed text-center mb-8">
                A room code will be generated.<br/>
                Share it with your opponent so they can join.
              </p>

              {error && (
                <p className="text-rose-400 text-[7px] uppercase mb-4 text-center">{error}</p>
              )}

              <button
                onClick={handleCreate}
                disabled={connecting}
                className="w-full border-4 border-emerald-400 bg-black hover:bg-emerald-950 text-emerald-400 text-[8px] uppercase py-3 tracking-wider shadow-[4px_4px_0px_#10b981] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {connecting ? 'Connecting...' : 'Generate Room Code'}
              </button>

              <button
                onClick={() => { setError(''); setView('menu'); }}
                className="mt-4 w-full text-zinc-700 hover:text-zinc-400 text-[7px] uppercase tracking-wider transition-colors cursor-pointer"
              >
                Back
              </button>
            </div>
          </motion.div>
        )}

        {view === 'join' && (
          <motion.div
            key="join"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="w-full max-w-sm"
          >
            <div className="border-4 border-zinc-600 bg-zinc-950 p-8 shadow-[8px_8px_0px_#52525b]">
              <div className="text-center mb-8">
                <h2 className="text-white text-xs uppercase tracking-tight">Join Room</h2>
                <p className="text-zinc-500 text-[7px] mt-1 uppercase">
                  Entering as <span className="text-zinc-300">{playerName || '???'}</span>
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-zinc-500 text-[7px] uppercase tracking-wider mb-2">
                  Room Code
                </label>
                <input
                  type="text"
                  maxLength={5}
                  value={joinCode}
                  onChange={e => setJoinCode(e.target.value.toUpperCase())}
                  onKeyDown={e => e.key === 'Enter' && handleJoin()}
                  placeholder="XXXXX"
                  className="w-full bg-black border-2 border-zinc-700 focus:border-zinc-400 outline-none text-white text-sm px-3 py-3 placeholder-zinc-800 transition-colors uppercase tracking-[0.5em] text-center font-mono"
                />
              </div>

              {error && (
                <p className="text-rose-400 text-[7px] uppercase mb-4 text-center">{error}</p>
              )}

              <button
                onClick={handleJoin}
                disabled={connecting || joinCode.length < 4}
                className="w-full border-4 border-zinc-500 bg-black hover:bg-zinc-900 text-zinc-200 text-[8px] uppercase py-3 tracking-wider shadow-[4px_4px_0px_#52525b] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {connecting ? 'Joining...' : 'Enter Room'}
              </button>

              <button
                onClick={() => { setError(''); setView('menu'); }}
                className="mt-4 w-full text-zinc-700 hover:text-zinc-400 text-[7px] uppercase tracking-wider transition-colors cursor-pointer"
              >
                Back
              </button>
            </div>
          </motion.div>
        )}

        {view === 'waiting' && (
          <motion.div
            key="waiting"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm text-center"
          >
            <div className="border-4 border-emerald-400 bg-zinc-950 p-8 shadow-[8px_8px_0px_#10b981]">
              <div className="relative inline-flex items-center justify-center mb-6">
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                  className="absolute w-16 h-16 border-2 border-emerald-400 rounded-full"
                />
                <div className="w-12 h-12 border-4 border-emerald-400 bg-black flex items-center justify-center">
                  <svg
                    viewBox="0 0 45 45"
                    className="w-7 h-7 text-emerald-400"
                    xmlns="http://www.w3.org/2000/svg"
                    dangerouslySetInnerHTML={{
                      __html: `<path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"/>`
                    }}
                  />
                </div>
              </div>

              <h2 className="text-white text-xs uppercase tracking-tight mb-2">
                Waiting for Opponent
              </h2>

              {opponentName ? (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-400 text-[8px] uppercase mb-4"
                >
                  {opponentName} has joined!
                </motion.p>
              ) : (
                <p className="text-zinc-500 text-[7px] uppercase mb-4">
                  Share the code below
                </p>
              )}

              <div
                onClick={copyCode}
                className="my-6 border-2 border-dashed border-zinc-600 hover:border-emerald-400 bg-black cursor-pointer py-4 px-6 transition-colors group"
                title="Click to copy"
              >
                <div className="text-zinc-500 text-[6px] uppercase tracking-wider mb-2 group-hover:text-zinc-400">
                  Room Code — click to copy
                </div>
                <div className="text-white text-2xl tracking-[0.35em] font-mono font-bold">
                  {roomCode}
                </div>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-emerald-400 text-[7px] uppercase mt-2"
                  >
                    Copied!
                  </motion.div>
                )}
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-zinc-800" />
                <span className="text-zinc-700 text-[6px] uppercase tracking-widest">You are</span>
                <div className="flex-1 h-px bg-zinc-800" />
              </div>

              <div className="inline-flex items-center gap-2 border border-zinc-700 px-4 py-2">
                <div
                  className={`w-4 h-4 border-2 ${myColor === 'white' ? 'bg-white border-zinc-400' : 'bg-zinc-900 border-zinc-500'}`}
                />
                <span className="text-zinc-300 text-[7px] uppercase tracking-wider">
                  {myColor === 'white' ? 'White (First Move)' : 'Black'}
                </span>
              </div>

              <button
                onClick={() => {
                  socketRef.current?.disconnect();
                  setView('menu');
                  setRoomCode('');
                  setOpponentName('');
                }}
                className="mt-8 w-full text-zinc-700 hover:text-zinc-400 text-[7px] uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {view === 'browse' && (
          <motion.div
            key="browse"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="w-full max-w-sm"
          >
            <div className="border-4 border-blue-500 bg-zinc-950 p-8 shadow-[8px_8px_0px_#3b82f6]">
              <div className="text-center mb-8">
                <h2 className="text-white text-xs uppercase tracking-tight">Public Rooms</h2>
              </div>
              <div className="flex flex-col gap-3 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {publicRooms.length === 0 ? (
                  <p className="text-zinc-500 text-[8px] uppercase text-center py-4">No open rooms found.</p>
                ) : (
                  publicRooms.map((room) => (
                    <div key={room.code} className="border-2 border-zinc-700 bg-black p-3 flex justify-between items-center">
                      <div>
                        <div className="text-white text-[9px] uppercase">{room.playerNames.white}'s Game</div>
                        <div className="text-zinc-500 text-[7px] uppercase mt-1">First to {room.matchTarget} • {room.upgradePriority.replace('-', ' ')}</div>
                      </div>
                      <button
                        onClick={() => handleJoin(room.code)}
                        className="bg-blue-950 border border-blue-500 text-blue-400 text-[7px] px-3 py-1.5 uppercase cursor-pointer hover:bg-blue-900"
                      >
                        JOIN
                      </button>
                    </div>
                  ))
                )}
              </div>
              <button
                onClick={() => { setView('menu'); socketRef.current?.off('rooms_updated'); }}
                className="w-full text-zinc-700 hover:text-zinc-400 text-[7px] uppercase tracking-wider transition-colors cursor-pointer"
              >
                Back
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function useMultiplayerSync({ socket, roomCode, myColor, onRemoteState }) {
  const onRemoteStateRef = useRef(onRemoteState);
  onRemoteStateRef.current = onRemoteState;

  const socketRef = useRef(socket);
  useEffect(() => { socketRef.current = socket; }, [socket]);

  useEffect(() => {
    if (!socket) return;
    const handleState = (state: any) => {
      onRemoteStateRef.current(state);
    };
    socket.on('game_state', handleState);
    return () => { socket.off('game_state', handleState); };
  }, [socket]);

  const roomCodeRef = useRef(roomCode);
  useEffect(() => { roomCodeRef.current = roomCode; }, [roomCode]);

  const syncState = useCallback(
    (state: any) => {
      socketRef.current?.emit('game_state', { code: roomCodeRef.current, state });
    },
    []
  );

  return { syncState };
}