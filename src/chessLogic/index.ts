export { createInitialBoard, getLevelName } from './boardSetup';
export { getValidMoves, getValidMovesRaw } from './moveGen';
export { executeMove, isKingThreatened, getBoardForOpponent } from './execution/executeMove';
export { evaluateBoard } from './ai/evaluate';
export { getAIMove } from './ai/minimax';
export { registerMoveExtension, registerExecuteExtension } from './artifacts/registry';
export type {
  Board,
  Position,
  Piece,
  PieceColor,
  PieceType,
  FlameSquare,
  MoveContext,
  ExecuteContext,
  MoveExtension,
  ExecuteExtension,
  ArtifactMoveModule,
  ArtifactExecuteModule,
} from './types';