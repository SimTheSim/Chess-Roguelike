import { Board, Position, Piece, PieceColor, PieceType } from '../types';

export type { Board, Position, Piece, PieceColor, PieceType };

export interface FlameSquare {
  r: number;
  c: number;
  turnsLeft: number;
}

export interface MoveContext {
  board: Board;
  pos: Position;
  piece: Piece;
  playerUpgrades: string[];
  opponentUpgrades: string[];
  ownUpgrades: string[];
  oppUpgrades: string[];
  enPassantTarget: Position | null;
  flameSquares: FlameSquare[];
}

export interface ExecuteContext {
  board: Board;
  from: Position;
  to: Position;
  piece: Piece;
  playerUpgrades: string[];
  opponentUpgrades: string[];
  ownUpgrades: string[];
  nextBoard: Board;
  captured: Piece | null;
  exploded: Position[];
  nextEnPassantTarget: Position | null;
  flameSquares: FlameSquare[];
  pieceMoved: boolean;
}

export type MoveExtension = (ctx: MoveContext, moves: Position[]) => Position[];
export type ExecuteExtension = (ctx: ExecuteContext) => void;

export interface ArtifactMoveModule {
  pieceType: PieceType | 'any';
  id: string;
  extendMoves: MoveExtension;
}

export interface ArtifactExecuteModule {
  pieceType: PieceType | 'any';
  id: string;
  extendExecute: ExecuteExtension;
}