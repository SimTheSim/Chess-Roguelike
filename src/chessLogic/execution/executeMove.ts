import { Board, Position, Piece } from '../../types';
import { ExecuteContext, FlameSquare } from '../types';
import { applyExecuteExtensions } from '../artifacts/registry';
import {
  applyPromotion,
  applyCastlingSideEffects,
  applyMartyrdom,
  applyQueenExtraCapture,
  applyKingPawnSpawn,
  applyQueenFlames,
} from './afterEffects';
import { getValidMoves } from '../moveGen';

export function executeMove(
  board: Board,
  from: Position,
  to: Position,
  playerUpgrades: string[],
  opponentUpgrades: string[],
  enPassantTarget: Position | null = null,
  flameSquares: FlameSquare[] = []
): {
  nextBoard: Board;
  captured: Piece | null;
  exploded: Position[];
  nextEnPassantTarget: Position | null;
} {
  const nextBoard: Board = board.map(row => row.map(cell => cell ? { ...cell } : null));
  const piece = nextBoard[from.r][from.c];
  if (!piece) return { nextBoard, captured: null, exploded: [], nextEnPassantTarget: null };

  const ownUpgrades = piece.color === 'white' ? playerUpgrades : opponentUpgrades;
  const opponentUpgradesForCtx = piece.color === 'white' ? opponentUpgrades : playerUpgrades;

  let captured = nextBoard[to.r][to.c];
  const exploded: Position[] = [];
  let nextEnPassantTarget: Position | null = null;

  const isEnPassant =
    piece.type === 'pawn' &&
    enPassantTarget !== null &&
    to.r === enPassantTarget.r &&
    to.c === enPassantTarget.c &&
    board[to.r][to.c] === null;

  if (isEnPassant) {
    captured = nextBoard[from.r][to.c];
    nextBoard[from.r][to.c] = null;
  }

  if (piece.type === 'pawn' && Math.abs(from.r - to.r) === 2) {
    nextEnPassantTarget = { r: (from.r + to.r) / 2, c: from.c };
  }

  piece.hasMoved = true;
  nextBoard[to.r][to.c] = piece;
  nextBoard[from.r][from.c] = null;

  const ctx: ExecuteContext = {
    board,
    from,
    to,
    piece,
    playerUpgrades,
    opponentUpgrades: opponentUpgradesForCtx,
    ownUpgrades,
    nextBoard,
    captured,
    exploded,
    nextEnPassantTarget,
    flameSquares,
  };

  applyKingPawnSpawn(ctx);
  applyQueenFlames(ctx);
  applyCastlingSideEffects(ctx);
  applyPromotion(ctx);
  applyMartyrdom(ctx);
  applyQueenExtraCapture(ctx);
  applyExecuteExtensions(ctx);

  return { nextBoard, captured, exploded, nextEnPassantTarget };
}

export function isKingThreatened(
  board: Board,
  color: 'white' | 'black',
  playerUpgrades: string[],
  opponentUpgrades: string[]
): boolean {
  let kingPos: Position | null = null;
  for (let r = 0; r < 8 && !kingPos; r++) {
    for (let c = 0; c < 8 && !kingPos; c++) {
      const p = board[r][c];
      if (p && p.type === 'king' && p.color === color) kingPos = { r, c };
    }
  }
  if (!kingPos) return true;

  const oppColor = color === 'white' ? 'black' : 'white';
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p && p.color === oppColor) {
        const moves = getValidMoves(board, { r, c }, playerUpgrades, opponentUpgrades);
        if (moves.some((m: Position) => m.r === kingPos!.r && m.c === kingPos!.c)) return true;
      }
    }
  }
  return false;
}

export function getBoardForOpponent(board: Board, opponentUpgrades: string[]): Board {
  if (!opponentUpgrades.includes('king-hidden')) return board;
  return board.map(row =>
    row.map(cell => (cell && cell.type === 'king' && cell.color === 'black') ? null : cell)
  );
}