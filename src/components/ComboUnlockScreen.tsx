import React from 'react';
import { motion } from 'motion/react';
import { BoonIcon } from './BoonIcon';

interface ComboUnlockScreenProps {
  comboName: string;
  comboDescription: string;
  artifactAName: string;
  artifactAIcon: string;
  artifactAId: string;
  artifactBName: string;
  artifactBIcon: string;
  artifactBId: string;
  bonusTag: string;
  gameMode: 'campaign' | 'pvp' | 'online';
  waitingForOpponent: boolean;
  onProceed: () => void;
}

export const ComboUnlockScreen: React.FC<ComboUnlockScreenProps> = ({
  comboName,
  comboDescription,
  artifactAName,
  artifactAIcon,
  artifactAId,
  artifactBName,
  artifactBIcon,
  artifactBId,
  bonusTag,
  gameMode,
  waitingForOpponent,
  onProceed,
}) => {
  return (
    <motion.div
      key="combo-unlock-screen"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="relative text-center py-10 max-w-md mx-auto border-4 border-purple-600 bg-black p-6 font-pixel select-none shadow-[4px_4px_0px_#7c3aed]"
      id="combo-unlock-screen"
    >
      <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-purple-400 animate-pulse" />
      <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-purple-400 animate-pulse" />
      <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-purple-400 animate-pulse" />
      <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-purple-400 animate-pulse" />

      <p className="text-purple-400 text-[8px] uppercase tracking-widest mb-2 animate-pulse">SYNERGY UNLOCKED</p>

      <div className="flex items-center justify-center gap-4 my-5">
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-12 h-12 border-2 border-purple-700 bg-zinc-950 flex items-center justify-center">
            <BoonIcon iconName={artifactAIcon} upgradeId={artifactAId} className="w-6 h-6 text-purple-300" />
          </div>
        </div>

        <div className="text-purple-400 text-lg font-bold">+</div>

        <div className="flex flex-col items-center gap-1.5">
          <div className="w-12 h-12 border-2 border-purple-700 bg-zinc-950 flex items-center justify-center">
            <BoonIcon iconName={artifactBIcon} upgradeId={artifactBId} className="w-6 h-6 text-purple-300" />
          </div>
        </div>

        <div className="text-purple-400 text-lg font-bold">=</div>

        <div className="flex flex-col items-center gap-1.5">
          <div className="w-12 h-12 border-2 border-purple-500 bg-purple-950 flex items-center justify-center animate-pulse">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-purple-300 fill-current">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-4" />

      <p className="text-[9px] font-bold text-purple-200 uppercase tracking-wide mb-1">{bonusTag}</p>
      <p className="text-[10px] text-zinc-300 leading-relaxed mb-5">{comboDescription}</p>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-5" />

      {gameMode === 'online' && waitingForOpponent ? (
        <p className="text-purple-400 text-[8px] uppercase tracking-wider animate-pulse">
          WAITING FOR OPPONENT...
        </p>
      ) : (
        <button
          onClick={onProceed}
          className="border-4 border-purple-500 bg-zinc-950 text-purple-300 hover:bg-purple-950 w-full font-pixel text-[8.5px] uppercase py-2.5 shadow-[4px_4px_0px_#7c3aed] transition-all cursor-pointer"
        >
          PROCEED
        </button>
      )}
    </motion.div>
  );
};