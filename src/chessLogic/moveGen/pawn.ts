import { MoveContext, Position } from '../types';

export function getPawnMoves(ctx: MoveContext): Position[] {
  const { board, pos, piece, ownUpgrades, enPassantTarget } = ctx;
  const isWhite = piece.color === 'white';
  const dir = isWhite ? -1 : 1;
  const nextR = pos.r + dir;
  const moves: Position[] = [];

  if (nextR < 0 || nextR >= 8) return moves;

  if (!board[nextR][pos.c]) {
    moves.push({ r: nextR, c: pos.c });

    const startRow = isWhite ? 6 : 1;
    const doubleR = pos.r + 2 * dir;
    const tripleR = pos.r + 3 * dir;
    const canDouble = pos.r === startRow || ownUpgrades.includes('pawn-double') || ownUpgrades.includes('pawn-triple');

    if (canDouble && doubleR >= 0 && doubleR < 8 && !board[doubleR][pos.c]) {
      moves.push({ r: doubleR, c: pos.c });

      if (ownUpgrades.includes('pawn-triple') && tripleR >= 0 && tripleR < 8 && !board[tripleR][pos.c]) {
        moves.push({ r: tripleR, c: pos.c });
        const quadR = pos.r + 4 * dir;
        if (ownUpgrades.includes('pawn-double') && quadR >= 0 && quadR < 8 && !board[quadR][pos.c]) {
          moves.push({ r: quadR, c: pos.c });
        }
      }
    }
  }

  const captureCols = [pos.c - 1, pos.c + 1];
  for (const col of captureCols) {
    if (col >= 0 && col < 8) {
      const dest = board[nextR][col];
      if (dest && dest.color !== piece.color) {
        moves.push({ r: nextR, c: col });
      }
      if (enPassantTarget && enPassantTarget.r === nextR && enPassantTarget.c === col) {
        moves.push({ r: nextR, c: col });
      }
    }
  }

  if (ownUpgrades.includes('pawn-diagonal')) {
    for (const col of captureCols) {
      if (col >= 0 && col < 8 && !board[nextR][col]) {
        moves.push({ r: nextR, c: col });
      }
    }
  }

  if (ownUpgrades.includes('pawn-capture-forward')) {
    if (board[nextR][pos.c] && board[nextR][pos.c]!.color !== piece.color) {
      moves.push({ r: nextR, c: pos.c });
    }
    if (ownUpgrades.includes('pawn-double')) {
      const lungeR = pos.r + 2 * dir;
      if (lungeR >= 0 && lungeR < 8 && board[lungeR][pos.c] && board[lungeR][pos.c]!.color !== piece.color) {
        moves.push({ r: lungeR, c: pos.c });
      }
    }
  }

  if (ownUpgrades.includes('pawn-backstep')) {
    const backR = pos.r - dir;
    if (backR >= 0 && backR < 8 && !board[backR][pos.c]) {
      moves.push({ r: backR, c: pos.c });
    }
  }

  return moves;
}