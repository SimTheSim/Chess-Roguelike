import { MoveContext, Position } from '../types';
import { addIfOnBoard, addLine } from './helpers';

const DIAG_DIRS: [number, number][] = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
const ORTHO_DIRS: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const KNIGHT_DELTAS: [number, number][] = [
  [-2, -1], [-2, 1], [-1, -2], [-1, 2],
  [1, -2], [1, 2], [2, -1], [2, 1]
];

export function getBishopMoves(ctx: MoveContext): Position[] {
  const { board, pos, piece, ownUpgrades } = ctx;
  const moves: Position[] = [];

  const canHop = ownUpgrades.includes('bishop-hop');
  const canPassFriendly = ownUpgrades.includes('bishop-ethereal');

  for (const [dr, dc] of DIAG_DIRS) {
    addLine(board, piece, moves, pos, dr, dc, 8, canHop, canPassFriendly);
  }

  const orthoRange = (ownUpgrades.includes('bishop-orthogonal') && ownUpgrades.includes('bishop-extended')) ? 3
    : ownUpgrades.includes('bishop-extended') ? 3
    : ownUpgrades.includes('bishop-orthogonal') ? 1
    : 0;

  if (orthoRange > 0) {
    for (const [dr, dc] of ORTHO_DIRS) {
      addLine(board, piece, moves, pos, dr, dc, orthoRange);
    }
  }

  if (ownUpgrades.includes('bishop-knight')) {
    for (const [dr, dc] of KNIGHT_DELTAS) {
      addIfOnBoard(board, piece, moves, pos.r + dr, pos.c + dc);
    }
  }

  if (ownUpgrades.includes('bishop-yo-yo') && piece.startPos) {
    const sp = piece.startPos;
    if (sp.r !== pos.r || sp.c !== pos.c) {
      const dest = board[sp.r][sp.c];
      if (!dest || dest.color !== piece.color) {
        moves.push({ r: sp.r, c: sp.c });
      }
    }
  }

  return moves;
}