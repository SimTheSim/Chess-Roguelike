import React from 'react';
import { Upgrade } from '../types';
import { BoonIcon } from './BoonIcon';
import { motion } from 'motion/react';

interface UpgradeScreenProps {
  choices: Upgrade[];
  onSelectUpgrade: (id: string) => void;
  level: number;
}


export const UpgradeScreen: React.FC<UpgradeScreenProps> = ({
  choices,
  onSelectUpgrade,
  level,
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
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {sortedChoices.map((upgrade, index) => {
          return (
            <motion.button
              key={upgrade.id}
              initial={{ opacity: 0, scale: 0.95 }}              onClick={() => onSelectUpgrade(upgrade.id)}
              className={`relative group flex flex-col items-center text-center p-5 border-4 transition-all duration-150 cursor-pointer outline-none focus:ring-4 focus:ring-emerald-400 select-none ${revealed[upgrade.id] ? getRarityClass(upgrade.rarity) : 'border-zinc-800 bg-black text-zinc-300 shadow-[4px_4px_0px_#27272a]'}
              `}
              id={`upgrade-choice-${upgrade.id}`}
              animate={{
                opacity: 1,
                scale: 1,
                ...(revealed[upgrade.id] && upgrade.rarity === 'epic' && {
                  boxShadow: ['4px 4px 0px #7c3aed', '4px 4px 0px #a855f7', '4px 4px 0px #7c3aed'],
                }),
              }}
              transition={upgrade.rarity === 'epic'
                ? { duration: 0.3, boxShadow: { duration: 2, repeat: Infinity } }
                : { duration: 0.3 }
              }
              whileHover={{ scale: 1.03, filter: revealed[upgrade.id] ? getRarityGlow(upgrade.rarity) : 'none' }}
              style={{ overflow: 'visible' }}
            >
              <div className={`absolute top-0 left-0 right-0 h-0.5 ${revealed[upgrade.id] ? (
                upgrade.rarity === 'epic' ? 'bg-purple-500 opacity-80' :
                upgrade.rarity === 'rare' ? 'bg-blue-500 opacity-50' : 'opacity-0'
              ) : 'opacity-0'}`} />
              <div className="flex items-center justify-between w-full mb-4">
                <span className={`text-[8px] uppercase font-pixel px-2 py-1 border-2 transition-opacity duration-300 ${getRarityBadge(upgrade.rarity)} ${revealed[upgrade.id] ? 'opacity-100' : 'opacity-0'}`}>
                  {upgrade.rarity}
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