import { useState } from 'react';

export function useMatchSettings() {
  const [level, setLevel] = useState<number>(1);
  const [matchTarget, setMatchTarget] = useState<number>(5);
  const [gameMode, setGameMode] = useState<'campaign' | 'pvp' | 'online'>('campaign');
  const [theme, setTheme] = useState<'classic' | 'retro-green' | 'retro-cyber'>('classic');
  const [aiDifficulty, setAiDifficulty] = useState<number>(3);
  const [upgradePriority, setUpgradePriority] = useState<'loser-only' | 'loser-then-winner'>('loser-only');

  return {
    level, setLevel,
    matchTarget, setMatchTarget,
    gameMode, setGameMode,
    theme, setTheme,
    aiDifficulty, setAiDifficulty,
    upgradePriority, setUpgradePriority
  };
}