import { PieceType } from '../types';

export type ArtifactRarity = 'common' | 'rare' | 'epic';
export type ArtifactFamily = PieceType | 'general';

export interface ArtifactCombo {
  withId: string;
  bonusDescription: string;
  bonusTag: string;
}

export interface ArtifactDefinition {
  id: string;
  name: string;
  description: string;
  rarity: ArtifactRarity;
  pieceFamily: ArtifactFamily;
  iconSvg: string;
  iconViewBox: string;
  pieceOverlaySvg: string | null;
  combos: ArtifactCombo[];
}

const ALL_ARTIFACTS: ArtifactDefinition[] = [
  {
    "id": "pawn-diagonal",
    "name": "Amulet of Stride",
    "description": "Pawns can move 1 square diagonally forward to any empty square.",
    "rarity": "common",
    "pieceFamily": "pawn",
    "iconViewBox": "16 17 12 9",
    "iconSvg": "\n      <path d=\"M17 18L19.4444 22.6667L21.2778 24.2222H23.7222L25.5556 22.6667L28 18\" stroke=\"#FFBB00\"/>\n      <path d=\"M23 26H22V23.3333H23V26Z\" stroke=\"#FFBB00\"/>\n      <path d=\"M22.5 23.3333V26\" stroke=\"#FF0000\"/>",
    "pieceOverlaySvg": "\n      <path d=\"M17 18L19.4444 22.6667L21.2778 24.2222H23.7222L25.5556 22.6667L28 18\" stroke=\"#FFBB00\"/>\n      <path d=\"M23 26H22V23.3333H23V26Z\" stroke=\"#FFBB00\"/>\n      <path d=\"M22.5 23.3333V26\" stroke=\"#FF0000\"/>",
    "combos": []
  },
  {
    "id": "pawn-double",
    "name": "Zephyr Boots",
    "description": "Pawns can move 2 squares forward at any time, not just from starting position.",
    "rarity": "common",
    "pieceFamily": "pawn",
    "iconViewBox": "10 32 24 8",
    "iconSvg": "\n      <path d=\"M24 33V39H34V37.5L33 35.5H27.5V33H24Z\" fill=\"#683900\" stroke=\"#683900\"/>\n      <path d=\"M24 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M26 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M28 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M30 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M32 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M34 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M24.5 34H28\" stroke=\"#FFCC00\"/>\n      <path d=\"M25 37.5H26\" stroke=\"#FF0000\"/>\n      <path d=\"M28 37.5H29\" stroke=\"#11FF00\"/>\n      <path d=\"M31 37.5H32\" stroke=\"#4400FF\"/>\n      <path d=\"M21 33V39H11V37.5L12 35.5H17.5V33H21Z\" fill=\"#683900\" stroke=\"#683900\"/>\n      <path d=\"M21 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M19 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M17 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M15 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M13 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M11 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M20.5 34H17\" stroke=\"#FFCC00\"/>\n      <path d=\"M20 37.5H19\" stroke=\"#FF0000\"/>\n      <path d=\"M17 37.5H16\" stroke=\"#11FF00\"/>\n      <path d=\"M14 37.5H13\" stroke=\"#4400FF\"/>",
    "pieceOverlaySvg": "\n      <path d=\"M24 33V39H34V37.5L33 35.5H27.5V33H24Z\" fill=\"#683900\" stroke=\"#683900\"/>\n      <path d=\"M24 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M26 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M28 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M30 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M32 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M34 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M24.5 34H28\" stroke=\"#FFCC00\"/>\n      <path d=\"M25 37.5H26\" stroke=\"#FF0000\"/>\n      <path d=\"M28 37.5H29\" stroke=\"#11FF00\"/>\n      <path d=\"M31 37.5H32\" stroke=\"#4400FF\"/>\n      <path d=\"M21 33V39H11V37.5L12 35.5H17.5V33H21Z\" fill=\"#683900\" stroke=\"#683900\"/>\n      <path d=\"M21 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M19 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M17 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M15 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M13 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M11 39V40\" stroke=\"#4B2900\"/>\n      <path d=\"M20.5 34H17\" stroke=\"#FFCC00\"/>\n      <path d=\"M20 37.5H19\" stroke=\"#FF0000\"/>\n      <path d=\"M17 37.5H16\" stroke=\"#11FF00\"/>\n      <path d=\"M14 37.5H13\" stroke=\"#4400FF\"/>",
    "combos": [
      {
        "withId": "pawn-triple",
        "bonusDescription": "Pawns can move up to 4 squares forward, any time.",
        "bonusTag": "SPRINT"
      },
      {
        "withId": "pawn-capture-forward",
        "bonusDescription": "Pawns can also capture 2 squares forward in one move.",
        "bonusTag": "LUNGE"
      }
    ]
  },
  {
    "id": "pawn-backstep",
    "name": "Quicksilver Dagger",
    "description": "Pawns can move 1 square backward to any empty square.",
    "rarity": "rare",
    "pieceFamily": "pawn",
    "iconViewBox": "10 9 8 21",
    "iconSvg": "\n      <path d=\"M13 25H16V13L14.5 10L13 13V25Z\" fill=\"#767676\"/>\n      <path d=\"M13 13L14.5 10L16 13V25H13V13ZM13 13V25.5\" stroke=\"#767676\"/>\n      <path d=\"M14.5 12V24M14.5 24L13.5 25M14.5 24L15.5 25\" stroke=\"#545454\"/>\n      <path d=\"M14 26V30H15V26H14Z\" fill=\"#B06100\" stroke=\"#B06100\"/>\n      <path d=\"M14 27H15\" stroke=\"#935100\"/>\n      <path d=\"M14 29.5H15\" stroke=\"#935100\"/>\n      <path d=\"M11 25L12.5 25.5H16.5L17.5 25\" stroke=\"#683900\"/>",
    "pieceOverlaySvg": "\n      <path d=\"M13 25H16V13L14.5 10L13 13V25Z\" fill=\"#767676\"/>\n      <path d=\"M13 13L14.5 10L16 13V25H13V13ZM13 13V25.5\" stroke=\"#767676\"/>\n      <path d=\"M14.5 12V24M14.5 24L13.5 25M14.5 24L15.5 25\" stroke=\"#545454\"/>\n      <path d=\"M14 26V30H15V26H14Z\" fill=\"#B06100\" stroke=\"#B06100\"/>\n      <path d=\"M14 27H15\" stroke=\"#935100\"/>\n      <path d=\"M14 29.5H15\" stroke=\"#935100\"/>\n      <path d=\"M11 25L12.5 25.5H16.5L17.5 25\" stroke=\"#683900\"/>",
    "combos": []
  },
  {
    "id": "pawn-capture-forward",
    "name": "Spear of the Vanguard",
    "description": "Pawns can capture directly forward in addition to diagonally.",
    "rarity": "rare",
    "pieceFamily": "pawn",
    "iconViewBox": "18 1 10 10",
    "iconSvg": "\n      <path d=\"M26 10H19V9L21 8H24L26 9V10Z\" fill=\"#FFF200\" stroke=\"#FFF200\"/>\n      <path d=\"M21 8.5V9.5\" stroke=\"#FFBB00\"/>\n      <path d=\"M24 8.5V9.5\" stroke=\"#FFBB00\"/>\n      <path d=\"M22.9805 3.8623L23.9805 7.3623L24.1631 8H20.8369L21.0195 7.3623L22.0195 3.8623L22.5 2.17969L22.9805 3.8623Z\" fill=\"#D9D9D9\" stroke=\"#AEABAB\"/>",
    "pieceOverlaySvg": "\n      <path d=\"M26 10H19V9L21 8H24L26 9V10Z\" fill=\"#FFF200\" stroke=\"#FFF200\"/>\n      <path d=\"M21 8.5V9.5\" stroke=\"#FFBB00\"/>\n      <path d=\"M24 8.5V9.5\" stroke=\"#FFBB00\"/>\n      <path d=\"M22.9805 3.8623L23.9805 7.3623L24.1631 8H20.8369L21.0195 7.3623L22.0195 3.8623L22.5 2.17969L22.9805 3.8623Z\" fill=\"#D9D9D9\" stroke=\"#AEABAB\"/>",
    "combos": [
      {
        "withId": "pawn-double",
        "bonusDescription": "Pawns can also capture 2 squares forward in one move.",
        "bonusTag": "LUNGE"
      }
    ]
  },
  {
    "id": "pawn-triple",
    "name": "Flame Headband",
    "description": "Pawns can move up to 3 squares forward at any time.",
    "rarity": "epic",
    "pieceFamily": "pawn",
    "iconViewBox": "17 10 11 4",
    "iconSvg": "\n      <path d=\"M18 11.5H27\" stroke=\"#FF0000\" strokeLinecap=\"round\"/>\n      <path d=\"M18 12H27\" stroke=\"#FF5900\" strokeLinecap=\"round\"/>\n      <path d=\"M18 12.5H27\" stroke=\"#FFF200\" strokeLinecap=\"round\"/>\n      <path d=\"M25.6484 11.4726C25.6484 11.8242 26 11.8828 26 12.1758C26 12.2929 25.8828 12.4687 25.7071 12.4687C25.5313 12.4687 25.4141 12.2929 25.5312 11.9999C25.3554 12.1171 25.2969 12.2343 25.2969 12.3515C25.2969 12.6445 25.5898 12.9374 26 12.9374C26.4102 12.9374 26.7031 12.7617 26.7031 12.4101C26.7057 11.8901 26.1039 11.7163 25.9414 11.4726C25.8242 11.2968 25.8828 11.1796 25.9999 11.0624C25.7656 11.121 25.6484 11.2851 25.6484 11.4726Z\" fill=\"black\"/>\n      <path d=\"M23.6484 11.4726C23.6484 11.8242 24 11.8828 24 12.1758C24 12.2929 23.8828 12.4687 23.7071 12.4687C23.5313 12.4687 23.4141 12.2929 23.5312 11.9999C23.3554 12.1171 23.2969 12.2343 23.2969 12.3515C23.2969 12.6445 23.5898 12.9374 24 12.9374C24.4102 12.9374 24.7031 12.7617 24.7031 12.4101C24.7057 11.8901 24.1039 11.7163 23.9414 11.4726C23.8242 11.2968 23.8828 11.1796 23.9999 11.0624C23.7656 11.121 23.6484 11.2851 23.6484 11.4726Z\" fill=\"black\"/>\n      <path d=\"M20.6484 11.4726C20.6484 11.8242 21 11.8828 21 12.1758C21 12.2929 20.8828 12.4687 20.7071 12.4687C20.5313 12.4687 20.4141 12.2929 20.5312 11.9999C20.3554 12.1171 20.2969 12.2343 20.2969 12.3515C20.2969 12.6445 20.5898 12.9374 21 12.9374C21.4102 12.9374 21.7031 12.7617 21.7031 12.4101C21.7057 11.8901 21.1039 11.7163 20.9414 11.4726C20.8242 11.2968 20.8828 11.1796 20.9999 11.0624C20.7656 11.121 20.6484 11.2851 20.6484 11.4726Z\" fill=\"black\"/>\n      <path d=\"M18.6484 11.4726C18.6484 11.8242 19 11.8828 19 12.1758C19 12.2929 18.8828 12.4687 18.7071 12.4687C18.5313 12.4687 18.4141 12.2929 18.5312 11.9999C18.3554 12.1171 18.2969 12.2343 18.2969 12.3515C18.2969 12.6445 18.5898 12.9374 19 12.9374C19.4102 12.9374 19.7031 12.7617 19.7031 12.4101C19.7057 11.8901 19.1039 11.7163 18.9414 11.4726C18.8242 11.2968 18.8828 11.1796 18.9999 11.0624C18.7656 11.121 18.6484 11.2851 18.6484 11.4726Z\" fill=\"black\"/>",
    "pieceOverlaySvg": "\n      <path d=\"M18 11.5H27\" stroke=\"#FF0000\" strokeLinecap=\"round\"/>\n      <path d=\"M18 12H27\" stroke=\"#FF5900\" strokeLinecap=\"round\"/>\n      <path d=\"M18 12.5H27\" stroke=\"#FFF200\" strokeLinecap=\"round\"/>\n      <path d=\"M25.6484 11.4726C25.6484 11.8242 26 11.8828 26 12.1758C26 12.2929 25.8828 12.4687 25.7071 12.4687C25.5313 12.4687 25.4141 12.2929 25.5312 11.9999C25.3554 12.1171 25.2969 12.2343 25.2969 12.3515C25.2969 12.6445 25.5898 12.9374 26 12.9374C26.4102 12.9374 26.7031 12.7617 26.7031 12.4101C26.7057 11.8901 26.1039 11.7163 25.9414 11.4726C25.8242 11.2968 25.8828 11.1796 25.9999 11.0624C25.7656 11.121 25.6484 11.2851 25.6484 11.4726Z\" fill=\"black\"/>\n      <path d=\"M23.6484 11.4726C23.6484 11.8242 24 11.8828 24 12.1758C24 12.2929 23.8828 12.4687 23.7071 12.4687C23.5313 12.4687 23.4141 12.2929 23.5312 11.9999C23.3554 12.1171 23.2969 12.2343 23.2969 12.3515C23.2969 12.6445 23.5898 12.9374 24 12.9374C24.4102 12.9374 24.7031 12.7617 24.7031 12.4101C24.7057 11.8901 24.1039 11.7163 23.9414 11.4726C23.8242 11.2968 23.8828 11.1796 23.9999 11.0624C23.7656 11.121 23.6484 11.2851 23.6484 11.4726Z\" fill=\"black\"/>\n      <path d=\"M20.6484 11.4726C20.6484 11.8242 21 11.8828 21 12.1758C21 12.2929 20.8828 12.4687 20.7071 12.4687C20.5313 12.4687 20.4141 12.2929 20.5312 11.9999C20.3554 12.1171 20.2969 12.2343 20.2969 12.3515C20.2969 12.6445 20.5898 12.9374 21 12.9374C21.4102 12.9374 21.7031 12.7617 21.7031 12.4101C21.7057 11.8901 21.1039 11.7163 20.9414 11.4726C20.8242 11.2968 20.8828 11.1796 20.9999 11.0624C20.7656 11.121 20.6484 11.2851 20.6484 11.4726Z\" fill=\"black\"/>\n      <path d=\"M18.6484 11.4726C18.6484 11.8242 19 11.8828 19 12.1758C19 12.2929 18.8828 12.4687 18.7071 12.4687C18.5313 12.4687 18.4141 12.2929 18.5312 11.9999C18.3554 12.1171 18.2969 12.2343 18.2969 12.3515C18.2969 12.6445 18.5898 12.9374 19 12.9374C19.4102 12.9374 19.7031 12.7617 19.7031 12.4101C19.7057 11.8901 19.1039 11.7163 18.9414 11.4726C18.8242 11.2968 18.8828 11.1796 18.9999 11.0624C18.7656 11.121 18.6484 11.2851 18.6484 11.4726Z\" fill=\"black\"/>",
    "combos": [
      {
        "withId": "pawn-double",
        "bonusDescription": "Pawns can move up to 4 squares forward, any time.",
        "bonusTag": "SPRINT"
      }
    ]
  },
  {
    "id": "promotion-halfway",
    "name": "Vanguard Banner",
    "description": "Your pawns promote to Queens upon reaching the 6th row instead of the last one.",
    "rarity": "epic",
    "pieceFamily": "pawn",
    "iconViewBox": "27 14 11 14",
    "iconSvg": "<path d=\"M29 26V16H35.4L37 18.5L35.4 21H29\" fill=\"#713F12\"/>\n<path d=\"M29 26V16H35.4L37 18.5L35.4 21H29\" stroke=\"#EAB308\"/>\n",
    "pieceOverlaySvg": "<path d=\"M29 26V16H35.4L37 18.5L35.4 21H29\" fill=\"#713F12\"/>\n<path d=\"M29 26V16H35.4L37 18.5L35.4 21H29\" stroke=\"#EAB308\"/>\n",
    "combos": []
  },
  {
    "id": "knight-teleport",
    "name": "Phase Armor",
    "description": "Knights can also move 1 square in any direction (like a King), in addition to their normal jump.",
    "rarity": "rare",
    "pieceFamily": "knight",
    "iconViewBox": "15 20 24 18",
    "iconSvg": "\n      <path d=\"M38 28.5L33.5 31H24L20.5 28.5L16.5 32.5L19.5 36L24 38.5H33.5L37 36L39 34L38 28.5Z\" fill=\"#515151\" stroke=\"#515151\"/>\n      <path d=\"M20 29L24 31.5H33.5L37.5 29.5\" stroke=\"#1C1C1C\"/>\n      <path d=\"M17 32.5L19.5 35.5L24 38H33.5L38.5 34.5\" stroke=\"#1C1C1C\"/>\n      <path d=\"M21.5 27L24.5 29H33.5L38 26L37 21.5L33.5 24H24.5L22.5 23L21.5 27Z\" fill=\"#515151\" stroke=\"#515151\"/>\n      <path d=\"M37.5 26L33.5 28.5H24L22 27\" stroke=\"#1C1C1C\"/>\n      <path d=\"M37 22.5L33.5 25H24.5L23 24\" stroke=\"#1C1C1C\"/>\n      <path d=\"M24 26.5H25\" stroke=\"#D900FF\"/>\n      <path d=\"M28 26.5H29\" stroke=\"#D900FF\"/>\n      <path d=\"M32 26.5H33\" stroke=\"#D900FF\"/>\n      <path d=\"M20 32.5H21\" stroke=\"#D900FF\"/>\n      <path d=\"M26 34.5H27\" stroke=\"#D900FF\"/>\n      <path d=\"M33 33.5H34\" stroke=\"#D900FF\"/>",
    "pieceOverlaySvg": "\n      <path d=\"M38 28.5L33.5 31H24L20.5 28.5L16.5 32.5L19.5 36L24 38.5H33.5L37 36L39 34L38 28.5Z\" fill=\"#515151\" stroke=\"#515151\"/>\n      <path d=\"M20 29L24 31.5H33.5L37.5 29.5\" stroke=\"#1C1C1C\"/>\n      <path d=\"M17 32.5L19.5 35.5L24 38H33.5L38.5 34.5\" stroke=\"#1C1C1C\"/>\n      <path d=\"M21.5 27L24.5 29H33.5L38 26L37 21.5L33.5 24H24.5L22.5 23L21.5 27Z\" fill=\"#515151\" stroke=\"#515151\"/>\n      <path d=\"M37.5 26L33.5 28.5H24L22 27\" stroke=\"#1C1C1C\"/>\n      <path d=\"M37 22.5L33.5 25H24.5L23 24\" stroke=\"#1C1C1C\"/>\n      <path d=\"M24 26.5H25\" stroke=\"#D900FF\"/>\n      <path d=\"M28 26.5H29\" stroke=\"#D900FF\"/>\n      <path d=\"M32 26.5H33\" stroke=\"#D900FF\"/>\n      <path d=\"M20 32.5H21\" stroke=\"#D900FF\"/>\n      <path d=\"M26 34.5H27\" stroke=\"#D900FF\"/>\n      <path d=\"M33 33.5H34\" stroke=\"#D900FF\"/>",
    "combos": []
  },
  {
    "id": "knight-mirror",
    "name": "Glass Mirror Shield",
    "description": "Knights can also slide up to 2 squares horizontally or vertically in a straight line.",
    "rarity": "rare",
    "pieceFamily": "knight",
    "iconViewBox": "28 22 16 16",
    "iconSvg": "\n      <path d=\"M43 30C43 27.6667 41.6 23 36 23C30.4 23 29 27.6667 29 30C29 32.3333 30.4 37 36 37C41.6 37 43 32.3333 43 30Z\" fill=\"#E8E8E8\" stroke=\"#AEABAB\"/>\n      <path d=\"M34.8333 28.8333L37.1667 31.1667\" stroke=\"#2D2D2D\"/>\n      <path d=\"M37.1667 28.8333L34.8333 31.1667\" stroke=\"#2D2D2D\"/>",
    "pieceOverlaySvg": "\n      <path d=\"M43 30C43 27.6667 41.6 23 36 23C30.4 23 29 27.6667 29 30C29 32.3333 30.4 37 36 37C41.6 37 43 32.3333 43 30Z\" fill=\"#E8E8E8\" stroke=\"#AEABAB\"/>\n      <path d=\"M34.8333 28.8333L37.1667 31.1667\" stroke=\"#2D2D2D\"/>\n      <path d=\"M37.1667 28.8333L34.8333 31.1667\" stroke=\"#2D2D2D\"/>",
    "combos": []
  },
  {
    "id": "knight-charge",
    "name": "Grandmaster Lance",
    "description": "Knights can also leap exactly 3 squares forward or backward in a straight line.",
    "rarity": "rare",
    "pieceFamily": "knight",
    "iconViewBox": "1 1 8 38",
    "iconSvg": "\n      <path d=\"M3.20711 25.0299L4.70711 0.0299461L6.20711 25.0299L7.20711 29.5299L8.20711 30.5299H1.20711L2.20711 29.5299L3.20711 25.0299Z\" fill=\"#484848\" stroke=\"#484848\"/>\n      <path d=\"M4.20711 31.0299V37.0299H5.20711V31.0299\" stroke=\"#543700\"/>\n      <path d=\"M3.70711 32.0299H5.70711\" stroke=\"#CE8600\"/>\n      <path d=\"M3.70711 35.0299H5.70711\" stroke=\"#CE8600\"/>\n      <path d=\"M3.70711 37.5299H5.70711\" stroke=\"#CE8600\"/>\n      <path d=\"M1.70711 29.0299L7.20711 27.0299\" stroke=\"#3C3C3C\"/>\n      <path d=\"M2.70711 25.0299L6.70711 23.5299\" stroke=\"#3C3C3C\"/>\n      <path d=\"M2.70711 21.5299L6.70711 19.5299\" stroke=\"#3C3C3C\"/>\n      <path d=\"M3.20711 17.0299L6.20711 16.0299\" stroke=\"#3C3C3C\"/>\n      <path d=\"M3.20711 13.0299L6.20711 12.0299\" stroke=\"#3C3C3C\"/>\n      <path d=\"M3.70711 9.02995L5.70711 8.02995\" stroke=\"#3C3C3C\"/>\n      <path d=\"M4.20711 5.02995L5.20711 4.02995\" stroke=\"#3C3C3C\"/>",
    "pieceOverlaySvg": "\n      <path d=\"M3.20711 25.0299L4.70711 0.0299461L6.20711 25.0299L7.20711 29.5299L8.20711 30.5299H1.20711L2.20711 29.5299L3.20711 25.0299Z\" fill=\"#484848\" stroke=\"#484848\"/>\n      <path d=\"M4.20711 31.0299V37.0299H5.20711V31.0299\" stroke=\"#543700\"/>\n      <path d=\"M3.70711 32.0299H5.70711\" stroke=\"#CE8600\"/>\n      <path d=\"M3.70711 35.0299H5.70711\" stroke=\"#CE8600\"/>\n      <path d=\"M3.70711 37.5299H5.70711\" stroke=\"#CE8600\"/>",
    "combos": []
  },
  {
    "id": "extra-knight",
    "name": "Cavalry Signet",
    "description": "Adds one extra Knight to your side at the start of each round.",
    "rarity": "common",
    "pieceFamily": "knight",
    "iconViewBox": "0 0 24 24",
    "iconSvg": "\n      <polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\" stroke=\"#F59E0B\" fill=\"#78350F\" strokeWidth=\"1.5\"/>",
    "pieceOverlaySvg": null,
    "combos": []
  },
  {
    "id": "knight-wide",
    "name": "Outflanker's Boots",
    "description": "Knights can also jump in a (3,1) L-shape instead of only (2,1).",
    "rarity": "epic",
    "pieceFamily": "knight",
    "iconViewBox": "13 31 27 6",
    "iconSvg": "<path d=\"M29 33V39H39V37.5L38 35.5H32.5V33H29Z\" fill=\"#D900FF\" stroke=\"#683900\"/>\n<path d=\"M29 39V40\" stroke=\"#4B2900\"/>\n<path d=\"M31 39V40\" stroke=\"#4B2900\"/>\n<path d=\"M33 39V40\" stroke=\"#4B2900\"/>\n<path d=\"M35 39V40\" stroke=\"#4B2900\"/>\n<path d=\"M37 39V40\" stroke=\"#4B2900\"/>\n<path d=\"M39 39V40\" stroke=\"#4B2900\"/>\n<path d=\"M24 33V39H14V37.5L15 35.5H20.5V33H24Z\" fill=\"#D900FF\" stroke=\"#683900\"/>\n<path d=\"M24 39V40\" stroke=\"#4B2900\"/>\n<path d=\"M22 39V40\" stroke=\"#4B2900\"/>\n<path d=\"M20 39V40\" stroke=\"#4B2900\"/>\n<path d=\"M18 39V40\" stroke=\"#4B2900\"/>\n<path d=\"M16 39V40\" stroke=\"#4B2900\"/>\n<path d=\"M14 39V40\" stroke=\"#4B2900\"/>\n",
    "pieceOverlaySvg": "<path d=\"M29 33V39H39V37.5L38 35.5H32.5V33H29Z\" fill=\"#D900FF\" stroke=\"#683900\"/>\n<path d=\"M29 39V40\" stroke=\"#4B2900\"/>\n<path d=\"M31 39V40\" stroke=\"#4B2900\"/>\n<path d=\"M33 39V40\" stroke=\"#4B2900\"/>\n<path d=\"M35 39V40\" stroke=\"#4B2900\"/>\n<path d=\"M37 39V40\" stroke=\"#4B2900\"/>\n<path d=\"M39 39V40\" stroke=\"#4B2900\"/>\n<path d=\"M24 33V39H14V37.5L15 35.5H20.5V33H24Z\" fill=\"#D900FF\" stroke=\"#683900\"/>\n<path d=\"M24 39V40\" stroke=\"#4B2900\"/>\n<path d=\"M22 39V40\" stroke=\"#4B2900\"/>\n<path d=\"M20 39V40\" stroke=\"#4B2900\"/>\n<path d=\"M18 39V40\" stroke=\"#4B2900\"/>\n<path d=\"M16 39V40\" stroke=\"#4B2900\"/>\n<path d=\"M14 39V40\" stroke=\"#4B2900\"/>\n",
    "combos": []
  },
  {
    "id": "bishop-hop",
    "name": "Cloak of Shrouds",
    "description": "Bishops can jump over exactly one piece.",
    "rarity": "rare",
    "pieceFamily": "bishop",
    "iconViewBox": "5 26 35 14",
    "iconSvg": "<path d=\"M5 38L16 26H29L40 38L34 40L28.5 38L24 40L19 38L13 40L5 38Z\" fill=\"#3C3C3C\" stroke=\"#3C3C3C\"/>\n<path d=\"M28.5 26.5H16.5L6 38L13 39.5L19 37.5L24 39.5L28.5 37.5L34 39.5L38.5 38L28.5 26.5Z\" stroke=\"#2C2C2C\"/>\n<path d=\"M12 39L22.5 27L34 39L22.5 33L12 39Z\" stroke=\"#2C2C2C\"/>\n",
    "pieceOverlaySvg": "<path d=\"M5 38L16 26H29L40 38L34 40L28.5 38L24 40L19 38L13 40L5 38Z\" fill=\"#3C3C3C\" stroke=\"#3C3C3C\"/>\n<path d=\"M28.5 26.5H16.5L6 38L13 39.5L19 37.5L24 39.5L28.5 37.5L34 39.5L38.5 38L28.5 26.5Z\" stroke=\"#2C2C2C\"/>\n<path d=\"M12 39L22.5 27L34 39L22.5 33L12 39Z\" stroke=\"#2C2C2C\"/>\n",
    "combos": []
  },
  {
    "id": "bishop-orthogonal",
    "name": "Souldust Bracelets",
    "description": "Bishops can also move exactly 1 square horizontally or vertically.",
    "rarity": "common",
    "pieceFamily": "bishop",
    "iconViewBox": "10 35 25 4",
    "iconSvg": "<path d=\"M13 35L13.5 36V38L13 39\" stroke=\"#FFCC00\"/>\n<path d=\"M10 35L10.5 36V38L10 39\" stroke=\"#FFCC00\"/>\n<path d=\"M10 37H11\" stroke=\"#4400FF\"/>\n<path d=\"M13 37H14\" stroke=\"#4400FF\"/>\n<path d=\"M32 35L31.5 36V38L32 39\" stroke=\"#FFCC00\"/>\n<path d=\"M35 35L34.5 36V38L35 39\" stroke=\"#FFCC00\"/>\n<path d=\"M35 37H34\" stroke=\"#4400FF\"/>\n<path d=\"M32 37H31\" stroke=\"#4400FF\"/>\n",
    "pieceOverlaySvg": "<path d=\"M13 35L13.5 36V38L13 39\" stroke=\"#FFCC00\"/>\n<path d=\"M10 35L10.5 36V38L10 39\" stroke=\"#FFCC00\"/>\n<path d=\"M10 37H11\" stroke=\"#4400FF\"/>\n<path d=\"M13 37H14\" stroke=\"#4400FF\"/>\n<path d=\"M32 35L31.5 36V38L32 39\" stroke=\"#FFCC00\"/>\n<path d=\"M35 35L34.5 36V38L35 39\" stroke=\"#FFCC00\"/>\n<path d=\"M35 37H34\" stroke=\"#4400FF\"/>\n<path d=\"M32 37H31\" stroke=\"#4400FF\"/>",
    "combos": [
      {
        "withId": "bishop-extended",
        "bonusDescription": "Orthogonal range increases to 3 squares.",
        "bonusTag": "EXTENDED REACH"
      }
    ]
  },
  {
    "id": "bishop-ethereal",
    "name": "Staff of Whispers",
    "description": "Bishops can pass through friendly pieces.",
    "rarity": "epic",
    "pieceFamily": "bishop",
    "iconViewBox": "33 5 10 31",
    "iconSvg": "<path d=\"M37.5 36H36.5V13H37.5V36Z\" stroke=\"#935100\"/>\n<path d=\"M37 15V16\" stroke=\"#FF5252\"/>\n<path d=\"M37 19V20\" stroke=\"#FF5252\"/>\n<path d=\"M37 23V24\" stroke=\"#FF5252\"/>\n<path d=\"M37 27V28\" stroke=\"#FF5252\"/>\n<path d=\"M37 31V32\" stroke=\"#FF5252\"/>\n<path d=\"M37 35V36\" stroke=\"#FF5252\"/>\n<path d=\"M34 11L37 13.5L40 11L37 5L34 11Z\" fill=\"#FF0000\"/>\n<path d=\"M33 8L32 7M37 13.5L34 11L37 5L40 11L37 13.5Z\" stroke=\"#FF0000\"/>\n<path d=\"M35 6L34 5\" stroke=\"#FF0000\"/>\n<path d=\"M39 6L40 5\" stroke=\"#FF0000\"/>\n<path d=\"M41 8L42 7\" stroke=\"#FF0000\"/>\n<path d=\"M37 13V5\" stroke=\"#FF5252\"/>\n<path d=\"M34 11H40\" stroke=\"#FF5252\"/>\n",
    "pieceOverlaySvg": "<path d=\"M37.5 36H36.5V13H37.5V36Z\" stroke=\"#935100\"/>\n<path d=\"M37 15V16\" stroke=\"#FF5252\"/>\n<path d=\"M37 19V20\" stroke=\"#FF5252\"/>\n<path d=\"M37 23V24\" stroke=\"#FF5252\"/>\n<path d=\"M37 27V28\" stroke=\"#FF5252\"/>\n<path d=\"M37 31V32\" stroke=\"#FF5252\"/>\n<path d=\"M37 35V36\" stroke=\"#FF5252\"/>\n<path d=\"M34 11L37 13.5L40 11L37 5L34 11Z\" fill=\"#FF0000\"/>\n<path d=\"M33 8L32 7M37 13.5L34 11L37 5L40 11L37 13.5Z\" stroke=\"#FF0000\"/>\n<path d=\"M35 6L34 5\" stroke=\"#FF0000\"/>\n<path d=\"M39 6L40 5\" stroke=\"#FF0000\"/>\n<path d=\"M41 8L42 7\" stroke=\"#FF0000\"/>\n<path d=\"M37 13V5\" stroke=\"#FF5252\"/>\n<path d=\"M34 11H40\" stroke=\"#FF5252\"/>\n",
    "combos": []
  },
  {
    "id": "bishop-extended",
    "name": "Lens of Far Sight",
    "description": "Bishops can also move exactly 1 square horizontally or vertically up to 3 squares.",
    "rarity": "rare",
    "pieceFamily": "bishop",
    "iconViewBox": "22 12 11 12",
    "iconSvg": "<g clip-path=\"url(#clip0_3_128)\">\n<path d=\"M27 21.1667C29.3012 21.1667 31.1667 19.3012 31.1667 17C31.1667 14.6988 29.3012 12.8333 27 12.8333C24.6988 12.8333 22.8333 14.6988 22.8333 17C22.8333 19.3012 24.6988 21.1667 27 21.1667Z\" stroke=\"#C061CB\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M29.1655 15.75C29.124 15.6782 29.079 15.6087 29.0308 15.5417\" stroke=\"#C061CB\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M29.4213 17.625C29.1951 18.5035 28.5035 19.1951 27.625 19.4213\" stroke=\"#C061CB\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</g>\n<path d=\"M30.985 16C31.845 20.9029 31.1323 22.8178 30.6685 23.1624\" stroke=\"#C061CB\"/>\n<defs>\n<clipPath id=\"clip0_3_128\">\n<rect width=\"10\" height=\"10\" fill=\"white\" transform=\"translate(22 12)\"/>\n</clipPath>\n</defs>\n",
    "pieceOverlaySvg": "<g clip-path=\"url(#clip0_3_128)\">\n<path d=\"M27 21.1667C29.3012 21.1667 31.1667 19.3012 31.1667 17C31.1667 14.6988 29.3012 12.8333 27 12.8333C24.6988 12.8333 22.8333 14.6988 22.8333 17C22.8333 19.3012 24.6988 21.1667 27 21.1667Z\" stroke=\"#C061CB\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M29.1655 15.75C29.124 15.6782 29.079 15.6087 29.0308 15.5417\" stroke=\"#C061CB\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M29.4213 17.625C29.1951 18.5035 28.5035 19.1951 27.625 19.4213\" stroke=\"#C061CB\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</g>\n<path d=\"M30.985 16C31.845 20.9029 31.1323 22.8178 30.6685 23.1624\" stroke=\"#C061CB\"/>\n<defs>\n<clipPath id=\"clip0_3_128\">\n<rect width=\"10\" height=\"10\" fill=\"white\" transform=\"translate(22 12)\"/>\n</clipPath>\n</defs>\n",
    "combos": [
      {
        "withId": "bishop-orthogonal",
        "bonusDescription": "Orthogonal range increases to 3 squares.",
        "bonusTag": "EXTENDED REACH"
      }
    ]
  },
  {
    "id": "rook-hop",
    "name": "Citadel Gatekeeper Aegis",
    "description": "Rooks can jump over exactly one piece along their path.",
    "rarity": "rare",
    "pieceFamily": "rook",
    "iconViewBox": "19 16 8 18",
    "iconSvg": "<circle cx=\"22.5\" cy=\"24.5\" r=\"3.5\" fill=\"#FFCC00\"/>\n<path d=\"M22.5 17L21.5 19H23.5L22.5 17Z\" fill=\"#FFCC00\" stroke=\"#FFCC00\"/>\n<path d=\"M22.5 32L21.5 30H23.5L22.5 32Z\" fill=\"#FFCC00\" stroke=\"#FFCC00\"/>\n",
    "pieceOverlaySvg": "<circle cx=\"22.5\" cy=\"24.5\" r=\"3.5\" fill=\"#FFCC00\"/>\n<path d=\"M22.5 17L21.5 19H23.5L22.5 17Z\" fill=\"#FFCC00\" stroke=\"#FFCC00\"/>\n<path d=\"M22.5 32L21.5 30H23.5L22.5 32Z\" fill=\"#FFCC00\" stroke=\"#FFCC00\"/>\n",
    "combos": []
  },
  {
    "id": "rook-diagonal",
    "name": "Chariot Wheels",
    "description": "Rooks can also move 1 square diagonally.",
    "rarity": "common",
    "pieceFamily": "rook",
    "iconViewBox": "7 36 31 4",
    "iconSvg": "<g clip-path=\"url(#clip0_3_180)\">\n<g filter=\"url(#filter0_d_3_180)\">\n<path d=\"M22.5 37C26.535 37 30.2078 37.0749 32.8896 37.1982C34.2231 37.2596 35.3535 37.3347 36.1709 37.4235C36.5727 37.4672 36.959 37.5205 37.2646 37.5892C37.5266 37.6481 38 37.7801 38 38C38 38.2199 37.5266 38.3519 37.2646 38.4108C36.959 38.4795 36.5727 38.5328 36.1709 38.5765C35.3535 38.6653 34.2231 38.7404 32.8896 38.8018C30.2078 38.9251 26.535 39 22.5 39C18.465 39 14.7922 38.9251 12.1104 38.8018C10.7769 38.7404 9.64647 38.6653 8.8291 38.5765C8.42734 38.5328 8.04101 38.4795 7.73535 38.4108C7.47335 38.3519 7 38.2199 7 38C7 37.7801 7.47335 37.6481 7.73535 37.5892C8.04101 37.5205 8.42734 37.4672 8.8291 37.4235C9.64647 37.3347 10.7769 37.2596 12.1104 37.1982C14.7922 37.0749 18.465 37 22.5 37Z\" fill=\"#C16A00\"/>\n</g>\n<circle cx=\"10\" cy=\"38\" r=\"2\" fill=\"#683900\"/>\n<circle cx=\"15\" cy=\"38\" r=\"2\" fill=\"#683900\"/>\n<circle cx=\"20\" cy=\"38\" r=\"2\" fill=\"#683900\"/>\n<circle cx=\"30\" cy=\"38\" r=\"2\" fill=\"#683900\"/>\n<circle cx=\"25\" cy=\"38\" r=\"2\" fill=\"#683900\"/>\n<circle cx=\"35\" cy=\"38\" r=\"2\" fill=\"#683900\"/>\n</g>\n<defs>\n<filter id=\"filter0_d_3_180\" x=\"3\" y=\"37\" width=\"39\" height=\"10\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n<feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/>\n<feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"/>\n<feOffset dy=\"4\"/>\n<feGaussianBlur stdDeviation=\"2\"/>\n<feComposite in2=\"hardAlpha\" operator=\"out\"/>\n<feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0\"/>\n<feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_3_180\"/>\n<feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_3_180\" result=\"shape\"/>\n</filter>\n<clipPath id=\"clip0_3_180\">\n<rect width=\"45\" height=\"45\" fill=\"white\"/>\n</clipPath>\n</defs>\n",
    "pieceOverlaySvg": "<g clip-path=\"url(#clip0_3_180)\">\n<g filter=\"url(#filter0_d_3_180)\">\n<path d=\"M22.5 37C26.535 37 30.2078 37.0749 32.8896 37.1982C34.2231 37.2596 35.3535 37.3347 36.1709 37.4235C36.5727 37.4672 36.959 37.5205 37.2646 37.5892C37.5266 37.6481 38 37.7801 38 38C38 38.2199 37.5266 38.3519 37.2646 38.4108C36.959 38.4795 36.5727 38.5328 36.1709 38.5765C35.3535 38.6653 34.2231 38.7404 32.8896 38.8018C30.2078 38.9251 26.535 39 22.5 39C18.465 39 14.7922 38.9251 12.1104 38.8018C10.7769 38.7404 9.64647 38.6653 8.8291 38.5765C8.42734 38.5328 8.04101 38.4795 7.73535 38.4108C7.47335 38.3519 7 38.2199 7 38C7 37.7801 7.47335 37.6481 7.73535 37.5892C8.04101 37.5205 8.42734 37.4672 8.8291 37.4235C9.64647 37.3347 10.7769 37.2596 12.1104 37.1982C14.7922 37.0749 18.465 37 22.5 37Z\" fill=\"#C16A00\"/>\n</g>\n<circle cx=\"10\" cy=\"38\" r=\"2\" fill=\"#683900\"/>\n<circle cx=\"15\" cy=\"38\" r=\"2\" fill=\"#683900\"/>\n<circle cx=\"20\" cy=\"38\" r=\"2\" fill=\"#683900\"/>\n<circle cx=\"30\" cy=\"38\" r=\"2\" fill=\"#683900\"/>\n<circle cx=\"25\" cy=\"38\" r=\"2\" fill=\"#683900\"/>\n<circle cx=\"35\" cy=\"38\" r=\"2\" fill=\"#683900\"/>\n</g>\n<defs>\n<filter id=\"filter0_d_3_180\" x=\"3\" y=\"37\" width=\"39\" height=\"10\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n<feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/>\n<feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"/>\n<feOffset dy=\"4\"/>\n<feGaussianBlur stdDeviation=\"2\"/>\n<feComposite in2=\"hardAlpha\" operator=\"out\"/>\n<feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0\"/>\n<feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_3_180\"/>\n<feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_3_180\" result=\"shape\"/>\n</filter>\n<clipPath id=\"clip0_3_180\">\n<rect width=\"45\" height=\"45\" fill=\"white\"/>\n</clipPath>\n</defs>\n",
    "combos": [
      {
        "withId": "rook-diagonal-full",
        "bonusDescription": "Diagonal range extends to full board range.",
        "bonusTag": "QUEEN'S WHEEL"
      }
    ]
  },
  {
    "id": "extra-rook",
    "name": "Citadel's Crown",
    "description": "Adds one extra Rook to your side at the start of each round.",
    "rarity": "epic",
    "pieceFamily": "rook",
    "iconViewBox": "0 0 24 24",
    "iconSvg": "\n      <path d=\"M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z\" stroke=\"#FDE047\" fill=\"#713F12\"/>\n      <rect x=\"5\" y=\"18\" width=\"14\" height=\"3\" rx=\"1\" stroke=\"#EAB308\" fill=\"#451A03\"/>\n      <circle cx=\"12\" cy=\"11\" r=\"1\" fill=\"#FEF08A\"/>",
    "pieceOverlaySvg": null,
    "combos": []
  },
  {
    "id": "rook-diagonal-full",
    "name": "Iron Coating",
    "description": "Rooks can also move diagonally up to 3 squares.",
    "rarity": "epic",
    "pieceFamily": "rook",
    "iconViewBox": "11 12 24 23",
    "iconSvg": "<path d=\"M34.5 12H10.5V14H34.5V12Z\" fill=\"#BCBCBC\" stroke=\"#D9D9D9\"/>\n<path d=\"M12 13H13\" stroke=\"#11FF00\"/>\n<path d=\"M14 13H15\" stroke=\"#11FF00\"/>\n<path d=\"M16 13H17\" stroke=\"#11FF00\"/>\n<path d=\"M18 13H19\" stroke=\"#11FF00\"/>\n<path d=\"M20 13H21\" stroke=\"#11FF00\"/>\n<path d=\"M22 13H23\" stroke=\"#11FF00\"/>\n<path d=\"M24 13H25\" stroke=\"#11FF00\"/>\n<path d=\"M26 13H27\" stroke=\"#11FF00\"/>\n<path d=\"M28 13H29\" stroke=\"#11FF00\"/>\n<path d=\"M30 13H31\" stroke=\"#11FF00\"/>\n<path d=\"M32 13H33\" stroke=\"#11FF00\"/>\n<path d=\"M33.5 32.5H11.5V34.5H33.5V32.5Z\" fill=\"#BCBCBC\" stroke=\"#D9D9D9\"/>\n<path d=\"M13 33.5H14\" stroke=\"#11FF00\"/>\n<path d=\"M15 33.5H16\" stroke=\"#11FF00\"/>\n<path d=\"M17 33.5H18\" stroke=\"#11FF00\"/>\n<path d=\"M19 33.5H20\" stroke=\"#11FF00\"/>\n<path d=\"M21 33.5H22\" stroke=\"#11FF00\"/>\n<path d=\"M23 33.5H24\" stroke=\"#11FF00\"/>\n<path d=\"M25 33.5H26\" stroke=\"#11FF00\"/>\n<path d=\"M27 33.5H28\" stroke=\"#11FF00\"/>\n<path d=\"M29 33.5H30\" stroke=\"#11FF00\"/>\n<path d=\"M31 33.5H32\" stroke=\"#11FF00\"/>\n",
    "pieceOverlaySvg": "<path d=\"M34.5 12H10.5V14H34.5V12Z\" fill=\"#BCBCBC\" stroke=\"#D9D9D9\"/>\n<path d=\"M12 13H13\" stroke=\"#11FF00\"/>\n<path d=\"M14 13H15\" stroke=\"#11FF00\"/>\n<path d=\"M16 13H17\" stroke=\"#11FF00\"/>\n<path d=\"M18 13H19\" stroke=\"#11FF00\"/>\n<path d=\"M20 13H21\" stroke=\"#11FF00\"/>\n<path d=\"M22 13H23\" stroke=\"#11FF00\"/>\n<path d=\"M24 13H25\" stroke=\"#11FF00\"/>\n<path d=\"M26 13H27\" stroke=\"#11FF00\"/>\n<path d=\"M28 13H29\" stroke=\"#11FF00\"/>\n<path d=\"M30 13H31\" stroke=\"#11FF00\"/>\n<path d=\"M32 13H33\" stroke=\"#11FF00\"/>\n<path d=\"M33.5 32.5H11.5V34.5H33.5V32.5Z\" fill=\"#BCBCBC\" stroke=\"#D9D9D9\"/>\n<path d=\"M13 33.5H14\" stroke=\"#11FF00\"/>\n<path d=\"M15 33.5H16\" stroke=\"#11FF00\"/>\n<path d=\"M17 33.5H18\" stroke=\"#11FF00\"/>\n<path d=\"M19 33.5H20\" stroke=\"#11FF00\"/>\n<path d=\"M21 33.5H22\" stroke=\"#11FF00\"/>\n<path d=\"M23 33.5H24\" stroke=\"#11FF00\"/>\n<path d=\"M25 33.5H26\" stroke=\"#11FF00\"/>\n<path d=\"M27 33.5H28\" stroke=\"#11FF00\"/>\n<path d=\"M29 33.5H30\" stroke=\"#11FF00\"/>\n<path d=\"M31 33.5H32\" stroke=\"#11FF00\"/>\n",
    "combos": [
      {
        "withId": "rook-diagonal",
        "bonusDescription": "Diagonal range extends to full board range.",
        "bonusTag": "QUEEN'S WHEEL"
      }
    ]
  },
  {
    "id": "castling-extra-rook",
    "name": "Ironclad Defiance",
    "description": "When you castle, a new Rook appears at the corner square the castling Rook vacated.",
    "rarity": "rare",
    "pieceFamily": "rook",
    "iconViewBox": "0 0 24 24",
    "iconSvg": "\n      <path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\" stroke=\"#34D399\" fill=\"#022C22\"/>\n      <path d=\"m9 11 2 2 4-4\" stroke=\"#6EE7B7\" strokeWidth=\"2\"/>",
    "pieceOverlaySvg": null,
    "combos": []
  },
  {
    "id": "queen-hop",
    "name": "Sunfire Scepter",
    "description": "Your Queen can jump over exactly one piece along horizontal or vertical paths.",
    "rarity": "rare",
    "pieceFamily": "queen",
    "iconViewBox": "32 5 12 35",
    "iconSvg": "<g filter=\"url(#filter0_d_8_83)\">\n<circle cx=\"38\" cy=\"12.5\" r=\"4.5\" fill=\"#FF5E00\"/>\n</g>\n<path d=\"M37 12.5L38 13.5L39 12.5L38 11.5L37 12.5Z\" fill=\"#FF0000\" stroke=\"#FF0000\"/>\n<path d=\"M37 19L38 18L39 19V36L38 37L37 36V19Z\" fill=\"#FFCC00\" stroke=\"#FFCC00\"/>\n<defs>\n<filter id=\"filter0_d_8_83\" x=\"32.5\" y=\"7\" width=\"11\" height=\"11\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n<feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/>\n<feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"/>\n<feMorphology radius=\"1\" operator=\"dilate\" in=\"SourceAlpha\" result=\"effect1_dropShadow_8_83\"/>\n<feOffset/>\n<feComposite in2=\"hardAlpha\" operator=\"out\"/>\n<feColorMatrix type=\"matrix\" values=\"0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0\"/>\n<feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_8_83\"/>\n<feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_8_83\" result=\"shape\"/>\n</filter>\n</defs>\n",
    "pieceOverlaySvg": "<g filter=\"url(#filter0_d_8_83)\">\n<circle cx=\"38\" cy=\"12.5\" r=\"4.5\" fill=\"#FF5E00\"/>\n</g>\n<path d=\"M37 12.5L38 13.5L39 12.5L38 11.5L37 12.5Z\" fill=\"#FF0000\" stroke=\"#FF0000\"/>\n<path d=\"M37 19L38 18L39 19V36L38 37L37 36V19Z\" fill=\"#FFCC00\" stroke=\"#FFCC00\"/>\n<defs>\n<filter id=\"filter0_d_8_83\" x=\"32.5\" y=\"7\" width=\"11\" height=\"11\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n<feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/>\n<feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"/>\n<feMorphology radius=\"1\" operator=\"dilate\" in=\"SourceAlpha\" result=\"effect1_dropShadow_8_83\"/>\n<feOffset/>\n<feComposite in2=\"hardAlpha\" operator=\"out\"/>\n<feColorMatrix type=\"matrix\" values=\"0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0\"/>\n<feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_8_83\"/>\n<feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_8_83\" result=\"shape\"/>\n</filter>\n</defs>",
    "combos": []
  },
  {
    "id": "queen-extra-capture",
    "name": "Blade of the Sovereign",
    "description": "Your Queen can capture a second adjacent enemy piece immediately after capturing one, if available.",
    "rarity": "epic",
    "pieceFamily": "queen",
    "iconViewBox": "6 8 7 27",
    "iconSvg": "\n      <path d=\"M7 30.7903H10V13.7581L8.5 9.5L7 13.7581V30.7903Z\" fill=\"#FFCC00\"/>\n      <path d=\"M7 13.7581L8.5 9.5L10 13.7581V30.7903H7V13.7581ZM7 13.7581V31.5\" stroke=\"#FFF200\"/>\n      <path d=\"M8.5 12.5V29.1154M8.5 29.1154L7.5 30.5M8.5 29.1154L9.5 30.5\" stroke=\"#CBA200\"/>\n      <path d=\"M8 32V36H9V32H8Z\" fill=\"#AEABAB\" stroke=\"#AEABAB\"/>\n      <path d=\"M8 33H9\" stroke=\"#FFCC00\"/>\n      <path d=\"M8 35.5H9\" stroke=\"#FFCC00\"/>\n      <path d=\"M5 31L6.5 31.5H10.5L11.5 31\" stroke=\"#808080\"/>",
    "pieceOverlaySvg": "\n      <path d=\"M7 30.7903H10V13.7581L8.5 9.5L7 13.7581V30.7903Z\" fill=\"#FFCC00\"/>\n      <path d=\"M7 13.7581L8.5 9.5L10 13.7581V30.7903H7V13.7581ZM7 13.7581V31.5\" stroke=\"#FFF200\"/>\n      <path d=\"M8.5 12.5V29.1154M8.5 29.1154L7.5 30.5M8.5 29.1154L9.5 30.5\" stroke=\"#CBA200\"/>\n      <path d=\"M8 32V36H9V32H8Z\" fill=\"#AEABAB\" stroke=\"#AEABAB\"/>\n      <path d=\"M8 33H9\" stroke=\"#FFCC00\"/>\n      <path d=\"M8 35.5H9\" stroke=\"#FFCC00\"/>\n      <path d=\"M5 31L6.5 31.5H10.5L11.5 31\" stroke=\"#808080\"/>",
    "combos": []
  },
  {
    "id": "queen-ghost",
    "name": "Veil of the Emperor",
    "description": "Your Queen can pass through friendly pieces.",
    "rarity": "rare",
    "pieceFamily": "queen",
    "iconViewBox": "16 23 14 14",
    "iconSvg": "<path d=\"M21.25 28.8333H21.2552M24.75 28.8333H24.7552M18.9167 28.8333C18.9167 26.5782 20.7448 24.75 23 24.75C25.2552 24.75 27.0833 26.5782 27.0833 28.8333V35.25L26.6066 34.9322C26.153 34.6298 25.9263 34.4787 25.6862 34.436C25.4745 34.3983 25.2566 34.4199 25.0564 34.4983C24.8294 34.5872 24.6367 34.7799 24.2512 35.1654C24.2045 35.2121 24.1288 35.2121 24.082 35.1654C23.8189 34.903 23.6736 34.765 23.518 34.6879C23.1916 34.5261 22.8084 34.5261 22.482 34.6879C22.3264 34.765 22.181 34.903 21.918 35.1654C21.8712 35.2121 21.7955 35.2121 21.7487 35.1654C21.3633 34.7799 21.1706 34.5872 20.9436 34.4983C20.7434 34.4199 20.5254 34.3983 20.3137 34.436C20.0737 34.4787 19.8469 34.6298 19.3934 34.9322L18.9167 35.25V28.8333Z\" stroke=\"#3584E4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>",
    "pieceOverlaySvg": "<path d=\"M21.25 28.8333H21.2552M24.75 28.8333H24.7552M18.9167 28.8333C18.9167 26.5782 20.7448 24.75 23 24.75C25.2552 24.75 27.0833 26.5782 27.0833 28.8333V35.25L26.6066 34.9322C26.153 34.6298 25.9263 34.4787 25.6862 34.436C25.4745 34.3983 25.2566 34.4199 25.0564 34.4983C24.8294 34.5872 24.6367 34.7799 24.2512 35.1654C24.2045 35.2121 24.1288 35.2121 24.082 35.1654C23.8189 34.903 23.6736 34.765 23.518 34.6879C23.1916 34.5261 22.8084 34.5261 22.482 34.6879C22.3264 34.765 22.181 34.903 21.918 35.1654C21.8712 35.2121 21.7955 35.2121 21.7487 35.1654C21.3633 34.7799 21.1706 34.5872 20.9436 34.4983C20.7434 34.4199 20.5254 34.3983 20.3137 34.436C20.0737 34.4787 19.8469 34.6298 19.3934 34.9322L18.9167 35.25V28.8333Z\" stroke=\"#3584E4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n",
    "combos": []
  },
  {
    "id": "king-jump",
    "name": "Sovereign Crown",
    "description": "Your King can also move in an L-shape like a Knight.",
    "rarity": "common",
    "pieceFamily": "king",
    "iconViewBox": "15 5 16 7",
    "iconSvg": "<path d=\"M30 13H15V6H17L18 7.5H21V5.5C21 4 24 4 24 5.5V7.5L27 7.5L28 6H30V13Z\" fill=\"#FFCC00\" stroke=\"#FFCC00\"/>\n<circle cx=\"22.5\" cy=\"6\" r=\"1.5\" fill=\"#FF0000\"/>\n<path d=\"M23.5 12V9\" stroke=\"black\"/>\n<path d=\"M25 9.5H23\" stroke=\"black\"/>\n<path d=\"M21.5 12V9\" stroke=\"black\"/>\n<path d=\"M20 9.5H22\" stroke=\"black\"/>\n<path d=\"M18.5 12V10\" stroke=\"black\"/>\n<path d=\"M16 10.5H19\" stroke=\"black\"/>\n<path d=\"M26.5 12V10\" stroke=\"black\"/>\n<path d=\"M29 10.5H26\" stroke=\"black\"/>\n",
    "pieceOverlaySvg": "<path d=\"M30 13H15V6H17L18 7.5H21V5.5C21 4 24 4 24 5.5V7.5L27 7.5L28 6H30V13Z\" fill=\"#FFCC00\" stroke=\"#FFCC00\"/>\n<circle cx=\"22.5\" cy=\"6\" r=\"1.5\" fill=\"#FF0000\"/>\n<path d=\"M23.5 12V9\" stroke=\"black\"/>\n<path d=\"M25 9.5H23\" stroke=\"black\"/>\n<path d=\"M21.5 12V9\" stroke=\"black\"/>\n<path d=\"M20 9.5H22\" stroke=\"black\"/>\n<path d=\"M18.5 12V10\" stroke=\"black\"/>\n<path d=\"M16 10.5H19\" stroke=\"black\"/>\n<path d=\"M26.5 12V10\" stroke=\"black\"/>\n<path d=\"M29 10.5H26\" stroke=\"black\"/>\n",
    "combos": []
  },
  {
    "id": "king-double-step",
    "name": "Pendant of Foresight",
    "description": "Your King can move up to 2 squares in any direction instead of the usual 1.",
    "rarity": "rare",
    "pieceFamily": "king",
    "iconViewBox": "10 30 24 3",
    "iconSvg": "<path d=\"M10.5 31L14.6818 33.5L19.9091 34H25.1364L29.3182 33.5L33.5 31\" stroke=\"#FFCC00\"/>\n<path d=\"M22.5 34L25.0981 39.25H19.9019L22.5 34Z\" fill=\"#E4B600\"/>\n<path d=\"M22.5 35L24.2321 38.75H20.7679L22.5 35Z\" fill=\"#D900FF\"/>\n",
    "pieceOverlaySvg": "<path d=\"M10.5 31L14.6818 33.5L19.9091 34H25.1364L29.3182 33.5L33.5 31\" stroke=\"#FFCC00\"/>\n<path d=\"M22.5 34L25.0981 39.25H19.9019L22.5 34Z\" fill=\"#E4B600\"/>\n<path d=\"M22.5 35L24.2321 38.75H20.7679L22.5 35Z\" fill=\"#D900FF\"/>\n",
    "combos": [
      {
        "withId": "king-blink",
        "bonusDescription": "King blink range extends to 3 squares.",
        "bonusTag": "WARP STEP"
      }
    ]
  },
  {
    "id": "king-blink",
    "name": "Bracers of Blink",
    "description": "Your King can move exactly 2 squares horizontally or vertically to any empty square, ignoring pieces in between.",
    "rarity": "rare",
    "pieceFamily": "king",
    "iconViewBox": "6 15 33 14",
    "iconSvg": "<path d=\"M9.5 29C15.1684 25.9801 17.0789 23.3678 17.5 17L16.5 16C15.3399 22.3447 13.4988 24.9864 8 28L9.5 29Z\" fill=\"#D9D9D9\" stroke=\"#AEABAB\"/>\n<path d=\"M7.26316 26C12.0366 23.4447 13.6454 21.2343 14 15.8462L13.1579 15C12.181 20.3686 10.6306 22.6038 6 25.1538L7.26316 26Z\" fill=\"#D9D9D9\" stroke=\"#AEABAB\"/>\n<path d=\"M14 24.5L15 23.5\" stroke=\"#11FF00\"/>\n<path d=\"M11 22.5L12 21.5\" stroke=\"#11FF00\"/>\n<path d=\"M35.5 29C29.8316 25.9801 27.9211 23.3678 27.5 17L28.5 16C29.6601 22.3447 31.5012 24.9864 37 28L35.5 29Z\" fill=\"#D9D9D9\" stroke=\"#AEABAB\"/>\n<path d=\"M37.7368 26C32.9634 23.4447 31.3546 21.2343 31 15.8462L31.8421 15C32.819 20.3686 34.3694 22.6038 39 25.1538L37.7368 26Z\" fill=\"#D9D9D9\" stroke=\"#AEABAB\"/>\n<path d=\"M31 24.5L30 23.5\" stroke=\"#11FF00\"/>\n<path d=\"M34 22.5L33 21.5\" stroke=\"#11FF00\"/>\n",
    "pieceOverlaySvg": "<path d=\"M9.5 29C15.1684 25.9801 17.0789 23.3678 17.5 17L16.5 16C15.3399 22.3447 13.4988 24.9864 8 28L9.5 29Z\" fill=\"#D9D9D9\" stroke=\"#AEABAB\"/>\n<path d=\"M7.26316 26C12.0366 23.4447 13.6454 21.2343 14 15.8462L13.1579 15C12.181 20.3686 10.6306 22.6038 6 25.1538L7.26316 26Z\" fill=\"#D9D9D9\" stroke=\"#AEABAB\"/>\n<path d=\"M14 24.5L15 23.5\" stroke=\"#11FF00\"/>\n<path d=\"M11 22.5L12 21.5\" stroke=\"#11FF00\"/>\n<path d=\"M35.5 29C29.8316 25.9801 27.9211 23.3678 27.5 17L28.5 16C29.6601 22.3447 31.5012 24.9864 37 28L35.5 29Z\" fill=\"#D9D9D9\" stroke=\"#AEABAB\"/>\n<path d=\"M37.7368 26C32.9634 23.4447 31.3546 21.2343 31 15.8462L31.8421 15C32.819 20.3686 34.3694 22.6038 39 25.1538L37.7368 26Z\" fill=\"#D9D9D9\" stroke=\"#AEABAB\"/>\n<path d=\"M31 24.5L30 23.5\" stroke=\"#11FF00\"/>\n<path d=\"M34 22.5L33 21.5\" stroke=\"#11FF00\"/>\n",
    "combos": [
      {
        "withId": "king-double-step",
        "bonusDescription": "King blink range extends to 3 squares.",
        "bonusTag": "WARP STEP"
      }
    ]
  },
  {
    "id": "king-shield",
    "name": "Aegis of the Guard",
    "description": "Your King cannot be captured while at least one friendly piece is defending it.",
    "rarity": "epic",
    "pieceFamily": "king",
    "iconViewBox": "20 17 6 15",
    "iconSvg": "<circle cx=\"22.5\" cy=\"24.5\" r=\"3.5\" fill=\"#FFCC00\"/>\n<path d=\"M20.5 20L22.5 21L24.5 20V17H20.5V20Z\" fill=\"#D9D9D9\" stroke=\"#FFCC00\"/>\n<path d=\"M20.5 29L22.5 28L24.5 29V32H20.5V29Z\" fill=\"#D9D9D9\" stroke=\"#FFCC00\"/>\n",
    "pieceOverlaySvg": "<circle cx=\"22.5\" cy=\"24.5\" r=\"3.5\" fill=\"#FFCC00\"/>\n<path d=\"M20.5 20L22.5 21L24.5 20V17H20.5V20Z\" fill=\"#D9D9D9\" stroke=\"#FFCC00\"/>\n<path d=\"M20.5 29L22.5 28L24.5 29V32H20.5V29Z\" fill=\"#D9D9D9\" stroke=\"#FFCC00\"/>\n",
    "combos": []
  },
  {
    "id": "martyrdom",
    "name": "Martyrdom Sigil",
    "description": "When any of your pieces is captured, it explodes and removes all non-King pieces in adjacent squares.",
    "rarity": "rare",
    "pieceFamily": "general",
    "iconViewBox": "0 0 24 24",
    "iconSvg": "\n      <polygon points=\"12,2 22,21 2,21\" stroke=\"#F87171\" fill=\"#450A0A\" strokeWidth=\"2\"/>\n      <line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"14\" stroke=\"#FCA5A5\" strokeWidth=\"2\"/>\n      <circle cx=\"12\" cy=\"18\" r=\"1\" fill=\"#FCA5A5\"/>",
    "pieceOverlaySvg": null,
    "combos": []
  },
  {
    "id": "castling-explosion",
    "name": "Thunderclasp",
    "description": "When you castle, all enemy pieces adjacent to the King are immediately removed.",
    "rarity": "rare",
    "pieceFamily": "general",
    "iconViewBox": "0 0 24 24",
    "iconSvg": "\n      <polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\" stroke=\"#FDE047\" fill=\"#78350F\" strokeWidth=\"1.5\"/>",
    "pieceOverlaySvg": null,
    "combos": []
  }
]

export default ALL_ARTIFACTS;