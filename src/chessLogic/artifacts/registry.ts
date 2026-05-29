import { ArtifactMoveModule, ArtifactExecuteModule, MoveContext, ExecuteContext, PieceType } from '../types';
import { Position } from '../../types';

const moveModules: ArtifactMoveModule[] = [];
const executeModules: ArtifactExecuteModule[] = [];

export function registerMoveExtension(module: ArtifactMoveModule) {
  moveModules.push(module);
}

export function registerExecuteExtension(module: ArtifactExecuteModule) {
  executeModules.push(module);
}

export function applyMoveExtensions(ctx: MoveContext, baseMoves: Position[]): Position[] {
  let moves = baseMoves;
  for (const mod of moveModules) {
    if (mod.pieceType === 'any' || mod.pieceType === ctx.piece.type) {
      if (ctx.ownUpgrades.includes(mod.id) || ctx.oppUpgrades.includes(mod.id)) {
        moves = mod.extendMoves(ctx, moves);
      }
    }
  }
  return moves;
}

export function applyExecuteExtensions(ctx: ExecuteContext): void {
  for (const mod of executeModules) {
    if (mod.pieceType === 'any' || mod.pieceType === ctx.piece.type) {
      if (ctx.ownUpgrades.includes(mod.id) || ctx.oppUpgrades.includes(mod.id)) {
        mod.extendExecute(ctx);
      }
    }
  }
}