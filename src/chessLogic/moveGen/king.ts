import { MoveContext, Position } from '../types';
import { addIfOnBoard } from './helpers';

const ADJ_DIRS: [number, number][] = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1]
];

const KNIGHT_DELTAS: [number, number][] = [
  [-2, -1], [-2, 1], [-1, -2], [-1, 2],
  [1, -2], [1, 2], [2, -1], [2, 1]
];

const WIDE_KNIGHT_DELTAS: [number, number][] = [
  [-3, -1], [-3, 1], [-1, -3], [-1, 3],
  [1, -3], [1, 3], [3, -1], [3, 1]
];

const DOUBLE_STEP_DELTAS: [number, number][] = [
  [-2, -2], [-2, -1], [-2, 0], [-2, 1], [-2, 2],
  [-1, -2],                              [-1, 2],
  [0, -2],                               [0, 2],
  [1, -2],                               [1, 2],
  [2, -2],  [2, -1],  [2, 0],  [2, 1],  [2, 2]
];

export function getKingMoves(ctx: MoveContext): Position[] {
  const { board, pos, piece, ownUpgrades } = ctx;
  const isWhite = piece.color === 'white';
  const moves: Position[] = [];

  for (const [dr, dc] of ADJ_DIRS) {
    addIfOnBoard(board, piece, moves, pos.r + dr, pos.c + dc);
  }

  if (ownUpgrades.includes('king-jump')) {
    const deltas = ownUpgrades.includes('king-double-step')
      ? [...KNIGHT_DELTAS, ...WIDE_KNIGHT_DELTAS]
      : KNIGHT_DELTAS;
    for (const [dr, dc] of deltas) {
      addIfOnBoard(board, piece, moves, pos.r + dr, pos.c + dc);
    }
  }

  if (ownUpgrades.includes('king-double-step')) {
    for (const [dr, dc] of DOUBLE_STEP_DELTAS) {
      addIfOnBoard(board, piece, moves, pos.r + dr, pos.c + dc);
    }
  }

  if (ownUpgrades.includes('king-blink')) {
    const blinkDist = ownUpgrades.includes('king-double-step') ? 3 : 2;
    const blinkDeltas: [number, number][] = [
      [-blinkDist, 0], [blinkDist, 0], [0, -blinkDist], [0, blinkDist]
    ];
    for (const [dr, dc] of blinkDeltas) {
      const r = pos.r + dr;
      const c = pos.c + dc;
      if (r >= 0 && r < 8 && c >= 0 && c < 8 && !board[r][c]) {
        moves.push({ r, c });
      }
    }
  }

  if (!piece.hasMoved) {
    const r = isWhite ? 7 : 0;

    const kingSideRook = board[r][7];
    if (
      kingSideRook &&
      kingSideRook.type === 'rook' &&
      kingSideRook.color === piece.color &&
      !kingSideRook.hasMoved &&
      !board[r][5] && !board[r][6]
    ) {
      moves.push({ r, c: 6 });
    }

    const queenSideRook = board[r][0];
    if (
      queenSideRook &&
      queenSideRook.type === 'rook' &&
      queenSideRook.color === piece.color &&
      !queenSideRook.hasMoved &&
      !board[r][1] && !board[r][2] && !board[r][3]
    ) {
      moves.push({ r, c: 2 });
    }
  }

  return moves;
}