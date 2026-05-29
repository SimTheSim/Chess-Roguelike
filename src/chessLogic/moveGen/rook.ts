import { MoveContext, Position } from '../types';
import { addLine } from './helpers';

const ORTHO_DIRS: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const DIAG_DIRS: [number, number][] = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

export function getRookMoves(ctx: MoveContext): Position[] {
  const { board, pos, piece, ownUpgrades } = ctx;
  const moves: Position[] = [];

  const canHop = ownUpgrades.includes('rook-hop');
  for (const [dr, dc] of ORTHO_DIRS) {
    addLine(board, piece, moves, pos, dr, dc, 8, canHop);
  }

  const diagRange = (ownUpgrades.includes('rook-diagonal') && ownUpgrades.includes('rook-diagonal-full')) ? 8
    : ownUpgrades.includes('rook-diagonal-full') ? 3
    : ownUpgrades.includes('rook-diagonal') ? 1
    : 0;

  if (diagRange > 0) {
    for (const [dr, dc] of DIAG_DIRS) {
      addLine(board, piece, moves, pos, dr, dc, diagRange);
    }
  }

  return moves;
}