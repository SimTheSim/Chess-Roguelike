import React from 'react';

interface BoonIconProps {
  iconName: string;
  upgradeId?: string;
  className?: string;
}

export const BoonIcon: React.FC<BoonIconProps> = ({ iconName, upgradeId, className = 'w-10 h-10' }) => {
  switch (upgradeId) {
    case 'pawn-diagonal':
      return (
        <svg className={className} viewBox="16 17 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 18L19.4444 22.6667L21.2778 24.2222H23.7222L25.5556 22.6667L28 18" stroke="#FFBB00"/>
          <path d="M23 26H22V23.3333H23V26Z" stroke="#FFBB00"/>
          <path d="M22.5 23.3333V26" stroke="#FF0000"/>
        </svg>
      );
    case 'pawn-double':
      return (
        <svg className={className} viewBox="10 32 24 8" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <path d="M14 37.5H13" stroke="#4400FF"/>
        </svg>
      );
    case 'pawn-backstep':
      return (
        <svg className={className} viewBox="10 9 8 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 25H16V13L14.5 10L13 13V25Z" fill="#767676"/>
          <path d="M13 13L14.5 10L16 13V25H13V13ZM13 13V25.5" stroke="#767676"/>
          <path d="M14.5 12V24M14.5 24L13.5 25M14.5 24L15.5 25" stroke="#545454"/>
          <path d="M14 26V30H15V26H14Z" fill="#B06100" stroke="#B06100"/>
          <path d="M14 27H15" stroke="#935100"/>
          <path d="M14 29.5H15" stroke="#935100"/>
          <path d="M11 25L12.5 25.5H16.5L17.5 25" stroke="#683900"/>
        </svg>
      );
    case 'pawn-sidestep':
      return (
        <svg className={className} viewBox="13 28 18 3" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 30L14.5 29L14 29.5L20 30.5H25L31 29.5L30.5 29L25 30H20Z" stroke="#935100"/>
          <path d="M21 29.5V31L24 29.5V31" stroke="#515151"/>
        </svg>
      );
    case 'knight-teleport':
      return (
        <svg className={className} viewBox="15 20 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <path d="M33 33.5H34" stroke="#D900FF"/>
        </svg>
      );
    case 'knight-mirror':
      return (
        <svg className={className} viewBox="28 22 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M43 30C43 27.6667 41.6 23 36 23C30.4 23 29 27.6667 29 30C29 32.3333 30.4 37 36 37C41.6 37 43 32.3333 43 30Z" fill="#E8E8E8" stroke="#AEABAB"/>
          <path d="M34.8333 28.8333L37.1667 31.1667" stroke="#2D2D2D"/>
          <path d="M37.1667 28.8333L34.8333 31.1667" stroke="#2D2D2D"/>
        </svg>
      );
    case 'knight-charge':
      return (
        <svg className={className} viewBox="1 1 8 38" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <path d="M4.20711 5.02995L5.20711 4.02995" stroke="#3C3C3C"/>
        </svg>
      );
    case 'bishop-hop':
      return (
        <svg className={className} viewBox="4 25 36 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 38L16 26H29L40 38L34 40L28.5 38L24 40L19 38L13 40L5 38Z" fill="#3C3C3C" stroke="#3C3C3C"/>
          <path d="M28.5 26.5H16.5L6 38L13 39.5L19 37.5L24 39.5L28.5 37.5L34 39.5L38.5 38L28.5 26.5Z" stroke="#2C2C2C"/>
          <path d="M12 39L22.5 27L34 39L22.5 33L12 39Z" stroke="#2C2C2C"/>
        </svg>
      );
    case 'bishop-orthogonal':
      return (
        <svg className={className} viewBox="9 34 26 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 35L13.5 36V38L13 39" stroke="#FFCC00"/>
          <path d="M10 35L10.5 36V38L10 39" stroke="#FFCC00"/>
          <path d="M10 37H11" stroke="#4400FF"/>
          <path d="M13 37H14" stroke="#4400FF"/>
          <path d="M32 35L31.5 36V38L32 39" stroke="#FFCC00"/>
          <path d="M35 35L34.5 36V38L35 39" stroke="#FFCC00"/>
          <path d="M35 37H34" stroke="#4400FF"/>
          <path d="M32 37H31" stroke="#4400FF"/>
        </svg>
      );
    case 'bishop-ethereal':
      return (
        <svg className={className} viewBox="31.5 4 11 22" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <path d="M34 11H40" stroke="#FF5252"/>
        </svg>
      );
    case 'rook-hop':
      return (
        <svg className={className} viewBox="18.5 16 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="22.5" cy="24.5" r="3.5" fill="#FFCC00"/>
          <path d="M22.5 17L21.5 19H23.5L22.5 17Z" fill="#FFCC00" stroke="#FFCC00"/>
          <path d="M22.5 32L21.5 30H23.5L22.5 32Z" fill="#FFCC00" stroke="#FFCC00"/>
        </svg>
      );
    case 'rook-diagonal':
      return (
        <svg className={className} viewBox="6 35 32 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.5 37C26.535 37 30.2078 37.0749 32.8896 37.1982C34.2231 37.2596 35.3535 37.3347 36.1709 37.4235C36.5727 37.4672 36.959 37.5205 37.2646 37.5892C37.5266 37.6481 38 37.7801 38 38C38 38.2199 37.5266 38.3519 37.2646 38.4108C36.959 38.4795 36.5727 38.5328 36.1709 38.5765C35.3535 38.6653 34.2231 38.7404 32.8896 38.8018C30.2078 38.9251 26.535 39 22.5 39C18.465 39 14.7922 38.9251 12.1104 38.8018C10.7769 38.7404 9.64647 38.6653 8.8291 38.5765C8.42734 38.5328 8.04101 38.4795 7.73535 38.4108C7.47335 38.3519 7 38.2199 7 38C7 37.7801 7.47335 37.6481 7.73535 37.5892C8.04101 37.5205 8.42734 37.4672 8.8291 37.4235C9.64647 37.3347 10.7769 37.2596 12.1104 37.1982C14.7922 37.0749 18.465 37 22.5 37Z" fill="#C16A00"/>
          <circle cx="10" cy="38" r="2" fill="#683900"/>
          <circle cx="15" cy="38" r="2" fill="#683900"/>
          <circle cx="20" cy="38" r="2" fill="#683900"/>
          <circle cx="30" cy="38" r="2" fill="#683900"/>
          <circle cx="25" cy="38" r="2" fill="#683900"/>
          <circle cx="35" cy="38" r="2" fill="#683900"/>
        </svg>
      );
    case 'king-jump':
      return (
        <svg className={className} viewBox="14 4 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 13H15V6H17L18 7.5H21V5.5C21 4 24 4 24 5.5V7.5L27 7.5L28 6H30V13Z" fill="#FFCC00" stroke="#FFCC00"/>
          <circle cx="22.5" cy="6" r="1.5" fill="#FF0000"/>
          <path d="M23.5 12V9" stroke="black"/>
          <path d="M25 9.5H23" stroke="black"/>
          <path d="M21.5 12V9" stroke="black"/>
          <path d="M20 9.5H22" stroke="black"/>
          <path d="M18.5 12V10" stroke="black"/>
          <path d="M16 10.5H19" stroke="black"/>
          <path d="M26.5 12V10" stroke="black"/>
          <path d="M29 10.5H26" stroke="black"/>
        </svg>
      );
    case 'king-double-step':
      return (
        <svg className={className} viewBox="9 28 24 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5 31L14.6818 33.5L19.9091 34H25.1364L29.3182 33.5L33.5 31" stroke="#FFCC00"/>
          <path d="M22.5 34L25.0981 39.25H19.9019L22.5 34Z" fill="#E4B600"/>
          <path d="M22.5 35L24.2321 38.75H20.7679L22.5 35Z" fill="#D900FF"/>
        </svg>
      );
    case 'king-blink':
      return (
        <svg className={className} viewBox="5 14 34 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 29C15.1684 25.9801 17.0789 23.3678 17.5 17L16.5 16C15.3399 22.3447 13.4988 24.9864 8 28L9.5 29Z" fill="#D9D9D9" stroke="#AEABAB"/>
          <path d="M7.26316 26C12.0366 23.4447 13.6454 21.2343 14 15.8462L13.1579 15C12.181 20.3686 10.6306 22.6038 6 25.1538L7.26316 26Z" fill="#D9D9D9" stroke="#AEABAB"/>
          <path d="M14 24.5L15 23.5" stroke="#11FF00"/>
          <path d="M11 22.5L12 21.5" stroke="#11FF00"/>
          <path d="M35.5 29C29.8316 25.9801 27.9211 23.3678 27.5 17L28.5 16C29.6601 22.3447 31.5012 24.9864 37 28L35.5 29Z" fill="#D9D9D9" stroke="#AEABAB"/>
          <path d="M37.7368 26C32.9634 23.4447 31.3546 21.2343 31 15.8462L31.8421 15C32.819 20.3686 34.3694 22.6038 39 25.1538L37.7368 26Z" fill="#D9D9D9" stroke="#AEABAB"/>
          <path d="M31 24.5L30 23.5" stroke="#11FF00"/>
          <path d="M34 22.5L33 21.5" stroke="#11FF00"/>
        </svg>
      );
    case 'king-shield':
      return (
        <svg className={className} viewBox="18 16 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="22.5" cy="24.5" r="3.5" fill="#FFCC00"/>
          <path d="M20.5 20L22.5 21L24.5 20V17H20.5V20Z" fill="#D9D9D9" stroke="#FFCC00"/>
          <path d="M20.5 29L22.5 28L24.5 29V32H20.5V29Z" fill="#D9D9D9" stroke="#FFCC00"/>
        </svg>
      );
    case 'queen-hop':
      return (
        <svg className={className} viewBox="33 8 9 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="38" cy="12.5" r="4.5" fill="#FF5E00"/>
          <path d="M37 12.5L38 13.5L39 12.5L38 11.5L37 12.5Z" fill="#FF0000" stroke="#FF0000"/>
          <path d="M37 19L38 18L39 19V36L38 37L37 36V19Z" fill="#FFCC00" stroke="#FFCC00"/>
        </svg>
      );
    default:
      return <FallbackIcon iconName={iconName} className={className} />;
  }
};

const FallbackIcon: React.FC<{ iconName: string; className: string }> = ({ iconName, className }) => {
  switch (iconName) {
    case 'Compass':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" className="stroke-slate-700 fill-slate-900/40" />
          <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" className="stroke-emerald-400 fill-emerald-500/10" />
        </svg>
      );
    case 'Flame':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c1 2 2 4.5 2 7.5S11 15 11 18s2.5 4 2.5 4" className="stroke-emerald-400" />
          <path d="M10 4.5c2 2 4 4.5 4 8.5s-4 7-4 9" className="stroke-emerald-500" />
          <path d="M14 6c-2 3-2.5 5.5-2 8s.5 4 .5 6" className="stroke-teal-400" />
        </svg>
      );
    case 'ChevronsDown':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v14M9 16h6" className="stroke-slate-500" strokeWidth="2" />
          <polygon points="12,23 9,16 15,16" className="stroke-blue-400 fill-blue-500/20" />
          <path d="M10 5l2-3 2 3" className="stroke-blue-300" />
        </svg>
      );
    case 'Radio':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 10a8 8 0 0 1 16 0c0 4.4-4 8-8 11-4-3-8-6.6-8-11z" className="stroke-blue-400 fill-blue-905/30" />
          <circle cx="12" cy="10" r="3" className="stroke-indigo-400 fill-indigo-900/50" />
        </svg>
      );
    case 'Shield':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" className="stroke-cyan-400 fill-cyan-950/20" />
          <line x1="12" y1="2.5" x2="12" y2="21.5" className="stroke-cyan-300/40" />
          <line x1="4.5" y1="11" x2="19.5" y2="11" className="stroke-cyan-300/40" />
        </svg>
      );
    case 'Ghost':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18.68 12c.08-.65.12-1.32.12-2a6.8 6.8 0 0 0-13.6 0c0 .68.04 1.35.12 2A2.72 2.72 0 0 1 3 14.4V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4.6a2.72 2.72 0 0 1-2.32-2.4z" className="stroke-purple-400 fill-purple-950/20" />
          <circle cx="9" cy="11" r="1" className="fill-purple-300" />
          <circle cx="15" cy="11" r="1" className="fill-purple-300" />
          <path d="M10 15h4" className="stroke-purple-300" />
        </svg>
      );
    case 'Activity':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="8" className="stroke-slate-700 fill-slate-900/40" strokeWidth="2" />
          <circle cx="12" cy="12" r="5" className="stroke-emerald-400 fill-slate-950" />
          <circle cx="12" cy="12" r="2" className="stroke-teal-300 fill-emerald-450" />
        </svg>
      );
    case 'ArrowUpCircle':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2" className="stroke-purple-400 fill-purple-950/30" />
          <path d="M12 2v9M8 6h8" className="stroke-purple-300" strokeWidth="2" />
          <path d="M5 11V7h14v4" className="stroke-purple-500" />
        </svg>
      );
    case 'CornerDownRight':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" className="stroke-indigo-400 fill-indigo-950/40" />
          <circle cx="12" cy="12" r="3" className="stroke-indigo-300" />
          <line x1="12" y1="3" x2="12" y2="21" className="stroke-indigo-400/55" />
          <line x1="3" y1="12" x2="21" y2="12" className="stroke-indigo-400/55" />
        </svg>
      );
    case 'Crown':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" className="stroke-yellow-400 fill-yellow-500/10" />
          <rect x="5" y="18" width="14" height="3" rx="1" className="stroke-yellow-500 fill-yellow-900/30" />
          <circle cx="12" cy="11" r="1" className="fill-yellow-300" />
        </svg>
      );
    case 'Eye':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" className="stroke-teal-400 fill-teal-950/20" />
          <circle cx="12" cy="12" r="3" className="stroke-teal-300 fill-teal-500/30" />
          <circle cx="12" cy="12" r="1" className="fill-white" />
        </svg>
      );
    case 'Sparkles':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 22V2h12l3 5-3 5H4" className="stroke-yellow-500 fill-yellow-950/20" strokeWidth="2" />
          <circle cx="9" cy="7" r="2" className="stroke-yellow-300 fill-yellow-405" />
        </svg>
      );
    case 'ShieldAlert':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12,2 22,21 2,21" className="stroke-rose-400 fill-rose-950/30" strokeWidth="2" />
          <line x1="12" y1="9" x2="12" y2="14" className="stroke-rose-300" strokeWidth="2" />
          <circle cx="12" cy="18" r="1.5" className="fill-rose-300" />
        </svg>
      );
    case 'Zap':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" className="stroke-amber-400 fill-amber-500/20" />
        </svg>
      );
    case 'ShieldCheck':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" className="stroke-emerald-400 fill-emerald-950/20" />
          <path d="m9 11 2 2 4-4" className="stroke-emerald-300" strokeWidth="2" />
        </svg>
      );
    case 'Wand2':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="2" x2="22" y2="6" className="stroke-yellow-400" strokeWidth="2" />
          <line x1="3" y1="21" x2="16" y2="8" className="stroke-amber-400" strokeWidth="2.5" />
          <circle cx="20" cy="4" r="3" className="stroke-yellow-300 fill-yellow-400" />
        </svg>
      );
    case 'CupSoda':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 2H7v7c0 4 3 6 4 9v4H8v1h8v-1h-3v-4c1-3 4-5 4-9V2z" className="stroke-purple-400 fill-purple-950/20" />
          <circle cx="12" cy="6" r="2" className="stroke-purple-300 fill-purple-400" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3 7h7l-5.5 4.5 2 7L12 17l-6.5 3.5 2-7L2 9h7z" className="stroke-amber-400 fill-amber-500/15" />
        </svg>
      );
  }
};