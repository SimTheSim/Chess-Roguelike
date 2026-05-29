export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type PieceColor = 'white' | 'black';

export interface Piece {
  id: string;
  type: PieceType;
  color: PieceColor;
  hasMoved: boolean;
  startPos?: { r: number; c: number }
}

export type Board = (Piece | null)[][];

export interface Position {
  r: number;
  c: number;
}

export interface Move {
  from: Position;
  to: Position;
  piece: Piece;
  captured: Piece | null;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic';
  icon: string;
  pieceFamily: 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king' | 'general';
}

export interface GameState {
  board: Board;
  turn: PieceColor;
  movesHistory: Move[];
  status: 'playing' | 'won' | 'lost' | 'upgrading';
  selectedPos: Position | null;
  validMoves: Position[];
  level: number;
  upgrades: string[];
  explodedCells: Position[];
  enPassantTarget: Position | null;
}