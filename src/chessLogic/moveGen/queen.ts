import { MoveContext, Position } from '../types';
import { addLine } from './helpers';

const ALL_DIRS: [number, number][] = [
  [-1, 0], [1, 0], [0, -1], [0, 1],
  [-1, -1], [-1, 1], [1, -1], [1, 1]
];

export function getQueenMoves(ctx: MoveContext): Position[] {
  const { board, pos, piece, ownUpgrades } = ctx;
  const moves: Position[] = [];

  const canPassFriendly = ownUpgrades.includes('queen-ghost');

  for (const [dr, dc] of ALL_DIRS) {
    const canHop = ownUpgrades.includes('queen-hop') && (dr === 0 || dc === 0);
    addLine(board, piece, moves, pos, dr, dc, 8, canHop, canPassFriendly);
  }

  return moves;
}