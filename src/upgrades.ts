import { Upgrade } from './types';

export const ALL_UPGRADES: Upgrade[] = [
  // PAWN FAMILY
  {
    id: 'pawn-diagonal',
    name: 'Amulet of Stride',
    description: 'Pawns can move 1 square diagonally forward to any empty square.',
    rarity: 'common',
    icon: 'Compass',
    pieceFamily: 'pawn',
  },
  {
    id: 'pawn-double',
    name: 'Zephyr Boots',
    description: 'Pawns can move 2 squares forward at any time, not just from starting position.',
    rarity: 'common',
    icon: 'Flame',
    pieceFamily: 'pawn',
  },
  {
    id: 'pawn-backstep',
    name: 'Quicksilver Dagger',
    description: 'Pawns can move 1 square backward to any empty square.',
    rarity: 'rare',
    icon: 'ChevronsDown',
    pieceFamily: 'pawn',
  },
  {
    id: 'pawn-capture-forward',
    name: 'Spear of the Vanguard',
    description: 'Pawns can capture directly forward in addition to diagonally.',
    rarity: 'rare',
    icon: 'Zap',
    pieceFamily: 'pawn',
  },
  {
    id: 'pawn-triple',
    name: 'Flame Headband',
    description: 'Pawns can move up to 3 squares forward at any time.',
    rarity: 'epic',
    icon: 'Flame',
    pieceFamily: 'pawn',
  },
  {
    id: 'promotion-halfway',
    name: 'Vanguard Banner',
    description: 'Your pawns promote to Queens upon reaching the 6th row instead of the last one.',
    rarity: 'epic',
    icon: 'Sparkles',
    pieceFamily: 'pawn',
  },
  // KNIGHT FAMILY
  {
    id: 'knight-teleport',
    name: 'Phase Armor',
    description: 'Knights can also move 1 square in any direction (like a King), in addition to their normal jump.',
    rarity: 'rare',
    icon: 'Radio',
    pieceFamily: 'knight',
  },
  {
    id: 'knight-mirror',
    name: 'Glass Mirror Shield',
    description: 'Knights can also slide up to 2 squares horizontally or vertically in a straight line.',
    rarity: 'rare',
    icon: 'Shield',
    pieceFamily: 'knight',
  },
  {
    id: 'knight-charge',
    name: 'Grandmaster Lance',
    description: 'Knights can also leap exactly 3 squares forward or backward in a straight line.',
    rarity: 'rare',
    icon: 'Zap',
    pieceFamily: 'knight',
  },
  {
    id: 'extra-knight',
    name: 'Cavalry Signet',
    description: 'Adds one extra Knight to your side at the start of each round.',
    rarity: 'common',
    icon: 'Zap',
    pieceFamily: 'knight',
  },
  {
    id: 'knight-wide',
    name: 'Outflanker\'s Boots',
    description: 'Knights can also jump in a (3,1) L-shape instead of only (2,1).',
    rarity: 'epic',
    icon: 'Radio',
    pieceFamily: 'knight',
  },
  // BISHOP FAMILY
  {
    id: 'bishop-hop',
    name: 'Cloak of Shrouds',
    description: 'Bishops can jump over exactly one piece.',
    rarity: 'rare',
    icon: 'Ghost',
    pieceFamily: 'bishop',
  },
  {
    id: 'bishop-orthogonal',
    name: 'Souldust Bracelets',
    description: 'Bishops can also move exactly 1 square horizontally or vertically.',
    rarity: 'common',
    icon: 'Activity',
    pieceFamily: 'bishop',
  },
  {
    id: 'bishop-ethereal',
    name: 'Staff of Whispers',
    description: 'Bishops can pass through friendly pieces.',
    rarity: 'epic',
    icon: 'Ghost',
    pieceFamily: 'bishop',
  },
  {
    id: 'bishop-extended',
    name: 'Lens of Far Sight',
    description: 'Bishops can also move exactly 1 square horizontally or vertically up to 3 squares.',
    rarity: 'rare',
    icon: 'Activity',
    pieceFamily: 'bishop',
  },
  // ROOK FAMILY
  {
    id: 'rook-hop',
    name: 'Citadel Gatekeeper Aegis',
    description: 'Rooks can jump over exactly one piece along their path.',
    rarity: 'epic',
    icon: 'ArrowUpCircle',
    pieceFamily: 'rook',
  },
  {
    id: 'rook-diagonal',
    name: 'Chariot Wheels',
    description: 'Rooks can also move 1 square diagonally.',
    rarity: 'common',
    icon: 'CornerDownRight',
    pieceFamily: 'rook',
  },
  {
    id: 'extra-rook',
    name: "Citadel's Crown",
    description: 'Adds one extra Rook to your side at the start of each round.',
    rarity: 'epic',
    icon: 'ShieldCheck',
    pieceFamily: 'rook',
  },
  {
    id: 'rook-diagonal-full',
    name: 'Iron Coating',
    description: 'Rooks can also move diagonally up to 3 squares.',
    rarity: 'epic',
    icon: 'CornerDownRight',
    pieceFamily: 'rook',
  },
  {
    id: 'castling-extra-rook',
    name: 'Ironclad Defiance',
    description: 'When you castle, a new Rook appears at the corner square the castling Rook vacated.',
    rarity: 'rare',
    icon: 'ShieldCheck',
    pieceFamily: 'rook',
  },
  // QUEEN FAMILY
  {
    id: 'queen-hop',
    name: 'Sunfire Scepter',
    description: 'Your Queen can jump over exactly one piece along horizontal or vertical paths.',
    rarity: 'rare',
    icon: 'Wand2',
    pieceFamily: 'queen',
  },
  {
    id: 'queen-extra-capture',
    name: 'Blade of the Sovereign',
    description: 'Your Queen can capture a second adjacent enemy piece immediately after capturing one, if available.',
    rarity: 'epic',
    icon: 'Wand2',
    pieceFamily: 'queen',
  },
  {
    id: 'queen-ghost',
    name: 'Veil of the Emperor',
    description: 'Your Queen can pass through friendly pieces.',
    rarity: 'rare',
    icon: 'Ghost',
    pieceFamily: 'queen',
  },
  // KING FAMILY
  {
    id: 'king-jump',
    name: 'Sovereign Crown',
    description: 'Your King can also move in an L-shape like a Knight.',
    rarity: 'common',
    icon: 'Crown',
    pieceFamily: 'king',
  },
  {
    id: 'king-double-step',
    name: 'Pendant of Foresight',
    description: 'Your King can move up to 2 squares in any direction instead of the usual 1.',
    rarity: 'rare',
    icon: 'Eye',
    pieceFamily: 'king',
  },
  {
    id: 'king-blink',
    name: 'Bracers of Blink',
    description: 'Your King can move exactly 2 squares horizontally or vertically to any empty square, ignoring pieces in between.',
    rarity: 'rare',
    icon: 'Eye',
    pieceFamily: 'king',
  },
  {
    id: 'king-shield',
    name: 'Aegis of the Guard',
    description: 'Your King cannot be captured while at least one friendly piece is defending it.',
    rarity: 'epic',
    icon: 'ShieldCheck',
    pieceFamily: 'king',
  },
  // GENERAL (multi-piece or board-wide)
  {
    id: 'martyrdom',
    name: 'Martyrdom Sigil',
    description: 'When any of your pieces is captured, it explodes and removes all non-King pieces in adjacent squares.',
    rarity: 'rare',
    icon: 'ShieldAlert',
    pieceFamily: 'general',
  },
  {
    id: 'castling-explosion',
    name: 'Thunderclasp',
    description: 'When you castle, all enemy pieces adjacent to the King are immediately removed.',
    rarity: 'rare',
    icon: 'Zap',
    pieceFamily: 'general',
  },
];

const RARITY_BASE_WEIGHT: Record<string, number> = {
  common: 60,
  rare: 30,
  epic: 10,
};

export function getRandomUpgrades(exclude: string[], currentUpgrades: string[] = []): Upgrade[] {
  const available = ALL_UPGRADES.filter(u => !exclude.includes(u.id));

  const familyCounts: Record<string, number> = {};
  for (const id of currentUpgrades) {
    const upgrade = ALL_UPGRADES.find(u => u.id === id);
    if (upgrade) {
      familyCounts[upgrade.pieceFamily] = (familyCounts[upgrade.pieceFamily] ?? 0) + 1;
    }
  }

  const weighted = available.map(u => {
    let weight = RARITY_BASE_WEIGHT[u.rarity] ?? 10;
    const count = familyCounts[u.pieceFamily] ?? 0;
    if (count > 0 && u.pieceFamily !== 'general') {
      weight *= 1 + count * 0.6;
    }
    return { upgrade: u, weight };
  });

  const picks: Upgrade[] = [];
  const usedIds = new Set<string>();

  for (let i = 0; i < 3; i++) {
    const pool = weighted.filter(w => !usedIds.has(w.upgrade.id));
    const totalWeight = pool.reduce((s, w) => s + w.weight, 0);
    let rand = Math.random() * totalWeight;
    for (const entry of pool) {
      rand -= entry.weight;
      if (rand <= 0) {
        picks.push(entry.upgrade);
        usedIds.add(entry.upgrade.id);
        break;
      }
    }
  }

  return picks;
}