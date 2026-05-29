import { Board, Position, Piece, MoveContext, FlameSquare } from '../../types';
import { getPawnMoves } from './pawn';
import { getKnightMoves } from './knight';
import { getBishopMoves } from './bishop';
import { getRookMoves } from './rook';
import { getQueenMoves } from './queen';
import { getKingMoves } from './king';
import {
  applyPawnKnightFilter,
  applyFlameFilter,
  applyKingShieldFilter,
  applyQueenHolyFilter
} from './filters';
import { applyMoveExtensions } from '../artifacts/registry';

function buildContext(
  board: Board,
  pos: Position,
  playerUpgrades: string[],
  opponentUpgrades: string[],
  enPassantTarget: Position | null,
  flameSquares: FlameSquare[]
): MoveContext | null {
  const piece = board[pos.r][pos.c];
  if (!piece) return null;
  const ownUpgrades = piece.color === 'white' ? playerUpgrades : opponentUpgrades;
  const oppUpgrades = piece.color === 'white' ? opponentUpgrades : playerUpgrades;
  return { board, pos, piece, playerUpgrades, opponentUpgrades, ownUpgrades, oppUpgrades, enPassantTarget, flameSquares };
}

export function getValidMovesRaw(
  board: Board,
  pos: Position,
  playerUpgrades: string[],
  opponentUpgrades: string[],
  enPassantTarget: Position | null = null,
  flameSquares: FlameSquare[] = []
): Position[] {
  const ctx = buildContext(board, pos, playerUpgrades, opponentUpgrades, enPassantTarget, flameSquares);
  if (!ctx) return [];

  let moves: Position[];
  switch (ctx.piece.type) {
    case 'pawn':   moves = getPawnMoves(ctx); break;
    case 'knight': moves = getKnightMoves(ctx); break;
    case 'bishop': moves = getBishopMoves(ctx); break;
    case 'rook':   moves = getRookMoves(ctx); break;
    case 'queen':  moves = getQueenMoves(ctx); break;
    case 'king':   moves = getKingMoves(ctx); break;
    default:       moves = [];
  }

  return moves;
}

export function getValidMoves(
  board: Board,
  pos: Position,
  playerUpgrades: string[],
  opponentUpgrades: string[],
  enPassantTarget: Position | null = null,
  flameSquares: FlameSquare[] = []
): Position[] {
  const ctx = buildContext(board, pos, playerUpgrades, opponentUpgrades, enPassantTarget, flameSquares);
  if (!ctx) return [];

  let moves = getValidMovesRaw(board, pos, playerUpgrades, opponentUpgrades, enPassantTarget, flameSquares);

  if (ctx.piece.type === 'pawn') {
    moves = applyPawnKnightFilter(ctx, moves);
  }

  moves = applyMoveExtensions(ctx, moves);
  moves = applyFlameFilter(ctx, moves);
  moves = applyKingShieldFilter(ctx, moves);
  moves = applyQueenHolyFilter(ctx, moves);

  return moves;
}