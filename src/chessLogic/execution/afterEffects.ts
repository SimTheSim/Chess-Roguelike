import { ExecuteContext, Position } from '../types';

export function applyPromotion(ctx: ExecuteContext): void {
  const { piece, to, ownUpgrades, nextBoard } = ctx;

  if (piece.type === 'pawn') {
    const canPromote =
      (piece.color === 'white' && to.r === 0) ||
      (piece.color === 'black' && to.r === 7) ||
      (piece.color === 'white' && ownUpgrades.includes('promotion-halfway') && to.r <= 2) ||
      (piece.color === 'black' && ownUpgrades.includes('promotion-halfway') && to.r >= 5);

    if (canPromote) {
      nextBoard[to.r][to.c] = { ...piece, type: 'queen' };
    }
  }

  if (
    piece.type === 'rook' &&
    ownUpgrades.includes('rook-promote') &&
    ((piece.color === 'white' && to.r === 0) || (piece.color === 'black' && to.r === 7))
  ) {
    nextBoard[to.r][to.c] = { ...piece, type: 'queen' };
  }
}

export function applyCastlingSideEffects(ctx: ExecuteContext): void {
  const { piece, from, to, ownUpgrades, nextBoard, exploded } = ctx;

  const isCastling = piece.type === 'king' && Math.abs(from.c - to.c) === 2;
  if (!isCastling) return;

  const r = from.r;

  const isKingside = to.c === 6;
  const rookFromC = isKingside ? 7 : 0;
  const rookToC = isKingside ? 5 : 3;
  const newRookC = isKingside ? 7 : 0;
  const explosionCols = isKingside ? [5, 6, 7] : [1, 2, 3];

  const rook = nextBoard[r][rookFromC];
  if (rook) {
    rook.hasMoved = true;
    nextBoard[r][rookToC] = rook;
    nextBoard[r][rookFromC] = null;
  }

  if (ownUpgrades.includes('castling-extra-rook')) {
    nextBoard[r][newRookC] = {
      id: `${piece.color}_castle_rook_${Date.now()}`,
      type: 'rook',
      color: piece.color,
      hasMoved: true
    };
  }

  if (ownUpgrades.includes('castling-explosion')) {
    for (const col of explosionCols) {
      for (const rowOffset of [-1, 0, 1]) {
        const cellR = r + rowOffset;
        const cellC = col;
        if (cellR >= 0 && cellR < 8 && cellC >= 0 && cellC < 8) {
          const victim = nextBoard[cellR][cellC];
          if (victim && victim.color !== piece.color && victim.type !== 'king') {
            nextBoard[cellR][cellC] = null;
            exploded.push({ r: cellR, c: cellC });
          }
        }
      }
    }
  }
}

export function applyMartyrdom(ctx: ExecuteContext): void {
  const { piece, to, ownUpgrades, nextBoard, captured, exploded } = ctx;
  if (!captured || !ownUpgrades.includes('martyrdom')) return;

  nextBoard[to.r][to.c] = null;
  exploded.push(to);

  const adjDeltas: [number, number][] = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
    [-1, -1], [-1, 1], [1, -1], [1, 1]
  ];
  for (const [dr, dc] of adjDeltas) {
    const ar = to.r + dr;
    const ac = to.c + dc;
    if (ar >= 0 && ar < 8 && ac >= 0 && ac < 8) {
      const victim = nextBoard[ar][ac];
      if (victim && victim.type !== 'king') {
        nextBoard[ar][ac] = null;
        exploded.push({ r: ar, c: ac });
      }
    }
  }
}

export function applyQueenExtraCapture(ctx: ExecuteContext): void {
  const { piece, to, ownUpgrades, nextBoard, captured, exploded } = ctx;
  if (!captured || piece.type !== 'queen' || !ownUpgrades.includes('queen-extra-capture')) return;

  const adjDeltas: [number, number][] = [
    [-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]
  ];
  for (const [dr, dc] of adjDeltas) {
    const ar = to.r + dr;
    const ac = to.c + dc;
    if (ar >= 0 && ar < 8 && ac >= 0 && ac < 8) {
      const adj = nextBoard[ar][ac];
      if (adj && adj.color !== piece.color && adj.type !== 'king') {
        nextBoard[ar][ac] = null;
        exploded.push({ r: ar, c: ac });
        break;
      }
    }
  }
}

export function applyKingPawnSpawn(ctx: ExecuteContext): void {
  const { piece, from, to, ownUpgrades, nextBoard } = ctx;
  if (piece.type !== 'king' || !ownUpgrades.includes('king-pawn')) return;

  const backDir = piece.color === 'white' ? 1 : -1;
  if (to.r === from.r + backDir && Math.abs(to.c - from.c) <= 1) {
    if (!nextBoard[from.r][from.c]) {
      nextBoard[from.r][from.c] = {
        id: `${piece.color}_kp_pawn_${Date.now()}`,
        type: 'pawn',
        color: piece.color,
        hasMoved: true
      };
    }
  }
}

export function applyQueenFlames(ctx: ExecuteContext): void {
  const { piece, from, ownUpgrades, flameSquares } = ctx;
  if (piece.type !== 'queen' || !ownUpgrades.includes('queen-flames')) return;
  flameSquares.push({ r: from.r, c: from.c, turnsLeft: 5 });
}