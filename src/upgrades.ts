import { Upgrade } from './types';

export const ALL_UPGRADES: Upgrade[] = [
  {
    id: 'pawn-diagonal',
    name: 'Amulet of Stride',
    description: 'Pawns can move 1 step diagonally to empty grid spaces.',
    rarity: 'common',
    icon: 'Compass'
  },
  {
    id: 'pawn-double',
    name: 'Zephyr Boots',
    description: 'Pawns can sprint 2 steps forward at any point during combat.',
    rarity: 'common',
    icon: 'Flame'
  },
  {
    id: 'pawn-backstep',
    name: 'Quicksilver Dagger',
    description: 'Pawns can move 1 step backward into empty spaces.',
    rarity: 'rare',
    icon: 'ChevronsDown'
  },
  {
    id: 'pawn-sidestep',
    name: 'Belt of Lateral Escape',
    description: 'Pawns can escape or realign by moving 1 step directly left or right.',
    rarity: 'common',
    icon: 'Compass'
  },
  {
    id: 'knight-teleport',
    name: 'Phase Armor',
    description: 'Knights are allowed to move exactly 1 step in any direction as well.',
    rarity: 'rare',
    icon: 'Radio'
  },
  {
    id: 'knight-mirror',
    name: 'Glass Mirror Shield',
    description: 'Knights are able to mirror-slide up to 2 spaces in straight lines.',
    rarity: 'rare',
    icon: 'Shield'
  },
  {
    id: 'knight-charge',
    name: 'Grandmaster Lance',
    description: 'Knights gain tactical charge, leaping exactly 3 spaces forward or backward.',
    rarity: 'rare',
    icon: 'Zap'
  },
  {
    id: 'bishop-hop',
    name: 'Cloak of Shrouds',
    description: 'Bishops gain ethereal state, allowing them to jump over exactly one piece.',
    rarity: 'epic',
    icon: 'Ghost'
  },
  {
    id: 'bishop-orthogonal',
    name: 'Souldust Bracelets',
    description: 'Bishops can slide exactly 1 cell orthogonally on command.',
    rarity: 'common',
    icon: 'Activity'
  },
  {
    id: 'bishop-ethereal',
    name: 'Staff of Whispers',
    description: 'Bishops slide freely, jumping over any friendly pieces without being blocked.',
    rarity: 'epic',
    icon: 'Ghost'
  },
  {
    id: 'rook-hop',
    name: 'Citadel Gatekeeper Aegis',
    description: 'Rooks are imbued with teleport-jumps, leaping over exactly one piece.',
    rarity: 'epic',
    icon: 'ArrowUpCircle'
  },
  {
    id: 'rook-diagonal',
    name: 'Chariot Wheels',
    description: 'Rooks can now perform short diagonal drifts (1 step).',
    rarity: 'common',
    icon: 'CornerDownRight'
  },
  {
    id: 'king-jump',
    name: 'Sovereign Crown',
    description: 'Your King gains royal mobility, jumping like a Knight.',
    rarity: 'epic',
    icon: 'Crown'
  },
  {
    id: 'king-double-step',
    name: 'Pendant of Foresight',
    description: 'Your King can move up to 2 spaces in any direction during combat.',
    rarity: 'epic',
    icon: 'Eye'
  },
  {
    id: 'king-blink',
    name: 'Bracers of Blink',
    description: 'Your King can teleport exactly 2 cells horizontally or vertically to empty spaces.',
    rarity: 'epic',
    icon: 'Eye'
  },
  {
    id: 'king-shield',
    name: 'Aegis of the Guard',
    description: 'Your King can never be captured if he is adjacent (orthogonally or diagonally) to at least one ally.',
    rarity: 'epic',
    icon: 'ShieldCheck'
  },
  {
    id: 'promotion-halfway',
    name: 'Vanguard Banner',
    description: 'Advancing pawns achieve promotion halfway across the grid (row 3).',
    rarity: 'rare',
    icon: 'Sparkles'
  },
  {
    id: 'martyrdom',
    name: 'Martyrdom Sigil',
    description: 'Whenever an ally is captured, they detonate adjacent cells, purging non-Kings.',
    rarity: 'rare',
    icon: 'ShieldAlert'
  },
  {
    id: 'extra-knight',
    name: 'Cavalry Signet',
    description: 'Summons an extra Knight to your reserves at start of each staging.',
    rarity: 'common',
    icon: 'Zap'
  },
  {
    id: 'extra-rook',
    name: 'Citadel Seal',
    description: 'Summons an extra Rook to your layout at start of each staging.',
    rarity: 'common',
    icon: 'ShieldCheck'
  },
  {
    id: 'queen-hop',
    name: 'Sunfire Scepter',
    description: 'Your Queen can leap over exactly one piece in cardinal pathways.',
    rarity: 'epic',
    icon: 'Wand2'
  },
  {
    id: 'sacred-chalice',
    name: 'Sacred Chalice',
    description: 'Transforms your center-left Pawn into a Rook on setup.',
    rarity: 'epic',
    icon: 'CupSoda'
  },
  {
    id: 'castling-extra-rook',
    name: 'Ironclad Defiance',
    description: 'Upon castling, spawns a brand new Rook at the original corner square of the castled rook.',
    rarity: 'rare',
    icon: 'ShieldCheck'
  },
  {
    id: 'castling-pawns',
    name: 'Royal Retinue',
    description: 'Upon castling, spawns a defensive wall of up to 3 pawns immediately in front of the King.',
    rarity: 'common',
    icon: 'CornerDownRight'
  },
  {
    id: 'castling-explosion',
    name: 'Thunderclasp',
    description: 'Upon castling, causes a massive explosion that removes all adjacent enemy pieces near the king.',
    rarity: 'epic',
    icon: 'Zap'
  }
];

export function getRandomUpgrades(exclude: string[]): Upgrade[] {
  const available = ALL_UPGRADES.filter(u => !exclude.includes(u.id));
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}
