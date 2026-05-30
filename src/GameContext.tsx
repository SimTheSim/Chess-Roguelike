import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { useGameState } from './hooks/useGameState';
import { useMatchSettings } from './hooks/useMatchSettings';
import { useMultiplayer } from './hooks/useMultiplayer';
import { useMultiplayerSync } from './components/MultiplayerLobby';
import {createInitialBoard, getValidMoves, executeMove, getAIMove} from './chessLogic'
import { getRandomArtifacts, getActiveCombos } from './components/artifactRegistry';
import { Piece } from './types';
import { getClientId } from './utils/clientId';
import { io } from 'socket.io-client';

export type GameStatus =
  | 'start'
  | 'lobby'
  | 'playing'
  | 'round-end-notifying'
  | 'waiting-for-opponent-proceed'
  | 'upgrading-white'
  | 'upgrading-black'
  | 'match-won'
  | 'match-lost'
  | 'waiting-for-opponent-upgrade'
  | 'upgrading-winner-white'
  | 'upgrading-winner-black'
  | 'combo-pending';

interface GameContextValue {
  level: number;
  setLevel: (v: number) => void;
  matchTarget: number;
  setMatchTarget: (v: number) => void;
  gameMode: string;
  setGameMode: (v: string) => void;
  theme: string;
  setTheme: (v: string) => void;
  clockMode: string;
  setClockMode: (v: string) => void;
  aiDifficulty: string;
  setAiDifficulty: (v: string) => void;
  upgradePriority: string;
  setUpgradePriority: (v: string) => void;

  mpSocket: any;
  setMpSocket: (v: any) => void;
  mpColor: 'white' | 'black';
  setMpColor: (v: 'white' | 'black') => void;
  mpRoomCode: string;
  setMpRoomCode: (v: string) => void;
  mpOppName: string;
  setMpOppName: (v: string) => void;
  mpPlayerName: string;
  setMpPlayerName: (v: string) => void;

  board: any[][];
  setBoard: (v: any[][]) => void;
  turn: 'white' | 'black';
  setTurn: (v: 'white' | 'black') => void;
  selectedPos: { r: number; c: number } | null;
  setSelectedPos: (v: { r: number; c: number } | null) => void;
  validMoves: { r: number; c: number }[];
  setValidMoves: (v: { r: number; c: number }[]) => void;
  explodedCells: any[];
  setExplodedCells: (v: any[]) => void;
  enPassantTarget: any;
  setEnPassantTarget: (v: any) => void;
  flameSquares: any[];
  setFlameSquares: (v: any) => void;
  capturedByWhite: any[];
  setCapturedByWhite: (v: any) => void;
  capturedByBlack: any[];
  setCapturedByBlack: (v: any) => void;
  moveHistory: string[];
  setMoveHistory: (v: any) => void;
  crumblingColor: 'white' | 'black' | null;
  setCrumblingColor: (v: 'white' | 'black' | null) => void;

  whiteTime: number;
  setWhiteTime: (v: number) => void;
  blackTime: number;
  setBlackTime: (v: number) => void;

  status: GameStatus;
  setStatus: (v: GameStatus) => void;
  playerScore: number;
  setPlayerScore: (v: number) => void;
  opponentScore: number;
  setOpponentScore: (v: number) => void;
  upgrades: string[];
  setUpgrades: (v: string[]) => void;
  opponentUpgrades: string[];
  setOpponentUpgrades: (v: string[]) => void;
  roundCounter: number;
  setRoundCounter: (v: number) => void;
  roundStartColor: 'white' | 'black';
  setRoundStartColor: (v: 'white' | 'black') => void;
  isAIThinking: boolean;

  upgradeChoices: any[];
  setUpgradeChoices: (v: any[]) => void;
  roundWinner: 'white' | 'black' | null;
  setRoundWinner: (v: 'white' | 'black' | null) => void;
  aiSelectedBoon: any | null;
  setAiSelectedBoon: (v: any) => void;
  loserChosenId: string | null;
  setLoserChosenId: (v: string | null) => void;
  oppProceeded: boolean;
  setOppProceeded: (v: boolean) => void;
  pendingCombo: { artifactA: any; artifactB: any; bonusDescription: string; bonusTag: string } | null;
  setPendingCombo: (v: any) => void;
  comboOpponentProceeded: boolean;
  setComboOpponentProceeded: (v: boolean) => void;
  postComboActionRef: React.MutableRefObject<(() => void) | null>;

  opponentTempDisconnected: boolean;
  setOpponentTempDisconnected: (v: boolean) => void;
  disconnectCountdown: number;
  setDisconnectCountdown: (v: number) => void;
  opponentLeft: boolean;
  setOpponentLeft: (v: boolean) => void;
  rematchProposal: any;
  setRematchProposal: (v: any) => void;
  rematchDeclined: boolean;
  setRematchDeclined: (v: boolean) => void;

  isPreloading: any;
  setIsPreloading: (v: any) => void;

  syncState: (payload: any) => void;
  activeTab: 'setup' | 'settings';
  setActiveTab: (v: 'setup' | 'settings') => void;

  getTurnLabel: () => string;
  handleCellClick: (r: number, c: number) => void;
  startNewMatch: () => void;
  proceedToUpgradeFlow: () => void;
  handleUpgradeSelect: (upgradeId: string, playerSide: 'white' | 'black') => void;
  handleWinnerUpgradeSelect: (upgradeId: string, playerSide: 'white' | 'black') => void;
  endRound: (winner: 'white' | 'black') => void;
  handleRemoteState: (state: any) => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const {
    level, setLevel,
    matchTarget, setMatchTarget,
    gameMode, setGameMode,
    theme, setTheme,
    aiDifficulty, setAiDifficulty,
    upgradePriority, setUpgradePriority,
    clockMode, setClockMode
  } = useMatchSettings();

  const {
    mpSocket, setMpSocket,
    mpColor, setMpColor,
    mpRoomCode, setMpRoomCode,
    mpOppName, setMpOppName,
    mpPlayerName, setMpPlayerName,
    opponentTempDisconnected, setOpponentTempDisconnected,
    disconnectCountdown, setDisconnectCountdown,
    opponentLeft, setOpponentLeft,
  } = useMultiplayer();

  const {
    board, setBoard,
    turn, setTurn,
    selectedPos, setSelectedPos,
    validMoves, setValidMoves,
    explodedCells, setExplodedCells,
    enPassantTarget, setEnPassantTarget,
    flameSquares, setFlameSquares,
    capturedByWhite, setCapturedByWhite,
    capturedByBlack, setCapturedByBlack,
    moveHistory, setMoveHistory,
    crumblingColor, setCrumblingColor,
    whiteTime, setWhiteTime,
    blackTime, setBlackTime
  } = useGameState();

  const [activeTab, setActiveTab] = useState<'setup' | 'settings'>('setup');
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);
  const [upgrades, setUpgrades] = useState<string[]>([]);
  const [opponentUpgrades, setOpponentUpgrades] = useState<string[]>([]);
  const [roundCounter, setRoundCounter] = useState<number>(1);
  const [roundStartColor, setRoundStartColor] = useState<'white' | 'black'>('white');
  const [isAIThinking, setIsAIThinking] = useState<boolean>(false);
  const [status, setStatus] = useState<GameStatus>('start');
  const [upgradeChoices, setUpgradeChoices] = useState<any[]>([]);
  const [roundWinner, setRoundWinner] = useState<'white' | 'black' | null>(null);
  const [aiSelectedBoon, setAiSelectedBoon] = useState<any | null>(null);
  const [loserChosenId, setLoserChosenId] = useState<string | null>(null);
  const [oppProceeded, setOppProceeded] = useState(false);
  const [pendingCombo, setPendingCombo] = useState<{ artifactA: any; artifactB: any; bonusDescription: string; bonusTag: string } | null>(null);
  const [comboOpponentProceeded, setComboOpponentProceeded] = useState(false);
  const [rematchDeclined, setRematchDeclined] = useState(false);
  const [rematchProposal, setRematchProposal] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);
  const [clockStarted, setClockStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPreloading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const reconnectAttempted = useRef(false);

  useEffect(() => { mpColorRef.current = mpColor; }, [mpColor]);

  useEffect(() => {
    if (reconnectAttempted.current) return;
    reconnectAttempted.current = true;
    const storedRoom = localStorage.getItem('chess_room_code');
    const clientId = getClientId();
    if (storedRoom && !mpSocket) {
      const newSocket = io(import.meta.env.VITE_MULTIPLAYER_SERVER ?? 'http://localhost:3001');
      newSocket.emit('reconnect_to_room', { code: storedRoom, clientId }, (res: any) => {
        if (res.ok) {
          setMpSocket(newSocket);
          setMpRoomCode(res.code);
          setMpColor(res.color);
          mpColorRef.current = res.color;
          setMatchTarget(res.room.matchTarget);
          setUpgradePriority(res.room.upgradePriority);
          if (res.room.clockMode) setClockMode(res.room.clockMode);
          const oppName = res.room.playerNames[res.color === 'white' ? 'black' : 'white'] || 'Opponent';
          setMpOppName(oppName);
          setGameMode('online');
          if (res.gameState) {
            handleRemoteState(res.gameState);
          } else if (res.room.players.white && res.room.players.black) {
            startNewMatch(res.room.clockMode ?? 'none');
          } else {
            setStatus('waiting-for-opponent-proceed');
          }
        } else {
          newSocket.disconnect();
          localStorage.removeItem('chess_room_code');
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!mpSocket) return;

    const onTempDisconnect = ({ timeout }: { timeout: number }) => {
      setOpponentTempDisconnected(true);
      setDisconnectCountdown(timeout);
    };
    const onOpponentLeft = () => {
      setOpponentLeft(true);
      setOpponentTempDisconnected(true);
      setDisconnectCountdown(3);
    };
    const onReconnect = () => {
      setOpponentTempDisconnected(false);
      setDisconnectCountdown(0);
      const s = upgradeStateRef.current;
      if (upgradeStatuses.includes(s.status) && s.status !== 'waiting-for-opponent-upgrade' && s.status !== 'waiting-for-opponent-proceed') {
        syncStateRef.current({
          board: s.board, turn: s.turn, roundStartColor: s.roundStartColor,
          upgrades: s.upgrades, opponentUpgrades: s.opponentUpgrades,
          enPassantTarget: s.enPassantTarget, capturedByWhite: s.capturedByWhite,
          capturedByBlack: s.capturedByBlack, moveHistory: s.moveHistory,
          playerScore: s.opponentScore, opponentScore: s.playerScore,
          status: s.status, roundCounter: s.roundCounter,
          upgradeChoices: s.upgradeChoices, loserChosenId: s.loserChosenId,
          roundWinner: s.roundWinner,
        });
      }
    };
    const onSettingsUpdate = ({ matchTarget: mt, upgradePriority: up, clockMode: cm }: any) => {
      setMatchTarget(mt);
      setUpgradePriority(up);
      if (cm) setClockMode(cm);
    };
    const onProposal = (data: any) => {
      setRematchProposal(data);
    };
    const onDecline = () => {
      setRematchDeclined(true);
    };
    const onRematchStart = ({ matchTarget: mt, upgradePriority: up, clockMode: cm }: any) => {
      setMatchTarget(mt);
      setUpgradePriority(up);
      if (cm) setClockMode(cm);
      setRematchProposal(null);
      setRematchDeclined(false);
      startNewMatch();
    };

    mpSocket.on('opponent_temporarily_disconnected', onTempDisconnect);
    mpSocket.on('opponent_reconnected', onReconnect);
    mpSocket.on('room_settings_update', onSettingsUpdate);
    mpSocket.on('rematch_proposal', onProposal);
    mpSocket.on('rematch_decline', onDecline);
    mpSocket.on('rematch_start', onRematchStart);
    mpSocket.on('opponent_left', onOpponentLeft);

    return () => {
      mpSocket.off('opponent_temporarily_disconnected', onTempDisconnect);
      mpSocket.off('opponent_reconnected', onReconnect);
      mpSocket.off('room_settings_update', onSettingsUpdate);
      mpSocket.off('rematch_proposal', onProposal);
      mpSocket.off('rematch_decline', onDecline);
      mpSocket.off('rematch_start', onRematchStart);
      mpSocket.off('opponent_left', onOpponentLeft);
    };
  }, [mpSocket]);

  const upgradeStatuses: GameStatus[] = [
      'round-end-notifying', 'upgrading-white', 'upgrading-black',
      'upgrading-winner-white', 'upgrading-winner-black',
      'waiting-for-opponent-upgrade', 'waiting-for-opponent-proceed', 'combo-pending'
    ];

  useEffect(() => {
    if (opponentTempDisconnected && disconnectCountdown > 0) {
      if (gameMode === 'online' && upgradeStatuses.includes(status)) return;
      const timer = setTimeout(() => setDisconnectCountdown(disconnectCountdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (opponentTempDisconnected && disconnectCountdown === 0) {
      if (gameMode === 'online' && upgradeStatuses.includes(status)) return;
      setStatus('start');
      setMpRoomCode('');
      localStorage.removeItem('chess_room_code');
      mpSocket?.disconnect();
      setOpponentTempDisconnected(false);
      setOpponentLeft(false);
    }
  }, [opponentTempDisconnected, disconnectCountdown, status, gameMode]);

  const postComboActionRef = useRef<(() => void) | null>(null);
  const roundEndingRef = useRef(false);
  const mpColorRef = useRef<'white' | 'black'>('white');
  const syncStateRef = useRef<(payload: any) => void>(() => {});
  const timesRef = useRef({ whiteTime, blackTime });
  useEffect(() => { timesRef.current = { whiteTime, blackTime }; }, [whiteTime, blackTime]);

  const stateRef = useRef({ playerScore, opponentScore, matchTarget, gameMode, mpColor, upgrades, opponentUpgrades, upgradePriority });
  useEffect(() => {
    stateRef.current = { playerScore, opponentScore, matchTarget, gameMode, mpColor, upgrades, opponentUpgrades, upgradePriority };
  }, [playerScore, opponentScore, matchTarget, gameMode, mpColor, upgrades, opponentUpgrades, upgradePriority]);

  const upgradeStateRef = useRef({ status, upgradeChoices, loserChosenId, roundWinner, board, turn, roundStartColor, upgrades, opponentUpgrades, enPassantTarget, capturedByWhite, capturedByBlack, moveHistory, playerScore, opponentScore, roundCounter, whiteTime, blackTime });
  useEffect(() => {
    upgradeStateRef.current = { status, upgradeChoices, loserChosenId, roundWinner, board, turn, roundStartColor, upgrades, opponentUpgrades, enPassantTarget, capturedByWhite, capturedByBlack, moveHistory, playerScore, opponentScore, roundCounter, whiteTime, blackTime };
  }, [status, upgradeChoices, loserChosenId, roundWinner, board, turn, roundStartColor, upgrades, opponentUpgrades, enPassantTarget, capturedByWhite, capturedByBlack, moveHistory, playerScore, opponentScore, roundCounter, whiteTime, blackTime]);

  useEffect(() => {
    if (status !== 'playing' || clockMode === 'none' || isAIThinking || !clockStarted) return;
    const interval = setInterval(() => {
      if (turn === 'white') {
        setWhiteTime((prev) => {
          if (prev <= 1000) { 
            clearInterval(interval); 
            setCrumblingColor('white'); 
            setTimeout(() => { setCrumblingColor(null); endRound('black'); }, 1500); 
            return 0; 
          }
          return prev - 1000;
        });
      } else {
        setBlackTime((prev) => {
          if (prev <= 1000) { 
            clearInterval(interval); 
            setCrumblingColor('black'); 
            setTimeout(() => { setCrumblingColor(null); endRound('white'); }, 1500); 
            return 0; 
          }
          return prev - 1000;
        });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [status, clockMode, turn, isAIThinking]);

  const handleRemoteState = useCallback((state: any) => {
    if (!state) return;
    const data = state.state ? state.state : state;
    if (data.board) setBoard(data.board);
    if (data.turn) setTurn(data.turn);
    if (data.upgrades) setUpgrades(data.upgrades);
    if (data.opponentUpgrades) setOpponentUpgrades(data.opponentUpgrades);
    if (data.enPassantTarget !== undefined) setEnPassantTarget(data.enPassantTarget);
    if (data.flameSquares !== undefined) setFlameSquares(data.flameSquares);
    if (data.capturedByWhite) setCapturedByWhite(data.capturedByWhite);
    if (data.capturedByBlack) setCapturedByBlack(data.capturedByBlack);
    if (data.moveHistory) setMoveHistory(data.moveHistory);
    if (data.playerScore !== undefined) setPlayerScore(data.playerScore);
    if (data.opponentScore !== undefined) setOpponentScore(data.opponentScore);
    if (data.roundCounter !== undefined) setRoundCounter(data.roundCounter);
    if (data.roundStartColor) setRoundStartColor(data.roundStartColor);
    if (data.upgradeChoices) setUpgradeChoices(data.upgradeChoices);
    if (data.whiteTime !== undefined) setWhiteTime(data.whiteTime);
    if (data.blackTime !== undefined) setBlackTime(data.blackTime);
    if (data.loserChosenId !== undefined) setLoserChosenId(data.loserChosenId);
    if (data.roundWinner !== undefined) setRoundWinner(data.roundWinner);
    if (data.proceeded !== undefined) setOppProceeded(data.proceeded);
    if (data.comboProceed !== undefined) setComboOpponentProceeded(data.comboProceed);
    if (data.clockStarted !== undefined) setClockStarted(data.clockStarted);
    if (data.roundOver) {
      const loserColor = data.roundOver === 'white' ? 'black' : 'white';
      setCrumblingColor(loserColor);
      setTimeout(() => {
        setCrumblingColor(null);
        endRound(data.roundOver);
      }, 1500);
      return;
    }
    if (data.status) {
      if (data.status === 'upgrading-white' || data.status === 'upgrading-black') {
        const loserColor = data.status === 'upgrading-white' ? 'white' : 'black';
        if (mpColorRef.current !== loserColor) {
          setStatus('waiting-for-opponent-upgrade');
          return;
        }
      }
      if (data.status === 'upgrading-winner-white' || data.status === 'upgrading-winner-black') {
        if (data.winnerChoices) setUpgradeChoices(data.winnerChoices);
        const winnerColor = data.status === 'upgrading-winner-white' ? 'white' : 'black';
        if (mpColorRef.current !== winnerColor) {
          setStatus('waiting-for-opponent-upgrade');
          return;
        }
      }
      if (data.status === 'combo-pending-loser') {
        roundEndingRef.current = false;
        setSelectedPos(null);
        setValidMoves([]);
        setPendingCombo(data.pendingCombo);
        setStatus('combo-pending');
        postComboActionRef.current = () => setStatus('playing');
        return;
      }
      if (data.status === 'playing') {
        roundEndingRef.current = false;
        setSelectedPos(null);
        setValidMoves([]);
      }
      setStatus(data.status);
    }
  }, []);

  const { syncState } = useMultiplayerSync({
    socket: mpSocket,
    roomCode: mpRoomCode,
    myColor: mpColor,
    onRemoteState: handleRemoteState,
  });

  useEffect(() => { syncStateRef.current = syncState; }, [syncState]);

  const setupNextRound = (stageLvl: number, whiteBoons: string[], blackBoons: string[], startColor: 'white' | 'black', clock: string = clockMode) => {
    roundEndingRef.current = false;
    setBoard(createInitialBoard(stageLvl, whiteBoons, blackBoons));
    setTurn(startColor);
    setRoundStartColor(startColor);
    setSelectedPos(null);
    setValidMoves([]);
    setCapturedByWhite([]);
    setCapturedByBlack([]);
    setExplodedCells([]);
    setEnPassantTarget(null);
    setFlameSquares([]);
    setClockStarted(false);
    setMoveHistory([]);
    setIsAIThinking(false);
    setCrumblingColor(null);
    if (clock !== 'none') {
      const m = parseInt(clock.split('|')[0], 10);
      setWhiteTime(m * 60 * 1000);
      setBlackTime(m * 60 * 1000);
    }
  };

  const startNewMatch = (clock: string = clockMode) => {
    setPlayerScore(0);
    setOpponentScore(0);
    setUpgrades([]);
    setRoundCounter(1);
    setOpponentUpgrades([]);
    setLevel(1);
    setStatus('playing');
    setupNextRound(1, [], [], 'white', clock);
  };

  const checkKingCaptured = (boardState: any): 'white' | 'black' | null => {
    let whiteKingAlive = false;
    let blackKingAlive = false;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = boardState[r][c];
        if (p && p.type === 'king') {
          if (p.color === 'white') whiteKingAlive = true;
          if (p.color === 'black') blackKingAlive = true;
        }
      }
    }
    if (!whiteKingAlive) return 'black';
    if (!blackKingAlive) return 'white';
    return null;
  };

  const getMoveNotation = (piece: Piece, from: any, to: any, isCapture: boolean) => {
    const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    const toCell = `${cols[to.c]}${ranks[to.r]}`;
    const fromFile = cols[from.c];
    if (piece.type === 'pawn') return isCapture ? `${fromFile}x${toCell}` : toCell;
    const pieceLetters: Record<string, string> = { king: 'K', queen: 'Q', rook: 'R', bishop: 'B', knight: 'N' };
    const letter = pieceLetters[piece.type] || '';
    return isCapture ? `${letter}x${toCell}` : `${letter}${toCell}`;
  };

  const endRound = (winner: 'white' | 'black') => {
    if (roundEndingRef.current) return;
    roundEndingRef.current = true;
    setRoundWinner(winner);
    const s = stateRef.current;
    let nextPlayerScore = s.playerScore;
    let nextOpponentScore = s.opponentScore;
    const localWon = s.gameMode === 'online' ? winner === s.mpColor : winner === 'white';
    if (localWon) {
      nextPlayerScore += 1;
      setPlayerScore(nextPlayerScore);
    } else {
      nextOpponentScore += 1;
      setOpponentScore(nextOpponentScore);
    }
    if (nextPlayerScore >= s.matchTarget) { setStatus('match-won'); return; }
    if (nextOpponentScore >= s.matchTarget) { setStatus('match-lost'); return; }
    const allUpgrades = [...s.upgrades, ...s.opponentUpgrades];
    if (s.gameMode === 'online') {
      const loserColor = winner === 'white' ? 'black' : 'white';
      setOppProceeded(false);
      if (s.mpColor === loserColor) {
        const choices = getRandomArtifacts(allUpgrades, allUpgrades);
        setUpgradeChoices(choices);
        setStatus('round-end-notifying');
        syncState({ roundCounter: s.roundCounter, upgradeChoices: choices, roundWinner: winner, whiteTime: s.whiteTime, blackTime: s.blackTime });
      } else {
        setStatus('round-end-notifying');
      }
      return;
    }
    const isWhiteLoser = winner === 'black';
    if (isWhiteLoser) {
      setUpgradeChoices(getRandomArtifacts(allUpgrades, allUpgrades));
      setStatus('round-end-notifying');
    } else {
      const choices = getRandomArtifacts(allUpgrades, allUpgrades);
      setUpgradeChoices(choices);
      if (s.gameMode === 'campaign') {
        if (choices.length > 0) setAiSelectedBoon(choices[0]);
        else setAiSelectedBoon(null);
      }
      setStatus('round-end-notifying');
    }
  };

  const checkAndShowCombo = (
    newUpgrades: string[], newOpponentUpgrades: string[],
    prevWhite: string[], prevBlack: string[],
    afterAction: () => void
  ) => {
    const whiteCombos = getActiveCombos(newUpgrades);
    const blackCombos = getActiveCombos(newOpponentUpgrades);
    const prevWhiteCombos = getActiveCombos(prevWhite);
    const prevBlackCombos = getActiveCombos(prevBlack);
    const newCombo = whiteCombos.find(c => !prevWhiteCombos.some(p => p.artifactA.id === c.artifactA.id && p.artifactB.id === c.artifactB.id))
                  || blackCombos.find(c => !prevBlackCombos.some(p => p.artifactA.id === c.artifactA.id && p.artifactB.id === c.artifactB.id));
    if (!newCombo) { afterAction(); return; }
    setPendingCombo(newCombo);
    setStatus('combo-pending');
    postComboActionRef.current = afterAction;
  };

  const proceedToUpgradeFlow = () => {
    if (gameMode === 'online') {
      const loserColor = roundWinner === 'white' ? 'black' : 'white';
      const isLoser = mpColor === loserColor;
      if (isLoser) {
        const nextStatus = mpColor === 'white' ? 'upgrading-white' : 'upgrading-black';
        setStatus(nextStatus);
        syncState({ status: nextStatus, upgradeChoices, roundWinner });
      } else {
        setStatus('waiting-for-opponent-upgrade');
      }
      return;
    }
    const isWhiteLoser = roundWinner === 'black';
    if (isWhiteLoser) {
      setStatus('upgrading-white');
    } else {
      if (gameMode === 'campaign') {
        const nextOppBoons = aiSelectedBoon ? [...opponentUpgrades, aiSelectedBoon.id] : opponentUpgrades;
        setOpponentUpgrades(nextOppBoons);
        if (upgradePriority === 'loser-then-winner') {
          setLoserChosenId(aiSelectedBoon?.id ?? null);
          setStatus('upgrading-winner-white');
          return;
        }
        const nextLvl = level + 1;
        const nextRound = roundCounter + 1;
        const nextStartColor = roundStartColor === 'white' ? 'black' : 'white';
        checkAndShowCombo(upgrades, nextOppBoons, upgrades, opponentUpgrades, () => {
          setLevel(nextLvl);
          setRoundCounter(nextRound);
          setupNextRound(nextLvl, upgrades, nextOppBoons, nextStartColor);
          setStatus('playing');
        });
      } else {
        setStatus('upgrading-black');
      }
    }
  };

  const handleUpgradeSelect = (upgradeId: string, playerSide: 'white' | 'black') => {
    const loserSide = roundWinner === 'black' ? 'white' : 'black';
    const winnerSide = roundWinner as 'white' | 'black';
    let nextWhiteUpgrades = Array.isArray(upgrades) ? [...upgrades] : [];
    let nextBlackUpgrades = Array.isArray(opponentUpgrades) ? [...opponentUpgrades] : [];
    if (playerSide === 'white') {
      nextWhiteUpgrades.push(upgradeId);
      setUpgrades(nextWhiteUpgrades);
    } else {
      nextBlackUpgrades.push(upgradeId);
      setOpponentUpgrades(nextBlackUpgrades);
    }
    if (upgradePriority === 'loser-then-winner' && playerSide === loserSide && gameMode !== 'online') {
      if (gameMode === 'campaign') {
        const remaining = upgradeChoices.filter(u => u.id !== upgradeId);
        if (remaining.length > 0) {
          nextBlackUpgrades.push(remaining[0].id);
          setOpponentUpgrades(nextBlackUpgrades);
        }
        const nextLvl = level + 1;
        setLevel(nextLvl);
        const nextRound = roundCounter + 1;
        setRoundCounter(nextRound);
        const nextStartColor = roundStartColor === 'white' ? 'black' : 'white';
        setupNextRound(nextLvl, nextWhiteUpgrades, nextBlackUpgrades, nextStartColor);
        setStatus('playing');
        return;
      }
      setLoserChosenId(upgradeId);
      const remaining = upgradeChoices.filter(u => u.id !== upgradeId);
      setUpgradeChoices(remaining);
      setStatus(winnerSide === 'white' ? 'upgrading-winner-white' : 'upgrading-winner-black');
      return;
    }
    if (gameMode === 'online') {
      if (upgradePriority === 'loser-then-winner') {
        const prevBoons = playerSide === 'white' ? upgrades : opponentUpgrades;
        const nextBoons = playerSide === 'white' ? nextWhiteUpgrades : nextBlackUpgrades;
        const newCombo = getActiveCombos(nextBoons).find(c => !getActiveCombos(prevBoons).some(p => p.artifactA.id === c.artifactA.id && p.artifactB.id === c.artifactB.id));
        const winnerChoices = upgradeChoices.filter(u => u.id !== upgradeId);
        const syncPayload = {
          upgrades: playerSide === 'white' ? nextWhiteUpgrades : upgrades,
          opponentUpgrades: playerSide === 'black' ? nextBlackUpgrades : opponentUpgrades,
          status: winnerSide === 'white' ? 'upgrading-winner-white' : 'upgrading-winner-black',
          winnerChoices,
          loserChosenId: upgradeId,
        };
        if (newCombo) {
          setPendingCombo(newCombo);
          setStatus('combo-pending');
          postComboActionRef.current = () => {
            setUpgradeChoices(winnerChoices);
            setLoserChosenId(upgradeId);
            setStatus('waiting-for-opponent-upgrade');
          };
          syncState(syncPayload);
        } else {
          syncState(syncPayload);
          setUpgradeChoices(winnerChoices);
          setLoserChosenId(upgradeId);
          setStatus('waiting-for-opponent-upgrade');
        }
        
        return;
      }
      const nextLvl = 1;
      const nextRound = roundCounter + 1;
      const nextStartColor = roundStartColor === 'white' ? 'black' : 'white';
      const newBoard = createInitialBoard(nextLvl, nextWhiteUpgrades, nextBlackUpgrades);
      const prevBoons = playerSide === 'white' ? upgrades : opponentUpgrades;
      const nextBoons = playerSide === 'white' ? nextWhiteUpgrades : nextBlackUpgrades;
      const newCombo = getActiveCombos(nextBoons).find(c => !getActiveCombos(prevBoons).some(p => p.artifactA.id === c.artifactA.id && p.artifactB.id === c.artifactB.id));
      const currentPlayerScore = stateRef.current.playerScore;
      const currentOpponentScore = stateRef.current.opponentScore;
      if (newCombo) {
        setPendingCombo(newCombo);
        setStatus('combo-pending');
        postComboActionRef.current = () => {
          setupNextRound(nextLvl, nextWhiteUpgrades, nextBlackUpgrades, nextStartColor);
          setStatus('playing');
          syncState({
            board: newBoard, turn: nextStartColor, roundStartColor: nextStartColor,
            upgrades: nextWhiteUpgrades, opponentUpgrades: nextBlackUpgrades,
            enPassantTarget: null, capturedByWhite: [], capturedByBlack: [],
            moveHistory: [], playerScore: currentOpponentScore, opponentScore: currentPlayerScore,
            status: 'playing', roundCounter: nextRound, loserChosenId: null
          });
        };
        syncState({ status: 'waiting-for-opponent-proceed' });
      } else {
        setupNextRound(nextLvl, nextWhiteUpgrades, nextBlackUpgrades, nextStartColor);
        setStatus('playing');
        syncState({
          board: newBoard, turn: nextStartColor, roundStartColor: nextStartColor,
          upgrades: nextWhiteUpgrades, opponentUpgrades: nextBlackUpgrades,
          enPassantTarget: null, capturedByWhite: [], capturedByBlack: [],
          moveHistory: [], playerScore: currentOpponentScore, opponentScore: currentPlayerScore,
          status: 'playing', roundCounter: nextRound, loserChosenId: null
        });
      }
      return;
    }
    const nextLvl = gameMode === 'campaign' ? level + 1 : 1;
    if (gameMode === 'campaign') setLevel(nextLvl);
    const nextRound = roundCounter + 1;
    setRoundCounter(nextRound);
    const nextStartColor = roundStartColor === 'white' ? 'black' : 'white';
    checkAndShowCombo(nextWhiteUpgrades, nextBlackUpgrades, upgrades, opponentUpgrades, () => {
      setupNextRound(nextLvl, nextWhiteUpgrades, nextBlackUpgrades, nextStartColor);
      setStatus('playing');
    });
  };

  const handleWinnerUpgradeSelect = (upgradeId: string, playerSide: 'white' | 'black') => {
    let nextWhiteUpgrades = Array.isArray(upgrades) ? [...upgrades] : [];
    let nextBlackUpgrades = Array.isArray(opponentUpgrades) ? [...opponentUpgrades] : [];
    if (playerSide === 'white') {
      nextWhiteUpgrades.push(upgradeId);
      setUpgrades(nextWhiteUpgrades);
    } else {
      nextBlackUpgrades.push(upgradeId);
      setOpponentUpgrades(nextBlackUpgrades);
    }
    const nextLvl = gameMode === 'campaign' ? level + 1 : 1;
    if (gameMode === 'campaign') setLevel(nextLvl);
    const nextRound = roundCounter + 1;
    setRoundCounter(nextRound);
    const nextStartColor = roundStartColor === 'white' ? 'black' : 'white';
    setLoserChosenId(null);
    if (gameMode === 'online') {
      const newBoard = createInitialBoard(nextLvl, nextWhiteUpgrades, nextBlackUpgrades);
      const prevBoons = playerSide === 'white' ? upgrades : opponentUpgrades;
      const nextBoons = playerSide === 'white' ? nextWhiteUpgrades : nextBlackUpgrades;
      const newCombo = getActiveCombos(nextBoons).find(c => !getActiveCombos(prevBoons).some(p => p.artifactA.id === c.artifactA.id && p.artifactB.id === c.artifactB.id));
      const currentPlayerScore = stateRef.current.playerScore;
      const currentOpponentScore = stateRef.current.opponentScore;
      if (newCombo) {
        setPendingCombo(newCombo);
        setStatus('combo-pending');
        postComboActionRef.current = () => {
          setupNextRound(nextLvl, nextWhiteUpgrades, nextBlackUpgrades, nextStartColor);
          setStatus('playing');
          syncState({
            board: newBoard, turn: nextStartColor, roundStartColor: nextStartColor,
            upgrades: nextWhiteUpgrades, opponentUpgrades: nextBlackUpgrades,
            enPassantTarget: null, capturedByWhite: [], capturedByBlack: [],
            moveHistory: [], playerScore: currentOpponentScore, opponentScore: currentPlayerScore,
            status: 'playing', roundCounter: nextRound, loserChosenId: null
          });
        };
        syncState({ status: 'waiting-for-opponent-proceed' });
      } else {
        setupNextRound(nextLvl, nextWhiteUpgrades, nextBlackUpgrades, nextStartColor);
        setStatus('playing');
        syncState({
          board: newBoard, turn: nextStartColor, roundStartColor: nextStartColor,
          upgrades: nextWhiteUpgrades, opponentUpgrades: nextBlackUpgrades,
          enPassantTarget: null, capturedByWhite: [], capturedByBlack: [],
          moveHistory: [], playerScore: currentOpponentScore, opponentScore: currentPlayerScore,
          status: 'playing', roundCounter: nextRound, loserChosenId: null
        });
      }
    } else {
      checkAndShowCombo(nextWhiteUpgrades, nextBlackUpgrades, upgrades, opponentUpgrades, () => {
        setupNextRound(nextLvl, nextWhiteUpgrades, nextBlackUpgrades, nextStartColor);
        setStatus('playing');
      });
    }
  };

  const handleCellClick = (r: number, c: number) => {
    if (status !== 'playing' || isAIThinking) return;
    if (roundEndingRef.current) return;
    if (gameMode === 'online') {
      if (turn !== mpColor) return;
      const pColor = board[r][c]?.color;
      if (selectedPos === null && pColor !== turn) return;
    } else if (gameMode === 'pvp') {
      const pColor = board[r][c]?.color;
      if (selectedPos === null && pColor !== turn) return;
    } else {
      if (turn !== 'white') return;
    }
    const piece = board[r][c];
    if (selectedPos) {
      const isMoveValid = validMoves.some(m => m.r === r && m.c === c);
      if (isMoveValid) {
        setExplodedCells([]);
        const movingPiece = board[selectedPos.r][selectedPos.c];
        const destPiece = board[r][c];
        const isCapture = destPiece !== null;
        const note = movingPiece ? getMoveNotation(movingPiece, selectedPos, { r, c }, isCapture) : '';
        const { nextBoard, captured, exploded, nextEnPassantTarget } = executeMove(
          board, selectedPos, { r, c }, upgrades, opponentUpgrades, enPassantTarget, flameSquares
        );
        if (captured) {
          if (turn === 'white') setCapturedByWhite((prev: any[]) => [...prev, captured]);
          else setCapturedByBlack((prev: any[]) => [...prev, captured]);
        }
        if (exploded.length > 0) {
          setExplodedCells(exploded);
          setTimeout(() => setExplodedCells([]), 800);
        }
        setEnPassantTarget(nextEnPassantTarget);
        const nextFlameSquares = flameSquares
          .map(f => ({ ...f, turnsLeft: f.turnsLeft - 1 }))
          .filter(f => f.turnsLeft > 0);
        setFlameSquares(nextFlameSquares);
        setBoard(nextBoard);
        setSelectedPos(null);
        setValidMoves([]);
        const newCapturedByWhite = turn === 'white' && captured ? [...capturedByWhite, captured] : capturedByWhite;
        const newCapturedByBlack = turn === 'black' && captured ? [...capturedByBlack, captured] : capturedByBlack;
        const newMoveHistory = movingPiece ? [note, ...moveHistory] : moveHistory;
        setMoveHistory(newMoveHistory);
        let nextWhiteTime = timesRef.current.whiteTime;
        let nextBlackTime = timesRef.current.blackTime;
        if (clockMode !== 'none') {
          const inc = parseInt(clockMode.split('|')[1], 10) * 1000;
          if (turn === 'white') { nextWhiteTime += inc; setWhiteTime(nextWhiteTime); }
          else { nextBlackTime += inc; setBlackTime(nextBlackTime); }
        }
        const nextTurn = turn === 'white' ? 'black' : 'white';
        const victorColor = checkKingCaptured(nextBoard);
        if (victorColor) {
          const loserColor = victorColor === 'white' ? 'black' : 'white';
          setCrumblingColor(loserColor);
          if (gameMode === 'online') {
            syncState({
              board: nextBoard, turn: nextTurn, roundStartColor, upgrades, opponentUpgrades, clockStarted: true,
              enPassantTarget: nextEnPassantTarget, capturedByWhite: newCapturedByWhite, capturedByBlack: newCapturedByBlack,
              moveHistory: newMoveHistory, playerScore: opponentScore, opponentScore: playerScore, status, roundCounter,
              roundOver: victorColor, whiteTime: nextWhiteTime, blackTime: nextBlackTime, flameSquares: nextFlameSquares,
            });
          }
          setTimeout(() => { setCrumblingColor(null); endRound(victorColor); }, 1500);
          return;
        }
        setTurn(nextTurn);
        if (!clockStarted) setClockStarted(true);
        if (gameMode === 'online') {
          syncState({
            board: nextBoard, turn: nextTurn, roundStartColor, upgrades, opponentUpgrades, clockStarted: true,
            enPassantTarget: nextEnPassantTarget, capturedByWhite: newCapturedByWhite, capturedByBlack: newCapturedByBlack,
            moveHistory: newMoveHistory, playerScore: opponentScore, opponentScore: playerScore, status, roundCounter,
            whiteTime: nextWhiteTime, blackTime: nextBlackTime, flameSquares: nextFlameSquares,
          });
        }
        return;
      }
    }
    if (piece && piece.color === turn) {
      setSelectedPos({ r, c });
      setValidMoves(getValidMoves(board, { r, c }, upgrades, opponentUpgrades, enPassantTarget, flameSquares));
    } else {
      setSelectedPos(null);
      setValidMoves([]);
    }
  };

  const executeAIMovement = useCallback(() => {
    if (status !== 'playing' || turn !== 'black' || isAIThinking || gameMode !== 'campaign') return;
    setIsAIThinking(true);
    setTimeout(() => {
      const aiMove = getAIMove(board, aiDifficulty, upgrades, opponentUpgrades);
      if (!aiMove) { setIsAIThinking(false); setTurn('white'); return; }
      setExplodedCells([]);
      const aiPiece = board[aiMove.from.r][aiMove.from.c];
      if (aiPiece) {
        const destPiece = board[aiMove.to.r][aiMove.to.c];
        const isCapture = destPiece !== null;
        const note = getMoveNotation(aiPiece, aiMove.from, aiMove.to, isCapture);
        setMoveHistory((prev: string[]) => [note, ...prev]);
      }
      const { nextBoard, captured, exploded, nextEnPassantTarget } = executeMove(
        board, aiMove.from, aiMove.to, upgrades, opponentUpgrades, enPassantTarget, flameSquares
      );
      if (captured) setCapturedByBlack((prev: any[]) => [...prev, captured]);
      if (exploded.length > 0) {
        setExplodedCells(exploded);
        setTimeout(() => setExplodedCells([]), 800);
      }
      setEnPassantTarget(nextEnPassantTarget);
      setFlameSquares((prev: any[]) => prev.map(f => ({ ...f, turnsLeft: f.turnsLeft - 1 })).filter(f => f.turnsLeft > 0));
      setBoard(nextBoard);
      if (clockMode !== 'none') {
        const inc = parseInt(clockMode.split('|')[1], 10) * 1000;
        setBlackTime((prev) => prev + inc);
      }
      const victorColor = checkKingCaptured(nextBoard);
      if (victorColor) {
        const loserColor = victorColor === 'white' ? 'black' : 'white';
        setCrumblingColor(loserColor);
        setTimeout(() => { setCrumblingColor(null); endRound(victorColor); }, 1500);
      } else {
        setTurn('white');
      }
      setIsAIThinking(false);
    }, 600);
  }, [board, status, turn, isAIThinking, upgrades, opponentUpgrades, aiDifficulty, gameMode, enPassantTarget]);

  useEffect(() => {
    if (gameMode === 'campaign' && status === 'playing' && !roundEndingRef.current && turn === 'black') {
      executeAIMovement();
    }
  }, [turn, executeAIMovement, gameMode, status]);

  const getTurnLabel = () => {
    if (gameMode === 'online') {
      const isMyTurn = turn === mpColor;
      const colorLabel = turn === 'white' ? '(W)' : '(B)';
      return isMyTurn ? `YOUR TURN ${colorLabel}` : `${mpOppName.toUpperCase()}'S TURN ${colorLabel}`;
    }
    if (gameMode === 'campaign') return turn === 'white' ? 'P1 (W) TURN' : 'AI THINKING (B)';
    return turn === 'white' ? ('P1 (W) TURN') : (gameMode === 'pvp' ? 'P2 (B) TURN' : 'AI (B) TURN');
  };

  const value: GameContextValue = {
    level, setLevel, matchTarget, setMatchTarget, gameMode, setGameMode,
    theme, setTheme, aiDifficulty, setAiDifficulty, upgradePriority, setUpgradePriority, clockMode, setClockMode,
    mpSocket, setMpSocket, mpColor, setMpColor, mpRoomCode, setMpRoomCode,
    mpOppName, setMpOppName, mpPlayerName, setMpPlayerName,
    board, setBoard, turn, setTurn, selectedPos, setSelectedPos,
    validMoves, setValidMoves, explodedCells, setExplodedCells,
    enPassantTarget, setEnPassantTarget, flameSquares, setFlameSquares,
    capturedByWhite, setCapturedByWhite, capturedByBlack, setCapturedByBlack,
    moveHistory, setMoveHistory, crumblingColor, setCrumblingColor,
    whiteTime, setWhiteTime, blackTime, setBlackTime,
    status, setStatus, playerScore, setPlayerScore, opponentScore, setOpponentScore,
    upgrades, setUpgrades, opponentUpgrades, setOpponentUpgrades,
    roundCounter, setRoundCounter, roundStartColor, setRoundStartColor, isAIThinking,
    upgradeChoices, setUpgradeChoices, roundWinner, setRoundWinner,
    aiSelectedBoon, setAiSelectedBoon, loserChosenId, setLoserChosenId,
    oppProceeded, setOppProceeded, pendingCombo, setPendingCombo,
    comboOpponentProceeded, setComboOpponentProceeded, postComboActionRef,
    syncState, activeTab, setActiveTab,
    getTurnLabel, handleCellClick, startNewMatch, proceedToUpgradeFlow,
    handleUpgradeSelect, handleWinnerUpgradeSelect, endRound, handleRemoteState,
    opponentTempDisconnected, setOpponentTempDisconnected, disconnectCountdown,
    setDisconnectCountdown, opponentLeft, setOpponentLeft, rematchProposal, setRematchProposal,
    rematchDeclined, setRematchDeclined, isPreloading, setIsPreloading,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside GameProvider');
  return ctx;
}