import { Board, Position, Piece } from '../types';

export function addIfOnBoard(
  board: Board,
  piece: Piece,
  moves: Position[],
  r: number,
  c: number
): boolean {
  if (r >= 0 && r < 8 && c >= 0 && c < 8) {
    const dest = board[r][c];
    if (!dest || dest.color !== piece.color) {
      moves.push({ r, c });
      return !dest;
    }
  }
  return false;
}

export function addLine(
  board: Board,
  piece: Piece,
  moves: Position[],
  pos: Position,
  dr: number,
  dc: number,
  maxSteps = 8,
  canHop = false,
  canPassFriendly = false
): void {
  let r = pos.r + dr;
  let c = pos.c + dc;
  let steps = 0;
  let hasHopped = false;

  while (r >= 0 && r < 8 && c >= 0 && c < 8 && steps < maxSteps) {
    const dest = board[r][c];
    if (!dest) {
      moves.push({ r, c });
    } else {
      if (dest.color === piece.color) {
        if (canPassFriendly) {
          // pass through, don't land
        } else if (canHop && !hasHopped) {
          hasHopped = true;
        } else {
          break;
        }
      } else {
        moves.push({ r, c });
        if (canHop && !hasHopped) {
          hasHopped = true;
        } else {
          break;
        }
      }
    }
    r += dr;
    c += dc;
    steps++;
  }
}