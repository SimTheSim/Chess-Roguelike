import { Board, Position } from '../../types';
import { getValidMoves } from '../moveGen';
import { executeMove } from '../execution/executeMove';
import { evaluateBoard, PIECE_VALUES_SIMPLE } from './evaluate';

function getAllMoves(
  board: Board,
  color: 'white' | 'black',
  playerUpgrades: string[],
  opponentUpgrades: string[]
): { from: Position; to: Position }[] {
  const list: { from: Position; to: Position }[] = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p && p.color === color) {
        for (const to of getValidMoves(board, { r, c }, playerUpgrades, opponentUpgrades)) {
          list.push({ from: { r, c }, to });
        }
      }
    }
  }
  return list;
}

function sortByCapture(
  moves: { from: Position; to: Position }[],
  board: Board
): { from: Position; to: Position }[] {
  return [...moves].sort((a, b) => {
    const va = board[a.to.r][a.to.c] ? PIECE_VALUES_SIMPLE[board[a.to.r][a.to.c]!.type] : 0;
    const vb = board[b.to.r][b.to.c] ? PIECE_VALUES_SIMPLE[board[b.to.r][b.to.c]!.type] : 0;
    return vb - va;
  });
}

function kingCaptured(board: Board): 'white' | 'black' | null {
  let w = false, b = false;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p?.type === 'king') { if (p.color === 'white') w = true; else b = true; }
    }
  }
  if (!w) return 'black';
  if (!b) return 'white';
  return null;
}

function minimax(
  board: Board,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean,
  playerUpgrades: string[],
  opponentUpgrades: string[]
): number {
  const victor = kingCaptured(board);
  if (victor === 'black') return 999999 + depth;
  if (victor === 'white') return -999999 - depth;
  if (depth === 0) return evaluateBoard(board, playerUpgrades, opponentUpgrades);

  const color = isMaximizing ? 'black' : 'white';
  const moves = sortByCapture(getAllMoves(board, color, playerUpgrades, opponentUpgrades), board);
  if (moves.length === 0) return evaluateBoard(board, playerUpgrades, opponentUpgrades);

  let best = isMaximizing ? -Infinity : Infinity;
  for (const move of moves) {
    const { nextBoard } = executeMove(board, move.from, move.to, playerUpgrades, opponentUpgrades);
    const val = minimax(nextBoard, depth - 1, alpha, beta, !isMaximizing, playerUpgrades, opponentUpgrades);
    if (isMaximizing) {
      best = Math.max(best, val);
      alpha = Math.max(alpha, val);
    } else {
      best = Math.min(best, val);
      beta = Math.min(beta, val);
    }
    if (beta <= alpha) break;
  }
  return best;
}

const DEPTH_BY_DIFFICULTY: Record<number, number> = { 1: 1, 2: 1, 3: 2, 4: 2, 5: 3 };
const RANDOM_THRESHOLD: Record<number, number> = { 1: 70, 2: 40, 3: 15, 4: 5, 5: 0 };

export function getAIMove(
  board: Board,
  difficulty: number,
  playerUpgrades: string[],
  opponentUpgrades: string[]
): { from: Position; to: Position } | null {
  const rootMoves = getAllMoves(board, 'black', playerUpgrades, opponentUpgrades);
  if (rootMoves.length === 0) return null;

  const depth = DEPTH_BY_DIFFICULTY[difficulty] ?? 2;

  const scored = rootMoves.map(move => {
    const { nextBoard } = executeMove(board, move.from, move.to, playerUpgrades, opponentUpgrades);
    return {
      ...move,
      score: minimax(nextBoard, depth - 1, -Infinity, Infinity, false, playerUpgrades, opponentUpgrades),
    };
  });

  if (Math.random() * 100 < (RANDOM_THRESHOLD[difficulty] ?? 0)) {
    return scored[Math.floor(Math.random() * scored.length)];
  }

  scored.sort((a, b) => b.score - a.score);
  return scored[0];
}