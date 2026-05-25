import { Board, Position, Piece, PieceColor, PieceType } from './types';

export function createInitialBoard(level: number, playerUpgrades: string[], opponentUpgrades: string[]): Board {
  const board: Board = Array(8).fill(null).map(() => Array(8).fill(null));

  const createPiece = (type: PieceType, color: PieceColor, id: string): Piece => ({
    id,
    type,
    color,
    hasMoved: false
  });

  // Black pieces setup
  board[0][0] = createPiece('rook', 'black', 'b_r1');
  board[0][1] = createPiece('knight', 'black', 'b_n1');
  board[0][2] = createPiece('bishop', 'black', 'b_b1');
  board[0][3] = createPiece('queen', 'black', 'b_q');
  board[0][4] = createPiece('king', 'black', 'b_k');
  board[0][5] = createPiece('bishop', 'black', 'b_b2');
  board[0][6] = createPiece('knight', 'black', 'b_n2');
  board[0][7] = createPiece('rook', 'black', 'b_r2');

  for (let c = 0; c < 8; c++) {
    board[1][c] = createPiece('pawn', 'black', `b_p${c}`);
  }

  // White pieces setup
  board[7][0] = createPiece('rook', 'white', 'w_r1');
  board[7][1] = createPiece('knight', 'white', 'w_n1');
  board[7][2] = createPiece('bishop', 'white', 'w_b1');
  board[7][3] = createPiece('queen', 'white', 'w_q');
  board[7][4] = createPiece('king', 'white', 'w_k');
  board[7][5] = createPiece('bishop', 'white', 'w_b2');
  board[7][6] = createPiece('knight', 'white', 'w_n2');
  board[7][7] = createPiece('rook', 'white', 'w_r2');

  for (let c = 0; c < 8; c++) {
    board[6][c] = createPiece('pawn', 'white', `w_p${c}`);
  }

  // Handle Player custom reserve sumons / modifications
  if (playerUpgrades.includes('extra-knight')) {
    if (!board[5][2]) board[5][2] = createPiece('knight', 'white', 'w_extra_n1');
    else if (!board[5][5]) board[5][5] = createPiece('knight', 'white', 'w_extra_n2');
  }
  if (playerUpgrades.includes('extra-rook')) {
    if (!board[5][1]) board[5][1] = createPiece('rook', 'white', 'w_extra_r1');
    else if (!board[5][6]) board[5][6] = createPiece('rook', 'white', 'w_extra_r2');
  }
  if (playerUpgrades.includes('sacred-chalice')) {
    board[6][3] = createPiece('rook', 'white', 'w_chalice_r');
  }

  // Handle Opponent/AI custom reserve summons / modifications
  if (opponentUpgrades.includes('extra-knight')) {
    if (!board[2][2]) board[2][2] = createPiece('knight', 'black', 'b_extra_n1');
    else if (!board[2][5]) board[2][5] = createPiece('knight', 'black', 'b_extra_n2');
  }
  if (opponentUpgrades.includes('extra-rook')) {
    if (!board[2][1]) board[2][1] = createPiece('rook', 'black', 'b_extra_r1');
    else if (!board[2][6]) board[2][6] = createPiece('rook', 'black', 'b_extra_r2');
  }
  if (opponentUpgrades.includes('sacred-chalice')) {
    board[1][3] = createPiece('rook', 'black', 'b_chalice_r');
  }

  return board;
}

export function getLevelName(level: number): string {
  switch (level) {
    case 1: return 'The Vanguard';
    case 2: return 'The Mounted Guard';
    case 3: return 'The Fortress Walls';
    case 4: return 'The Arch-Magus Coven';
    case 5: return 'The Imperial Legion';
    default: return `Dread Lord Level ${level}`;
  }
}

// Campaign opponent boons mappings
export function getOpponentCampaignBoons(level: number): string[] {
  switch (level) {
    case 1:
      return [];
    case 2:
      return ['extra-knight'];
    case 3:
      return ['extra-rook'];
    case 4:
      return ['bishop-hop', 'martyrdom'];
    case 5:
    default:
      return ['extra-knight', 'extra-rook', 'king-shield', 'queen-hop'];
  }
}

export function getValidMoves(
  board: Board,
  pos: Position,
  playerUpgrades: string[],
  opponentUpgrades: string[],
  enPassantTarget: { r: number; c: number } | null = null
): Position[] {
  const p = board[pos.r][pos.c];
  if (!p) return [];
  const upgrades = p.color === 'white' ? playerUpgrades : opponentUpgrades;
  const moves: Position[] = [];

  const addIfOnBoard = (r: number, c: number) => {
    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
      const dest = board[r][c];
      if (!dest || dest.color !== p.color) {
        moves.push({ r, c });
        return !dest;
      }
    }
    return false;
  };

  const addLine = (dr: number, dc: number, maxSteps = 8, canHop = false, canPassFriendly = false) => {
    let r = pos.r + dr;
    let c = pos.c + dc;
    let steps = 0;
    let hasHopped = false;

    while (r >= 0 && r < 8 && c >= 0 && c < 8 && steps < maxSteps) {
      const dest = board[r][c];
      if (!dest) {
        moves.push({ r, c });
      } else {
        if (dest.color === p.color) {
          if (canPassFriendly) {
            // Can pass through friendly piece but can't land on it
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
  };

  const isWhite = p.color === 'white';

  if (p.type === 'pawn') {
    const dir = isWhite ? -1 : 1;
    const nextR = pos.r + dir;

    if (nextR >= 0 && nextR < 8) {
      if (!board[nextR][pos.c]) {
        moves.push({ r: nextR, c: pos.c });

        const startRow = isWhite ? 6 : 1;
        const doubleR = pos.r + 2 * dir;
        const tripleR = pos.r + 3 * dir;
        const canDouble = pos.r === startRow || upgrades.includes('pawn-double') || upgrades.includes('pawn-triple');
        if (canDouble && doubleR >= 0 && doubleR < 8 && !board[doubleR][pos.c]) {
          moves.push({ r: doubleR, c: pos.c });
          if (upgrades.includes('pawn-triple') && tripleR >= 0 && tripleR < 8 && !board[tripleR][pos.c]) {
            moves.push({ r: tripleR, c: pos.c });
          }
        }
      }

      const captureCols = [pos.c - 1, pos.c + 1];
      for (const col of captureCols) {
        if (col >= 0 && col < 8) {
          const dest = board[nextR][col];
          if (dest && dest.color !== p.color) {
            moves.push({ r: nextR, c: col });
          }
          if (
            enPassantTarget &&
            enPassantTarget.r === nextR &&
            enPassantTarget.c === col
          ) {
            moves.push({ r: nextR, c: col });
          }
        }
      }

      if (upgrades.includes('pawn-diagonal')) {
        for (const col of captureCols) {
          if (col >= 0 && col < 8 && !board[nextR][col]) {
            moves.push({ r: nextR, c: col });
          }
        }
      }
      if (upgrades.includes('pawn-capture-forward')) {
        if (nextR >= 0 && nextR < 8 && board[nextR][pos.c] && board[nextR][pos.c]!.color !== p.color) {
          moves.push({ r: nextR, c: pos.c });
        }
      }
      if (upgrades.includes('pawn-backstep')) {
        const backR = pos.r - dir;
        if (backR >= 0 && backR < 8 && !board[backR][pos.c]) {
          moves.push({ r: backR, c: pos.c });
        }
      }
      if (upgrades.includes('pawn-sidestep')) {
        const sideCols = [pos.c - 1, pos.c + 1];
        for (const col of sideCols) {
          if (col >= 0 && col < 8 && !board[pos.r][col]) {
            moves.push({ r: pos.r, c: col });
          }
        }
      }
    }
  } else if (p.type === 'knight') {
    const knightMoves = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1]
    ];
    for (const [dr, dc] of knightMoves) {
      addIfOnBoard(pos.r + dr, pos.c + dc);
    }
    if (upgrades.includes('knight-teleport')) {
      const adjMoves = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1],  [1, 0],  [1, 1]
      ];
      for (const [dr, dc] of adjMoves) {
        addIfOnBoard(pos.r + dr, pos.c + dc);
      }
    }
    if (upgrades.includes('knight-mirror')) {
      const cardinalDirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (const [dr, dc] of cardinalDirs) {
        let r = pos.r + dr;
        let c = pos.c + dc;
        let steps = 0;
        while (r >= 0 && r < 8 && c >= 0 && c < 8 && steps < 2) {
          const dest = board[r][c];
          if (!dest) {
            moves.push({ r, c });
          } else {
            if (dest.color !== p.color) {
              moves.push({ r, c });
            }
            break;
          }
          r += dr;
          c += dc;
          steps++;
        }
      }
    }
    if (upgrades.includes('knight-charge')) {
      const chargeR = [pos.r - 3, pos.r + 3];
      for (const r of chargeR) {
        if (r >= 0 && r < 8) {
          const dest = board[r][pos.c];
          if (!dest || dest.color !== p.color) {
            moves.push({ r, c: pos.c });
          }
        }
      }
    }
    if (upgrades.includes('knight-wide')) {
      const wideMoves = [
        [-3, -1], [-3, 1], [3, -1], [3, 1],
        [-1, -3], [-1, 3], [1, -3], [1, 3],
      ];
      for (const [dr, dc] of wideMoves) {
        addIfOnBoard(pos.r + dr, pos.c + dc);
      }
    }
  } else if (p.type === 'bishop') {
    const dirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    const canHop = upgrades.includes('bishop-hop');
    const canPassFriendly = upgrades.includes('bishop-ethereal');
    for (const [dr, dc] of dirs) {
      addLine(dr, dc, 8, canHop, canPassFriendly);
    }
    if (upgrades.includes('bishop-orthogonal')) {
      const orthoDirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (const [dr, dc] of orthoDirs) {
        addLine(dr, dc, 1);
      }
    }
    if (upgrades.includes('bishop-extended')) {
      const orthoDirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (const [dr, dc] of orthoDirs) {
        addLine(dr, dc, 3);
      }
    }
  } else if (p.type === 'rook') {
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const canHop = upgrades.includes('rook-hop');
    for (const [dr, dc] of dirs) {
      addLine(dr, dc, 8, canHop);
    }
    if (upgrades.includes('rook-diagonal')) {
      const diagDirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
      for (const [dr, dc] of diagDirs) {
        addLine(dr, dc, 1);
      }
    }
    if (upgrades.includes('rook-diagonal-full')) {
      const diagDirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
      for (const [dr, dc] of diagDirs) {
        addLine(dr, dc, 3);
      }
    }
  } else if (p.type === 'queen') {
    const queenCanPassFriendly = upgrades.includes('queen-ghost');
    const queenDirs = [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]];
    for (const [dr, dc] of queenDirs) {
      addLine(dr, dc, 8, upgrades.includes('queen-hop') && (dr === 0 || dc === 0), queenCanPassFriendly);
    }
  } else if (p.type === 'king') {
    const dirs = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];
    for (const [dr, dc] of dirs) {
      addIfOnBoard(pos.r + dr, pos.c + dc);
    }

    if (upgrades.includes('king-jump')) {
      const knightMoves = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
      ];
      for (const [dr, dc] of knightMoves) {
        addIfOnBoard(pos.r + dr, pos.c + dc);
      }
    }
    if (upgrades.includes('king-double-step')) {
      const doubleDirs = [
        [-2, -2], [-2, -1], [-2, 0], [-2, 1], [-2, 2],
        [-1, -2],                             [-1, 2],
        [0, -2],                               [0, 2],
        [1, -2],                              [1, 2],
        [2, -2],  [2, -1],  [2, 0],  [2, 1],  [2, 2]
      ];
      for (const [dr, dc] of doubleDirs) {
        addIfOnBoard(pos.r + dr, pos.c + dc);
      }
    }
    if (upgrades.includes('king-blink')) {
      const blinkMoves = [
        [-2, 0], [2, 0], [0, -2], [0, 2]
      ];
      for (const [dr, dc] of blinkMoves) {
        const blinkR = pos.r + dr;
        const blinkC = pos.c + dc;
        if (blinkR >= 0 && blinkR < 8 && blinkC >= 0 && blinkC < 8 && !board[blinkR][blinkC]) {
          moves.push({ r: blinkR, c: blinkC });
        }
      }
    }

    // Castling capability (Standard logic + modifications)
    if (!p.hasMoved) {
      const r = isWhite ? 7 : 0;
      // Kingside castle
      const kingSideRook = board[r][7];
      if (
        kingSideRook &&
        kingSideRook.type === 'rook' &&
        kingSideRook.color === p.color &&
        !kingSideRook.hasMoved
      ) {
        if (!board[r][5] && !board[r][6]) {
          moves.push({ r, c: 6 });
        }
      }
      // Queenside castle
      const queenSideRook = board[r][0];
      if (
        queenSideRook &&
        queenSideRook.type === 'rook' &&
        queenSideRook.color === p.color &&
        !queenSideRook.hasMoved
      ) {
        if (!board[r][1] && !board[r][2] && !board[r][3]) {
          moves.push({ r, c: 2 });
        }
      }
    }
  }

  // Filter moves that capture King if Aegis of the Guard is active
  if (p.color === 'black' && playerUpgrades.includes('king-shield')) {
    let whiteKingPos: Position | null = null;
    for (let tr = 0; tr < 8; tr++) {
      for (let tc = 0; tc < 8; tc++) {
        const item = board[tr][tc];
        if (item && item.type === 'king' && item.color === 'white') {
          whiteKingPos = { r: tr, c: tc };
          break;
        }
      }
      if (whiteKingPos) break;
    }

    if (whiteKingPos) {
      let isGuarded = false;
      const adjCoords = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1],  [1, 0],  [1, 1]
      ];
      for (const [dr, dc] of adjCoords) {
        const r = whiteKingPos.r + dr;
        const c = whiteKingPos.c + dc;
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
          const adjPiece = board[r][c];
          if (adjPiece && adjPiece.color === 'white' && adjPiece.type !== 'king') {
            isGuarded = true;
            break;
          }
        }
      }
      if (isGuarded) {
        return moves.filter(m => !(m.r === whiteKingPos!.r && m.c === whiteKingPos!.c));
      }
    }
  }

  if (p.color === 'white' && opponentUpgrades.includes('king-shield')) {
    let blackKingPos: Position | null = null;
    for (let tr = 0; tr < 8; tr++) {
      for (let tc = 0; tc < 8; tc++) {
        const item = board[tr][tc];
        if (item && item.type === 'king' && item.color === 'black') {
          blackKingPos = { r: tr, c: tc };
          break;
        }
      }
      if (blackKingPos) break;
    }

    if (blackKingPos) {
      let isGuarded = false;
      const adjCoords = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1],  [1, 0],  [1, 1]
      ];
      for (const [dr, dc] of adjCoords) {
        const r = blackKingPos.r + dr;
        const c = blackKingPos.c + dc;
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
          const adjPiece = board[r][c];
          if (adjPiece && adjPiece.color === 'black' && adjPiece.type !== 'king') {
            isGuarded = true;
            break;
          }
        }
      }
      if (isGuarded) {
        return moves.filter(m => !(m.r === blackKingPos!.r && m.c === blackKingPos!.c));
      }
    }
  }

  return moves;
}

export function executeMove(
  board: Board,
  from: Position,
  to: Position,
  playerUpgrades: string[],
  opponentUpgrades: string[],
  enPassantTarget: { r: number; c: number } | null = null
): { nextBoard: Board; captured: Piece | null; exploded: Position[]; nextEnPassantTarget: { r: number; c: number } | null } {
  const nextBoard = board.map(row => row.map(cell => cell ? { ...cell } : null));
  const p = nextBoard[from.r][from.c];
  if (!p) return { nextBoard, captured: null, exploded: [], nextEnPassantTarget: null };

  const upgrades = p.color === 'white' ? playerUpgrades : opponentUpgrades;
  let captured = nextBoard[to.r][to.c];
  let exploded: Position[] = [];
  let nextEnPassantTarget: { r: number; c: number } | null = null;

  const isCastling = p.type === 'king' && Math.abs(from.c - to.c) === 2;

  const isEnPassant =
    p.type === 'pawn' &&
    enPassantTarget !== null &&
    to.r === enPassantTarget.r &&
    to.c === enPassantTarget.c &&
    board[to.r][to.c] === null;

  if (isEnPassant) {
    const capturedPawnR = from.r;
    const capturedPawnC = to.c;
    captured = nextBoard[capturedPawnR][capturedPawnC];
    nextBoard[capturedPawnR][capturedPawnC] = null;
  }

  if (p.type === 'pawn' && Math.abs(from.r - to.r) === 2) {
    nextEnPassantTarget = { r: (from.r + to.r) / 2, c: from.c };
  }

  p.hasMoved = true;
  nextBoard[to.r][to.c] = p;
  nextBoard[from.r][from.c] = null;

  if (isCastling) {
    const r = from.r;
    if (to.c === 6) {
      const rook = nextBoard[r][7];
      if (rook) {
        rook.hasMoved = true;
        nextBoard[r][5] = rook;
        nextBoard[r][7] = null;
      }

      if (upgrades.includes('castling-extra-rook')) {
        nextBoard[r][7] = {
          id: `${p.color}_castle_rook_${Date.now()}`,
          type: 'rook',
          color: p.color,
          hasMoved: true
        };
      }
      if (upgrades.includes('castling-pawns')) {
        const frontR = p.color === 'white' ? 6 : 1;
        [5, 6, 7].forEach(col => {
          if (!nextBoard[frontR][col]) {
            nextBoard[frontR][col] = {
              id: `${p.color}_retinue_${col}_${Date.now()}`,
              type: 'pawn',
              color: p.color,
              hasMoved: true
            };
          }
        });
      }
      if (upgrades.includes('castling-explosion')) {
        const adj = [
          { r: r - 1, c: 5 }, { r: r - 1, c: 6 }, { r: r - 1, c: 7 },
          { r, c: 5 },      { r, c: 7 },
          { r: r + 1, c: 5 }, { r: r + 1, c: 6 }, { r: r + 1, c: 7 }
        ];
        adj.forEach(cell => {
          if (cell.r >= 0 && cell.r < 8 && cell.c >= 0 && cell.c < 8) {
            const victim = nextBoard[cell.r][cell.c];
            if (victim && victim.color !== p.color && victim.type !== 'king') {
              nextBoard[cell.r][cell.c] = null;
              exploded.push(cell);
            }
          }
        });
      }
    }
    else if (to.c === 2) {
      const rook = nextBoard[r][0];
      if (rook) {
        rook.hasMoved = true;
        nextBoard[r][3] = rook;
        nextBoard[r][0] = null;
      }

      if (upgrades.includes('castling-extra-rook')) {
        nextBoard[r][0] = {
          id: `${p.color}_castle_rook_${Date.now()}`,
          type: 'rook',
          color: p.color,
          hasMoved: true
        };
      }
      if (upgrades.includes('castling-pawns')) {
        const frontR = p.color === 'white' ? 6 : 1;
        [1, 2, 3].forEach(col => {
          if (!nextBoard[frontR][col]) {
            nextBoard[frontR][col] = {
              id: `${p.color}_retinue_${col}_${Date.now()}`,
              type: 'pawn',
              color: p.color,
              hasMoved: true
            };
          }
        });
      }
      if (upgrades.includes('castling-explosion')) {
        const adj = [
          { r: r - 1, c: 1 }, { r: r - 1, c: 2 }, { r: r - 1, c: 3 },
          { r, c: 1 },      { r, c: 3 },
          { r: r + 1, c: 1 }, { r: r + 1, c: 2 }, { r: r + 1, c: 3 }
        ];
        adj.forEach(cell => {
          if (cell.r >= 0 && cell.r < 8 && cell.c >= 0 && cell.c < 8) {
            const victim = nextBoard[cell.r][cell.c];
            if (victim && victim.color !== p.color && victim.type !== 'king') {
              nextBoard[cell.r][cell.c] = null;
              exploded.push(cell);
            }
          }
        });
      }
    }
  }

  const canPromote = (p.type === 'pawn') && (
    (p.color === 'white' && to.r === 0) ||
    (p.color === 'black' && to.r === 7) ||
    (p.color === 'white' && upgrades.includes('promotion-halfway') && to.r <= 3) ||
    (p.color === 'black' && upgrades.includes('promotion-halfway') && to.r >= 4)
  );

  if (canPromote) {
    nextBoard[to.r][to.c] = {
      ...p,
      type: 'queen'
    };
  }

  if (captured && upgrades.includes('martyrdom')) {
    nextBoard[to.r][to.c] = null;
    exploded.push(to);

    const adj = [
      { r: to.r - 1, c: to.c }, { r: to.r + 1, c: to.c },
      { r: to.r, c: to.c - 1 }, { r: to.r, c: to.c + 1 },
      { r: to.r - 1, c: to.c - 1 }, { r: to.r - 1, c: to.c + 1 },
      { r: to.r + 1, c: to.c - 1 }, { r: to.r + 1, c: to.c + 1 }
    ];

    for (const cell of adj) {
      if (cell.r >= 0 && cell.r < 8 && cell.c >= 0 && cell.c < 8) {
        const victim = nextBoard[cell.r][cell.c];
        if (victim && victim.type !== 'king') {
          nextBoard[cell.r][cell.c] = null;
          exploded.push(cell);
        }
      }
    }
  }

  if (captured && p.type === 'queen' && upgrades.includes('queen-extra-capture')) {
    const adjDirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    for (const [dr, dc] of adjDirs) {
      const ar = to.r + dr;
      const ac = to.c + dc;
      if (ar >= 0 && ar < 8 && ac >= 0 && ac < 8) {
        const adj = nextBoard[ar][ac];
        if (adj && adj.color !== p.color && adj.type !== 'king') {
          nextBoard[ar][ac] = null;
          exploded.push({ r: ar, c: ac });
          break;
        }
      }
    }
  }

  return { nextBoard, captured, exploded, nextEnPassantTarget };
}

export function isKingThreatened(
  board: Board,
  color: PieceColor,
  playerUpgrades: string[],
  opponentUpgrades: string[]
): boolean {
  let kingPos: Position | null = null;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p && p.type === 'king' && p.color === color) {
        kingPos = { r, c };
        break;
      }
    }
    if (kingPos) break;
  }

  if (!kingPos) return true;

  const oppColor = color === 'white' ? 'black' : 'white';
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p && p.color === oppColor) {
        const moves = getValidMoves(board, { r, c }, playerUpgrades, opponentUpgrades);
        if (moves.some(m => m.r === kingPos!.r && m.c === kingPos!.c)) {
          return true;
        }
      }
    }
  }
  return false;
}

export function evaluateBoard(board: Board, playerUpgrades: string[], opponentUpgrades: string[]): number {
  let score = 0;
  let whiteKingPresent = false;
  let blackKingPresent = false;
  const values: Record<PieceType, number> = {
    pawn: 10,
    knight: 32,
    bishop: 33,
    rook: 50,
    queen: 95,
    king: 20000
  };

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p) {
        const sign = p.color === 'black' ? 1 : -1;
        let baseVal = values[p.type];

        const distToCenter = Math.abs(3.5 - r) + Math.abs(3.5 - c);
        const centerBonus = (7 - distToCenter) * 0.5;
        baseVal += centerBonus;

        if (p.type === 'king') {
          if (p.color === 'white') whiteKingPresent = true;
          else blackKingPresent = true;

          if (p.color === 'black') {
            baseVal += (7 - r) * 0.5;
          } else {
            baseVal += r * 0.5;
          }
        } else if (p.type === 'pawn') {
          if (p.color === 'black') {
            baseVal += r * 1.5;
          } else {
            baseVal += (7 - r) * 1.5;
          }
        } else if (p.type === 'knight') {
          baseVal += (7 - distToCenter) * 1.2;
        }

        score += sign * baseVal;
      }
    }
  }

  if (!whiteKingPresent) return 999999;
  if (!blackKingPresent) return -999999;

  if (isKingThreatened(board, 'black', playerUpgrades, opponentUpgrades)) {
    score -= 8000;
  }
  if (isKingThreatened(board, 'white', playerUpgrades, opponentUpgrades)) {
    score += 8000;
  }

  return score;
}

function checkSimKingCaptured(boardState: Board): 'white' | 'black' | null {
  let whiteKingAlive = false;
  let blackKingAlive = false;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = boardState[r][c];
      if (p && p.type === 'king') {
        if (p.color === 'white') whiteKingAlive = true;
        if (p.color === 'black') blackKingAlive = true;
      }
    }
  }
  if (!whiteKingAlive) return 'black';
  if (!blackKingAlive) return 'white';
  return null;
}

function getAllPossibleMovesForAI(
  board: Board,
  color: 'white' | 'black',
  playerUpgrades: string[],
  opponentUpgrades: string[]
): { from: Position; to: Position }[] {
  const list: { from: Position; to: Position }[] = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p && p.color === color) {
        const valids = getValidMoves(board, { r, c }, playerUpgrades, opponentUpgrades);
        for (const dest of valids) {
          list.push({ from: { r, c }, to: dest });
        }
      }
    }
  }
  return list;
}

function getPieceVal(type: PieceType): number {
  const values: Record<PieceType, number> = {
    pawn: 1,
    knight: 3,
    bishop: 3,
    rook: 5,
    queen: 9,
    king: 100
  };
  return values[type] || 0;
}

function minimax(
  board: Board,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean,
  playerUpgrades: string[],
  opponentUpgrades: string[]
): number {
  const victor = checkSimKingCaptured(board);
  if (victor === 'black') return 999999 + depth;
  if (victor === 'white') return -999999 - depth;

  if (depth === 0) {
    return evaluateBoard(board, playerUpgrades, opponentUpgrades);
  }

  if (isMaximizing) {
    let maxEval = -Infinity;
    const moves = getAllPossibleMovesForAI(board, 'black', playerUpgrades, opponentUpgrades);
    if (moves.length === 0) return evaluateBoard(board, playerUpgrades, opponentUpgrades);

    moves.sort((a, b) => {
      const targetA = board[a.to.r][a.to.c];
      const targetB = board[b.to.r][b.to.c];
      const valA = targetA ? getPieceVal(targetA.type) : 0;
      const valB = targetB ? getPieceVal(targetB.type) : 0;
      return valB - valA;
    });

    for (const move of moves) {
      const { nextBoard } = executeMove(board, move.from, move.to, playerUpgrades, opponentUpgrades);
      const evalVal = minimax(nextBoard, depth - 1, alpha, beta, false, playerUpgrades, opponentUpgrades);
      maxEval = Math.max(maxEval, evalVal);
      alpha = Math.max(alpha, evalVal);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    const moves = getAllPossibleMovesForAI(board, 'white', playerUpgrades, opponentUpgrades);
    if (moves.length === 0) return evaluateBoard(board, playerUpgrades, opponentUpgrades);

    moves.sort((a, b) => {
      const targetA = board[a.to.r][a.to.c];
      const targetB = board[b.to.r][b.to.c];
      const valA = targetA ? getPieceVal(targetA.type) : 0;
      const valB = targetB ? getPieceVal(targetB.type) : 0;
      return valB - valA;
    });

    for (const move of moves) {
      const { nextBoard } = executeMove(board, move.from, move.to, playerUpgrades, opponentUpgrades);
      const evalVal = minimax(nextBoard, depth - 1, alpha, beta, true, playerUpgrades, opponentUpgrades);
      minEval = Math.min(minEval, evalVal);
      beta = Math.min(beta, evalVal);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

export function getAIMove(
  board: Board,
  difficulty: number,
  playerUpgrades: string[],
  opponentUpgrades: string[]
): { from: Position; to: Position } | null {
  const rootMoves = getAllPossibleMovesForAI(board, 'black', playerUpgrades, opponentUpgrades);
  if (rootMoves.length === 0) return null;

  let depth = 2;
  if (difficulty === 1) depth = 1;
  else if (difficulty === 2) depth = 1;
  else if (difficulty === 3) depth = 2;
  else if (difficulty === 4) depth = 2;
  else if (difficulty === 5) depth = 3;

  const moves: { from: Position; to: Position; score: number }[] = [];

  for (const move of rootMoves) {
    const { nextBoard } = executeMove(board, move.from, move.to, playerUpgrades, opponentUpgrades);
    const score = minimax(nextBoard, depth - 1, -Infinity, Infinity, false, playerUpgrades, opponentUpgrades);
    moves.push({
      from: move.from,
      to: move.to,
      score: score
    });
  }

  const randVal = Math.random() * 100;
  let threshold = 0;
  if (difficulty === 1) threshold = 70;
  else if (difficulty === 2) threshold = 40;
  else if (difficulty === 3) threshold = 15;
  else if (difficulty === 4) threshold = 5;
  else if (difficulty === 5) threshold = 0;

  if (randVal < threshold) {
    const randomIndex = Math.floor(Math.random() * moves.length);
    return { from: moves[randomIndex].from, to: moves[randomIndex].to };
  }

  moves.sort((a, b) => b.score - a.score);
  return { from: moves[0].from, to: moves[0].to };
}