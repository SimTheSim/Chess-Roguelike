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
    "combos": [
      {
        "withId": "knight-mirror",
        "bonusDescription": "Knights can not be captured by pawns.",
        "bonusTag": "ARMY KNIGHT"
      }
    ]
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
    "combos": [
      {
        "withId": "knight-teleport",
        "bonusDescription": "Knights can not be captured by pawns.",
        "bonusTag": "ARMY KNIGHT"
      }
    ]
  },
  {
    "id": "knight-charge",
    "name": "Grandmaster Lance",
    "description": "Knights can also leap exactly 3 squares forward or backward in a straight line.",
    "rarity": "common",
    "pieceFamily": "knight",
    "iconViewBox": "1 1 8 38",
    "iconSvg": "\n      <path d=\"M3.20711 25.0299L4.70711 0.0299461L6.20711 25.0299L7.20711 29.5299L8.20711 30.5299H1.20711L2.20711 29.5299L3.20711 25.0299Z\" fill=\"#484848\" stroke=\"#484848\"/>\n      <path d=\"M4.20711 31.0299V37.0299H5.20711V31.0299\" stroke=\"#543700\"/>\n      <path d=\"M3.70711 32.0299H5.70711\" stroke=\"#CE8600\"/>\n      <path d=\"M3.70711 35.0299H5.70711\" stroke=\"#CE8600\"/>\n      <path d=\"M3.70711 37.5299H5.70711\" stroke=\"#CE8600\"/>\n      <path d=\"M1.70711 29.0299L7.20711 27.0299\" stroke=\"#3C3C3C\"/>\n      <path d=\"M2.70711 25.0299L6.70711 23.5299\" stroke=\"#3C3C3C\"/>\n      <path d=\"M2.70711 21.5299L6.70711 19.5299\" stroke=\"#3C3C3C\"/>\n      <path d=\"M3.20711 17.0299L6.20711 16.0299\" stroke=\"#3C3C3C\"/>\n      <path d=\"M3.20711 13.0299L6.20711 12.0299\" stroke=\"#3C3C3C\"/>\n      <path d=\"M3.70711 9.02995L5.70711 8.02995\" stroke=\"#3C3C3C\"/>\n      <path d=\"M4.20711 5.02995L5.20711 4.02995\" stroke=\"#3C3C3C\"/>",
    "pieceOverlaySvg": "\n      <path d=\"M3.20711 25.0299L4.70711 0.0299461L6.20711 25.0299L7.20711 29.5299L8.20711 30.5299H1.20711L2.20711 29.5299L3.20711 25.0299Z\" fill=\"#484848\" stroke=\"#484848\"/>\n      <path d=\"M4.20711 31.0299V37.0299H5.20711V31.0299\" stroke=\"#543700\"/>\n      <path d=\"M3.70711 32.0299H5.70711\" stroke=\"#CE8600\"/>\n      <path d=\"M3.70711 35.0299H5.70711\" stroke=\"#CE8600\"/>\n      <path d=\"M3.70711 37.5299H5.70711\" stroke=\"#CE8600\"/>",
    "combos": []
  },
  {
    "id": "extra-knight",
    "name": "Cavalry Signet",
    "description": "Adds one extra Knight to your side.",
    "rarity": "common",
    "pieceFamily": "knight",
    "iconViewBox": "0 0 45 45",
    "iconSvg": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M22 10C32.5 11 38.5 18 38 39H15C15 30 25 32.5 23 18\" fill=\"#FF5252\"/>\n<path d=\"M22 10C32.5 11 38.5 18 38 39H15C15 30 25 32.5 23 18\" stroke=\"#FF5252\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M24 18C24.38 20.91 18.45 25.37 16 27C13 29 13.18 31.34 11 31C9.958 30.06 12.41 27.96 11 28C10 28 11.19 29.23 10 30C9 30 5.997 31 6 26C6 24 12 14 12 14C12 14 13.89 12.1 14 10.5C13.27 9.506 13.5 8.5 13.5 7.5C14.5 6.5 16.5 10 16.5 10H18.5C18.5 10 19.28 8.008 21 7C22 7 22 10 22 10\" fill=\"#FF5252\"/>\n<path d=\"M24 18C24.38 20.91 18.45 25.37 16 27C13 29 13.18 31.34 11 31C9.958 30.06 12.41 27.96 11 28C10 28 11.19 29.23 10 30C9 30 5.997 31 6 26C6 24 12 14 12 14C12 14 13.89 12.1 14 10.5C13.27 9.506 13.5 8.5 13.5 7.5C14.5 6.5 16.5 10 16.5 10H18.5C18.5 10 19.28 8.008 21 7C22 7 22 10 22 10\" stroke=\"#FF5252\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.5 25.5C9.5 25.6326 9.44732 25.7598 9.35355 25.8536C9.25979 25.9473 9.13261 26 9 26C8.86739 26 8.74021 25.9473 8.64645 25.8536C8.55268 25.7598 8.5 25.6326 8.5 25.5C8.5 25.3674 8.55268 25.2402 8.64645 25.1464C8.74021 25.0527 8.86739 25 9 25C9.13261 25 9.25979 25.0527 9.35355 25.1464C9.44732 25.2402 9.5 25.3674 9.5 25.5ZM14.933 15.75C14.8345 15.9215 14.7255 16.0851 14.6123 16.2312C14.4992 16.3773 14.3841 16.5032 14.2737 16.6015C14.1632 16.6998 14.0597 16.7686 13.969 16.804C13.8782 16.8394 13.8021 16.8406 13.745 16.8077C13.6879 16.7747 13.6509 16.7082 13.6362 16.6119C13.6215 16.5156 13.6293 16.3915 13.6593 16.2468C13.6892 16.102 13.7406 15.9394 13.8106 15.7683C13.8806 15.5972 13.9677 15.4211 14.067 15.25C14.1655 15.0785 14.2745 14.9149 14.3877 14.7688C14.5008 14.6227 14.6159 14.4968 14.7263 14.3985C14.8368 14.3002 14.9403 14.2314 15.031 14.196C15.1218 14.1606 15.1979 14.1594 15.255 14.1923C15.3121 14.2253 15.3491 14.2918 15.3638 14.3881C15.3785 14.4844 15.3707 14.6085 15.3407 14.7532C15.3108 14.898 15.2594 15.0606 15.1894 15.2317C15.1194 15.4028 15.0323 15.5789 14.933 15.75Z\" fill=\"#FF5252\" stroke=\"#FF5252\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M34 6V12M34 6V12\" stroke=\"#FF5252\" stroke-width=\"2\" stroke-linejoin=\"round\"/>\n<path d=\"M31 9L37 9\" stroke=\"#FF5252\" stroke-width=\"2\" stroke-linejoin=\"round\"/>\n",
    "pieceOverlaySvg": null,
    "combos": [
      {
        "withId": "knight-diagonal",
        "bonusDescription": "Adds one extra Bishop to your side.",
        "bonusTag": "SMALL PIECES"
      }
    ]
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
    "description": "Adds one extra Rook to your side.",
    "rarity": "epic",
    "pieceFamily": "rook",
    "iconViewBox": "0 0 24 24",
    "iconSvg": "\n      <path d=\"M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z\" stroke=\"#FDE047\" fill=\"#713F12\"/>\n      <rect x=\"5\" y=\"18\" width=\"14\" height=\"3\" rx=\"1\" stroke=\"#EAB308\" fill=\"#451A03\"/>\n      <circle cx=\"12\" cy=\"11\" r=\"1\" fill=\"#FEF08A\"/>",
    "pieceOverlaySvg": null,
    "combos": [
      {
        "withId": "rook-promote",
        "bonusDescription": "Lose your extra rook. Instead, turn your left and right-most pawns into rooks.",
        "bonusTag": "AMERICAN JOKE"
      }
    ]
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
    "rarity": "common",
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
    "combos": [
      {
        "withId": "king-double-step",
        "bonusDescription": "Your King can jump in a (3,1) L-shape. Yeah.",
        "bonusTag": "CAMEL KING"
      }
    ]
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
      },
      {
        "withId": "king-jump",
        "bonusDescription": "Your King can jump in a (3,1) L-shape. Yeah.",
        "bonusTag": "CAMEL KING"
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
  },
  {
    "id": "knight-diagonal",
    "name": "Crown of Thorns",
    "description": "Knights can also move diagonally for exactly 3 squares.",
    "rarity": "epic",
    "pieceFamily": "knight",
    "iconSvg": "<path d=\"M28.5 9L28.933 10.5H28.067L28.5 9Z\" fill=\"#065E00\"/>\n<path d=\"M26.5 9L26.933 10.5H26.067L26.5 9Z\" fill=\"#065E00\"/>\n<path d=\"M24.5 9L24.933 10.5H24.067L24.5 9Z\" fill=\"#065E00\"/>\n<path d=\"M22.5 9L22.933 10.5H22.067L22.5 9Z\" fill=\"#065E00\"/>\n<path d=\"M20.5 9L20.933 10.5H20.067L20.5 9Z\" fill=\"#065E00\"/>\n<path d=\"M18.5 9L18.933 10.5H18.067L18.5 9Z\" fill=\"#065E00\"/>\n<path d=\"M16.5 9L16.933 10.5H16.067L16.5 9Z\" fill=\"#065E00\"/>\n<path d=\"M14.5 9L14.933 10.5H14.067L14.5 9Z\" fill=\"#065E00\"/>\n<path d=\"M31.482 10.933L30.3995 12.058L29.9665 11.308L31.482 10.933Z\" fill=\"#065E00\"/>\n<path d=\"M11.45 10.933L12.9655 11.308L12.5325 12.058L11.45 10.933Z\" fill=\"#065E00\"/>\n<path d=\"M14.5 15L14.067 13.5H14.933L14.5 15Z\" fill=\"#065E00\"/>\n<path d=\"M12.5 15L12.067 13.5H12.933L12.5 15Z\" fill=\"#065E00\"/>\n<path d=\"M16.5 15L16.067 13.5H16.933L16.5 15Z\" fill=\"#065E00\"/>\n<path d=\"M18.5 15L18.067 13.5H18.933L18.5 15Z\" fill=\"#065E00\"/>\n<path d=\"M20.5 15L20.067 13.5H20.933L20.5 15Z\" fill=\"#065E00\"/>\n<path d=\"M22.5 15L22.067 13.5H22.933L22.5 15Z\" fill=\"#065E00\"/>\n<path d=\"M24.5 15L24.067 13.5H24.933L24.5 15Z\" fill=\"#065E00\"/>\n<path d=\"M26.5 15L26.067 13.5H26.933L26.5 15Z\" fill=\"#065E00\"/>\n<path d=\"M28.5 15L28.067 13.5H28.933L28.5 15Z\" fill=\"#065E00\"/>\n<path d=\"M30.5 15L30.067 13.5H30.933L30.5 15Z\" fill=\"#065E00\"/>\n<path d=\"M13.5 11L12.5 13H30.5L29.5 11H13.5Z\" fill=\"#065E00\" stroke=\"#0BA500\"/>",
    "iconViewBox": "11 9 20 6",
    "pieceOverlaySvg": "<path d=\"M28.5 9L28.933 10.5H28.067L28.5 9Z\" fill=\"#065E00\"/>\n<path d=\"M26.5 9L26.933 10.5H26.067L26.5 9Z\" fill=\"#065E00\"/>\n<path d=\"M24.5 9L24.933 10.5H24.067L24.5 9Z\" fill=\"#065E00\"/>\n<path d=\"M22.5 9L22.933 10.5H22.067L22.5 9Z\" fill=\"#065E00\"/>\n<path d=\"M20.5 9L20.933 10.5H20.067L20.5 9Z\" fill=\"#065E00\"/>\n<path d=\"M18.5 9L18.933 10.5H18.067L18.5 9Z\" fill=\"#065E00\"/>\n<path d=\"M16.5 9L16.933 10.5H16.067L16.5 9Z\" fill=\"#065E00\"/>\n<path d=\"M14.5 9L14.933 10.5H14.067L14.5 9Z\" fill=\"#065E00\"/>\n<path d=\"M31.482 10.933L30.3995 12.058L29.9665 11.308L31.482 10.933Z\" fill=\"#065E00\"/>\n<path d=\"M11.45 10.933L12.9655 11.308L12.5325 12.058L11.45 10.933Z\" fill=\"#065E00\"/>\n<path d=\"M14.5 15L14.067 13.5H14.933L14.5 15Z\" fill=\"#065E00\"/>\n<path d=\"M12.5 15L12.067 13.5H12.933L12.5 15Z\" fill=\"#065E00\"/>\n<path d=\"M16.5 15L16.067 13.5H16.933L16.5 15Z\" fill=\"#065E00\"/>\n<path d=\"M18.5 15L18.067 13.5H18.933L18.5 15Z\" fill=\"#065E00\"/>\n<path d=\"M20.5 15L20.067 13.5H20.933L20.5 15Z\" fill=\"#065E00\"/>\n<path d=\"M22.5 15L22.067 13.5H22.933L22.5 15Z\" fill=\"#065E00\"/>\n<path d=\"M24.5 15L24.067 13.5H24.933L24.5 15Z\" fill=\"#065E00\"/>\n<path d=\"M26.5 15L26.067 13.5H26.933L26.5 15Z\" fill=\"#065E00\"/>\n<path d=\"M28.5 15L28.067 13.5H28.933L28.5 15Z\" fill=\"#065E00\"/>\n<path d=\"M30.5 15L30.067 13.5H30.933L30.5 15Z\" fill=\"#065E00\"/>\n<path d=\"M13.5 11L12.5 13H30.5L29.5 11H13.5Z\" fill=\"#065E00\" stroke=\"#0BA500\"/>",
    "combos": [
      {
        "withId": "extra-knight",
        "bonusDescription": "Adds one extra Bishop to your side.",
        "bonusTag": "SMALL PIECES"
      }
    ]
  },
  {
    "id": "bishop-knight",
    "name": "Lantern of Imitation",
    "description": "Bishops can also move like a knight.",
    "rarity": "epic",
    "pieceFamily": "bishop",
    "iconSvg": "<path d=\"M12.6168 18.6766H11.1177V18.4558H11.7795C11.7795 18.1913 11.7795 17.8824 11.3824 17.8824C11.1618 17.3972 10.5883 17 9 17C7.41183 17 6.83827 17.3972 6.61758 17.8825C6.2205 17.8825 6.2205 18.1913 6.2205 18.4558H6.88228V18.6766H5.38324C4.89537 18.6766 4.50007 19.0719 4.49995 19.5599V21.1907C4.49995 21.4464 4.61077 21.6895 4.8037 21.8574L5.27349 22.2657C5.38941 22.3665 5.45588 22.5126 5.45588 22.6662C5.45588 22.6664 5.45588 22.7461 5.45588 22.8744C5.45588 23.2592 5.45588 24.0795 5.45588 24.4846C5.45702 24.7952 5.55884 25.1179 5.70811 25.3782C5.78346 25.5081 5.87093 25.6226 5.97272 25.7111C5.99365 25.7293 6.01594 25.7454 6.03832 25.7611C6.02002 25.781 6.00108 25.8003 5.98341 25.8208C5.85335 25.9716 5.7439 26.1422 5.66742 26.3345C5.59095 26.5268 5.54794 26.7405 5.54813 26.974C5.54813 27.8217 5.54813 28.8237 5.54813 28.8237V29H9H12.4518V28.8236C12.4518 28.8236 12.4518 27.8217 12.4518 26.9739C12.4518 26.7404 12.4091 26.5268 12.3326 26.3345C12.2457 26.1158 12.1164 25.9262 11.9626 25.7603C12.0256 25.7161 12.0831 25.6623 12.1358 25.6012C12.2551 25.4612 12.3543 25.284 12.4269 25.0906C12.4987 24.8973 12.5439 24.6886 12.5441 24.4846C12.5441 24.2147 12.5441 23.7599 12.5441 23.3728C12.5441 23.1792 12.5441 23.0026 12.5441 22.8744C12.5441 22.7461 12.5441 22.6663 12.5441 22.6661C12.5441 22.5125 12.6104 22.3665 12.7264 22.2656L13.1963 21.8573C13.3893 21.6895 13.5 21.4463 13.5 21.1906V19.5598C13.4998 19.0719 13.1048 18.6766 12.6168 18.6766ZM6.88231 24.809V25.1314C6.68374 25.2417 6.48827 25.3648 6.30999 25.5081C6.30286 25.5062 6.29555 25.5039 6.28645 25.4999C6.24563 25.4818 6.18851 25.4378 6.13212 25.3715C6.04685 25.2725 5.96304 25.1262 5.90381 24.9672C5.84407 24.8079 5.80861 24.6353 5.80892 24.4846C5.80892 24.2147 5.80892 23.7599 5.80892 23.3728C5.80892 23.1792 5.80892 23.0026 5.80892 22.8744C5.80892 22.7461 5.80892 22.6663 5.80892 22.6661C5.80892 22.4104 5.69801 22.1673 5.50519 21.9994L5.03527 21.5909C4.91944 21.4903 4.8529 21.3442 4.8529 21.1906V19.5598C4.85299 19.4128 4.91201 19.2813 5.00827 19.1848C5.10485 19.0886 5.23627 19.0296 5.38327 19.0294H6.57387C6.1927 19.2476 5.57611 19.6015 5.42651 19.6913C5.20584 19.8235 5.11765 20.1765 5.55886 20.1765C5.69508 20.1765 6.08409 20.1765 6.55638 20.1765C6.55638 21.1498 6.55638 22.7542 6.55638 22.7542C6.55659 23.2077 6.72326 23.6425 7.02438 23.961L7.24212 24.1912H6.44117V24.8089H6.88231V24.809ZM10.2721 24.1912H7.72802L7.28074 23.7185C7.04562 23.4705 6.90909 23.1211 6.90931 22.7542C6.90931 22.7542 6.90931 21.1498 6.90931 20.1766C7.67906 20.1766 8.54749 20.1766 8.91181 20.1766C8.91181 20.1766 8.97741 20.1766 9.08831 20.1766C9.45256 20.1766 10.321 20.1766 11.0907 20.1766C11.0907 21.1498 11.0907 22.7542 11.0907 22.7542C11.0909 23.1211 10.9544 23.4705 10.7194 23.7185L10.2721 24.1912ZM13.147 21.1906C13.147 21.3443 13.0804 21.4903 12.9645 21.591L12.495 21.9995C12.302 22.1673 12.1911 22.4104 12.1911 22.6662C12.1911 22.6664 12.1911 22.7461 12.1911 22.8744C12.1911 23.2592 12.1911 24.0795 12.1911 24.4846C12.1924 24.7144 12.107 24.9944 11.9865 25.2016C11.9266 25.3054 11.8582 25.3909 11.7964 25.4441C11.7655 25.4709 11.7368 25.4893 11.7136 25.5C11.7037 25.5044 11.6956 25.5067 11.688 25.509C11.51 25.3656 11.3161 25.2421 11.1177 25.1319V24.809H11.5587V24.1913H11.3824H10.758L10.9757 23.9611C11.2767 23.6426 11.4435 23.2078 11.4436 22.7543C11.4436 22.7543 11.4436 21.1499 11.4436 20.1766C11.9159 20.1766 12.3049 20.1766 12.4412 20.1766C12.8825 20.1766 12.7942 19.8236 12.5736 19.6914C12.4238 19.6016 11.8073 19.2477 11.4262 19.0295H12.6168C12.7636 19.0297 12.8953 19.0887 12.9918 19.1849C13.088 19.2814 13.147 19.4128 13.147 19.5599V21.1906H13.147Z\" fill=\"#1C71D8\"/>\n<path d=\"M8 22L9 21\" stroke=\"#FF0000\"/>\n<path d=\"M10 22L9 21\" stroke=\"#FF0000\"/>\n<path d=\"M10 22L9 23\" stroke=\"#FF0000\"/>\n<path d=\"M8 22L9 23\" stroke=\"#FF0000\"/>",
    "iconViewBox": "3 17 12 12",
    "pieceOverlaySvg": "<path d=\"M12.6168 18.6766H11.1177V18.4558H11.7795C11.7795 18.1913 11.7795 17.8824 11.3824 17.8824C11.1618 17.3972 10.5883 17 9 17C7.41183 17 6.83827 17.3972 6.61758 17.8825C6.2205 17.8825 6.2205 18.1913 6.2205 18.4558H6.88228V18.6766H5.38324C4.89537 18.6766 4.50007 19.0719 4.49995 19.5599V21.1907C4.49995 21.4464 4.61077 21.6895 4.8037 21.8574L5.27349 22.2657C5.38941 22.3665 5.45588 22.5126 5.45588 22.6662C5.45588 22.6664 5.45588 22.7461 5.45588 22.8744C5.45588 23.2592 5.45588 24.0795 5.45588 24.4846C5.45702 24.7952 5.55884 25.1179 5.70811 25.3782C5.78346 25.5081 5.87093 25.6226 5.97272 25.7111C5.99365 25.7293 6.01594 25.7454 6.03832 25.7611C6.02002 25.781 6.00108 25.8003 5.98341 25.8208C5.85335 25.9716 5.7439 26.1422 5.66742 26.3345C5.59095 26.5268 5.54794 26.7405 5.54813 26.974C5.54813 27.8217 5.54813 28.8237 5.54813 28.8237V29H9H12.4518V28.8236C12.4518 28.8236 12.4518 27.8217 12.4518 26.9739C12.4518 26.7404 12.4091 26.5268 12.3326 26.3345C12.2457 26.1158 12.1164 25.9262 11.9626 25.7603C12.0256 25.7161 12.0831 25.6623 12.1358 25.6012C12.2551 25.4612 12.3543 25.284 12.4269 25.0906C12.4987 24.8973 12.5439 24.6886 12.5441 24.4846C12.5441 24.2147 12.5441 23.7599 12.5441 23.3728C12.5441 23.1792 12.5441 23.0026 12.5441 22.8744C12.5441 22.7461 12.5441 22.6663 12.5441 22.6661C12.5441 22.5125 12.6104 22.3665 12.7264 22.2656L13.1963 21.8573C13.3893 21.6895 13.5 21.4463 13.5 21.1906V19.5598C13.4998 19.0719 13.1048 18.6766 12.6168 18.6766ZM6.88231 24.809V25.1314C6.68374 25.2417 6.48827 25.3648 6.30999 25.5081C6.30286 25.5062 6.29555 25.5039 6.28645 25.4999C6.24563 25.4818 6.18851 25.4378 6.13212 25.3715C6.04685 25.2725 5.96304 25.1262 5.90381 24.9672C5.84407 24.8079 5.80861 24.6353 5.80892 24.4846C5.80892 24.2147 5.80892 23.7599 5.80892 23.3728C5.80892 23.1792 5.80892 23.0026 5.80892 22.8744C5.80892 22.7461 5.80892 22.6663 5.80892 22.6661C5.80892 22.4104 5.69801 22.1673 5.50519 21.9994L5.03527 21.5909C4.91944 21.4903 4.8529 21.3442 4.8529 21.1906V19.5598C4.85299 19.4128 4.91201 19.2813 5.00827 19.1848C5.10485 19.0886 5.23627 19.0296 5.38327 19.0294H6.57387C6.1927 19.2476 5.57611 19.6015 5.42651 19.6913C5.20584 19.8235 5.11765 20.1765 5.55886 20.1765C5.69508 20.1765 6.08409 20.1765 6.55638 20.1765C6.55638 21.1498 6.55638 22.7542 6.55638 22.7542C6.55659 23.2077 6.72326 23.6425 7.02438 23.961L7.24212 24.1912H6.44117V24.8089H6.88231V24.809ZM10.2721 24.1912H7.72802L7.28074 23.7185C7.04562 23.4705 6.90909 23.1211 6.90931 22.7542C6.90931 22.7542 6.90931 21.1498 6.90931 20.1766C7.67906 20.1766 8.54749 20.1766 8.91181 20.1766C8.91181 20.1766 8.97741 20.1766 9.08831 20.1766C9.45256 20.1766 10.321 20.1766 11.0907 20.1766C11.0907 21.1498 11.0907 22.7542 11.0907 22.7542C11.0909 23.1211 10.9544 23.4705 10.7194 23.7185L10.2721 24.1912ZM13.147 21.1906C13.147 21.3443 13.0804 21.4903 12.9645 21.591L12.495 21.9995C12.302 22.1673 12.1911 22.4104 12.1911 22.6662C12.1911 22.6664 12.1911 22.7461 12.1911 22.8744C12.1911 23.2592 12.1911 24.0795 12.1911 24.4846C12.1924 24.7144 12.107 24.9944 11.9865 25.2016C11.9266 25.3054 11.8582 25.3909 11.7964 25.4441C11.7655 25.4709 11.7368 25.4893 11.7136 25.5C11.7037 25.5044 11.6956 25.5067 11.688 25.509C11.51 25.3656 11.3161 25.2421 11.1177 25.1319V24.809H11.5587V24.1913H11.3824H10.758L10.9757 23.9611C11.2767 23.6426 11.4435 23.2078 11.4436 22.7543C11.4436 22.7543 11.4436 21.1499 11.4436 20.1766C11.9159 20.1766 12.3049 20.1766 12.4412 20.1766C12.8825 20.1766 12.7942 19.8236 12.5736 19.6914C12.4238 19.6016 11.8073 19.2477 11.4262 19.0295H12.6168C12.7636 19.0297 12.8953 19.0887 12.9918 19.1849C13.088 19.2814 13.147 19.4128 13.147 19.5599V21.1906H13.147Z\" fill=\"#1C71D8\"/>\n<path d=\"M8 22L9 21\" stroke=\"#FF0000\"/>\n<path d=\"M10 22L9 21\" stroke=\"#FF0000\"/>\n<path d=\"M10 22L9 23\" stroke=\"#FF0000\"/>\n<path d=\"M8 22L9 23\" stroke=\"#FF0000\"/>",
    "combos": []
  },
  {
    "id": "bishop-yo-yo",
    "name": "\"Magic\" Yo-yo",
    "description": "Bishops can always move back to their starting squares.",
    "rarity": "common",
    "pieceFamily": "bishop",
    "iconSvg": "<path d=\"M22.9228 11.8611C24.9044 11.8611 26.5108 10.1209 26.5108 7.97417C26.5108 5.82747 24.9044 4.08722 22.9228 4.08722C20.9411 4.08722 19.3347 5.82747 19.3347 7.97417C19.3347 10.1209 20.9411 11.8611 22.9228 11.8611Z\" fill=\"#BE1931\"/>\n<path d=\"M22.3247 11.8611C24.3063 11.8611 25.9128 10.1209 25.9128 7.97417C25.9128 5.82747 24.3063 4.08722 22.3247 4.08722C20.3431 4.08722 18.7367 5.82747 18.7367 7.97417C18.7367 10.1209 20.3431 11.8611 22.3247 11.8611Z\" fill=\"#A0041E\"/>\n<path d=\"M25.8605 5.81694C25.4042 5.81694 24.9003 5.58778 24.4086 5.36444C23.8186 5.09611 23.208 4.81833 22.8919 5.05528L22.5678 4.62333C23.14 4.19444 23.8983 4.53917 24.6319 4.87278C25.1939 5.12833 25.7755 5.39167 26.1117 5.22361C26.2961 5.13167 26.4325 4.89167 26.5169 4.51083L27.0444 4.62806C26.9211 5.18361 26.6947 5.53639 26.3528 5.70722C26.1996 5.78187 26.031 5.81945 25.8605 5.81694Z\" fill=\"#99AAB5\"/>\n<path d=\"M21.7269 11.8611C23.7086 11.8611 25.315 10.1209 25.315 7.97417C25.315 5.82747 23.7086 4.08722 21.7269 4.08722C19.7453 4.08722 18.1389 5.82747 18.1389 7.97417C18.1389 10.1209 19.7453 11.8611 21.7269 11.8611Z\" fill=\"#DD2E44\"/>\n<path d=\"M21.5772 10.8722C22.9808 10.8722 24.1186 9.57472 24.1186 7.97417C24.1186 6.37361 22.9808 5.07611 21.5772 5.07611C20.1736 5.07611 19.0358 6.37361 19.0358 7.97417C19.0358 9.57472 20.1736 10.8722 21.5772 10.8722Z\" fill=\"#EA596E\"/>\n<path d=\"M26.7808 4.83944C26.1114 4.83944 25.7006 3.89556 25.7006 3.21917C25.7006 2.54278 26.1044 2.13889 26.7808 2.13889C27.4572 2.13889 27.8611 2.54278 27.8611 3.21917C27.8611 3.89583 27.4503 4.83944 26.7808 4.83944ZM26.7808 2.67889C26.4075 2.67889 26.2408 2.84556 26.2408 3.21889C26.2408 3.74056 26.5578 4.29917 26.7808 4.29917C27.0039 4.29917 27.3208 3.74056 27.3208 3.21889C27.3211 2.84556 27.1544 2.67889 26.7808 2.67889Z\" fill=\"#99AAB5\"/>\n</g>\n<defs>\n<clipPath id=\"clip0_3_128\">\n<rect width=\"10\" height=\"10\" fill=\"white\" transform=\"translate(18 2)\"/>\n</clipPath>\n</defs>",
    "iconViewBox": "18 2 10 10",
    "pieceOverlaySvg": "<path d=\"M22.9228 11.8611C24.9044 11.8611 26.5108 10.1209 26.5108 7.97417C26.5108 5.82747 24.9044 4.08722 22.9228 4.08722C20.9411 4.08722 19.3347 5.82747 19.3347 7.97417C19.3347 10.1209 20.9411 11.8611 22.9228 11.8611Z\" fill=\"#BE1931\"/>\n<path d=\"M22.3247 11.8611C24.3063 11.8611 25.9128 10.1209 25.9128 7.97417C25.9128 5.82747 24.3063 4.08722 22.3247 4.08722C20.3431 4.08722 18.7367 5.82747 18.7367 7.97417C18.7367 10.1209 20.3431 11.8611 22.3247 11.8611Z\" fill=\"#A0041E\"/>\n<path d=\"M25.8605 5.81694C25.4042 5.81694 24.9003 5.58778 24.4086 5.36444C23.8186 5.09611 23.208 4.81833 22.8919 5.05528L22.5678 4.62333C23.14 4.19444 23.8983 4.53917 24.6319 4.87278C25.1939 5.12833 25.7755 5.39167 26.1117 5.22361C26.2961 5.13167 26.4325 4.89167 26.5169 4.51083L27.0444 4.62806C26.9211 5.18361 26.6947 5.53639 26.3528 5.70722C26.1996 5.78187 26.031 5.81945 25.8605 5.81694Z\" fill=\"#99AAB5\"/>\n<path d=\"M21.7269 11.8611C23.7086 11.8611 25.315 10.1209 25.315 7.97417C25.315 5.82747 23.7086 4.08722 21.7269 4.08722C19.7453 4.08722 18.1389 5.82747 18.1389 7.97417C18.1389 10.1209 19.7453 11.8611 21.7269 11.8611Z\" fill=\"#DD2E44\"/>\n<path d=\"M21.5772 10.8722C22.9808 10.8722 24.1186 9.57472 24.1186 7.97417C24.1186 6.37361 22.9808 5.07611 21.5772 5.07611C20.1736 5.07611 19.0358 6.37361 19.0358 7.97417C19.0358 9.57472 20.1736 10.8722 21.5772 10.8722Z\" fill=\"#EA596E\"/>\n<path d=\"M26.7808 4.83944C26.1114 4.83944 25.7006 3.89556 25.7006 3.21917C25.7006 2.54278 26.1044 2.13889 26.7808 2.13889C27.4572 2.13889 27.8611 2.54278 27.8611 3.21917C27.8611 3.89583 27.4503 4.83944 26.7808 4.83944ZM26.7808 2.67889C26.4075 2.67889 26.2408 2.84556 26.2408 3.21889C26.2408 3.74056 26.5578 4.29917 26.7808 4.29917C27.0039 4.29917 27.3208 3.74056 27.3208 3.21889C27.3211 2.84556 27.1544 2.67889 26.7808 2.67889Z\" fill=\"#99AAB5\"/>\n</g>\n<defs>\n<clipPath id=\"clip0_3_128\">\n<rect width=\"10\" height=\"10\" fill=\"white\" transform=\"translate(18 2)\"/>\n</clipPath>\n</defs>",
    "combos": []
  },
  {
    "id": "rook-promote",
    "name": "Target of Ambitions",
    "description": "Rooks promote to queens when reaching the last rank.",
    "rarity": "rare",
    "pieceFamily": "rook",
    "iconSvg": "<path d=\"M21.5 8V3H23.5V8H21.5Z\" fill=\"#935100\" stroke=\"#935100\"/>\n<circle cx=\"22.5\" cy=\"4.5\" r=\"3.5\" fill=\"#FF0000\"/>\n<circle cx=\"22.5\" cy=\"4.5\" r=\"3\" fill=\"white\"/>\n<circle cx=\"22.5\" cy=\"4.5\" r=\"2.5\" fill=\"#FF0000\"/>\n<circle cx=\"22.5\" cy=\"4.5\" r=\"2\" fill=\"white\"/>\n<circle cx=\"22.5\" cy=\"4.5\" r=\"1.5\" fill=\"#FF0000\"/>\n<circle cx=\"22.5\" cy=\"4.5\" r=\"1\" fill=\"white\"/>",
    "iconViewBox": "19 1 7 8",
    "pieceOverlaySvg": "<path d=\"M21.5 8V3H23.5V8H21.5Z\" fill=\"#935100\" stroke=\"#935100\"/>\n<circle cx=\"22.5\" cy=\"4.5\" r=\"3.5\" fill=\"#FF0000\"/>\n<circle cx=\"22.5\" cy=\"4.5\" r=\"3\" fill=\"white\"/>\n<circle cx=\"22.5\" cy=\"4.5\" r=\"2.5\" fill=\"#FF0000\"/>\n<circle cx=\"22.5\" cy=\"4.5\" r=\"2\" fill=\"white\"/>\n<circle cx=\"22.5\" cy=\"4.5\" r=\"1.5\" fill=\"#FF0000\"/>\n<circle cx=\"22.5\" cy=\"4.5\" r=\"1\" fill=\"white\"/>",
    "combos": [
      {
        "withId": "extra-rook",
        "bonusDescription": "Lose your extra rook. Instead, turn your left and right-most pawns into rooks.",
        "bonusTag": "AMERICAN JOKE"
      }
    ]
  },
  {
    "id": "queen-holy",
    "name": "Halo of Protection",
    "description": "Queens can't be taken when adjacent to a King, except by another queen.",
    "rarity": "common",
    "pieceFamily": "queen",
    "iconSvg": "<path d=\"M36 7C36 7.47662 35.6636 7.88691 35.1963 7.98047L30.1963 8.98047C30.1317 8.99338 30.0659 9 30 9H15C14.9341 9 14.8683 8.99338 14.8037 8.98047L9.80371 7.98047C9.33638 7.88691 9 7.47662 9 7V6C9 5.52338 9.33638 5.11309 9.80371 5.01953L14.8037 4.01953C14.8683 4.00662 14.9341 4 15 4H30C30.0659 4 30.1317 4.00662 30.1963 4.01953L35.1963 5.01953C35.6636 5.11309 36 5.52338 36 6V7Z\" stroke=\"#FFF200\" stroke-width=\"2\" stroke-linejoin=\"round\"/>\n<path d=\"M8 1.5L9.60074 2.91421\" stroke=\"#FFF200\" stroke-linejoin=\"round\"/>\n<path d=\"M13.8939 0.5L15.0258 2.23205\" stroke=\"#FFF200\" stroke-linejoin=\"round\"/>\n<path d=\"M19.8264 0.25L20.4123 2.18185\" stroke=\"#FFF200\" stroke-linejoin=\"round\"/>\n<path d=\"M36.2588 1L34.6581 2.41421\" stroke=\"#FFF200\" stroke-linejoin=\"round\"/>\n<path d=\"M30.3649 0.5L29.233 2.23205\" stroke=\"#FFF200\" stroke-linejoin=\"round\"/>\n<path d=\"M24.4325 0.25L23.8466 2.18185\" stroke=\"#FFF200\" stroke-linejoin=\"round\"/>",
    "iconViewBox": "8 0 30 10",
    "pieceOverlaySvg": "<path d=\"M36 7C36 7.47662 35.6636 7.88691 35.1963 7.98047L30.1963 8.98047C30.1317 8.99338 30.0659 9 30 9H15C14.9341 9 14.8683 8.99338 14.8037 8.98047L9.80371 7.98047C9.33638 7.88691 9 7.47662 9 7V6C9 5.52338 9.33638 5.11309 9.80371 5.01953L14.8037 4.01953C14.8683 4.00662 14.9341 4 15 4H30C30.0659 4 30.1317 4.00662 30.1963 4.01953L35.1963 5.01953C35.6636 5.11309 36 5.52338 36 6V7Z\" stroke=\"#FFF200\" stroke-width=\"2\" stroke-linejoin=\"round\"/>\n<path d=\"M8 1.5L9.60074 2.91421\" stroke=\"#FFF200\" stroke-linejoin=\"round\"/>\n<path d=\"M13.8939 0.5L15.0258 2.23205\" stroke=\"#FFF200\" stroke-linejoin=\"round\"/>\n<path d=\"M19.8264 0.25L20.4123 2.18185\" stroke=\"#FFF200\" stroke-linejoin=\"round\"/>\n<path d=\"M36.2588 1L34.6581 2.41421\" stroke=\"#FFF200\" stroke-linejoin=\"round\"/>\n<path d=\"M30.3649 0.5L29.233 2.23205\" stroke=\"#FFF200\" stroke-linejoin=\"round\"/>\n<path d=\"M24.4325 0.25L23.8466 2.18185\" stroke=\"#FFF200\" stroke-linejoin=\"round\"/>",
    "combos": [
      {
        "withId": "queen-flames",
        "bonusDescription": "Your pieces can move onto the flames.",
        "bonusTag": "HEAVEN AND HELL"
      }
    ]
  },
  {
    "id": "queen-flames",
    "name": "Flaming Ashes",
    "description": "After leaving squares, Queens inflame the square they left for two full turns. This prevents any piece from crossing that square.",
    "rarity": "common",
    "pieceFamily": "queen",
    "iconSvg": "<path d=\"M9.14367 37.5211C9.04789 37.8404 8.95211 38.1596 8.85633 38.4789C9.29456 38.6451 9.71887 38.8015 10.1608 38.9566C14.0765 40.3397 18.2542 41.2598 22.5 41.25C26.7458 41.2598 30.9235 40.3397 34.8392 38.9566C35.2811 38.8015 35.7054 38.6451 36.1437 38.4789C36.0479 38.1596 35.9521 37.8404 35.8563 37.5211C35.4044 37.6218 34.9686 37.7156 34.5179 37.8108C30.5126 38.657 26.5066 39.2587 22.5 39.25C18.4934 39.2587 14.4874 38.657 10.4821 37.8108C10.0314 37.7156 9.59558 37.6218 9.14367 37.5211Z\" fill=\"#FF0000\"/>\n<path d=\"M9.14367 36.5211C9.04789 36.8404 8.95211 37.1596 8.85633 37.4789C9.29456 37.6451 9.71887 37.8015 10.1608 37.9566C14.0765 39.3397 18.2542 40.2598 22.5 40.25C26.7458 40.2598 30.9235 39.3397 34.8392 37.9566C35.2811 37.8015 35.7054 37.6451 36.1437 37.4789C36.0479 37.1596 35.9521 36.8404 35.8563 36.5211C35.4044 36.6218 34.9686 36.7156 34.5179 36.8108C30.5126 37.657 26.5066 38.2587 22.5 38.25C18.4934 38.2587 14.4874 37.657 10.4821 36.8108C10.0314 36.7156 9.59558 36.6218 9.14367 36.5211Z\" fill=\"#FF9500\"/>\n<path d=\"M9.63344 35.5181C9.54448 35.8394 9.45552 36.1606 9.36656 36.4819C9.79022 36.6337 10.2007 36.7767 10.6276 36.9182C14.4122 38.1806 18.4277 39.0086 22.5 39C26.5723 39.0086 30.5878 38.1806 34.3724 36.9182C34.7993 36.7767 35.2098 36.6337 35.6334 36.4819C35.5445 36.1606 35.4555 35.8394 35.3666 35.5181C34.9303 35.6043 34.5092 35.6846 34.0743 35.7661C30.2076 36.491 26.3525 37.0076 22.5 37C18.6475 37.0076 14.7924 36.491 10.9257 35.7661C10.4908 35.6846 10.0697 35.6043 9.63344 35.5181Z\" fill=\"#EEFF00\"/>\n",
    "iconViewBox": "9 36 28 7",
    "pieceOverlaySvg": "<path d=\"M9.14367 37.5211C9.04789 37.8404 8.95211 38.1596 8.85633 38.4789C9.29456 38.6451 9.71887 38.8015 10.1608 38.9566C14.0765 40.3397 18.2542 41.2598 22.5 41.25C26.7458 41.2598 30.9235 40.3397 34.8392 38.9566C35.2811 38.8015 35.7054 38.6451 36.1437 38.4789C36.0479 38.1596 35.9521 37.8404 35.8563 37.5211C35.4044 37.6218 34.9686 37.7156 34.5179 37.8108C30.5126 38.657 26.5066 39.2587 22.5 39.25C18.4934 39.2587 14.4874 38.657 10.4821 37.8108C10.0314 37.7156 9.59558 37.6218 9.14367 37.5211Z\" fill=\"#FF0000\"/>\n<path d=\"M9.14367 36.5211C9.04789 36.8404 8.95211 37.1596 8.85633 37.4789C9.29456 37.6451 9.71887 37.8015 10.1608 37.9566C14.0765 39.3397 18.2542 40.2598 22.5 40.25C26.7458 40.2598 30.9235 39.3397 34.8392 37.9566C35.2811 37.8015 35.7054 37.6451 36.1437 37.4789C36.0479 37.1596 35.9521 36.8404 35.8563 36.5211C35.4044 36.6218 34.9686 36.7156 34.5179 36.8108C30.5126 37.657 26.5066 38.2587 22.5 38.25C18.4934 38.2587 14.4874 37.657 10.4821 36.8108C10.0314 36.7156 9.59558 36.6218 9.14367 36.5211Z\" fill=\"#FF9500\"/>\n<path d=\"M9.63344 35.5181C9.54448 35.8394 9.45552 36.1606 9.36656 36.4819C9.79022 36.6337 10.2007 36.7767 10.6276 36.9182C14.4122 38.1806 18.4277 39.0086 22.5 39C26.5723 39.0086 30.5878 38.1806 34.3724 36.9182C34.7993 36.7767 35.2098 36.6337 35.6334 36.4819C35.5445 36.1606 35.4555 35.8394 35.3666 35.5181C34.9303 35.6043 34.5092 35.6846 34.0743 35.7661C30.2076 36.491 26.3525 37.0076 22.5 37C18.6475 37.0076 14.7924 36.491 10.9257 35.7661C10.4908 35.6846 10.0697 35.6043 9.63344 35.5181Z\" fill=\"#EEFF00\"/>\n",
    "combos": [
      {
        "withId": "queen-holy",
        "bonusDescription": "Your pieces can move onto the flames.",
        "bonusTag": "HEAVEN AND HELL"
      }
    ]
  },
  {
    "id": "queen-rook",
    "name": "Metamorphosis",
    "description": "Your left-most Rook is transformed into a Queen.",
    "rarity": "epic",
    "pieceFamily": "queen",
    "iconSvg": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.9378 2.38252C11.5244 1.87249 12.4756 1.87249 13.0622 2.38252L21.56 9.77053C22.1467 10.2805 22.1467 11.1074 21.56 11.6175C20.9733 12.1275 20.0222 12.1275 19.4355 11.6175L12 5.15297L4.56443 11.6175C3.97779 12.1275 3.02664 12.1275 2.43999 11.6175C1.85334 11.1074 1.85334 10.2805 2.43999 9.77053L10.9378 2.38252Z\" fill=\"#0057D5\"/>\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.9378 7.38252C11.5244 6.87249 12.4756 6.87249 13.0622 7.38252L21.56 14.7705C22.1467 15.2805 22.1467 16.1074 21.56 16.6175C20.9733 17.1275 20.0222 17.1275 19.4355 16.6175L12 10.153L4.56443 16.6175C3.97779 17.1275 3.02664 17.1275 2.43999 16.6175C1.85334 16.1074 1.85334 15.2805 2.43999 14.7705L10.9378 7.38252Z\" fill=\"#0057D5\"/>\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.9378 12.3825C11.5244 11.8725 12.4756 11.8725 13.0622 12.3825L21.56 19.7705C22.1467 20.2805 22.1467 21.1074 21.56 21.6175C20.9733 22.1275 20.0222 22.1275 19.4355 21.6175L12 15.153L4.56443 21.6175C3.97779 22.1275 3.02664 22.1275 2.43999 21.6175C1.85334 21.1074 1.85334 20.2805 2.43999 19.7705L10.9378 12.3825Z\" fill=\"#0057D5\"/>\n",
    "iconViewBox": "0 0 24 24",
    "pieceOverlaySvg": null,
    "combos": []
  },
  {
    "id": "king-pawn",
    "name": "Toy Pawns",
    "description": "If your King moves one square backwards, a pawn is placed in the square it left.",
    "rarity": "common",
    "pieceFamily": "king",
    "iconSvg": "<svg width=\"45\" height=\"45\" viewBox=\"0 0 45 45\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n<rect x=\"11\" y=\"34\" width=\"4\" height=\"4\" fill=\"url(#pattern0_5_4)\"/>\n<defs>\n<pattern id=\"pattern0_5_4\" patternContentUnits=\"objectBoundingBox\" width=\"1\" height=\"1\">\n<use xlink:href=\"#image0_5_4\" transform=\"scale(0.00666667)\"/>\n</pattern>\n<image id=\"image0_5_4\" width=\"150\" height=\"150\" preserveAspectRatio=\"none\" xlink:href=\"data:image/png;base64,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\"/>\n</defs>\n</svg>\n",
    "iconViewBox": "11 34 4 4",
    "pieceOverlaySvg": "<rect x=\"29\" y=\"34\" width=\"4\" height=\"4\" fill=\"url(#pattern0_5_4)\"/>\n<rect x=\"11\" y=\"34\" width=\"4\" height=\"4\" fill=\"url(#pattern1_5_4)\"/>\n<defs>\n<pattern id=\"pattern0_5_4\" patternContentUnits=\"objectBoundingBox\" width=\"1\" height=\"1\">\n<use xlink:href=\"#image0_5_4\" transform=\"scale(0.00666667)\"/>\n</pattern>\n<pattern id=\"pattern1_5_4\" patternContentUnits=\"objectBoundingBox\" width=\"1\" height=\"1\">\n<use xlink:href=\"#image0_5_4\" transform=\"scale(0.00666667)\"/>\n</pattern>\n<image id=\"image0_5_4\" width=\"150\" height=\"150\" preserveAspectRatio=\"none\" xlink:href=\"data:image/png;base64,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\"/>\n</defs>",
    "combos": []
  },
  {
    "id": "king-hidden",
    "name": "Fog of War",
    "description": "Your opponent can not see your King.",
    "rarity": "epic",
    "pieceFamily": "king",
    "iconSvg": "<g clip-path=\"url(#clip0_5_4)\">\n<g opacity=\"0.5\" clip-path=\"url(#clip1_5_4)\">\n<path d=\"M40 0H5C3.67392 0 2.40215 0.526784 1.46447 1.46447C0.526784 2.40215 0 3.67392 0 5L0 12.5H45V5C45 3.67392 44.4732 2.40215 43.5355 1.46447C42.5979 0.526784 41.3261 0 40 0Z\" fill=\"#F5F8FA\"/>\n<path d=\"M45 20.46V11.5712C44.1799 11.0579 43.2325 10.7842 42.265 10.7812C40.6088 10.7812 39.1512 11.565 38.1912 12.7662C37.158 11.7943 35.7935 11.2522 34.375 11.25C33.4737 11.25 32.635 11.4812 31.88 11.8575C30.9537 10.0225 29.0712 8.75 26.875 8.75C26.1163 8.75 25.395 8.905 24.735 9.1775C24.4681 8.4132 23.9939 7.73824 23.3652 7.22813C22.7366 6.71802 21.9785 6.39288 21.1756 6.2891C20.3727 6.18532 19.5568 6.30699 18.8192 6.64049C18.0815 6.974 17.4512 7.50618 16.9987 8.1775C16.1935 7.73849 15.2921 7.50573 14.375 7.5C12.3237 7.5 10.5475 8.60875 9.565 10.2475C9.11268 9.07198 8.31507 8.06093 7.27713 7.34741C6.23918 6.63388 5.00954 6.25129 3.75 6.25C2.39385 6.25381 1.07643 6.70261 0 7.5275L0 17.4712C1.0475 18.2637 30.625 22.5 30.625 22.5C30.625 22.5 44.2025 20.9525 45 20.46Z\" fill=\"#E1E8ED\"/>\n<path d=\"M45 18.4637C43.9463 17.125 42.33 16.25 40.495 16.25C37.9987 16.25 35.8937 17.8488 35.0975 20.0738C34.8593 20.0283 34.6175 20.0036 34.375 20C33.35 20 32.4187 20.3675 31.6725 20.9588C30.8247 20.3373 29.8012 20.0015 28.75 20C28.3088 20 27.8888 20.075 27.4813 20.1825C27.4838 20.1212 27.5 20.0625 27.5 20C27.5 18.6739 26.9732 17.4021 26.0355 16.4645C25.0979 15.5268 23.8261 15 22.5 15C21.7799 15.0021 21.0689 15.1606 20.4162 15.4648C19.7635 15.7689 19.1848 16.2113 18.72 16.7613C17.9401 16.4244 17.0996 16.2504 16.25 16.25C16.025 16.25 15.8125 16.2925 15.5938 16.3163C14.9355 14.7103 13.8145 13.3365 12.3732 12.3696C10.9319 11.4026 9.23558 10.8863 7.5 10.8862C5.98812 10.8867 4.50222 11.2794 3.1876 12.0261C1.87299 12.7728 0.774652 13.8479 0 15.1462L0 32.0762L40.495 30.2612C40.495 30.2612 43.9463 28.5825 45 26.5538V18.4637Z\" fill=\"#CCD6DD\"/>\n<path d=\"M45 38.1238V25.5275C44.2121 25.1807 43.3609 25.001 42.5 25C41.2405 25.0013 40.0108 25.3839 38.9729 26.0974C37.935 26.8109 37.1374 27.822 36.685 28.9975C35.7025 27.3588 33.9263 26.25 31.875 26.25C30.9213 26.25 30.0375 26.5087 29.2513 26.9275C28.7988 26.2562 28.1685 25.724 27.4309 25.3905C26.6932 25.057 25.8773 24.9353 25.0744 25.0391C24.2716 25.1429 23.5134 25.468 22.8848 25.9781C22.2562 26.4882 21.7819 27.1632 21.515 27.9275C20.8367 27.6459 20.1095 27.5006 19.375 27.5C17.1788 27.5 15.2963 28.7725 14.37 30.6075C13.5971 30.2133 12.7427 30.0053 11.875 30C10.4562 30.0024 9.09136 30.5445 8.05753 31.5162C7.09753 30.315 5.64003 29.5313 3.98378 29.5313C2.37878 29.5313 0.960029 30.27 -0.0012207 31.4075V38.1238H45Z\" fill=\"#E1E8ED\"/>\n<path d=\"M31.25 31.25C30.2238 31.25 29.2725 31.5613 28.4788 32.0913C28.0687 30.948 27.2881 29.9747 26.2611 29.3262C25.2341 28.6777 24.0198 28.3913 22.8113 28.5125C21.695 28.6283 20.642 29.0867 19.7967 29.8248C18.9514 30.5629 18.3552 31.5446 18.09 32.635C17.8612 32.6156 17.6313 32.6156 17.4025 32.635C16.4757 32.7329 15.6096 33.1428 14.9462 33.7975C14.087 33.2935 13.0899 33.0755 12.0987 33.175C11.695 33.2213 11.2991 33.3205 10.9213 33.47C10.9175 33.4112 10.9263 33.3537 10.9213 33.2962C10.8583 32.6772 10.674 32.0766 10.3789 31.5288C10.0838 30.981 9.68368 30.4967 9.20138 30.1035C8.71907 29.7104 8.16405 29.4161 7.56799 29.2374C6.97194 29.0588 6.34653 28.9994 5.7275 29.0625C5.04876 29.1336 4.3936 29.3515 3.80739 29.7009C3.22118 30.0504 2.71793 30.523 2.3325 31.0862C1.57946 30.8482 0.786148 30.7644 0 30.84L0 40C0 40.9663 0.2875 41.8613 0.7625 42.6263C0.89375 42.6225 36.25 39.0113 36.25 36.25C36.25 33.4888 34.0113 31.25 31.25 31.25Z\" fill=\"#F5F8FA\"/>\n<path d=\"M40 45C41.3261 45 42.5979 44.4732 43.5355 43.5355C44.4732 42.5979 45 41.3261 45 40V30.49C43.8293 29.9293 42.548 29.6376 41.25 29.6362C39.5144 29.6363 37.8181 30.1526 36.3768 31.1196C34.9355 32.0865 33.8145 33.4603 33.1562 35.0662C32.9375 35.0425 32.725 35 32.5 35C31.6225 35 30.7888 35.1838 30.03 35.5113C29.5652 34.9613 28.9865 34.5189 28.3338 34.2148C27.6811 33.9106 26.9701 33.7521 26.25 33.75C24.9239 33.75 23.6521 34.2768 22.7145 35.2145C21.7768 36.1521 21.25 37.4239 21.25 38.75C21.25 38.8125 21.2662 38.8712 21.2687 38.9325C20.8555 38.8169 20.429 38.7555 20 38.75C18.905 38.75 17.9012 39.1113 17.0775 39.7088C16.3115 39.0919 15.3585 38.7538 14.375 38.75C14.1329 38.7536 13.8916 38.7782 13.6538 38.8238C12.8575 36.5988 10.7525 35 8.255 35C5.77125 35 3.67375 36.5825 2.8675 38.7875C2.74375 38.7775 2.62625 38.75 2.5 38.75C1.585 38.75 0.7375 39.0138 0 39.4438V40C0 41.3261 0.526784 42.5979 1.46447 43.5355C2.40215 44.4732 3.67392 45 5 45H40Z\" fill=\"#CCD6DD\"/>\n</g>\n</g>\n<defs>\n<clipPath id=\"clip0_5_4\">\n<rect width=\"45\" height=\"45\" fill=\"white\"/>\n</clipPath>\n<clipPath id=\"clip1_5_4\">\n<rect width=\"45\" height=\"45\" fill=\"white\"/>\n</clipPath>\n</defs>\n",
    "iconViewBox": "0 0 45 45",
    "pieceOverlaySvg": "<g clip-path=\"url(#clip0_5_4)\">\n<g opacity=\"0.5\" clip-path=\"url(#clip1_5_4)\">\n<path d=\"M40 0H5C3.67392 0 2.40215 0.526784 1.46447 1.46447C0.526784 2.40215 0 3.67392 0 5L0 12.5H45V5C45 3.67392 44.4732 2.40215 43.5355 1.46447C42.5979 0.526784 41.3261 0 40 0Z\" fill=\"#F5F8FA\"/>\n<path d=\"M45 20.46V11.5712C44.1799 11.0579 43.2325 10.7842 42.265 10.7812C40.6088 10.7812 39.1512 11.565 38.1912 12.7662C37.158 11.7943 35.7935 11.2522 34.375 11.25C33.4737 11.25 32.635 11.4812 31.88 11.8575C30.9537 10.0225 29.0712 8.75 26.875 8.75C26.1163 8.75 25.395 8.905 24.735 9.1775C24.4681 8.4132 23.9939 7.73824 23.3652 7.22813C22.7366 6.71802 21.9785 6.39288 21.1756 6.2891C20.3727 6.18532 19.5568 6.30699 18.8192 6.64049C18.0815 6.974 17.4512 7.50618 16.9987 8.1775C16.1935 7.73849 15.2921 7.50573 14.375 7.5C12.3237 7.5 10.5475 8.60875 9.565 10.2475C9.11268 9.07198 8.31507 8.06093 7.27713 7.34741C6.23918 6.63388 5.00954 6.25129 3.75 6.25C2.39385 6.25381 1.07643 6.70261 0 7.5275L0 17.4712C1.0475 18.2637 30.625 22.5 30.625 22.5C30.625 22.5 44.2025 20.9525 45 20.46Z\" fill=\"#E1E8ED\"/>\n<path d=\"M45 18.4637C43.9463 17.125 42.33 16.25 40.495 16.25C37.9987 16.25 35.8937 17.8488 35.0975 20.0738C34.8593 20.0283 34.6175 20.0036 34.375 20C33.35 20 32.4187 20.3675 31.6725 20.9588C30.8247 20.3373 29.8012 20.0015 28.75 20C28.3088 20 27.8888 20.075 27.4813 20.1825C27.4838 20.1212 27.5 20.0625 27.5 20C27.5 18.6739 26.9732 17.4021 26.0355 16.4645C25.0979 15.5268 23.8261 15 22.5 15C21.7799 15.0021 21.0689 15.1606 20.4162 15.4648C19.7635 15.7689 19.1848 16.2113 18.72 16.7613C17.9401 16.4244 17.0996 16.2504 16.25 16.25C16.025 16.25 15.8125 16.2925 15.5938 16.3163C14.9355 14.7103 13.8145 13.3365 12.3732 12.3696C10.9319 11.4026 9.23558 10.8863 7.5 10.8862C5.98812 10.8867 4.50222 11.2794 3.1876 12.0261C1.87299 12.7728 0.774652 13.8479 0 15.1462L0 32.0762L40.495 30.2612C40.495 30.2612 43.9463 28.5825 45 26.5538V18.4637Z\" fill=\"#CCD6DD\"/>\n<path d=\"M45 38.1238V25.5275C44.2121 25.1807 43.3609 25.001 42.5 25C41.2405 25.0013 40.0108 25.3839 38.9729 26.0974C37.935 26.8109 37.1374 27.822 36.685 28.9975C35.7025 27.3588 33.9263 26.25 31.875 26.25C30.9213 26.25 30.0375 26.5087 29.2513 26.9275C28.7988 26.2562 28.1685 25.724 27.4309 25.3905C26.6932 25.057 25.8773 24.9353 25.0744 25.0391C24.2716 25.1429 23.5134 25.468 22.8848 25.9781C22.2562 26.4882 21.7819 27.1632 21.515 27.9275C20.8367 27.6459 20.1095 27.5006 19.375 27.5C17.1788 27.5 15.2963 28.7725 14.37 30.6075C13.5971 30.2133 12.7427 30.0053 11.875 30C10.4562 30.0024 9.09136 30.5445 8.05753 31.5162C7.09753 30.315 5.64003 29.5313 3.98378 29.5313C2.37878 29.5313 0.960029 30.27 -0.0012207 31.4075V38.1238H45Z\" fill=\"#E1E8ED\"/>\n<path d=\"M31.25 31.25C30.2238 31.25 29.2725 31.5613 28.4788 32.0913C28.0687 30.948 27.2881 29.9747 26.2611 29.3262C25.2341 28.6777 24.0198 28.3913 22.8113 28.5125C21.695 28.6283 20.642 29.0867 19.7967 29.8248C18.9514 30.5629 18.3552 31.5446 18.09 32.635C17.8612 32.6156 17.6313 32.6156 17.4025 32.635C16.4757 32.7329 15.6096 33.1428 14.9462 33.7975C14.087 33.2935 13.0899 33.0755 12.0987 33.175C11.695 33.2213 11.2991 33.3205 10.9213 33.47C10.9175 33.4112 10.9263 33.3537 10.9213 33.2962C10.8583 32.6772 10.674 32.0766 10.3789 31.5288C10.0838 30.981 9.68368 30.4967 9.20138 30.1035C8.71907 29.7104 8.16405 29.4161 7.56799 29.2374C6.97194 29.0588 6.34653 28.9994 5.7275 29.0625C5.04876 29.1336 4.3936 29.3515 3.80739 29.7009C3.22118 30.0504 2.71793 30.523 2.3325 31.0862C1.57946 30.8482 0.786148 30.7644 0 30.84L0 40C0 40.9663 0.2875 41.8613 0.7625 42.6263C0.89375 42.6225 36.25 39.0113 36.25 36.25C36.25 33.4888 34.0113 31.25 31.25 31.25Z\" fill=\"#F5F8FA\"/>\n<path d=\"M40 45C41.3261 45 42.5979 44.4732 43.5355 43.5355C44.4732 42.5979 45 41.3261 45 40V30.49C43.8293 29.9293 42.548 29.6376 41.25 29.6362C39.5144 29.6363 37.8181 30.1526 36.3768 31.1196C34.9355 32.0865 33.8145 33.4603 33.1562 35.0662C32.9375 35.0425 32.725 35 32.5 35C31.6225 35 30.7888 35.1838 30.03 35.5113C29.5652 34.9613 28.9865 34.5189 28.3338 34.2148C27.6811 33.9106 26.9701 33.7521 26.25 33.75C24.9239 33.75 23.6521 34.2768 22.7145 35.2145C21.7768 36.1521 21.25 37.4239 21.25 38.75C21.25 38.8125 21.2662 38.8712 21.2687 38.9325C20.8555 38.8169 20.429 38.7555 20 38.75C18.905 38.75 17.9012 39.1113 17.0775 39.7088C16.3115 39.0919 15.3585 38.7538 14.375 38.75C14.1329 38.7536 13.8916 38.7782 13.6538 38.8238C12.8575 36.5988 10.7525 35 8.255 35C5.77125 35 3.67375 36.5825 2.8675 38.7875C2.74375 38.7775 2.62625 38.75 2.5 38.75C1.585 38.75 0.7375 39.0138 0 39.4438V40C0 41.3261 0.526784 42.5979 1.46447 43.5355C2.40215 44.4732 3.67392 45 5 45H40Z\" fill=\"#CCD6DD\"/>\n</g>\n</g>\n<defs>\n<clipPath id=\"clip0_5_4\">\n<rect width=\"45\" height=\"45\" fill=\"white\"/>\n</clipPath>\n<clipPath id=\"clip1_5_4\">\n<rect width=\"45\" height=\"45\" fill=\"white\"/>\n</clipPath>\n</defs>\n",
    "combos": []
  }
]

export default ALL_ARTIFACTS;