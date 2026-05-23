import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { PieceType, PieceColor } from '../types';

interface ChessPieceProps {
  type: PieceType;
  color: PieceColor;
  activeBoons?: string[];
  theme?: string;
  isCrumbling?: boolean;
}

const PIECE_SVG: Record<PieceType, string> = {
  pawn: `<path fill="FILL_MAIN" stroke="STROKE" stroke-linecap="round" stroke-width="1.5"
    d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0
    2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47
    1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38
    0-2.21-1.79-4-4-4z"/>`,

  knight: `<g fill="none" fill-rule="evenodd" stroke="STROKE" stroke-linecap="round"
      stroke-linejoin="round" stroke-width="1.5">
    <path fill="FILL_MAIN" d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"/>
    <path fill="FILL_MAIN" d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94
      1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5
      c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3"/>
    <path fill="STROKE" d="M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0
      m5.433-9.75a.5 1.5 30 1 1-.866-.5.5 1.5 30 1 1 .866.5"/>
  </g>`,

  bishop: `<g fill="none" fill-rule="evenodd" stroke="STROKE" stroke-linecap="round"
      stroke-linejoin="round" stroke-width="1.5">
    <g fill="FILL_MAIN" stroke-linecap="butt">
      <path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54
        3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1
        -1.35.49-2.32.47-3-.5 1.35-1.94 3-2 3-2z"/>
      <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4
        5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"/>
      <path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/>
    </g>
    <path stroke-linejoin="miter" d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5"/>
  </g>`,

  rook: `<g fill="FILL_MAIN" fill-rule="evenodd" stroke="STROKE" stroke-linecap="round"
      stroke-linejoin="round" stroke-width="1.5">
    <path stroke-linecap="butt" d="M9 39h27v-3H9zm3-3v-4h21v4zm-1-22V9h4v2h5V9h5v2h5V9h4v5"/>
    <path d="m34 14-3 3H14l-3-3"/>
    <path stroke-linecap="butt" stroke-linejoin="miter" d="M31 17v12.5H14V17"/>
    <path d="m31 29.5 1.5 2.5h-20l1.5-2.5"/>
    <path fill="none" stroke-linejoin="miter" d="M11 14h23"/>
  </g>`,

  queen: `<g fill="FILL_MAIN" fill-rule="evenodd" stroke="STROKE" stroke-linecap="round"
      stroke-linejoin="round" stroke-width="1.5">
    <path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0m16.5-4.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0
      M41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0M16 8.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0
      M33 9a2 2 0 1 1-4 0 2 2 0 1 1 4 0"/>
    <path stroke-linecap="butt"
      d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-14V25L7 14z"/>
    <path stroke-linecap="butt"
      d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5
      2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2
      2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z"/>
    <path fill="none" d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0"/>
  </g>`,

  king: `<g fill="none" fill-rule="evenodd" stroke="STROKE" stroke-linecap="round"
      stroke-linejoin="round" stroke-width="1.5">
    <path stroke-linejoin="miter" d="M22.5 11.63V6M20 8h5"/>
    <path fill="FILL_MAIN" stroke-linecap="butt" stroke-linejoin="miter"
      d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"/>
    <path fill="FILL_MAIN"
      d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5
      c-3.5-7.5-13-10.5-16-4-3 6 5 10 5 10z"/>
    <path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0"/>
  </g>`,
};

const BOON_SVG_INNER: Record<string, string> = {
  'pawn-diagonal': `
    <path d="M17 18L19.4444 22.6667L21.2778 24.2222H23.7222L25.5556 22.6667L28 18" stroke="#FFBB00"/>
    <path d="M23 26H22V23.3333H23V26Z" stroke="#FFBB00"/>
    <path d="M22.5 23.3333V26" stroke="#FF0000"/>`,

  'pawn-double': `
    <path d="M24 33V39H34V37.5L33 35.5H27.5V33H24Z" fill="#683900" stroke="#683900"/>
    <path d="M24 39V40" stroke="#4B2900"/>
    <path d="M26 39V40" stroke="#4B2900"/>
    <path d="M28 39V40" stroke="#4B2900"/>
    <path d="M30 39V40" stroke="#4B2900"/>
    <path d="M32 39V40" stroke="#4B2900"/>
    <path d="M34 39V40" stroke="#4B2900"/>
    <path d="M24.5 34H28" stroke="#FFCC00"/>
    <path d="M25 37.5H26" stroke="#FF0000"/>
    <path d="M28 37.5H29" stroke="#11FF00"/>
    <path d="M31 37.5H32" stroke="#4400FF"/>
    <path d="M21 33V39H11V37.5L12 35.5H17.5V33H21Z" fill="#683900" stroke="#683900"/>
    <path d="M21 39V40" stroke="#4B2900"/>
    <path d="M19 39V40" stroke="#4B2900"/>
    <path d="M17 39V40" stroke="#4B2900"/>
    <path d="M15 39V40" stroke="#4B2900"/>
    <path d="M13 39V40" stroke="#4B2900"/>
    <path d="M11 39V40" stroke="#4B2900"/>
    <path d="M20.5 34H17" stroke="#FFCC00"/>
    <path d="M20 37.5H19" stroke="#FF0000"/>
    <path d="M17 37.5H16" stroke="#11FF00"/>
    <path d="M14 37.5H13" stroke="#4400FF"/>`,

  'pawn-backstep': `
    <path d="M13 25H16V13L14.5 10L13 13V25Z" fill="#767676"/>
    <path d="M13 13L14.5 10L16 13V25H13V13ZM13 13V25.5" stroke="#767676"/>
    <path d="M14.5 12V24M14.5 24L13.5 25M14.5 24L15.5 25" stroke="#545454"/>
    <path d="M14 26V30H15V26H14Z" fill="#B06100" stroke="#B06100"/>
    <path d="M14 27H15" stroke="#935100"/>
    <path d="M14 29.5H15" stroke="#935100"/>
    <path d="M11 25L12.5 25.5H16.5L17.5 25" stroke="#683900"/>`,

  'pawn-sidestep': `
    <path d="M20 30L14.5 29L14 29.5L20 30.5H25L31 29.5L30.5 29L25 30H20Z" stroke="#935100"/>
    <path d="M21 29.5V31L24 29.5V31" stroke="#515151"/>`,

  'knight-teleport': `
    <path d="M38 28.5L33.5 31H24L20.5 28.5L16.5 32.5L19.5 36L24 38.5H33.5L37 36L39 34L38 28.5Z" fill="#515151" stroke="#515151"/>
    <path d="M20 29L24 31.5H33.5L37.5 29.5" stroke="#1C1C1C"/>
    <path d="M17 32.5L19.5 35.5L24 38H33.5L38.5 34.5" stroke="#1C1C1C"/>
    <path d="M21.5 27L24.5 29H33.5L38 26L37 21.5L33.5 24H24.5L22.5 23L21.5 27Z" fill="#515151" stroke="#515151"/>
    <path d="M37.5 26L33.5 28.5H24L22 27" stroke="#1C1C1C"/>
    <path d="M37 22.5L33.5 25H24.5L23 24" stroke="#1C1C1C"/>
    <path d="M24 26.5H25" stroke="#D900FF"/>
    <path d="M28 26.5H29" stroke="#D900FF"/>
    <path d="M32 26.5H33" stroke="#D900FF"/>
    <path d="M20 32.5H21" stroke="#D900FF"/>
    <path d="M26 34.5H27" stroke="#D900FF"/>
    <path d="M33 33.5H34" stroke="#D900FF"/>`,

  'knight-mirror': `
    <path d="M43 30C43 27.6667 41.6 23 36 23C30.4 23 29 27.6667 29 30C29 32.3333 30.4 37 36 37C41.6 37 43 32.3333 43 30Z" fill="#E8E8E8" stroke="#AEABAB"/>
    <path d="M34.8333 28.8333L37.1667 31.1667" stroke="#2D2D2D"/>
    <path d="M37.1667 28.8333L34.8333 31.1667" stroke="#2D2D2D"/>`,

  'knight-charge': `
    <path d="M3.20711 25.0299L4.70711 0.0299461L6.20711 25.0299L7.20711 29.5299L8.20711 30.5299H1.20711L2.20711 29.5299L3.20711 25.0299Z" fill="#484848" stroke="#484848"/>
    <path d="M4.20711 31.0299V37.0299H5.20711V31.0299" stroke="#543700"/>
    <path d="M3.70711 32.0299H5.70711" stroke="#CE8600"/>
    <path d="M3.70711 35.0299H5.70711" stroke="#CE8600"/>
    <path d="M3.70711 37.5299H5.70711" stroke="#CE8600"/>
    <path d="M1.70711 29.0299L7.20711 27.0299" stroke="#3C3C3C"/>
    <path d="M2.70711 25.0299L6.70711 23.5299" stroke="#3C3C3C"/>
    <path d="M2.70711 21.5299L6.70711 19.5299" stroke="#3C3C3C"/>
    <path d="M3.20711 17.0299L6.20711 16.0299" stroke="#3C3C3C"/>
    <path d="M3.20711 13.0299L6.20711 12.0299" stroke="#3C3C3C"/>
    <path d="M3.70711 9.02995L5.70711 8.02995" stroke="#3C3C3C"/>
    <path d="M4.20711 5.02995L5.20711 4.02995" stroke="#3C3C3C"/>`,

  'bishop-hop': `
    <path d="M5 38L16 26H29L40 38L34 40L28.5 38L24 40L19 38L13 40L5 38Z" fill="#3C3C3C" stroke="#3C3C3C"/>
    <path d="M28.5 26.5H16.5L6 38L13 39.5L19 37.5L24 39.5L28.5 37.5L34 39.5L38.5 38L28.5 26.5Z" stroke="#2C2C2C"/>
    <path d="M12 39L22.5 27L34 39L22.5 33L12 39Z" stroke="#2C2C2C"/>`,

  'bishop-orthogonal': `
    <path d="M13 35L13.5 36V38L13 39" stroke="#FFCC00"/>
    <path d="M10 35L10.5 36V38L10 39" stroke="#FFCC00"/>
    <path d="M10 37H11" stroke="#4400FF"/>
    <path d="M13 37H14" stroke="#4400FF"/>
    <path d="M32 35L31.5 36V38L32 39" stroke="#FFCC00"/>
    <path d="M35 35L34.5 36V38L35 39" stroke="#FFCC00"/>
    <path d="M35 37H34" stroke="#4400FF"/>
    <path d="M32 37H31" stroke="#4400FF"/>`,

  'bishop-ethereal': `
    <path d="M37.5 36H36.5V13H37.5V36Z" stroke="#935100"/>
    <path d="M37 15V16" stroke="#FF5252"/>
    <path d="M37 19V20" stroke="#FF5252"/>
    <path d="M37 23V24" stroke="#FF5252"/>
    <path d="M37 27V28" stroke="#FF5252"/>
    <path d="M37 31V32" stroke="#FF5252"/>
    <path d="M37 35V36" stroke="#FF5252"/>
    <path d="M34 11L37 13.5L40 11L37 5L34 11Z" fill="#FF0000"/>
    <path d="M33 8L32 7M37 13.5L34 11L37 5L40 11L37 13.5Z" stroke="#FF0000"/>
    <path d="M35 6L34 5" stroke="#FF0000"/>
    <path d="M39 6L40 5" stroke="#FF0000"/>
    <path d="M41 8L42 7" stroke="#FF0000"/>
    <path d="M37 13V5" stroke="#FF5252"/>
    <path d="M34 11H40" stroke="#FF5252"/>`,

  'rook-hop': `
    <circle cx="22.5" cy="24.5" r="3.5" fill="#FFCC00"/>
    <path d="M22.5 17L21.5 19H23.5L22.5 17Z" fill="#FFCC00" stroke="#FFCC00"/>
    <path d="M22.5 32L21.5 30H23.5L22.5 32Z" fill="#FFCC00" stroke="#FFCC00"/>`,

  'rook-diagonal': `
    <path d="M22.5 37C26.535 37 30.2078 37.0749 32.8896 37.1982C34.2231 37.2596 35.3535 37.3347 36.1709 37.4235C36.5727 37.4672 36.959 37.5205 37.2646 37.5892C37.5266 37.6481 38 37.7801 38 38C38 38.2199 37.5266 38.3519 37.2646 38.4108C36.959 38.4795 36.5727 38.5328 36.1709 38.5765C35.3535 38.6653 34.2231 38.7404 32.8896 38.8018C30.2078 38.9251 26.535 39 22.5 39C18.465 39 14.7922 38.9251 12.1104 38.8018C10.7769 38.7404 9.64647 38.6653 8.8291 38.5765C8.42734 38.5328 8.04101 38.4795 7.73535 38.4108C7.47335 38.3519 7 38.2199 7 38C7 37.7801 7.47335 37.6481 7.73535 37.5892C8.04101 37.5205 8.42734 37.4672 8.8291 37.4235C9.64647 37.3347 10.7769 37.2596 12.1104 37.1982C14.7922 37.0749 18.465 37 22.5 37Z" fill="#C16A00"/>
    <circle cx="10" cy="38" r="2" fill="#683900"/>
    <circle cx="15" cy="38" r="2" fill="#683900"/>
    <circle cx="20" cy="38" r="2" fill="#683900"/>
    <circle cx="30" cy="38" r="2" fill="#683900"/>
    <circle cx="25" cy="38" r="2" fill="#683900"/>
    <circle cx="35" cy="38" r="2" fill="#683900"/>`,

  'king-jump': `
    <path d="M30 13H15V6H17L18 7.5H21V5.5C21 4 24 4 24 5.5V7.5L27 7.5L28 6H30V13Z" fill="#FFCC00" stroke="#FFCC00"/>
    <circle cx="22.5" cy="6" r="1.5" fill="#FF0000"/>
    <path d="M23.5 12V9" stroke="black"/>
    <path d="M25 9.5H23" stroke="black"/>
    <path d="M21.5 12V9" stroke="black"/>
    <path d="M20 9.5H22" stroke="black"/>
    <path d="M18.5 12V10" stroke="black"/>
    <path d="M16 10.5H19" stroke="black"/>
    <path d="M26.5 12V10" stroke="black"/>
    <path d="M29 10.5H26" stroke="black"/>`,

  'king-double-step': `
    <path d="M10.5 31L14.6818 33.5L19.9091 34H25.1364L29.3182 33.5L33.5 31" stroke="#FFCC00"/>
    <path d="M22.5 34L25.0981 39.25H19.9019L22.5 34Z" fill="#E4B600"/>
    <path d="M22.5 35L24.2321 38.75H20.7679L22.5 35Z" fill="#D900FF"/>`,

  'king-blink': `
    <path d="M9.5 29C15.1684 25.9801 17.0789 23.3678 17.5 17L16.5 16C15.3399 22.3447 13.4988 24.9864 8 28L9.5 29Z" fill="#D9D9D9" stroke="#AEABAB"/>
    <path d="M7.26316 26C12.0366 23.4447 13.6454 21.2343 14 15.8462L13.1579 15C12.181 20.3686 10.6306 22.6038 6 25.1538L7.26316 26Z" fill="#D9D9D9" stroke="#AEABAB"/>
    <path d="M14 24.5L15 23.5" stroke="#11FF00"/>
    <path d="M11 22.5L12 21.5" stroke="#11FF00"/>
    <path d="M35.5 29C29.8316 25.9801 27.9211 23.3678 27.5 17L28.5 16C29.6601 22.3447 31.5012 24.9864 37 28L35.5 29Z" fill="#D9D9D9" stroke="#AEABAB"/>
    <path d="M37.7368 26C32.9634 23.4447 31.3546 21.2343 31 15.8462L31.8421 15C32.819 20.3686 34.3694 22.6038 39 25.1538L37.7368 26Z" fill="#D9D9D9" stroke="#AEABAB"/>
    <path d="M31 24.5L30 23.5" stroke="#11FF00"/>
    <path d="M34 22.5L33 21.5" stroke="#11FF00"/>`,

  'king-shield': `
    <circle cx="22.5" cy="24.5" r="3.5" fill="#FFCC00"/>
    <path d="M20.5 20L22.5 21L24.5 20V17H20.5V20Z" fill="#D9D9D9" stroke="#FFCC00"/>
    <path d="M20.5 29L22.5 28L24.5 29V32H20.5V29Z" fill="#D9D9D9" stroke="#FFCC00"/>`,

  'queen-hop': `
    <circle cx="38" cy="12.5" r="4.5" fill="#FF5E00"/>
    <path d="M37 12.5L38 13.5L39 12.5L38 11.5L37 12.5Z" fill="#FF0000" stroke="#FF0000"/>
    <path d="M37 19L38 18L39 19V36L38 37L37 36V19Z" fill="#FFCC00" stroke="#FFCC00"/>`,
};

export const ChessPiece: React.FC<ChessPieceProps> = ({
  type,
  color,
  activeBoons = [],
  theme = 'classic',
  isCrumbling = false,
}) => {
  let fillMain = '#FFFFFF';
  let strokeMain = '#000000';
  let fillHighlight = '#FFFFFF';

  if (theme === 'classic') {
    if (color === 'white') {
      fillMain = '#E2E8F0'; strokeMain = '#1E293B'; fillHighlight = '#FFFFFF';
    } else {
      fillMain = '#334155'; strokeMain = '#0f172a'; fillHighlight = '#64748B';
    }
  } else if (theme === 'retro-green') {
    if (color === 'white') {
      fillMain = '#22C55E'; strokeMain = '#052E16'; fillHighlight = '#86EFAC';
    } else {
      fillMain = '#14532D'; strokeMain = '#022C11'; fillHighlight = '#22C55E';
    }
  } else if (theme === 'retro-cyber') {
    if (color === 'white') {
      fillMain = '#38BDF8'; strokeMain = '#0F172A'; fillHighlight = '#E0F2FE';
    } else {
      fillMain = '#F43F5E'; strokeMain = '#1E1B4B'; fillHighlight = '#FDA4AF';
    }
  }

  const crumblingParticles = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => {
      const startX = 6 + Math.random() * 20;
      const startY = 4 + Math.random() * 24;
      const delay = Math.random() * 0.45;
      return {
        id: i,
        x: startX, y: startY,
        dx: (Math.random() - 0.5) * 14,
        dy: Math.random() * 20 + 12,
        size: Math.random() * 1.5 + 0.8,
        delay,
      };
    });
  }, []);

  if (isCrumbling) {
    return (
      <svg viewBox="0 0 32 32" className="w-full h-full select-none">
        {crumblingParticles.map((p) => (
          <motion.rect
            key={`crumb-${p.id}`}
            x={p.x} y={p.y}
            width={p.size} height={p.size}
            fill={Math.random() > 0.4 ? fillMain : fillHighlight}
            initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }}
            animate={{ x: p.x + p.dx, y: p.y + p.dy, opacity: [1, 1, 0], scale: [1, 0.8, 0] }}
            transition={{ duration: 1.4, ease: 'easeIn', delay: p.delay }}
          />
        ))}
      </svg>
    );
  }

  const pieceSvgInner = (PIECE_SVG[type] ?? PIECE_SVG.pawn)
    .replace(/FILL_MAIN/g, fillMain)
    .replace(/FILL_HI/g, fillHighlight)
    .replace(/STROKE/g, strokeMain);

  const activeBoonOverlays = activeBoons.filter(
    (id) => id.startsWith(type) && BOON_SVG_INNER[id]
  );

  return (
    <div className="relative w-full h-full select-none">
      <svg
        viewBox="0 0 45 45"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        dangerouslySetInnerHTML={{ __html: pieceSvgInner }}
      />

      {activeBoonOverlays.map((boonId) => (
        <svg
          key={boonId}
          viewBox="0 0 45 45"
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: 'none' }}
          xmlns="http://www.w3.org/2000/svg"
          dangerouslySetInnerHTML={{ __html: BOON_SVG_INNER[boonId] }}
        />
      ))}
    </div>
  );
};