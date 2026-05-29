import React from 'react';
import { useGame } from '../GameContext';

export const Header = () => {
    const { theme, gameMode, status, setStatus } = useGame();
    return (
    <header className={`h-16 flex items-center justify-between px-6 border-b-4 font-pixel select-none
      ${theme === 'classic' ? 'bg-black border-zinc-800' : ''}
      ${theme === 'retro-green' ? 'bg-black border-green-950 text-green-400' : ''}
      ${theme === 'retro-cyber' ? 'bg-[#020617] border-indigo-950 text-sky-400' : ''}
    `} id="page-header">
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 45 45" className={`w-5 h-5 ${theme === 'retro-green' ? 'text-green-500' : theme === 'retro-cyber' ? 'text-pink-500' : 'text-emerald-400'}`} xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: `<path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"/>` }} />
        <h1 className="text-[10px] uppercase tracking-tight font-bold text-white font-pixel">
          CHESS 2
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[7.5px] uppercase opacity-60">MODE:</span>
          <span className="text-[8.5px] font-bold text-white uppercase">{gameMode}</span>
        </div>
        {status !== 'start' && (
          <button
            onClick={() => setStatus('start')}
            className={`border-2 px-3 py-1 text-[8px] font-pixel transition-all cursor-pointer
              ${theme === 'classic' ? 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500' : ''}
              ${theme === 'retro-green' ? 'border-green-800 bg-green-950 text-green-400 hover:border-green-400' : ''}
              ${theme === 'retro-cyber' ? 'border-sky-800 bg-indigo-950 text-sky-300 hover:border-sky-300' : ''}
            `}
            id="exit-game-btn"
          >
            EXIT TO MENU
          </button>
        )}
      </div>
    </header>
  );
};