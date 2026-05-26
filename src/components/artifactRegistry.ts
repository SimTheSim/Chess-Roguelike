import ALL_ARTIFACTS from '../artifacts/index';
import type { ArtifactDefinition, ArtifactCombo } from '../artifacts/index';

export type { ArtifactDefinition, ArtifactCombo };
export { ALL_ARTIFACTS };

const byId = new Map<string, ArtifactDefinition>(
  ALL_ARTIFACTS.map((a) => [a.id, a])
);

export function getArtifact(id: string): ArtifactDefinition | undefined {
  return byId.get(id);
}

export function getArtifactIcon(id: string): { svg: string; viewBox: string } | null {
  const a = byId.get(id);
  if (!a) return null;
  return { svg: a.iconSvg, viewBox: a.iconViewBox };
}

export function getArtifactOverlay(id: string): string | null {
  return byId.get(id)?.pieceOverlaySvg ?? null;
}

export interface ResolvedCombo {
  artifactA: ArtifactDefinition;
  artifactB: ArtifactDefinition;
  bonusDescription: string;
  bonusTag: string;
}

export function resolveActiveCombo(
  idA: string,
  idB: string
): ResolvedCombo | null {
  const a = byId.get(idA);
  const b = byId.get(idB);
  if (!a || !b) return null;

  const combo = a.combos.find((c) => c.withId === idB)
    ?? b.combos.find((c) => c.withId === idA);

  if (!combo) return null;

  return {
    artifactA: a,
    artifactB: b,
    bonusDescription: combo.bonusDescription,
    bonusTag: combo.bonusTag,
  };
}

export function getActiveCombos(ownedIds: string[]): ResolvedCombo[] {
  const seen = new Set<string>();
  const results: ResolvedCombo[] = [];

  for (let i = 0; i < ownedIds.length; i++) {
    for (let j = i + 1; j < ownedIds.length; j++) {
      const key = [ownedIds[i], ownedIds[j]].sort().join('::');
      if (seen.has(key)) continue;
      seen.add(key);
      const combo = resolveActiveCombo(ownedIds[i], ownedIds[j]);
      if (combo) results.push(combo);
    }
  }

  return results;
}

export function hasActiveCombo(idA: string, idB: string, ownedIds: string[]): boolean {
  return ownedIds.includes(idA) && ownedIds.includes(idB)
    && resolveActiveCombo(idA, idB) !== null;
}

export function getArtifactsByFamily(family: ArtifactDefinition['pieceFamily']): ArtifactDefinition[] {
  return ALL_ARTIFACTS.filter((a) => a.pieceFamily === family);
}

export function getRandomArtifacts(exclude: string[], currentIds: string[] = []): ArtifactDefinition[] {
  const RARITY_WEIGHT: Record<string, number> = { common: 60, rare: 30, epic: 10 };

  const familyCounts: Record<string, number> = {};
  for (const id of currentIds) {
    const a = byId.get(id);
    if (a) familyCounts[a.pieceFamily] = (familyCounts[a.pieceFamily] ?? 0) + 1;
  }

  const pool = ALL_ARTIFACTS
    .filter((a) => !exclude.includes(a.id))
    .map((a) => {
      let weight = RARITY_WEIGHT[a.rarity] ?? 10;
      const count = familyCounts[a.pieceFamily] ?? 0;
      if (count > 0 && a.pieceFamily !== 'general') weight *= 1 + count * 0.6;
      return { artifact: a, weight };
    });

  const picks: ArtifactDefinition[] = [];
  const usedIds = new Set<string>();

  for (let i = 0; i < 3; i++) {
    const available = pool.filter((w) => !usedIds.has(w.artifact.id));
    const total = available.reduce((s, w) => s + w.weight, 0);
    let rand = Math.random() * total;
    for (const entry of available) {
      rand -= entry.weight;
      if (rand <= 0) {
        picks.push(entry.artifact);
        usedIds.add(entry.artifact.id);
        break;
      }
    }
  }

  return picks;
}