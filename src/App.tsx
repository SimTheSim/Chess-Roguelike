import { useState, useEffect, useCallback, useRef } from 'react';
import { ChessBoard } from './components/ChessBoard';
import { UpgradeScreen } from './components/UpgradeScreen';
import { ALL_UPGRADES, getRandomUpgrades } from './upgrades';
import {
  createInitialBoard,
  getValidMoves,
  executeMove,
  getAIMove,
  getOpponentCampaignBoons,
  getLevelName
} from './chessLogic';
import { Board, Position, Piece } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { BoonIcon } from './components/BoonIcon';
import { MultiplayerLobby, useMultiplayerSync } from './components/MultiplayerLobby';
import type { Socket } from 'socket.io-client';

export default function App() {
  const [level, setLevel] = useState<number>(1);
  const [matchTarget, setMatchTarget] = useState<number>(5);
  const [gameMode, setGameMode] = useState<'campaign' | 'pvp' | 'online'>('campaign');

  const [mpSocket, setMpSocket] = useState<Socket | null>(null);
  const [mpColor, setMpColor] = useState<'white' | 'black'>('white');
  const [mpRoomCode, setMpRoomCode] = useState('');
  const [mpOppName, setMpOppName] = useState('');
  const [showLobby, setShowLobby] = useState(false);
  const [mpPlayerName, setMpPlayerName] = useState('');
  const [theme, setTheme] = useState<'classic' | 'retro-green' | 'retro-cyber'>('classic');
  const [aiDifficulty, setAiDifficulty] = useState<number>(3);
  const [activeTab, setActiveTab] = useState<'setup' | 'settings'>('setup');
  const [upgradePriority, setUpgradePriority] = useState<'loser-only' | 'loser-then-winner'>('loser-only');

  const [playerScore, setPlayerScore] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);
  const [upgrades, setUpgrades] = useState<string[]>([]);
  const [opponentUpgrades, setOpponentUpgrades] = useState<string[]>([]);
  const [roundCounter, setRoundCounter] = useState<number>(1);
  const [roundStartColor, setRoundStartColor] = useState<'white' | 'black'>('white');

  const [board, setBoard] = useState<Board>(() => createInitialBoard(1, [], []));
  const [turn, setTurn] = useState<'white' | 'black'>('white');
  const [selectedPos, setSelectedPos] = useState<Position | null>(null);
  const [validMoves, setValidMoves] = useState<Position[]>([]);
  const [explodedCells, setExplodedCells] = useState<Position[]>([]);
  const [enPassantTarget, setEnPassantTarget] = useState<Position | null>(null);
  const [isAIThinking, setIsAIThinking] = useState<boolean>(false);
  const [capturedByWhite, setCapturedByWhite] = useState<Piece[]>([]);
  const [capturedByBlack, setCapturedByBlack] = useState<Piece[]>([]);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [crumblingColor, setCrumblingColor] = useState<'white' | 'black' | null>(null);

  const [status, setStatus] = useState<
    'start' | 'playing' | 'round-end-notifying' | 'waiting-for-opponent-proceed' | 'upgrading-white' | 'upgrading-black' | 'match-won' | 'match-lost' | 'waiting-for-opponent-upgrade' | 'upgrading-winner-white' | 'upgrading-winner-black'
  >('start');

  const roundEndingRef = useRef(false);

  const stateRef = useRef({ playerScore, opponentScore, matchTarget, gameMode, mpColor, upgrades, opponentUpgrades, upgradePriority });
  useEffect(() => {
    stateRef.current = { playerScore, opponentScore, matchTarget, gameMode, mpColor, upgrades, opponentUpgrades, upgradePriority };
  }, [playerScore, opponentScore, matchTarget, gameMode, mpColor, upgrades, opponentUpgrades, upgradePriority]);

  const [upgradeChoices, setUpgradeChoices] = useState<any[]>([]);
  const [roundWinner, setRoundWinner] = useState<'white' | 'black' | null>(null);
  const [aiSelectedBoon, setAiSelectedBoon] = useState<any | null>(null);
  const [loserChosenId, setLoserChosenId] = useState<string | null>(null);
  const [oppProceeded, setOppProceeded] = useState(false);

  const handleRemoteState = useCallback((state: any) => {
    if (!state) return;

    const data = state.state ? state.state : state;

    if (data.board) setBoard(data.board);
    if (data.turn) setTurn(data.turn);
    if (data.upgrades) setUpgrades(data.upgrades);
    if (data.opponentUpgrades) setOpponentUpgrades(data.opponentUpgrades);
    if (data.enPassantTarget !== undefined) setEnPassantTarget(data.enPassantTarget);
    if (data.capturedByWhite) setCapturedByWhite(data.capturedByWhite);
    if (data.capturedByBlack) setCapturedByBlack(data.capturedByBlack);
    if (data.moveHistory) setMoveHistory(data.moveHistory);
    if (data.playerScore !== undefined) setPlayerScore(data.playerScore);
    if (data.opponentScore !== undefined) setOpponentScore(data.opponentScore);
    if (data.roundCounter !== undefined) setRoundCounter(data.roundCounter);

    if (data.roundStartColor) {
      setRoundStartColor(data.roundStartColor);
    }

    if (data.upgradeChoices) {
      setUpgradeChoices(data.upgradeChoices);
    }

    if (data.loserChosenId !== undefined) {
      setLoserChosenId(data.loserChosenId);
    }

    if (data.proceeded !== undefined) {
      setOppProceeded(data.proceeded);
    }

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
      if (data.status === 'upgrading-winner-white' || data.status === 'upgrading-winner-black') {
        if (data.winnerChoices) setUpgradeChoices(data.winnerChoices);
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

  const setupNextRound = (
    stageLvl: number,
    whiteBoons: string[],
    blackBoons: string[],
    startColor: 'white' | 'black'
  ) => {
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
    setMoveHistory([]);
    setIsAIThinking(false);
    setCrumblingColor(null);
  };

  const startNewMatch = () => {
    setPlayerScore(0);
    setOpponentScore(0);
    setUpgrades([]);
    setRoundCounter(1);

    const initialOppBoons = gameMode === 'campaign' ? getOpponentCampaignBoons(1) : [];
    setOpponentUpgrades(initialOppBoons);
    setLevel(1);

    setupNextRound(1, [], initialOppBoons, 'white');
    setStatus('playing');
  };

  const checkKingCaptured = (boardState: Board): 'white' | 'black' | null => {
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

  const getMoveNotation = (piece: Piece, from: Position, to: Position, isCapture: boolean) => {
    const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    const toCell = `${cols[to.c]}${ranks[to.r]}`;
    const fromFile = cols[from.c];

    if (piece.type === 'pawn') {
      return isCapture ? `${fromFile}x${toCell}` : toCell;
    }

    const pieceLetters: Record<string, string> = {
      king: 'K', queen: 'Q', rook: 'R', bishop: 'B', knight: 'N'
    };
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

    const localWon = s.gameMode === 'online'
      ? winner === s.mpColor
      : winner === 'white';

    if (localWon) {
      nextPlayerScore += 1;
      setPlayerScore(nextPlayerScore);
    } else {
      nextOpponentScore += 1;
      setOpponentScore(nextOpponentScore);
    }

    if (nextPlayerScore >= s.matchTarget) {
      setStatus('match-won');
      return;
    }
    if (nextOpponentScore >= s.matchTarget) {
      setStatus('match-lost');
      return;
    }

    const allUpgrades = [...s.upgrades, ...s.opponentUpgrades];

    if (s.gameMode === 'online') {
      const loserColor = winner === 'white' ? 'black' : 'white';
      setOppProceeded(false);
      if (s.mpColor === loserColor) {
        const choices = getRandomUpgrades(allUpgrades, allUpgrades);
        setUpgradeChoices(choices);
        setStatus('round-end-notifying');
        syncState({
          roundCounter: s.roundCounter,
          upgradeChoices: choices,
          roundWinner: winner,
        });
      } else {
        setStatus('round-end-notifying');
      }
      return;
    }

    const isWhiteLoser = winner === 'black';

    if (isWhiteLoser) {
      setUpgradeChoices(getRandomUpgrades(allUpgrades, allUpgrades));
      setStatus('round-end-notifying');
    } else {
      const choices = getRandomUpgrades(allUpgrades, allUpgrades);
      setUpgradeChoices(choices);
      if (s.gameMode === 'campaign') {
        if (choices.length > 0) {
          setAiSelectedBoon(choices[0]);
        } else {
          setAiSelectedBoon(null);
        }
      }
      setStatus('round-end-notifying');
    }
  };

  const proceedToUpgradeFlow = () => {
    if (gameMode === 'online') {
      const loserColor = roundWinner === 'white' ? 'black' : 'white';
      const isLoser = mpColor === loserColor;
      
      if (isLoser) {
        setStatus(mpColor === 'white' ? 'upgrading-white' : 'upgrading-black');
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
        const nextOppBoons = aiSelectedBoon
          ? [...opponentUpgrades, aiSelectedBoon.id]
          : opponentUpgrades;
        setOpponentUpgrades(nextOppBoons);

        if (upgradePriority === 'loser-then-winner') {
          setLoserChosenId(aiSelectedBoon?.id ?? null);
          setStatus('upgrading-winner-white');
          return;
        }

        const nextLvl = level + 1;
        setLevel(nextLvl);
        const nextRound = roundCounter + 1;
        setRoundCounter(nextRound);
        const nextStartColor = roundStartColor === 'white' ? 'black' : 'white';
        setupNextRound(nextLvl, upgrades, nextOppBoons, nextStartColor);
        setStatus('playing');
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
        syncState({
          upgrades: playerSide === 'white' ? nextWhiteUpgrades : upgrades,
          opponentUpgrades: playerSide === 'black' ? nextBlackUpgrades : opponentUpgrades,
          status: winnerSide === 'white' ? 'upgrading-winner-white' : 'upgrading-winner-black',
          winnerChoices: upgradeChoices.filter(u => u.id !== upgradeId),
          loserChosenId: upgradeId,
        });
        
        setUpgradeChoices(upgradeChoices);
        setLoserChosenId(upgradeId);
        setStatus('waiting-for-opponent-upgrade');
        return;
      }
      
      const nextLvl = 1;
      const nextRound = roundCounter + 1;
      const nextStartColor = roundStartColor === 'white' ? 'black' : 'white';
      const newBoard = createInitialBoard(nextLvl, nextWhiteUpgrades, nextBlackUpgrades);
      setStatus('playing');
      syncState({
        board: newBoard,
        turn: nextStartColor,
        roundStartColor: nextStartColor,
        upgrades: nextWhiteUpgrades,
        opponentUpgrades: nextBlackUpgrades,
        enPassantTarget: null,
        capturedByWhite: [],
        capturedByBlack: [],
        moveHistory: [],
        playerScore: opponentScore,
        opponentScore: playerScore,
        status: 'playing',
        roundCounter: nextRound,
        loserChosenId: null,
      });
      return;
    }

    const nextLvl = gameMode === 'campaign' ? level + 1 : 1;
    if (gameMode === 'campaign') setLevel(nextLvl);
    const nextRound = roundCounter + 1;
    setRoundCounter(nextRound);
    const nextStartColor = roundStartColor === 'white' ? 'black' : 'white';

    setupNextRound(nextLvl, nextWhiteUpgrades, nextBlackUpgrades, nextStartColor);
    setStatus('playing');
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

    setupNextRound(nextLvl, nextWhiteUpgrades, nextBlackUpgrades, nextStartColor);
    setLoserChosenId(null);
    setStatus('playing');

    if (gameMode === 'online') {
      const newBoard = createInitialBoard(nextLvl, nextWhiteUpgrades, nextBlackUpgrades);
      syncState({
        board: newBoard,
        turn: nextStartColor,
        roundStartColor: nextStartColor,
        upgrades: nextWhiteUpgrades,
        opponentUpgrades: nextBlackUpgrades,
        enPassantTarget: null,
        capturedByWhite: [],
        capturedByBlack: [],
        moveHistory: [],
        playerScore: opponentScore,
        opponentScore: playerScore,
        status: 'playing',
        roundCounter: nextRound,
        loserChosenId: null,
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
          board,
          selectedPos,
          { r, c },
          upgrades,
          opponentUpgrades,
          enPassantTarget
        );

        if (captured) {
          if (turn === 'white') {
            setCapturedByWhite(prev => [...prev, captured]);
          } else {
            setCapturedByBlack(prev => [...prev, captured]);
          }
        }

        if (exploded.length > 0) {
          setExplodedCells(exploded);
          setTimeout(() => setExplodedCells([]), 800);
        }

        setEnPassantTarget(nextEnPassantTarget);
        setBoard(nextBoard);
        setSelectedPos(null);
        setValidMoves([]);

        const newCapturedByWhite = turn === 'white' && captured ? [...capturedByWhite, captured] : capturedByWhite;
        const newCapturedByBlack = turn === 'black' && captured ? [...capturedByBlack, captured] : capturedByBlack;
        const newMoveHistory = movingPiece ? [note, ...moveHistory] : moveHistory;
        setMoveHistory(newMoveHistory);
        const nextTurn = turn === 'white' ? 'black' : 'white';

        const victorColor = checkKingCaptured(nextBoard);
        if (victorColor) {
          const loserColor = victorColor === 'white' ? 'black' : 'white';
          setCrumblingColor(loserColor);
          if (gameMode === 'online') {
            syncState({
              board: nextBoard, turn: nextTurn,
              roundStartColor,
              upgrades,
              opponentUpgrades,
              enPassantTarget: nextEnPassantTarget,
              capturedByWhite: newCapturedByWhite, capturedByBlack: newCapturedByBlack,
              moveHistory: newMoveHistory, playerScore: opponentScore, opponentScore: playerScore, status, roundCounter,
              roundOver: victorColor,
            });
          }
          setTimeout(() => {
            setCrumblingColor(null);
            endRound(victorColor);
          }, 1500);
          return;
        }

        setTurn(nextTurn);

        if (gameMode === 'online') {
          syncState({
            board: nextBoard, turn: nextTurn,
            roundStartColor,
            upgrades,
            opponentUpgrades,
            enPassantTarget: nextEnPassantTarget,
            capturedByWhite: newCapturedByWhite, capturedByBlack: newCapturedByBlack,
            moveHistory: newMoveHistory, playerScore: opponentScore, opponentScore: playerScore, status, roundCounter,
          });
        }
        return;
      }
    }

    if (piece && piece.color === turn) {
      setSelectedPos({ r, c });
      setValidMoves(getValidMoves(board, { r, c }, upgrades, opponentUpgrades, enPassantTarget));
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
      if (!aiMove) {
        setIsAIThinking(false);
        setTurn('white');
        return;
      }

      setExplodedCells([]);
      const aiPiece = board[aiMove.from.r][aiMove.from.c];
      if (aiPiece) {
        const destPiece = board[aiMove.to.r][aiMove.to.c];
        const isCapture = destPiece !== null;
        const note = getMoveNotation(aiPiece, aiMove.from, aiMove.to, isCapture);
        setMoveHistory(prev => [note, ...prev]);
      }

      const { nextBoard, captured, exploded, nextEnPassantTarget } = executeMove(
        board,
        aiMove.from,
        aiMove.to,
        upgrades,
        opponentUpgrades,
        enPassantTarget
      );

      if (captured) {
        setCapturedByBlack(prev => [...prev, captured]);
      }

      if (exploded.length > 0) {
        setExplodedCells(exploded);
        setTimeout(() => setExplodedCells([]), 800);
      }

      setEnPassantTarget(nextEnPassantTarget);
      setBoard(nextBoard);

      const victorColor = checkKingCaptured(nextBoard);
      if (victorColor) {
        const loserColor = victorColor === 'white' ? 'black' : 'white';
        setCrumblingColor(loserColor);
        setTimeout(() => {
          setCrumblingColor(null);
          endRound(victorColor);
        }, 1500);
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

  const PieceIcon = ({ type, className }: { type: string; className?: string }) => {
    const paths: Record<string, string> = {
      pawn: `<path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"/>`,
      knight: `<g fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"/><path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3"/></g>`,
      bishop: `<g fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.94 3-2 3-2z"/><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"/><path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/></g>`,
      rook: `<g fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path stroke-linecap="butt" d="M9 39h27v-3H9zm3-3v-4h21v4zm-1-22V9h4v2h5V9h5v2h5V9h4v5"/><path d="m34 14-3 3H14l-3-3"/><path stroke-linecap="butt" stroke-linejoin="miter" d="M31 17v12.5H14V17"/><path d="m31 29.5 1.5 2.5h-20l1.5-2.5"/></g>`,
      queen: `<g fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0m16.5-4.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0M41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0M16 8.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0M33 9a2 2 0 1 1-4 0 2 2 0 1 1 4 0"/><path stroke-linecap="butt" d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-14V25L7 14z"/><path stroke-linecap="butt" d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z"/></g>`,
      king: `<g fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path stroke-linejoin="miter" d="M22.5 11.63V6M20 8h5"/><path stroke-linecap="butt" stroke-linejoin="miter" d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"/><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-3.5-7.5-13-10.5-16-4-3 6 5 10 5 10z"/><path fill="none" d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0"/></g>`,
    };
    const inner = paths[type] ?? paths.pawn;
    return (
      <svg viewBox="0 0 45 45" className={className ?? 'w-4 h-4'} xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: inner }} />
    );
  };

  const getTurnLabel = () => {
    if (gameMode === 'online') {
      const isMyTurn = turn === mpColor;
      const colorLabel = turn === 'white' ? '(W)' : '(B)';
      return isMyTurn ? `YOUR TURN ${colorLabel}` : `${mpOppName.toUpperCase()}'S TURN ${colorLabel}`;
    }
    if (gameMode === 'campaign') {
      return turn === 'white' ? 'ALPHA (W) TURN' : 'AI SYSTEM THINKING (B)';
    }
    return turn === 'white' ? (gameMode === 'pvp' ? 'P1 (W) TURN' : 'ALPHA (W) TURN') : (gameMode === 'pvp' ? 'P2 (B) TURN' : 'BETA (B) TURN');
  };

  const BoonTooltipList = ({ boonIds, color }: { boonIds: string[]; color: 'emerald' | 'pink' }) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
      <div className="space-y-1.5 mt-2 max-h-[140px] overflow-y-auto pr-1">
        {boonIds.map(uid => {
          const orig = ALL_UPGRADES.find(u => u.id === uid);
          if (!orig) return null;
          const isHovered = hoveredId === uid;
          return (
            <div
              key={uid}
              className={`relative p-1.5 border flex items-center gap-2 cursor-default ${color === 'emerald' ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-850 bg-[#090909]'}`}
              onMouseEnter={() => setHoveredId(uid)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={`w-4 h-4 bg-black flex items-center justify-center shrink-0 ${color === 'emerald' ? 'border border-zinc-700' : 'border border-zinc-800'}`}>
                <BoonIcon iconName={orig.icon} className={`w-2.5 h-2.5 ${color === 'emerald' ? 'text-zinc-300' : 'text-pink-500/80'}`} />
              </div>
              <span className={`text-[7.5px] truncate ${color === 'emerald' ? 'text-zinc-300' : 'text-pink-400'}`}>{orig.name}</span>
              {isHovered && (
                <div
                  className="fixed z-[100] w-48 p-2 bg-zinc-900 border border-zinc-600 text-[7.5px] text-zinc-300 leading-relaxed shadow-lg pointer-events-none"
                  style={{ marginLeft: '200px', transform: 'translateY(-50%)' }}
                >
                  <p className={`font-bold mb-1 ${color === 'emerald' ? 'text-zinc-100' : 'text-pink-300'}`}>{orig.name}</p>
                  <p>{orig.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`min-h-screen text-zinc-300 flex flex-col font-mono select-none transition-colors duration-300
      ${theme === 'classic' ? 'bg-[#050505]' : ''}
      ${theme === 'retro-green' ? 'bg-[#010903]' : ''}
      ${theme === 'retro-cyber' ? 'bg-[#080210]' : ''}
    `} id="main-view">

      <header className={`h-16 flex items-center justify-between px-6 border-b-4 font-pixel select-none
        ${theme === 'classic' ? 'bg-black border-zinc-800' : ''}
        ${theme === 'retro-green' ? 'bg-black border-green-950 text-green-400' : ''}
        ${theme === 'retro-cyber' ? 'bg-[#020617] border-indigo-950 text-sky-400' : ''}
      `} id="page-header">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 45 45" className={`w-5 h-5 ${theme === 'retro-green' ? 'text-green-500' : theme === 'retro-cyber' ? 'text-pink-500' : 'text-emerald-400'}`} xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: `<path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"/>` }} />
          <h1 className="text-[10px] uppercase tracking-tight font-bold text-white font-pixel">
            VOID CHESS
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[7.5px] uppercase opacity-60">MODE:</span>
            <span className="text-[8.5px] font-bold text-white uppercase">{gameMode}</span>
          </div>
          {status !== 'start' && (
            <button
              onClick={() => setStatus('start')}
              className={`border-2 px-3 py-1 text-[8px] font-pixel transition-all cursor-pointer
                ${theme === 'classic' ? 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500' : ''}
                ${theme === 'retro-green' ? 'border-green-800 bg-green-950 text-green-400 hover:border-green-400' : ''}
                ${theme === 'retro-cyber' ? 'border-sky-800 bg-indigo-950 text-sky-300 hover:border-sky-300' : ''}
              `}
              id="exit-game-btn"
            >
              EXIT TO MENU
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 flex flex-col justify-center select-none" id="main-content">
        <AnimatePresence mode="wait">

          {status === 'start' && (
            <motion.div
              key="start-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="text-center py-8 max-w-lg mx-auto w-full flex flex-col items-center"
              id="start-screen"
            >
              <div className="relative mb-5">
                <div className={`p-5 border-4 bg-black inline-block font-pixel text-3xl
                  ${theme === 'classic' ? 'border-white text-emerald-400 shadow-[4px_4px_0px_#4b5563]' : ''}
                  ${theme === 'retro-green' ? 'border-green-500 text-green-400 shadow-[4px_4px_0px_#14532d]' : ''}
                  ${theme === 'retro-cyber' ? 'border-sky-400 text-pink-500 shadow-[4px_4px_0px_#38bdf8]' : ''}
                `}>
                  <svg viewBox="0 0 45 45" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: `<path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"/>` }} />
                </div>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-white uppercase font-pixel">
                VOID CHESS
              </h1>

              <div className="w-full mt-7 border-4 border-zinc-800 bg-black text-left">
                <div className="flex border-b-4 border-zinc-800">
                  <button
                    onClick={() => setActiveTab('setup')}
                    className={`flex-1 py-2 text-[8px] font-pixel cursor-pointer border-r-2 border-zinc-800 ${activeTab === 'setup' ? 'bg-zinc-900 text-white' : 'bg-black text-zinc-600 hover:text-zinc-400'}`}
                  >
                    SETUP
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`flex-1 py-2 text-[8px] font-pixel cursor-pointer ${activeTab === 'settings' ? 'bg-zinc-900 text-white' : 'bg-black text-zinc-600 hover:text-zinc-400'}`}
                  >
                    SETTINGS
                  </button>
                </div>
                {activeTab === 'setup' && (
                  <div className="p-5 flex flex-col gap-4">
                    <div>
                      <span className="text-[8px] font-pixel text-zinc-400 uppercase block mb-2">GAME MODE</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setGameMode('campaign')}
                          className={`flex-1 py-2 border-2 text-[8px] font-pixel cursor-pointer ${gameMode === 'campaign'
                              ? 'bg-emerald-950 border-emerald-400 text-emerald-400 font-bold'
                              : 'bg-black border-zinc-800 text-zinc-500 hover:text-zinc-300'
                            }`}
                        >
                          CAMPAIGN VS AI
                        </button>
                        <button
                          onClick={() => setGameMode('pvp')}
                          className={`flex-1 py-2 border-2 text-[8px] font-pixel cursor-pointer ${gameMode === 'pvp'
                              ? 'bg-emerald-950 border-emerald-400 text-emerald-400 font-bold'
                              : 'bg-black border-zinc-800 text-zinc-400 hover:text-zinc-200'
                            }`}
                        >
                          PvP PASS-N-PLAY
                        </button>
                        <button
                          onClick={() => setGameMode('online')}
                          className={`flex-1 py-2 border-2 text-[8px] font-pixel cursor-pointer ${gameMode === 'online'
                              ? 'bg-emerald-950 border-emerald-400 text-emerald-400 font-bold'
                              : 'bg-black border-zinc-800 text-zinc-400 hover:text-zinc-200'
                            }`}
                        >
                          ONLINE PvP
                        </button>
                      </div>
                    </div>

                    {gameMode === 'campaign' && (
                      <div>
                        <span className="text-[8px] font-pixel text-zinc-400 uppercase block mb-2">AI DIFFICULTY LEVEL</span>
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map(d => (
                            <button
                              key={d}
                              onClick={() => setAiDifficulty(d)}
                              className={`flex-1 py-1 border-2 text-[8.5px] font-pixel cursor-pointer ${aiDifficulty === d
                                  ? 'bg-emerald-950 border-emerald-400 text-emerald-400 font-bold'
                                  : 'bg-zinc-950 border-zinc-800 text-zinc-555'
                                }`}
                            >
                              {d}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {gameMode !== 'online' && (
                      <div>
                        <span className="text-[8px] font-pixel text-zinc-400 uppercase block mb-2">MATCH GOAL (WINS TARGET)</span>
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
                        <div>
                          <span className="text-[8px] font-pixel text-zinc-400 uppercase block mb-2">BOON DRAFT MODE</span>
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
                          <p className="text-[7px] text-zinc-600 mt-1.5 font-pixel">
                            {upgradePriority === 'loser-then-winner' ? 'Loser picks first, winner picks from the 2 remaining.' : 'Only the loser picks a boon each round.'}
                          </p>
                        </div>
                      </div>
                      
                    )}
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="p-5 flex flex-col gap-4">
                    <div>
                      <span className="text-[8px] font-pixel text-zinc-400 uppercase block mb-2">VISUAL SKIN THEMES</span>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => setTheme('classic')}
                          className={`py-2 px-3 border-2 text-left text-[8px] font-pixel cursor-pointer flex justify-between items-center ${theme === 'classic'
                              ? 'bg-zinc-900 border-white text-white font-bold'
                              : 'bg-black border-zinc-800 text-zinc-500'
                            }`}
                        >
                          <span>CLASSIC MONOCHROME</span>
                          <span className="text-[7px] p-0.5 bg-zinc-800 border text-zinc-400">Default B&W</span>
                        </button>
                        <button
                          onClick={() => setTheme('retro-green')}
                          className={`py-2 px-3 border-2 text-left text-[8px] font-pixel cursor-pointer flex justify-between items-center ${theme === 'retro-green'
                              ? 'bg-green-950/20 border-green-500 text-green-400 font-bold'
                              : 'bg-black border-zinc-800 text-zinc-500'
                            }`}
                        >
                          <span>MATRIX CRT DISPLAY</span>
                          <span className="text-[7px] p-0.5 bg-green-950 text-green-400 border border-green-700">GameBoy 1989</span>
                        </button>
                        <button
                          onClick={() => setTheme('retro-cyber')}
                          className={`py-2 px-3 border-2 text-left text-[8px] font-pixel cursor-pointer flex justify-between items-center ${theme === 'retro-cyber'
                              ? 'bg-indigo-950/20 border-sky-400 text-sky-400 font-bold'
                              : 'bg-black border-zinc-800 text-zinc-500'
                            }`}
                        >
                          <span>AMBER & NEON CYBERPUNK</span>
                          <span className="text-[7px] p-0.5 bg-indigo-950 text-sky-400 border border-indigo-700">Futuristic</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => gameMode === 'online' ? setShowLobby(true) : startNewMatch()}
                className={`mt-6 border-4 bg-black font-pixel text-[10px] uppercase py-3.5 px-10 transition-all cursor-pointer select-none
                  ${theme === 'classic' ? 'border-emerald-400 text-emerald-400 hover:bg-emerald-950/40 shadow-[4px_4px_0px_rgba(16,185,129,0.3)]' : ''}
                  ${theme === 'retro-green' ? 'border-green-400 text-green-400 hover:bg-green-950/40 shadow-[4px_4px_0px_rgba(34,197,94,0.3)]' : ''}
                  ${theme === 'retro-cyber' ? 'border-sky-400 text-sky-400 hover:bg-indigo-950/40 shadow-[4px_4px_0px_rgba(56,189,248,0.3)]' : ''}
                `}
                id="start-campaign-btn"
              >
                {gameMode === 'online' ? 'FIND OPPONENT' : 'ENTER ARENA'}
              </button>
            </motion.div>
          )}

          {showLobby && (
            <div className="fixed inset-0 z-50">
              <MultiplayerLobby
                onReady={({ socket, color, roomCode, opponentName, playerName: myName, matchTarget: lobbyTarget, upgradePriority: lobbyPriority }) => {
                  setMpSocket(socket);
                  setMpColor(color);
                  setMpRoomCode(roomCode);
                  setMpOppName(opponentName);
                  setMpPlayerName(myName ?? '');
                  setMatchTarget(lobbyTarget);
                  setUpgradePriority(lobbyPriority);
                  setShowLobby(false);
                  startNewMatch();
                }}
                onBack={() => setShowLobby(false)}
              />
            </div>
          )}

          {status === 'playing' && (
            <motion.div
              key="playing-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full select-none"
              id="playing-screen"
            >
              <aside className={`lg:col-span-3 border-4 p-4 flex flex-col gap-4 font-pixel select-none
                ${theme === 'classic' ? 'border-zinc-800 bg-black' : ''}
                ${theme === 'retro-green' ? 'border-green-950 bg-black text-green-400' : ''}
                ${theme === 'retro-cyber' ? 'border-indigo-950 bg-[#020617] text-sky-300' : ''}
              `} id="dashboard-left">

                <div className="pb-3 border-b border-zinc-800 text-center">
                  <p className="text-[8px] opacity-60 mb-1">SCOREBOARD</p>
                  <p className="text-[10px] text-white font-bold tracking-tight uppercase">ROUND {roundCounter}</p>

                  <div className="flex justify-between items-center mt-3 bg-zinc-950 p-2.5 border-2 border-zinc-850">
                    <div className="text-left">
                      <p className="text-[7.5px] text-emerald-400 font-bold">
                        {gameMode === 'online' ? (mpColor === 'white' ? 'YOU (W)' : `${mpOppName.toUpperCase()} (W)`) : (gameMode === 'pvp' ? 'P1 (W)' : 'ALPHA (W)')}
                      </p>
                      <p className="text-xl font-bold text-white">{playerScore}</p>
                    </div>
                    <div className="text-zinc-650 text-[10px] font-bold">VS</div>
                    <div className="text-right">
                      <p className="text-[7.5px] text-pink-400 font-bold">
                        {gameMode === 'campaign' ? 'AI DREAD (B)' : gameMode === 'online' ? (mpColor === 'black' ? 'YOU (B)' : `${mpOppName.toUpperCase()} (B)`) : (gameMode === 'pvp' ? 'P2 (B)' : 'BETA (B)')}
                      </p>
                      <p className="text-xl font-bold text-white">{opponentScore}</p>
                    </div>
                  </div>
                  <div className="text-[6.5px] opacity-50 mt-1 uppercase">TARGET: FIRST TO {matchTarget} WINS</div>
                </div>

                <div>
                  <p className="text-zinc-500 text-[8px] uppercase">
                    {gameMode === 'online' ? (mpColor === 'white' ? 'YOUR BOONS' : `${mpOppName.toUpperCase()}'S BOONS`) : (gameMode === 'pvp' ? 'P1 BOONS' : 'ALPHA BOONS')} ({upgrades.length})
                  </p>
                  {upgrades.length === 0 ? (
                    <p className="text-zinc-650 text-[8px] italic mt-1">NONE</p>
                  ) : (
                    <BoonTooltipList boonIds={upgrades} color="emerald" />
                  )}
                </div>

                <div className="border-t border-zinc-800 pt-3">
                  <p className="text-zinc-500 text-[8px] uppercase">
                    {gameMode === 'campaign' ? 'AI DREAD BOONS' : gameMode === 'online' ? (mpColor === 'black' ? 'YOUR BOONS' : `${mpOppName.toUpperCase()}'S BOONS`) : (gameMode === 'pvp' ? 'P2 BOONS' : 'BETA BOONS')} ({opponentUpgrades.length})
                  </p>
                  {opponentUpgrades.length === 0 ? (
                    <p className="text-zinc-650 text-[8px] italic mt-1">NONE</p>
                  ) : (
                    <BoonTooltipList boonIds={opponentUpgrades} color="pink" />
                  )}
                </div>
              </aside>

              <div className="lg:col-span-6 flex flex-col items-center justify-center p-1" id="board-center">
                <div className="w-full max-w-[480px] mb-3 p-2 bg-zinc-950 border-2 border-zinc-850 text-center font-pixel flex items-center justify-between px-4">
                  <span className="text-[8px] text-zinc-500 uppercase">ACTIVE ARENA</span>
                  <span className="text-[9px] font-bold tracking-wider text-emerald-400">
                    {getTurnLabel()}
                  </span>
                  <span className="text-[8px] text-zinc-500 uppercase">
                    STAGE {level}
                  </span>
                </div>

                <ChessBoard
                  board={board}
                  selectedPos={selectedPos}
                  validMoves={validMoves}
                  onCellClick={handleCellClick}
                  explodedCells={explodedCells}
                  playerUpgrades={upgrades}
                  opponentUpgrades={opponentUpgrades}
                  theme={theme}
                  crumblingColor={crumblingColor}
                  flipped={gameMode === 'online' && mpColor === 'black'}
                />
              </div>

              <aside className={`lg:col-span-3 border-4 p-4 flex flex-col gap-4 font-pixel select-none
                ${theme === 'classic' ? 'border-zinc-800 bg-black' : ''}
                ${theme === 'retro-green' ? 'border-green-950 bg-black text-green-400' : ''}
                ${theme === 'retro-cyber' ? 'border-indigo-950 bg-[#020617] text-sky-455' : ''}
              `} id="dashboard-right">

                <div>
                  <p className="text-zinc-500 text-[8px] uppercase mb-2">HISTORY LEDGER</p>
                  <div className="h-[120px] bg-zinc-950 border-2 border-zinc-850 p-2 overflow-y-auto font-mono text-[9px] space-y-1 text-emerald-400 select-all pr-1">
                    {moveHistory.length === 0 ? (
                      <p className="text-zinc-650 italic text-[8px] font-pixel">GRID IDLE</p>
                    ) : (
                      moveHistory.map((h, i) => (
                        <p key={i}>
                          &gt; {h}
                        </p>
                      ))
                    )}
                  </div>
                </div>

                <div className="border-t border-zinc-800 pt-3">
                  <p className="text-zinc-500 text-[8px] uppercase mb-2">GRAVEYARD</p>
                  <div className="space-y-2 text-zinc-400">
                    <div className="p-2 bg-[#090909] border border-zinc-850">
                      <span className="text-emerald-400 text-[7px] block uppercase mb-1">
                        {gameMode === 'online' ? (mpColor === 'white' ? (mpPlayerName || 'YOU') : mpOppName).toUpperCase() : (gameMode === 'pvp' ? 'P1' : 'ALPHA')} ELIMINATED:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1 text-sm font-sans leading-none">
                        {capturedByWhite.length === 0 ? (
                          <span className="text-zinc-650 text-[7px] font-pixel">NONE</span>
                        ) : (
                          capturedByWhite.map((pt, i) => (
                            <span key={i} title={pt.type}>
                              <PieceIcon type={pt.type} className="w-3.5 h-3.5 text-emerald-400 inline-block" />
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                    <div className="p-2 bg-[#090909] border border-zinc-850">
                      <span className="text-rose-500 text-[7px] block uppercase mb-1">
                        {gameMode === 'online' ? (mpColor === 'black' ? (mpPlayerName || 'YOU') : mpOppName).toUpperCase() : (gameMode === 'pvp' ? 'P2' : 'AI DREAD')} ELIMINATED:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1 text-sm font-sans leading-none">
                        {capturedByBlack.length === 0 ? (
                          <span className="text-zinc-650 text-[7px] font-pixel">NONE</span>
                        ) : (
                          capturedByBlack.map((pt, i) => (
                            <span key={i} title={pt.type}>
                              <PieceIcon type={pt.type} className="w-3.5 h-3.5 text-rose-500 inline-block" />
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </motion.div>
          )}

          {status === 'round-end-notifying' && (
            <motion.div
              key="round-end-overlay"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-10 max-w-md mx-auto border-4 border-zinc-800 bg-black p-6 font-pixel select-none"
              id="round-end-announcement"
            >
              <div className="p-4 border-4 border-yellow-400 bg-black inline-block mb-4 text-yellow-400 text-3xl">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-yellow-400 fill-current" xmlns="http://www.w3.org/2000/svg"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
              </div>

              <h2 className="text-sm font-bold text-white uppercase tracking-tight">
                {roundWinner === 'white' && (gameMode === 'online' ? (mpColor === 'white' ? 'ROUND WON BY YOU!' : `ROUND WON BY ${mpOppName.toUpperCase()}!`) : (gameMode === 'pvp' ? 'ROUND WON BY P1!' : 'ROUND WON BY ALPHA!'))}
                {roundWinner === 'black' && (gameMode === 'online' ? (mpColor === 'black' ? 'ROUND WON BY YOU!' : `ROUND WON BY ${mpOppName.toUpperCase()}!`) : (gameMode === 'pvp' ? 'ROUND WON BY P2!' : 'ROUND WON BY BETA!'))}
              </h2>

              <div className="mt-4 p-3 bg-zinc-950 border border-zinc-850 text-left">
                <p className="text-[8px] text-zinc-400 leading-normal uppercase text-center font-pixel">
                  CURRENT MATCH SCORE:
                </p>
                <p className="text-xs text-center text-white font-bold mt-1">
                  {gameMode === 'online' ? 'YOU' : 'P1'}: {playerScore} | {gameMode === 'online' ? mpOppName.toUpperCase() : (gameMode === 'pvp' ? 'P2' : 'AI')}: {opponentScore}
                </p>
              </div>

              <button
                onClick={proceedToUpgradeFlow}
                className="mt-6 border-4 border-emerald-400 bg-zinc-950 text-emerald-400 hover:bg-emerald-950 w-full font-pixel text-[8.5px] uppercase py-2.5 shadow-[4px_4px_0px_#10b981] transition-all cursor-pointer"
              >
                PROCEED
              </button>
            </motion.div>
          )}

          {status === 'upgrading-white' && (
            <UpgradeScreen
              choices={upgradeChoices}
              onSelectUpgrade={(id) => handleUpgradeSelect(id, 'white')}
              level={roundCounter + 1}
              playerName={gameMode === 'online' ? (mpColor === 'white' ? 'YOU' : mpOppName) : 'P1'}
            />
          )}

          {status === 'upgrading-black' && (
            <UpgradeScreen
              choices={upgradeChoices}
              onSelectUpgrade={(id) => handleUpgradeSelect(id, 'black')}
              level={roundCounter + 1}
              playerName={gameMode === 'online' ? (mpColor === 'black' ? 'YOU' : mpOppName) : (gameMode === 'pvp' ? 'P2' : 'AI')}
            />
          )}

          {status === 'upgrading-winner-white' && (
            <UpgradeScreen
              choices={gameMode === 'campaign' ? upgradeChoices.filter(c => c.id !== loserChosenId) : upgradeChoices}
              onSelectUpgrade={(id) => handleWinnerUpgradeSelect(id, 'white')}
              level={roundCounter + 1}
              playerName={gameMode === 'online' ? (mpColor === 'white' ? 'YOU' : `${mpOppName.toUpperCase()}`) : (gameMode === 'pvp' ? 'P1 ' : 'P2')}
              pickedId={gameMode === 'campaign' ? null : loserChosenId}
            />
          )}

          {status === 'upgrading-winner-black' && (
            <UpgradeScreen
              choices={upgradeChoices}
              onSelectUpgrade={(id) => handleWinnerUpgradeSelect(id, 'black')}
              level={roundCounter + 1}
              playerName={gameMode === 'online' ? (mpColor === 'black' ? 'YOU' : `${mpOppName.toUpperCase()}`) : (gameMode === 'pvp' ? 'P2 ' : 'AI')}
              pickedId={loserChosenId}
            />
          )}

          {status === 'waiting-for-opponent-proceed' && (
            <div className="text-center py-10 max-w-2xl mx-auto border-4 border-zinc-850 bg-black p-6 font-pixel">
              <p className="text-emerald-400 text-xs uppercase tracking-wider animate-pulse mb-6">
                WAITING FOR OPPONENT TO PROCEED...
              </p>
            </div>
          )}

          {status === 'waiting-for-opponent-upgrade' && (
            <div className="text-center py-10 max-w-2xl mx-auto border-4 border-zinc-850 bg-black p-6 font-pixel">
              <p className="text-emerald-400 text-xs uppercase tracking-wider animate-pulse mb-6">
                {gameMode === 'online' ? 'OPPONENT IS CHOOSING AN ARTIFACT...' : 'Waiting for opponent to select their artifact...'}
              </p>
              {gameMode === 'online' && upgradeChoices.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {upgradeChoices.map((upgrade) => {
                    const isPickedByLoser = upgrade.id === loserChosenId;
                    return (
                      <div
                        key={upgrade.id}
                        className={`border-2 p-4 flex flex-col items-center relative opacity-60 ${
                          isPickedByLoser ? 'border-red-900 bg-zinc-950 line-through' : 'border-zinc-800 bg-zinc-950'
                        }`}
                      >
                        {isPickedByLoser && (
                          <div className="absolute inset-0 flex items-center justify-center z-10">
                            <span className="bg-red-600 text-white text-[8px] font-bold px-2 py-0.5 uppercase tracking-wider transform -rotate-12 border border-black shadow">CLAIMED BY LOSER</span>
                          </div>
                        )}
                        <div className="w-12 h-12 bg-black border border-zinc-700 flex items-center justify-center mb-3">
                          <BoonIcon iconName={upgrade.icon} upgradeId={upgrade.id} className="w-6 h-6 text-zinc-400" />
                        </div>
                        <p className="text-[10px] font-bold text-white uppercase text-center">{upgrade.name}</p>
                        <p className="text-[7.5px] text-zinc-400 mt-2 leading-relaxed text-center">{upgrade.description}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {status === 'match-won' && (
            <motion.div
              key="match-won-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 max-w-sm mx-auto select-none font-pixel"
              id="match-won-screen"
            >
              <div className="p-4 border-4 border-yellow-400 bg-black inline-block mb-6 text-yellow-455 text-4xl shadow-[4px_4px_0px_#10b981]">
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-yellow-400 fill-current" xmlns="http://www.w3.org/2000/svg"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
              </div>

              <h1 className="text-lg font-bold text-white uppercase tracking-tight">CHALLENGE CONQUERED</h1>
              <p className="text-zinc-500 mt-2 text-[8px] uppercase">
                ACHIEVED ABSOLUTE MATCH VICTORY
              </p>

              <div className="mt-6 p-4 bg-zinc-950 border-2 border-zinc-850 text-left">
                <span className="text-[7px] block uppercase text-zinc-500 mb-1">MATCH SCORECARD</span>
                <p className="text-xs text-white font-bold mb-1">{gameMode === 'pvp' ? 'P1' : 'P1'} (PLAYER): {playerScore}</p>
                <p className="text-xs text-white font-bold">{gameMode === 'pvp' ? 'P2' : 'AI'}: {opponentScore}</p>
              </div>

              <button
                onClick={() => setStatus('start')}
                className="mt-8 border-4 border-emerald-400 bg-black hover:bg-emerald-950 text-emerald-400 text-xs uppercase py-3.5 px-8 shadow-[4px_4px_0px_#10b981] transition-all cursor-pointer w-full"
              >
                RETURN TO SETUP
              </button>
            </motion.div>
          )}

          {status === 'match-lost' && (
            <motion.div
              key="match-lost-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 max-w-sm mx-auto select-none font-pixel animate-pulse"
              id="match-lost-screen"
            >
              <div className="p-4 border-4 border-rose-500 bg-black inline-block mb-6 text-rose-500 text-4xl shadow-[4px_4px_0px_rgba(239,68,68,0.2)]">
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-rose-500 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a9 9 0 0 0-9 9c0 3.35 1.84 6.29 4.58 7.86L7 21h10l-.58-2.14A9 9 0 0 0 12 2zm-3 9a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zM9 17v-1h2v1H9zm4 0v-1h2v1h-2z"/></svg>
              </div>

              <h1 className="text-lg font-bold text-white uppercase tracking-tight">RUN DEFEATED</h1>
              <p className="text-zinc-[500] mt-2 text-[8px] uppercase">
                THE DEFIANT FORCE CRUMBLED
              </p>

              <div className="mt-6 p-4 bg-zinc-950 border-2 border-zinc-850 text-left">
                <span className="text-[7.5px] block uppercase text-zinc-500 mb-1">MATCH SCORECARD</span>
                <p className="text-xs text-white font-bold mb-1">{gameMode === 'pvp' ? 'P1' : 'ALPHA'} (PLAYER): {playerScore}</p>
                <p className="text-xs text-white font-bold">{gameMode === 'pvp' ? 'P2' : 'OPPOSITION'}: {opponentScore}</p>
              </div>

              <button
                onClick={() => setStatus('start')}
                className="mt-8 border-4 border-rose-500 bg-black hover:bg-rose-950 text-rose-500 text-xs uppercase py-3.5 px-8 shadow-[4px_4px_0px_rgba(239,68,68,0.4)] transition-all cursor-pointer w-full"
              >
                TRY AGAIN
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}