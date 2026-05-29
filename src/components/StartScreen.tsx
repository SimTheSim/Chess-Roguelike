import React from 'react';
import { motion } from 'motion/react';
import { useGame } from '../GameContext';

export const StartScreen = () => {
  const { theme, setTheme, gameMode, setGameMode, aiDifficulty, setAiDifficulty,
    matchTarget, setMatchTarget, upgradePriority, setUpgradePriority,
    activeTab, setActiveTab, startNewMatch, setStatus } = useGame();
  return (
    <motion.div
      key="start-screen"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="text-center py-8 max-w-lg mx-auto w-full flex flex-col items-center"
      id="start-screen"
    >
      <div className="relative mb-5">
        <div className={`p-5 border-4 bg-black inline-block font-pixel text-3xl
          ${theme === 'classic' ? 'border-white text-emerald-400 shadow-[4px_4px_0px_#4b5563]' : ''}
          ${theme === 'retro-green' ? 'border-green-500 text-green-400 shadow-[4px_4px_0px_#14532d]' : ''}
          ${theme === 'retro-cyber' ? 'border-sky-400 text-pink-500 shadow-[4px_4px_0px_#38bdf8]' : ''}
        `}>
          <svg viewBox="0 0 45 45" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: `<path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"/>` }} />
        </div>
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-white uppercase font-pixel">
        CHESS 2
      </h1>

      <div className="w-full mt-7 border-4 border-zinc-800 bg-black text-left">
        <div className="flex border-b-4 border-zinc-800">
          <button
            onClick={() => setActiveTab('setup')}
            className={`flex-1 py-2 text-[8px] font-pixel cursor-pointer border-r-2 border-zinc-800 ${activeTab === 'setup' ? 'bg-zinc-900 text-white' : 'bg-black text-zinc-600 hover:text-zinc-400'}`}
          >
            SETUP
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2 text-[8px] font-pixel cursor-pointer ${activeTab === 'settings' ? 'bg-zinc-900 text-white' : 'bg-black text-zinc-600 hover:text-zinc-400'}`}
          >
            SETTINGS
          </button>
        </div>
        {activeTab === 'setup' && (
          <div className="p-5 flex flex-col gap-4">
            <div>
              <span className="text-[8px] font-pixel text-zinc-400 uppercase block mb-2">GAME MODE</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setGameMode('campaign')}
                  className={`flex-1 py-2 border-2 text-[8px] font-pixel cursor-pointer ${gameMode === 'campaign'
                      ? 'bg-emerald-950 border-emerald-400 text-emerald-400 font-bold'
                      : 'bg-black border-zinc-800 text-zinc-500 hover:text-zinc-300'
                    }`}
                >
                  CAMPAIGN VS AI
                </button>
                <button
                  onClick={() => setGameMode('pvp')}
                  className={`flex-1 py-2 border-2 text-[8px] font-pixel cursor-pointer ${gameMode === 'pvp'
                      ? 'bg-emerald-950 border-emerald-400 text-emerald-400 font-bold'
                      : 'bg-black border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                >
                  PvP PASS-N-PLAY
                </button>
                <button
                  onClick={() => setGameMode('online')}
                  className={`flex-1 py-2 border-2 text-[8px] font-pixel cursor-pointer ${gameMode === 'online'
                      ? 'bg-emerald-950 border-emerald-400 text-emerald-400 font-bold'
                      : 'bg-black border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                >
                  ONLINE PvP
                </button>
              </div>
            </div>

            {gameMode === 'campaign' && (
              <div>
                <span className="text-[8px] font-pixel text-zinc-400 uppercase block mb-2">AI DIFFICULTY LEVEL</span>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map(d => (
                    <button
                      key={d}
                      onClick={() => setAiDifficulty(d)}
                      className={`flex-1 py-1 border-2 text-[8.5px] font-pixel cursor-pointer ${aiDifficulty === d
                          ? 'bg-emerald-950 border-emerald-400 text-emerald-400 font-bold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                        }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {gameMode !== 'online' && (
              <div>
                <span className="text-[8px] font-pixel text-zinc-400 uppercase block mb-2">MATCH GOAL (WINS TARGET)</span>
                <div className="flex gap-2">
                  {[3, 5, 7].map(t => (
                    <button
                      key={t}
                      onClick={() => setMatchTarget(t)}
                      className={`flex-1 py-1.5 border-2 text-[8px] font-pixel cursor-pointer ${matchTarget === t
                          ? 'bg-emerald-950 border-emerald-400 text-emerald-400 font-bold'
                          : 'bg-black border-zinc-800 text-zinc-500'
                        }`}
                    >
                      FIRST TO {t}
                    </button>
                  ))}
                </div>
                <div>
                  <span className="text-[8px] font-pixel text-zinc-400 uppercase block mb-2 mt-4">BOON DRAFT MODE</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setUpgradePriority('loser-only')}
                      className={`flex-1 py-1.5 border-2 text-[8px] font-pixel cursor-pointer ${upgradePriority === 'loser-only'
                        ? 'bg-emerald-950 border-emerald-400 text-emerald-400 font-bold'
                        : 'bg-black border-zinc-800 text-zinc-500'
                      }`}
                    >
                      LOSER PICKS
                    </button>
                    <button
                      onClick={() => setUpgradePriority('loser-then-winner')}
                      className={`flex-1 py-1.5 border-2 text-[8px] font-pixel cursor-pointer ${upgradePriority === 'loser-then-winner'
                        ? 'bg-emerald-950 border-emerald-400 text-emerald-400 font-bold'
                        : 'bg-black border-zinc-800 text-zinc-500'
                      }`}
                    >
                      LOSER THEN WINNER
                    </button>
                  </div>
                  <p className="text-[7px] text-zinc-600 mt-1.5 font-pixel">
                    {upgradePriority === 'loser-then-winner' ? 'Loser picks first, winner picks from the 2 remaining.' : 'Only the loser picks a boon each round.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="p-5 flex flex-col gap-4">
            <div>
              <span className="text-[8px] font-pixel text-zinc-400 uppercase block mb-2">VISUAL SKIN THEMES</span>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setTheme('classic')}
                  className={`py-2 px-3 border-2 text-left text-[8px] font-pixel cursor-pointer flex justify-between items-center ${theme === 'classic'
                      ? 'bg-zinc-900 border-white text-white font-bold'
                      : 'bg-black border-zinc-800 text-zinc-500'
                    }`}
                >
                  <span>CLASSIC MONOCHROME</span>
                  <span className="text-[7px] p-0.5 bg-zinc-800 border text-zinc-400">Default B&W</span>
                </button>
                <button
                  onClick={() => setTheme('retro-green')}
                  className={`py-2 px-3 border-2 text-left text-[8px] font-pixel cursor-pointer flex justify-between items-center ${theme === 'retro-green'
                      ? 'bg-green-950/20 border-green-500 text-green-400 font-bold'
                      : 'bg-black border-zinc-800 text-zinc-500'
                    }`}
                >
                  <span>MATRIX CRT DISPLAY</span>
                  <span className="text-[7px] p-0.5 bg-green-950 text-green-400 border border-green-700">GameBoy 1989</span>
                </button>
                <button
                  onClick={() => setTheme('retro-cyber')}
                  className={`py-2 px-3 border-2 text-left text-[8px] font-pixel cursor-pointer flex justify-between items-center ${theme === 'retro-cyber'
                      ? 'bg-indigo-950/20 border-sky-400 text-sky-400 font-bold'
                      : 'bg-black border-zinc-800 text-zinc-500'
                    }`}
                >
                  <span>AMBER & NEON CYBERPUNK</span>
                  <span className="text-[7px] p-0.5 bg-indigo-950 text-sky-400 border border-indigo-700">Futuristic</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => gameMode === 'online' ? setStatus('lobby') : startNewMatch()}
        className={`mt-6 border-4 bg-black font-pixel text-[10px] uppercase py-3.5 px-10 transition-all cursor-pointer select-none
          ${theme === 'classic' ? 'border-emerald-400 text-emerald-400 hover:bg-emerald-950/40 shadow-[4px_4px_0px_rgba(16,185,129,0.3)]' : ''}
          ${theme === 'retro-green' ? 'border-green-400 text-green-400 hover:bg-green-950/40 shadow-[4px_4px_0px_rgba(34,197,94,0.3)]' : ''}
          ${theme === 'retro-cyber' ? 'border-sky-400 text-sky-400 hover:bg-indigo-950/40 shadow-[4px_4px_0px_rgba(56,189,248,0.3)]' : ''}
        `}
        id="start-campaign-btn"
      >
        {gameMode === 'online' ? 'FIND OPPONENT' : 'ENTER ARENA'}
      </button>
    </motion.div>
  );
};