import React, { useState } from 'react';
import { PieceIcon } from './PieceIcon';
import { ALL_ARTIFACTS } from './artifactRegistry';
import { Piece } from '../types';
import { useGame } from '../GameContext';
import { BoonIcon } from './BoonIcon';
import { getActiveCombos } from './artifactRegistry';

const BoonTooltipList = ({ boonIds, color }: { boonIds: string[]; color: 'emerald' | 'pink' }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="space-y-1.5 mt-2 max-h-[140px] overflow-y-auto pr-1">
      {boonIds.map(uid => {
        const orig = ALL_ARTIFACTS.find(u => u.id === uid);
        if (!orig) return null;
        const isHovered = hoveredId === uid;
        return (
          <div
            key={uid}
            className={`relative p-1.5 border flex items-center gap-2 cursor-default ${color === 'emerald' ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-850 bg-[#090909]'}`}
            onMouseEnter={() => setHoveredId(uid)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <BoonIcon iconName={orig.icon} upgradeId={orig.id} className={`w-3.5 h-3.5 flex-shrink-0 ${color === 'emerald' ? 'text-emerald-400' : 'text-pink-400'}`} />
            <span className={`text-[7.5px] truncate ${color === 'emerald' ? 'text-zinc-300' : 'text-pink-400'}`}>{orig.name}</span>
            {isHovered && (
              <div
                className="fixed z-50 w-48 p-2 bg-zinc-900 border border-zinc-600 text-[7.5px] text-zinc-300 leading-relaxed shadow-lg pointer-events-none"
                style={{ marginLeft: '200px' }}
              >
                <p className={`font-bold mb-1 ${color === 'emerald' ? 'text-zinc-100' : 'text-pink-300'}`}>{orig.name}</p>
                <p>{orig.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const ComboList = ({ upgrades }: { upgrades: string[] }) => {
  const combos = getActiveCombos(upgrades);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  if (combos.length === 0) return null;
  return (
    <div className="border-t border-zinc-800 pt-3">
      <p className="text-zinc-500 text-[8px] uppercase">SYNERGIES ({combos.length})</p>
      <div className="space-y-1.5 mt-2">
        {combos.map((combo) => {
          const key = `${combo.artifactA.id}::${combo.artifactB.id}`;
          return (
            <div
              key={key}
              className="relative p-1.5 border border-purple-900 bg-purple-950/20 flex items-center gap-2 cursor-default"
              onMouseEnter={() => setHoveredKey(key)}
              onMouseLeave={() => setHoveredKey(null)}
            >
              <BoonIcon iconName={combo.artifactA.icon} upgradeId={combo.artifactA.id} className="w-3 h-3 flex-shrink-0 text-purple-400" />
              <span className="text-purple-600 text-[7px]">+</span>
              <BoonIcon iconName={combo.artifactB.icon} upgradeId={combo.artifactB.id} className="w-3 h-3 flex-shrink-0 text-purple-400" />
              <span className="text-[7px] text-purple-300 truncate">{combo.bonusTag}</span>
              {hoveredKey === key && (
                <div
                  className="fixed z-50 w-52 p-2 bg-zinc-900 border border-purple-700 text-[7.5px] text-zinc-300 leading-relaxed shadow-lg pointer-events-none"
                  style={{ marginLeft: '210px' }}
                >
                  <p className="font-bold mb-1 text-purple-300">{combo.bonusTag}</p>
                  <p className="text-zinc-400 mb-1">{combo.artifactA.name} + {combo.artifactB.name}</p>
                  <p>{combo.bonusDescription}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const DashboardLeft = () => {
  const { theme, gameMode, mpColor, mpOppName, roundCounter, matchTarget, playerScore, opponentScore, upgrades, opponentUpgrades } = useGame();
  return (
    <aside className={`lg:col-span-3 border-4 p-4 flex flex-col gap-4 font-pixel select-none
      ${theme === 'classic' ? 'border-zinc-800 bg-black' : ''}
      ${theme === 'retro-green' ? 'border-green-950 bg-black text-green-400' : ''}
      ${theme === 'retro-cyber' ? 'border-indigo-950 bg-[#020617] text-sky-300' : ''}
    `} id="dashboard-left">

      <div className="pb-3 border-b border-zinc-800 text-center">
        <p className="text-[8px] opacity-60 mb-1">SCOREBOARD</p>
        <p className="text-[10px] text-white font-bold tracking-tight uppercase">ROUND {roundCounter}</p>

        <div className="flex justify-between items-center mt-3 bg-zinc-950 p-2.5 border-2 border-zinc-850">
          <div className="text-left">
            <p className="text-[7.5px] text-emerald-400 font-bold">
              {gameMode === 'online' ? (mpColor === 'white' ? 'YOU (W)' : `${mpOppName.toUpperCase()} (W)`) : ('P1 (W)')}
            </p>
            <p className="text-xl font-bold text-white">
              {gameMode === 'online' && mpColor === 'black' ? opponentScore : playerScore}
            </p>
          </div>
          <div className="text-zinc-650 text-[10px] font-bold">VS</div>
          <div className="text-right">
            <p className="text-[7.5px] text-pink-400 font-bold">
              {gameMode === 'campaign' ? 'AI (B)' : gameMode === 'online' ? (mpColor === 'black' ? 'YOU (B)' : `${mpOppName.toUpperCase()} (B)`) : (gameMode === 'pvp' ? 'P2 (B)' : 'AI (B)')}
            </p>
            <p className="text-xl font-bold text-white">
              {gameMode === 'online' && mpColor === 'black' ? playerScore : opponentScore}
            </p>
          </div>
        </div>
        <div className="text-[6.5px] opacity-50 mt-1 uppercase">TARGET: FIRST TO {matchTarget} WINS</div>
      </div>

      <div>
        <p className="text-zinc-500 text-[8px] uppercase">
          {gameMode === 'online' ? (mpColor === 'white' ? 'YOUR BOONS' : `${mpOppName.toUpperCase()}'S BOONS`) : ('P1 BOONS')} ({upgrades.length})
        </p>
        {upgrades.length === 0 ? (
          <p className="text-zinc-650 text-[8px] italic mt-1">NONE</p>
        ) : (
          <BoonTooltipList boonIds={upgrades} color="emerald" />
        )}
      </div>

      <div className="border-t border-zinc-800 pt-3">
        <p className="text-zinc-500 text-[8px] uppercase">
          {gameMode === 'campaign' ? 'AI BOONS' : gameMode === 'online' ? (mpColor === 'black' ? 'YOUR BOONS' : `${mpOppName.toUpperCase()}'S BOONS`) : (gameMode === 'pvp' ? 'P2 BOONS' : 'AI BOONS')} ({opponentUpgrades.length})
        </p>
        {opponentUpgrades.length === 0 ? (
          <p className="text-zinc-650 text-[8px] italic mt-1">NONE</p>
        ) : (
          <BoonTooltipList boonIds={opponentUpgrades} color="pink" />
        )}
      </div>

      <ComboList upgrades={upgrades} />
    </aside>
  );
};

export const DashboardRight = () => {
  const { theme, gameMode, mpColor, mpPlayerName, mpOppName, moveHistory, capturedByWhite, capturedByBlack } = useGame();
  return (
    <aside className={`lg:col-span-3 border-4 p-4 flex flex-col gap-4 font-pixel select-none
      ${theme === 'classic' ? 'border-zinc-800 bg-black' : ''}
      ${theme === 'retro-green' ? 'border-green-950 bg-black text-green-400' : ''}
      ${theme === 'retro-cyber' ? 'border-indigo-950 bg-[#020617] text-sky-455' : ''}
    `} id="dashboard-right">

      <div>
        <p className="text-zinc-500 text-[8px] uppercase mb-2">HISTORY LEDGER</p>
        <div className="h-[120px] bg-zinc-950 border-2 border-zinc-850 p-2 overflow-y-auto font-mono text-[9px] space-y-1 text-emerald-400 select-all pr-1">
          {moveHistory.length === 0 ? (
            <p className="text-zinc-650 italic text-[8px] font-pixel">GRID IDLE</p>
          ) : (
            moveHistory.map((h: string, i: number) => (
              <p key={i}>
                &gt; {h}
              </p>
            ))
          )}
        </div>
      </div>

      <div className="border-t border-zinc-800 pt-3">
        <p className="text-zinc-500 text-[8px] uppercase mb-2">GRAVEYARD</p>
        <div className="space-y-2 text-zinc-400">
          <div className="p-2 bg-[#090909] border border-zinc-850">
            <span className="text-emerald-400 text-[7px] block uppercase mb-1">
              {gameMode === 'online' ? (mpColor === 'white' ? (mpPlayerName || 'YOU') : mpOppName).toUpperCase() : ('P1')} ELIMINATED:
            </span>
            <div className="flex flex-wrap gap-1 mt-1 text-sm font-sans leading-none">
              {capturedByWhite.length === 0 ? (
                <span className="text-zinc-650 text-[7px] font-pixel">NONE</span>
              ) : (
                capturedByWhite.map((pt: Piece, i: number) => (
                  <span key={i} title={pt.type}>
                    <PieceIcon type={pt.type} className="w-3.5 h-3.5 text-emerald-400 inline-block" />
                  </span>
                ))
              )}
            </div>
          </div>
          <div className="p-2 bg-[#090909] border border-zinc-850">
            <span className="text-rose-500 text-[7px] block uppercase mb-1">
              {gameMode === 'online' ? (mpColor === 'black' ? (mpPlayerName || 'YOU') : mpOppName).toUpperCase() : (gameMode === 'pvp' ? 'P2' : 'AI')} ELIMINATED:
            </span>
            <div className="flex flex-wrap gap-1 mt-1 text-sm font-sans leading-none">
              {capturedByBlack.length === 0 ? (
                <span className="text-zinc-650 text-[7px] font-pixel">NONE</span>
              ) : (
                capturedByBlack.map((pt: Piece, i: number) => (
                  <span key={i} title={pt.type}>
                    <PieceIcon type={pt.type} className="w-3.5 h-3.5 text-rose-500 inline-block" />
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};