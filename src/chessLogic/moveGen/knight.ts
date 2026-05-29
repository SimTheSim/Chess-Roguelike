import { MoveContext, Position } from '../types';
import { addIfOnBoard, addLine } from './helpers';

const BASE_KNIGHT_DELTAS: [number, number][] = [
  [-2, -1], [-2, 1], [-1, -2], [-1, 2],
  [1, -2], [1, 2], [2, -1], [2, 1]
];

export function getKnightMoves(ctx: MoveContext): Position[] {
  const { board, pos, piece, ownUpgrades } = ctx;
  const moves: Position[] = [];

  for (const [dr, dc] of BASE_KNIGHT_DELTAS) {
    addIfOnBoard(board, piece, moves, pos.r + dr, pos.c + dc);
  }

  if (ownUpgrades.includes('knight-teleport')) {
    const adjDeltas: [number, number][] = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];
    for (const [dr, dc] of adjDeltas) {
      addIfOnBoard(board, piece, moves, pos.r + dr, pos.c + dc);
    }
  }

  if (ownUpgrades.includes('knight-mirror')) {
    const cardinalDirs: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dr, dc] of cardinalDirs) {
      addLine(board, piece, moves, pos, dr, dc, 2);
    }
  }

  if (ownUpgrades.includes('knight-charge')) {
    for (const r of [pos.r - 3, pos.r + 3]) {
      if (r >= 0 && r < 8) {
        const dest = board[r][pos.c];
        if (!dest || dest.color !== piece.color) {
          moves.push({ r, c: pos.c });
        }
      }
    }
  }

  if (ownUpgrades.includes('knight-wide')) {
    const wideDeltas: [number, number][] = [
      [-3, -1], [-3, 1], [3, -1], [3, 1],
      [-1, -3], [-1, 3], [1, -3], [1, 3],
    ];
    for (const [dr, dc] of wideDeltas) {
      addIfOnBoard(board, piece, moves, pos.r + dr, pos.c + dc);
    }
  }

  if (ownUpgrades.includes('knight-diagonal')) {
    const diagDeltas: [number, number][] = [
      [-3, -3], [-3, 3], [3, -3], [3, 3]
    ];
    for (const [dr, dc] of diagDeltas) {
      addIfOnBoard(board, piece, moves, pos.r + dr, pos.c + dc);
    }
  }

  return moves;
}