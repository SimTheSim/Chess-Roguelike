import { Board, Piece, PieceColor, PieceType } from '../types';

function createPiece(type: PieceType, color: PieceColor, id: string): Piece {
  return { id, type, color, hasMoved: false };
}

export function createInitialBoard(
  _level: number,
  playerUpgrades: string[],
  opponentUpgrades: string[]
): Board {
  const board: Board = Array(8).fill(null).map(() => Array(8).fill(null));

  board[0] = [
    createPiece('rook',   'black', 'b_r1'),
    createPiece('knight', 'black', 'b_n1'),
    createPiece('bishop', 'black', 'b_b1'),
    createPiece('queen',  'black', 'b_q'),
    createPiece('king',   'black', 'b_k'),
    createPiece('bishop', 'black', 'b_b2'),
    createPiece('knight', 'black', 'b_n2'),
    createPiece('rook',   'black', 'b_r2'),
  ];
  for (let c = 0; c < 8; c++) board[1][c] = createPiece('pawn', 'black', `b_p${c}`);

  board[7] = [
    createPiece('rook',   'white', 'w_r1'),
    createPiece('knight', 'white', 'w_n1'),
    createPiece('bishop', 'white', 'w_b1'),
    createPiece('queen',  'white', 'w_q'),
    createPiece('king',   'white', 'w_k'),
    createPiece('bishop', 'white', 'w_b2'),
    createPiece('knight', 'white', 'w_n2'),
    createPiece('rook',   'white', 'w_r2'),
  ];
  for (let c = 0; c < 8; c++) board[6][c] = createPiece('pawn', 'white', `w_p${c}`);

  board[0][2]!.startPos = { r: 0, c: 2 };
  board[0][5]!.startPos = { r: 0, c: 5 };
  board[7][2]!.startPos = { r: 7, c: 2 };
  board[7][5]!.startPos = { r: 7, c: 5 };

  if (playerUpgrades.includes('queen-rook')) {
    board[7][0] = createPiece('queen', 'white', 'w_q_rook');
  }
  if (playerUpgrades.includes('extra-knight')) {
    if (!board[5][2]) board[5][2] = createPiece('knight', 'white', 'w_extra_n1');
    else if (!board[5][5]) board[5][5] = createPiece('knight', 'white', 'w_extra_n2');
    if (playerUpgrades.includes('knight-diagonal')) {
      if (!board[5][3]) board[5][3] = createPiece('bishop', 'white', 'w_extra_b1');
      else if (!board[5][4]) board[5][4] = createPiece('bishop', 'white', 'w_extra_b2');
    }
  }
  if (playerUpgrades.includes('extra-rook')) {
    if (playerUpgrades.includes('rook-promote')) {
      board[6][0] = createPiece('rook', 'white', 'w_promo_r1');
      board[6][7] = createPiece('rook', 'white', 'w_promo_r2');
    } else {
      if (!board[5][1]) board[5][1] = createPiece('rook', 'white', 'w_extra_r1');
      else if (!board[5][6]) board[5][6] = createPiece('rook', 'white', 'w_extra_r2');
    }
  }

  if (opponentUpgrades.includes('queen-rook')) {
    board[0][0] = createPiece('queen', 'black', 'b_q_rook');
  }
  if (opponentUpgrades.includes('extra-knight')) {
    if (!board[2][2]) board[2][2] = createPiece('knight', 'black', 'b_extra_n1');
    else if (!board[2][5]) board[2][5] = createPiece('knight', 'black', 'b_extra_n2');
    if (opponentUpgrades.includes('knight-diagonal')) {
      if (!board[2][3]) board[2][3] = createPiece('bishop', 'black', 'b_extra_b1');
      else if (!board[2][4]) board[2][4] = createPiece('bishop', 'black', 'b_extra_b2');
    }
  }
  if (opponentUpgrades.includes('extra-rook')) {
    if (opponentUpgrades.includes('rook-promote')) {
      board[1][0] = createPiece('rook', 'black', 'b_promo_r1');
      board[1][7] = createPiece('rook', 'black', 'b_promo_r2');
    } else {
      if (!board[2][1]) board[2][1] = createPiece('rook', 'black', 'b_extra_r1');
      else if (!board[2][6]) board[2][6] = createPiece('rook', 'black', 'b_extra_r2');
    }
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