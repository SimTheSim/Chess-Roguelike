import { Board, PieceType } from '../../types';
import { isKingThreatened } from '../execution/executeMove';

const PIECE_VALUES: Record<PieceType, number> = {
  pawn:   10,
  knight: 32,
  bishop: 33,
  rook:   50,
  queen:  95,
  king:   20000,
};

export const PIECE_VALUES_SIMPLE: Record<PieceType, number> = {
  pawn:   1,
  knight: 3,
  bishop: 3,
  rook:   5,
  queen:  9,
  king:   100,
};

export function evaluateBoard(
  board: Board,
  playerUpgrades: string[],
  opponentUpgrades: string[]
): number {
  let score = 0;
  let whiteKingPresent = false;
  let blackKingPresent = false;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (!p) continue;

      const sign = p.color === 'black' ? 1 : -1;
      const distToCenter = Math.abs(3.5 - r) + Math.abs(3.5 - c);
      let val = PIECE_VALUES[p.type] + (7 - distToCenter) * 0.5;

      if (p.type === 'king') {
        if (p.color === 'white') { whiteKingPresent = true; val += r * 0.5; }
        else { blackKingPresent = true; val += (7 - r) * 0.5; }
      } else if (p.type === 'pawn') {
        val += (p.color === 'black' ? r : 7 - r) * 1.5;
      } else if (p.type === 'knight') {
        val += (7 - distToCenter) * 1.2;
      }

      score += sign * val;
    }
  }

  if (!whiteKingPresent) return 999999;
  if (!blackKingPresent) return -999999;

  if (isKingThreatened(board, 'black', playerUpgrades, opponentUpgrades)) score -= 8000;
  if (isKingThreatened(board, 'white', playerUpgrades, opponentUpgrades)) score += 8000;

  return score;
}