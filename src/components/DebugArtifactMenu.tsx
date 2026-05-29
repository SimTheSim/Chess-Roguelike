import React, { useState, useEffect } from 'react';
import { ALL_ARTIFACTS } from './artifactRegistry';
import { BoonIcon } from './BoonIcon';
import { useGame } from '../GameContext';

interface DebugArtifactMenuProps {
  playerUpgrades: string[];
  setUpgrades: React.Dispatch<React.SetStateAction<string[]>>;
  opponentUpgrades: string[];
  setOpponentUpgrades: React.Dispatch<React.SetStateAction<string[]>>;
}

export function DebugArtifactMenu() {
  const { upgrades: playerUpgrades, setUpgrades, opponentUpgrades, setOpponentUpgrades } = useGame();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let sequence = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1) {
        sequence += e.key;
        if (sequence.endsWith('WOW_:)')) {
          setIsOpen((prev) => !prev);
          sequence = '';
        }
        if (sequence.length > 20) {
          sequence = sequence.slice(-10);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const filteredArtifacts = ALL_ARTIFACTS.filter(artifact =>
    artifact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artifact.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleArtifact = (id: string, side: 'player' | 'opponent') => {
    const setTarget = side === 'player' ? setUpgrades : setOpponentUpgrades;
    setTarget((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] flex items-center justify-center p-4 font-mono select-none">
      <div className="bg-zinc-950 border-4 border-red-600 w-full max-w-2xl max-h-[80vh] flex flex-col shadow-[8px_8px_0px_#dc2626]">
        <div className="bg-red-600 text-white p-3 flex justify-between items-center font-bold text-xs uppercase tracking-wider">
          <span>SYSTEM DEBUG: ARTIFACT MANIFEST</span>
          <button 
            onClick={() => setIsOpen(false)}
            className="bg-black text-white border border-white px-2 py-0.5 hover:bg-zinc-900 cursor-pointer"
          >
            X
          </button>
        </div>
        
        <div className="p-4 border-b border-zinc-800 bg-zinc-900 flex gap-2">
          <input
            type="text"
            placeholder="FILTER ARTIFACTS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-black border-2 border-zinc-700 text-zinc-200 text-xs p-2 focus:border-red-500 outline-none uppercase"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-2">
          {filteredArtifacts.map((artifact) => {
            const hasPlayer = playerUpgrades.includes(artifact.id);
            const hasOpponent = opponentUpgrades.includes(artifact.id);

            return (
              <div 
                key={artifact.id} 
                className="border-2 border-zinc-800 bg-black p-3 flex flex-col justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-zinc-900 border border-zinc-700 flex items-center justify-center shrink-0">
                    <BoonIcon iconName={artifact.icon} upgradeId={artifact.id} className="w-6 h-6 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white uppercase">{artifact.name}</p>
                    <p className="text-[8px] text-zinc-500 uppercase mt-0.5">ID: {artifact.id}</p>
                    <p className="text-[8px] text-zinc-400 mt-1 leading-normal">{artifact.description}</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => toggleArtifact(artifact.id, 'player')}
                    className={`flex-1 py-1 text-[8px] border font-bold transition-all cursor-pointer ${
                      hasPlayer 
                        ? 'bg-emerald-950 border-emerald-400 text-emerald-400' 
                        : 'bg-zinc-900 border-zinc-700 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {hasPlayer ? 'REMOVE PLAYER' : 'GIVE PLAYER'}
                  </button>
                  <button
                    onClick={() => toggleArtifact(artifact.id, 'opponent')}
                    className={`flex-1 py-1 text-[8px] border font-bold transition-all cursor-pointer ${
                      hasOpponent 
                        ? 'bg-pink-950 border-pink-500 text-pink-400' 
                        : 'bg-zinc-900 border-zinc-700 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {hasOpponent ? 'REMOVE OPP' : 'GIVE OPP'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}