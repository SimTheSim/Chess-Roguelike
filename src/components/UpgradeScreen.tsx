import React from 'react';
import { Upgrade } from '../types';
import { BoonIcon } from './BoonIcon';
import { motion } from 'motion/react';

interface UpgradeScreenProps {
  choices: Upgrade[];
  onSelectUpgrade: (id: string) => void;
  level: number;
  playerName?: string;
  pickedId?: string | null;
}


export const UpgradeScreen: React.FC<UpgradeScreenProps> = ({
  choices,
  onSelectUpgrade,
  level,
  playerName = 'PLAYER',
  pickedId,
}) => {
  const sortedChoices = [...choices].sort((a, b) => {
    const order = { common: 0, rare: 1, epic: 2 };
    return order[a.rarity] - order[b.rarity];
  });

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'epic': return 'drop-shadow(0 0 12px #a855f7) drop-shadow(0 0 24px #7c3aed)';
      case 'rare': return 'drop-shadow(0 0 6px #3b82f6)';
      default: return 'none';
    }
  };

  const getRarityAnimation = (rarity: string) => {
    switch (rarity) {
      case 'epic': return 'animate-pulse';
      case 'rare': return '';
      default: return '';
    }
  };

  const getRarityClass = (rarity: string) => {
    switch (rarity) {
      case 'epic':
        return 'border-purple-500 bg-black text-purple-400 hover:border-purple-300 shadow-[4px_4px_0px_#7c3aed]';
      case 'rare':
        return 'border-blue-500 bg-black text-blue-400 hover:border-blue-300 shadow-[4px_4px_0px_#2563eb]';
      default:
        return 'border-zinc-700 bg-black text-zinc-300 hover:border-emerald-400 shadow-[4px_4px_0px_#4b5563]';
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'epic':
        return 'bg-purple-950 text-purple-300 border-purple-500';
      case 'rare':
        return 'bg-blue-950 text-blue-300 border-blue-500';
      default:
        return 'bg-emerald-950 text-emerald-400 border-emerald-500';
    }
  };

  const [revealed, setRevealed] = React.useState<Record<string, boolean>>({});
  const [particles, setParticles] = React.useState<Record<string, {id: number, x: number, y: number}[]>>({});
  const [revealKey, setRevealKey] = React.useState(0);

  React.useEffect(() => {
    setRevealed({});
    setParticles({});
    const sorted = [...choices].sort((a, b) => {
      const order = { common: 0, rare: 1, epic: 2 };
      return order[a.rarity] - order[b.rarity];
    });
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    sorted.forEach((upgrade) => {
      const t1 = setTimeout(() => {
        setRevealed(prev => ({ ...prev, [upgrade.id]: true }));
        setParticles(prev => ({
          ...prev,
          [upgrade.id]: Array.from({ length: 18 }, (_, i) => ({
            id: i,
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 500,
          }))
        }));
        const t2 = setTimeout(() => setParticles(prev => ({ ...prev, [upgrade.id]: [] })), 1400);
        timeouts.push(t2);
      }, getRevealDelay(upgrade.rarity));
      timeouts.push(t1);
    });
    return () => timeouts.forEach(clearTimeout);
  }, [revealKey]);

  const getRarityParticleColor = (rarity: string) => {
    switch (rarity) {
      case 'epic': return 'bg-purple-400';
      case 'rare': return 'bg-blue-400';
      default: return 'bg-emerald-400';
    }
  };

  const getRevealDelay = (rarity: string) => {
    switch (rarity) {
      case 'epic': return 3000;
      case 'rare': return 2000;
      default: return 1000;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-4xl mx-auto min-h-[500px]" id="upgrade-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-10 select-none"
      >
        <p className="text-emerald-400 font-pixel text-[10px] tracking-wider mb-3">STAGE {level - 1} CLEAR</p>
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-pixel">SELECT AN ARTIFACT</h2>
        <p className="text-zinc-400 font-pixel text-[9px] tracking-wider mt-2 uppercase">{playerName} {playerName.toUpperCase() === 'YOU' ? 'ARE' : 'IS'} PICKING</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {sortedChoices.map((upgrade, index) => {
          return (
            <motion.button
              key={upgrade.id}
              initial={{ opacity: 0, scale: 0.95 }}
              onClick={() => {
                if (upgrade.id !== pickedId) {
                  onSelectUpgrade(upgrade.id);
                }
              }}
              disabled={upgrade.id === pickedId}
              className={`relative group flex flex-col items-center text-center p-5 border-4 transition-all duration-150 outline-none select-none ${upgrade.id === pickedId ? 'border-red-900 bg-zinc-950 opacity-40 cursor-not-allowed line-through' : `cursor-pointer focus:ring-4 focus:ring-emerald-400 ${revealed[upgrade.id] ? getRarityClass(upgrade.rarity) : 'border-zinc-800 bg-black text-zinc-300 shadow-[4px_4px_0px_#27272a]'}`}
              `}
              id={`upgrade-choice-${upgrade.id}`}
              animate={{
                opacity: 1,
                scale: 1,
                ...(revealed[upgrade.id] && upgrade.rarity === 'epic' && upgrade.id !== pickedId && {
                  boxShadow: ['4px 4px 0px #7c3aed', '4px 4px 0px #a855f7', '4px 4px 0px #7c3aed'],
                }),
              }}
              transition={upgrade.rarity === 'epic'
                ? { duration: 0.3, boxShadow: { duration: 2, repeat: Infinity } }
                : { duration: 0.3 }
              }
              whileHover={{ scale: upgrade.id === pickedId ? 1 : 1.03, filter: revealed[upgrade.id] && upgrade.id !== pickedId ? getRarityGlow(upgrade.rarity) : 'none' }}
              style={{ overflow: 'visible' }}
            >
              {upgrade.id === pickedId && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <span className="bg-red-600 text-white text-[8px] font-bold px-2 py-0.5 uppercase tracking-wider transform -rotate-12 border border-black shadow">CLAIMED BY LOSER</span>
                </div>
              )}
              <div className={`absolute top-0 left-0 right-0 h-0.5 ${revealed[upgrade.id] ? (
                upgrade.rarity === 'epic' ? 'bg-purple-500 opacity-80' :
                upgrade.rarity === 'rare' ? 'bg-blue-500 opacity-50' : 'opacity-0'
              ) : 'opacity-0'}`} />
              <div className="flex items-center justify-between w-full mb-4">
                <span className={`text-[8px] uppercase font-pixel px-2 py-1 border-2 transition-opacity duration-300 ${getRarityBadge(upgrade.rarity)} ${revealed[upgrade.id] ? 'opacity-100' : 'opacity-0'}`}>
                  {upgrade.rarity}
                </span>
                <span className="text-zinc-500 ml-auto opacity-0 transition-opacity duration-300" style={{ opacity: revealed[upgrade.id] ? 1 : 0 }}>
                  {upgrade.pieceFamily === 'pawn' && (
                    <svg viewBox="0 0 45 45" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#71717a" stroke="#71717a" strokeLinecap="round" strokeWidth="1.5"
                        d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"/>
                    </svg>
                  )}
                  {upgrade.pieceFamily === 'knight' && (
                    <svg viewBox="0 0 45 45" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                      <g fill="none" fillRule="evenodd" stroke="#71717a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                        <path fill="#71717a" d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"/>
                        <path fill="#71717a" d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3"/>
                        <path fill="#52525b" d="M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0m5.433-9.75a.5 1.5 30 1 1-.866-.5.5 1.5 30 1 1 .866.5"/>
                      </g>
                    </svg>
                  )}
                  {upgrade.pieceFamily === 'bishop' && (
                    <svg viewBox="0 0 45 45" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                      <g fill="none" fillRule="evenodd" stroke="#71717a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                        <g fill="#71717a" strokeLinecap="butt">
                          <path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.94 3-2 3-2z"/>
                          <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"/>
                          <path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/>
                        </g>
                        <path strokeLinejoin="miter" d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5"/>
                      </g>
                    </svg>
                  )}
                  {upgrade.pieceFamily === 'rook' && (
                    <svg viewBox="0 0 45 45" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                      <g fill="#71717a" fillRule="evenodd" stroke="#71717a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                        <path strokeLinecap="butt" d="M9 39h27v-3H9zm3-3v-4h21v4zm-1-22V9h4v2h5V9h5v2h5V9h4v5"/>
                        <path d="m34 14-3 3H14l-3-3"/>
                        <path strokeLinecap="butt" strokeLinejoin="miter" d="M31 17v12.5H14V17"/>
                        <path d="m31 29.5 1.5 2.5h-20l1.5-2.5"/>
                        <path fill="none" strokeLinejoin="miter" d="M11 14h23"/>
                      </g>
                    </svg>
                  )}
                  {upgrade.pieceFamily === 'queen' && (
                    <svg viewBox="0 0 45 45" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                      <g fill="#71717a" fillRule="evenodd" stroke="#71717a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                        <path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0m16.5-4.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0M41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0M16 8.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0M33 9a2 2 0 1 1-4 0 2 2 0 1 1 4 0"/>
                        <path strokeLinecap="butt" d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-14V25L7 14z"/>
                        <path strokeLinecap="butt" d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z"/>
                        <path fill="none" d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0"/>
                      </g>
                    </svg>
                  )}
                  {upgrade.pieceFamily === 'king' && (
                    <svg viewBox="0 0 45 45" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                      <g fill="none" fillRule="evenodd" stroke="#71717a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                        <path strokeLinejoin="miter" d="M22.5 11.63V6M20 8h5"/>
                        <path fill="#71717a" strokeLinecap="butt" strokeLinejoin="miter" d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"/>
                        <path fill="#71717a" d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-3.5-7.5-13-10.5-16-4-3 6 5 10 5 10z"/>
                        <path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0"/>
                      </g>
                    </svg>
                  )}
                  {upgrade.pieceFamily === 'general' && (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-zinc-500"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
                  )}
                </span>
              </div>

              

              <div className={`w-14 h-14 border-4 mb-4 flex items-center justify-center transition-colors flex-shrink-0
                ${revealed[upgrade.id] ? 'bg-zinc-950 border-zinc-800 group-hover:border-emerald-400' : 'bg-zinc-900 border-zinc-800'}`}>
                {revealed[upgrade.id] && <BoonIcon iconName={upgrade.icon} upgradeId={upgrade.id} className="w-6 h-6" />}
              </div>
              <h3 className={`text-xs font-bold uppercase font-pixel mb-3 transition-colors group-hover:text-emerald-400 ${revealed[upgrade.id] ? 'text-zinc-100' : 'invisible'}`}>
                {upgrade.name}
              </h3>
              <p className={`text-[11px] leading-relaxed font-mono mb-6 flex-grow ${revealed[upgrade.id] ? 'text-zinc-400' : 'invisible'}`}>
                {upgrade.description}
              </p>
              {upgrade.rarity !== 'common' && (
                <div className={`w-full h-px mb-3 transition-opacity duration-500 ${revealed[upgrade.id] ? 'opacity-100' : 'opacity-0'}
                  ${upgrade.rarity === 'epic'
                    ? `bg-gradient-to-r from-transparent via-purple-400 to-transparent ${revealed[upgrade.id] ? 'animate-pulse' : ''}`
                    : 'bg-gradient-to-r from-transparent via-blue-500 to-transparent'
                  }`} />
              )}

              {upgrade.rarity === 'epic' && revealed[upgrade.id] && (
                <>
                  <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-purple-400 animate-pulse" />
                  <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-purple-400 animate-pulse" />
                  <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-purple-400 animate-pulse" />
                  <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-purple-400 animate-pulse" />
                </>
              )}

              <div className={`mt-auto w-full py-2 bg-zinc-900 border-2 border-zinc-700 text-[8px] text-zinc-300 font-pixel group-hover:bg-emerald-950 group-hover:border-emerald-400 group-hover:text-emerald-400 transition-all duration-300 ${revealed[upgrade.id] ? 'opacity-100' : 'opacity-0'}`}>
                EQUIP
              </div>

              {(particles[upgrade.id] || []).map(p => (
                <motion.div
                  key={p.id}
                  className={`absolute w-1.5 h-1.5 rounded-none pointer-events-none z-50 ${getRarityParticleColor(upgrade.rarity)}`}
                  style={{ left: '50%', top: '50%' }}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{ opacity: 0, x: p.x - 50, y: p.y - 50, scale: 0.5 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              ))}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};