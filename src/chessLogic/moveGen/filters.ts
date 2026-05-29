import { MoveContext, Position } from '../types';
import { getValidMovesRaw } from './index';

export function applyPawnKnightFilter(ctx: MoveContext, moves: Position[]): Position[] {
  const { board, playerUpgrades, opponentUpgrades } = ctx;
  const filtered: Position[] = [];
  for (const m of moves) {
    const dest = board[m.r][m.c];
    if (dest && dest.type === 'knight') {
      const destUpgrades = dest.color === 'white' ? playerUpgrades : opponentUpgrades;
      if (destUpgrades.includes('knight-teleport') && destUpgrades.includes('knight-mirror')) {
        continue;
      }
    }
    filtered.push(m);
  }
  return filtered;
}

export function applyFlameFilter(ctx: MoveContext, moves: Position[]): Position[] {
  const { ownUpgrades, flameSquares } = ctx;
  const activeFlames = flameSquares.filter(f => f.turnsLeft > 0);
  if (activeFlames.length === 0) return moves;

  const flameSet = new Set(activeFlames.map(f => `${f.r},${f.c}`));
  const isFlamewalker = ownUpgrades.includes('queen-holy') && ownUpgrades.includes('queen-flames');
  if (isFlamewalker) return moves;

  return moves.filter(m => !flameSet.has(`${m.r},${m.c}`));
}

export function applyKingShieldFilter(ctx: MoveContext, moves: Position[]): Position[] {
  const { board, piece, playerUpgrades, opponentUpgrades } = ctx;

  const shieldedColor = piece.color === 'black' && playerUpgrades.includes('king-shield') ? 'white'
    : piece.color === 'white' && opponentUpgrades.includes('king-shield') ? 'black'
    : null;

  if (!shieldedColor) return moves;

  let kingPos: Position | null = null;
  outer: for (let tr = 0; tr < 8; tr++) {
    for (let tc = 0; tc < 8; tc++) {
      const item = board[tr][tc];
      if (item && item.type === 'king' && item.color === shieldedColor) {
        kingPos = { r: tr, c: tc };
        break outer;
      }
    }
  }

  if (!kingPos) return moves;

  board[kingPos.r][kingPos.c]!.color = piece.color;
  let isGuarded = false;
  const defenderColor = shieldedColor;

  outer2: for (let tr = 0; tr < 8; tr++) {
    for (let tc = 0; tc < 8; tc++) {
      const defender = board[tr][tc];
      if (defender && defender.color === defenderColor && defender.type !== 'king') {
        const defMoves = getValidMovesRaw(board, { r: tr, c: tc }, playerUpgrades, opponentUpgrades);
        if (defMoves.some(m => m.r === kingPos!.r && m.c === kingPos!.c)) {
          isGuarded = true;
          break outer2;
        }
      }
    }
  }

  board[kingPos.r][kingPos.c]!.color = shieldedColor;

  if (isGuarded) {
    return moves.filter(m => !(m.r === kingPos!.r && m.c === kingPos!.c));
  }
  return moves;
}

export function applyQueenHolyFilter(ctx: MoveContext, moves: Position[]): Position[] {
  const { board, piece, oppUpgrades } = ctx;

  if (!oppUpgrades.includes('queen-holy') || piece.type === 'queen') return moves;

  return moves.filter(m => {
    const dest = board[m.r][m.c];
    if (dest && dest.type === 'queen' && dest.color !== piece.color) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const adjR = m.r + dr;
          const adjC = m.c + dc;
          if (adjR >= 0 && adjR < 8 && adjC >= 0 && adjC < 8) {
            const adj = board[adjR][adjC];
            if (adj && adj.type === 'king') return false;
          }
        }
      }
    }
    return true;
  });
}