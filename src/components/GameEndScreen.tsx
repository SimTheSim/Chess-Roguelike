import { motion } from 'motion/react';

interface GameEndScreenProps {
  result: 'won' | 'lost';
  gameMode: 'campaign' | 'pvp' | 'online';
  playerScore: number;
  opponentScore: number;
  mpOppName?: string;
  matchTarget: number;
  theme: string;
  aiDifficulty: number;
  upgradePriority: 'loser-only' | 'loser-then-winner';
  onAiDifficultyChange: (d: number) => void;
  onUpgradePriorityChange: (p: 'loser-only' | 'loser-then-winner') => void;
  onMatchTargetChange: (t: number) => void;
  onReturnToSetup: () => void;
  onRematch: () => void;
}

export const GameEndScreen: React.FC<GameEndScreenProps> = ({
  result,
  gameMode,
  playerScore,
  opponentScore,
  mpOppName = '',
  matchTarget,
  aiDifficulty,
  upgradePriority,
  onAiDifficultyChange,
  onUpgradePriorityChange,
  onMatchTargetChange,
  onReturnToSetup,
  onRematch,
}) => {
  const won = result === 'won';

  const p1Label = gameMode === 'online' ? 'YOU' : gameMode === 'pvp' ? 'P1' : 'PLAYER';
  const p2Label = gameMode === 'online' ? mpOppName.toUpperCase() : gameMode === 'pvp' ? 'P2' : 'AI';

  return (
    <motion.div
      key={`match-${result}-screen`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className={`text-center py-16 max-w-sm mx-auto select-none font-pixel ${won ? '' : 'animate-pulse'}`}
      id={`match-${result}-screen`}
    >
      <div className={`p-4 border-4 bg-black inline-block mb-6 text-4xl ${won ? 'border-yellow-400 shadow-[4px_4px_0px_#10b981]' : 'border-rose-500 shadow-[4px_4px_0px_rgba(239,68,68,0.2)]'}`}>
        {won ? (
          <svg viewBox="0 0 24 24" className="w-10 h-10 text-yellow-400 fill-current" xmlns="http://www.w3.org/2000/svg">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-10 h-10 text-rose-500 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2a9 9 0 0 0-9 9c0 3.35 1.84 6.29 4.58 7.86L7 21h10l-.58-2.14A9 9 0 0 0 12 2zm-3 9a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zM9 17v-1h2v1H9zm4 0v-1h2v1h-2z"/>
          </svg>
        )}
      </div>

      <h1 className="text-lg font-bold text-white uppercase tracking-tight">
        {won ? 'CHALLENGE CONQUERED' : 'RUN DEFEATED'}
      </h1>
      <p className="text-zinc-500 mt-2 text-[8px] uppercase">
        {won ? 'ACHIEVED ABSOLUTE MATCH VICTORY' : 'THE DEFIANT FORCE CRUMBLED'}
      </p>

      <div className="mt-6 p-4 bg-zinc-950 border-2 border-zinc-850 text-left">
        <span className="text-[7px] block uppercase text-zinc-500 mb-1">MATCH SCORECARD</span>
        <p className="text-xs text-white font-bold mb-1">{p1Label}: {playerScore}</p>
        <p className="text-xs text-white font-bold">{p2Label}: {opponentScore}</p>
      </div>

      {gameMode === 'online' ? (
        <>
          <div className="mt-6 p-4 bg-zinc-950 border-2 border-zinc-850 text-left">
            <span className="text-[7px] block uppercase text-zinc-500 mb-3">REMATCH SETTINGS</span>
            <div className="mb-3">
              <span className="text-[7.5px] uppercase text-zinc-400 block mb-1.5">BOON DRAFT MODE</span>
              <div className="flex gap-2">
                <button
                  onClick={() => onUpgradePriorityChange('loser-only')}
                  className={`flex-1 py-1.5 border-2 text-[7px] font-pixel cursor-pointer ${upgradePriority === 'loser-only' ? 'bg-emerald-950 border-emerald-400 text-emerald-400' : 'bg-black border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
                >
                  LOSER ONLY
                </button>
                <button
                  onClick={() => onUpgradePriorityChange('loser-then-winner')}
                  className={`flex-1 py-1.5 border-2 text-[7px] font-pixel cursor-pointer ${upgradePriority === 'loser-then-winner' ? 'bg-emerald-950 border-emerald-400 text-emerald-400' : 'bg-black border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
                >
                  BOTH PICK
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={onRematch}
            className="mt-4 border-4 border-emerald-400 bg-black hover:bg-emerald-950 text-emerald-400 text-xs uppercase py-3.5 px-8 shadow-[4px_4px_0px_#10b981] transition-all cursor-pointer w-full"
          >
            REMATCH
          </button>
          <button
            onClick={onReturnToSetup}
            className="mt-3 border-4 border-zinc-700 bg-black hover:bg-zinc-900 text-zinc-400 text-xs uppercase py-3.5 px-8 shadow-[4px_4px_0px_#3f3f46] transition-all cursor-pointer w-full"
          >
            RETURN TO SETUP
          </button>
        </>
      ) : (
        <button
          onClick={onReturnToSetup}
          className={`mt-8 border-4 bg-black text-xs uppercase py-3.5 px-8 transition-all cursor-pointer w-full ${won
            ? 'border-emerald-400 hover:bg-emerald-950 text-emerald-400 shadow-[4px_4px_0px_#10b981]'
            : 'border-rose-500 hover:bg-rose-950 text-rose-500 shadow-[4px_4px_0px_rgba(239,68,68,0.4)]'
          }`}
        >
          {won ? 'RETURN TO SETUP' : 'TRY AGAIN'}
        </button>
      )}
    </motion.div>
  );
};