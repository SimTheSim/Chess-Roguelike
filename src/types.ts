export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type PieceColor = 'white' | 'black';

export interface Piece {
  id: string;
  type: PieceType;
  color: PieceColor;
  hasMoved: boolean;
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