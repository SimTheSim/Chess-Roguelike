import { GameProvider, useGame } from './GameContext';
import { ChessBoard } from './components/ChessBoard';
import { UpgradeScreen } from './components/UpgradeScreen';
import { motion, AnimatePresence } from 'motion/react';
import { BoonIcon } from './components/BoonIcon';
import { MultiplayerLobby } from './components/MultiplayerLobby';
import { GameEndScreen } from './components/GameEndScreen';
import { ComboUnlockScreen } from './components/ComboUnlockScreen';
import { DebugArtifactMenu } from './components/DebugArtifactMenu';
import { Header } from './components/Header';
import { StartScreen } from './components/StartScreen';
import { DashboardLeft, DashboardRight } from './components/GameDashboard';
import { useState, useEffect } from 'react';
import { PreloadScreen } from './components/PreloadScreen';


function GameUI() {
  const {
    theme, setTheme, gameMode, setGameMode, status, setStatus,
    mpColor, mpRoomCode, mpOppName, mpPlayerName,
    mpSocket, setMpSocket, setMpColor, setMpRoomCode, setMpOppName, setMpPlayerName,
    setMatchTarget, setUpgradePriority, clockMode, setClockMode, whiteTime, blackTime, turn,
    roundCounter, matchTarget, playerScore, opponentScore,
    upgrades, setUpgrades, opponentUpgrades, setOpponentUpgrades,
    board, selectedPos, validMoves, explodedCells, crumblingColor, flameSquares,
    moveHistory, capturedByWhite, capturedByBlack,
    upgradeChoices, loserChosenId, roundWinner, pendingCombo, setPendingCombo,
    postComboActionRef,
    aiDifficulty, setAiDifficulty, upgradePriority,
    activeTab, setActiveTab,
    getTurnLabel, handleCellClick, startNewMatch, proceedToUpgradeFlow,
    handleUpgradeSelect, handleWinnerUpgradeSelect,
    opponentTempDisconnected, disconnectCountdown, opponentLeft,
    rematchProposal, rematchDeclined, setRematchProposal, setRematchDeclined,
    isPreloading, setIsPreloading
  } = useGame();

  const formatTime = (ms: number) => {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProposeRematch = () => {
    mpSocket?.emit('rematch_proposal', { code: mpRoomCode, matchTarget, upgradePriority, clockMode });
    setStatus('waiting-for-opponent-proceed');
  };

  const handleAcceptRematch = () => {
    mpSocket?.emit('rematch_accept', { code: mpRoomCode, matchTarget: rematchProposal.matchTarget, upgradePriority: rematchProposal.upgradePriority, clockMode: rematchProposal.clockMode });
  };

  const handleDeclineRematch = () => {
    mpSocket?.emit('rematch_decline', { code: mpRoomCode });
    setRematchProposal(null);
    setRematchDeclined(true);
  };

  return (
    <>
    <AnimatePresence>
        {isPreloading && <PreloadScreen />}
    </AnimatePresence>
    {!isPreloading && (
    <div className={`min-h-screen text-zinc-300 flex flex-col font-mono select-none transition-colors duration-300
      ${theme === 'classic' ? 'bg-[#050505]' : ''}
      ${theme === 'retro-green' ? 'bg-[#010903]' : ''}
      ${theme === 'retro-cyber' ? 'bg-[#080210]' : ''}
    `} id="main-view">

      <Header/>
      {opponentTempDisconnected && status !== 'start' && status !== 'lobby' && (
        <div className="bg-rose-900 text-white text-center py-2 font-pixel text-[10px] tracking-wider border-b-4 border-rose-500 z-50 w-full">
          {opponentLeft ? 'OPPONENT LEFT THE GAME' : 'OPPONENT LOST CONNECTION'} — WAITING {disconnectCountdown}S...
        </div>
      )}

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 flex flex-col justify-center select-none" id="main-content">
        <AnimatePresence mode="wait">

          {status === 'start' && (
            <StartScreen/>
          )}

          {status === 'lobby' && (
            <div className="fixed inset-0 z-50">
              <MultiplayerLobby
                onReady={({ socket, color, roomCode, opponentName, playerName: myName, matchTarget: lobbyTarget, upgradePriority: lobbyPriority, clockMode: lobbyClockMode }) => {
                  setMpSocket(socket); setMpColor(color); setMpRoomCode(roomCode);
                  setMpOppName(opponentName); setMpPlayerName(myName ?? '');
                  setMatchTarget(lobbyTarget); setUpgradePriority(lobbyPriority); setClockMode(lobbyClockMode);
                  startNewMatch(lobbyClockMode);
                }}
                onBack={() => setStatus('start')}
              />
            </div>
          )}

          {status === 'playing' && (
            <motion.div key="playing-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full select-none" id="playing-screen">
              <DashboardLeft/>

                <div className="lg:col-span-6 flex flex-col items-center justify-center p-1" id="board-center">
                {clockMode !== 'none' && (
                  <div className={`w-full max-w-[480px] mb-2 p-2 border-2 text-center font-pixel text-xl ${turn !== mpColor ? 'bg-zinc-800 border-zinc-500 text-white' : 'bg-zinc-950 border-zinc-850 text-zinc-500'}`}>
                    {formatTime(mpColor == "white" ? blackTime : whiteTime)}
                  </div>
                )}
                {clockMode === 'none' && (    
                  <div className="w-full max-w-[480px] mb-3 p-2 bg-zinc-950 border-2 border-zinc-850 text-center font-pixel flex items-center justify-between px-4">
                    <span></span>
                    <span className="text-[9px] font-bold tracking-wider text-emerald-400">
                      {getTurnLabel()}
                    </span>
                    <span></span>
                  </div>
                )}

                <ChessBoard
                  board={board} selectedPos={selectedPos} validMoves={validMoves} onCellClick={handleCellClick}
                  explodedCells={explodedCells} playerUpgrades={upgrades} opponentUpgrades={opponentUpgrades}
                  theme={theme} crumblingColor={crumblingColor} flipped={gameMode === 'online' && mpColor === 'black'}
                  hiddenKingColor={opponentUpgrades.includes('king-hidden') ? 'black' : null} flameSquares={flameSquares}
                />

                {clockMode !== 'none' && (
                  <div className={`w-full max-w-[480px] mt-3 p-2 border-2 text-center font-pixel text-xl ${turn === mpColor ? 'bg-zinc-800 border-zinc-500 text-white' : 'bg-zinc-950 border-zinc-850 text-zinc-500'}`}>
                    {formatTime(mpColor == "white" ? whiteTime : blackTime)}
                  </div>
                )}
              </div>

              <DashboardRight/>
            </motion.div>
          )}

          {status === 'round-end-notifying' && (
            <motion.div key="round-end-overlay" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center py-10 max-w-md mx-auto border-4 border-zinc-800 bg-black p-6 font-pixel select-none" id="round-end-announcement">
              <div className="p-4 border-4 border-yellow-400 bg-black inline-block mb-4 text-yellow-400 text-3xl">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-yellow-400 fill-current" xmlns="http://www.w3.org/2000/svg"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
              </div>
              <h2 className="text-sm font-bold text-white uppercase tracking-tight">
                {roundWinner === 'white' && (gameMode === 'online' ? (mpColor === 'white' ? 'ROUND WON BY YOU!' : `ROUND WON BY ${mpOppName.toUpperCase()}!`) : ('ROUND WON BY P1!'))}
                {roundWinner === 'black' && (gameMode === 'online' ? (mpColor === 'black' ? 'ROUND WON BY YOU!' : `ROUND WON BY ${mpOppName.toUpperCase()}!`) : (gameMode === 'pvp' ? 'ROUND WON BY P2!' : 'ROUND WON BY AI!'))}
              </h2>
              <div className="mt-4 p-3 bg-zinc-950 border border-zinc-850 text-left">
                <p className="text-[8px] text-zinc-400 leading-normal uppercase text-center font-pixel">CURRENT MATCH SCORE:</p>
                <p className="text-xs text-center text-white font-bold mt-1">
                  {gameMode === 'online' ? 'YOU' : 'P1'}: {playerScore} | {gameMode === 'online' ? mpOppName.toUpperCase() : (gameMode === 'pvp' ? 'P2' : 'AI')}: {opponentScore}
                </p>
              </div>
              <button onClick={proceedToUpgradeFlow} className="mt-6 border-4 border-emerald-400 bg-zinc-950 text-emerald-400 hover:bg-emerald-950 w-full font-pixel text-[8.5px] uppercase py-2.5 shadow-[4px_4px_0px_#10b981] transition-all cursor-pointer">
                PROCEED
              </button>
            </motion.div>
          )}

          {status === 'upgrading-white' && !pendingCombo && (
            <UpgradeScreen choices={upgradeChoices} onSelectUpgrade={(id) => handleUpgradeSelect(id, 'white')} level={roundCounter + 1} playerName={gameMode === 'online' ? (mpColor === 'white' ? 'YOU' : mpOppName) : 'P1'} />
          )}

          {status === 'upgrading-black' && !pendingCombo && (
            <UpgradeScreen choices={upgradeChoices} onSelectUpgrade={(id) => handleUpgradeSelect(id, 'black')} level={roundCounter + 1} playerName={gameMode === 'online' ? (mpColor === 'black' ? 'YOU' : mpOppName) : (gameMode === 'pvp' ? 'P2' : 'AI')} />
          )}

          {status === 'upgrading-winner-white' && !pendingCombo && (
            <UpgradeScreen choices={gameMode === 'campaign' ? upgradeChoices.filter(c => c.id !== loserChosenId) : upgradeChoices} onSelectUpgrade={(id) => handleWinnerUpgradeSelect(id, 'white')} level={roundCounter + 1} playerName={gameMode === 'online' ? (mpColor === 'white' ? 'YOU' : `${mpOppName.toUpperCase()}`) : (gameMode === 'pvp' ? 'P1 ' : 'P2')} pickedId={gameMode === 'campaign' ? null : loserChosenId} />
          )}

          {status === 'upgrading-winner-black' && !pendingCombo && (
            <UpgradeScreen choices={upgradeChoices} onSelectUpgrade={(id) => handleWinnerUpgradeSelect(id, 'black')} level={roundCounter + 1} playerName={gameMode === 'online' ? (mpColor === 'black' ? 'YOU' : `${mpOppName.toUpperCase()}`) : (gameMode === 'pvp' ? 'P2 ' : 'AI')} pickedId={loserChosenId} />
          )}

          {status === 'waiting-for-opponent-proceed' && !pendingCombo && (
            <div className="text-center py-10 max-w-2xl mx-auto border-4 border-zinc-850 bg-black p-6 font-pixel">
              <p className="text-emerald-400 text-xs uppercase tracking-wider animate-pulse mb-6">WAITING FOR OPPONENT TO PROCEED...</p>
            </div>
          )}

          {status === 'waiting-for-opponent-upgrade' && !pendingCombo && (
            <div className="text-center py-10 max-w-2xl mx-auto border-4 border-zinc-850 bg-black p-6 font-pixel">
              <p className="text-emerald-400 text-xs uppercase tracking-wider animate-pulse mb-6">{gameMode === 'online' ? 'OPPONENT IS CHOOSING AN ARTIFACT...' : 'Waiting for opponent to select their artifact...'}</p>
              {gameMode === 'online' && upgradeChoices.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {upgradeChoices.map((upgrade) => {
                    const isPickedByLoser = upgrade.id === loserChosenId;
                    return (
                      <div key={upgrade.id} className={`border-2 p-4 flex flex-col items-center relative opacity-60 ${isPickedByLoser ? 'border-red-900 bg-zinc-950 line-through' : 'border-zinc-800 bg-zinc-950'}`}>
                        {isPickedByLoser && (
                          <div className="absolute inset-0 flex items-center justify-center z-10">
                            <span className="bg-red-600 text-white text-[8px] font-bold px-2 py-0.5 uppercase tracking-wider transform -rotate-12 border border-black shadow">CLAIMED BY LOSER</span>
                          </div>
                        )}
                        <div className="w-12 h-12 bg-black border border-zinc-700 flex items-center justify-center mb-3">
                          <BoonIcon iconName={upgrade.icon} upgradeId={upgrade.id} className="w-6 h-6 text-zinc-400" />
                        </div>
                        <p className="text-[10px] font-bold text-white uppercase text-center">{upgrade.name}</p>
                        <p className="text-[7.5px] text-zinc-400 mt-2 leading-relaxed text-center">{upgrade.description}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {status === 'combo-pending' && pendingCombo && (
            <ComboUnlockScreen
              comboName={pendingCombo.artifactA.id + '_' + pendingCombo.artifactB.id}
              comboDescription={pendingCombo.bonusDescription} artifactAName={pendingCombo.artifactA.name}
              artifactAIcon={pendingCombo.artifactA.icon} artifactAId={pendingCombo.artifactA.id}
              artifactBName={pendingCombo.artifactB.name} artifactBIcon={pendingCombo.artifactB.icon}
              artifactBId={pendingCombo.artifactB.id} bonusTag={pendingCombo.bonusTag}
              gameMode={gameMode} waitingForOpponent={false}
              onProceed={() => {
                setPendingCombo(null);
                postComboActionRef.current?.();
                postComboActionRef.current = null;
              }}
            />
          )}

          {(status === 'match-won' || status === 'match-lost') && (
            <GameEndScreen
              result={status === 'match-won' ? 'won' : 'lost'}
              gameMode={gameMode} playerScore={playerScore} opponentScore={opponentScore}
              mpOppName={mpOppName} matchTarget={matchTarget} theme={theme}
              aiDifficulty={aiDifficulty} upgradePriority={upgradePriority}
              onAiDifficultyChange={setAiDifficulty} onUpgradePriorityChange={(val) => {
                setUpgradePriority(val);
                if (gameMode === 'online') mpSocket?.emit('room_settings_update', { code: mpRoomCode, matchTarget, upgradePriority: val });
              }}
              onMatchTargetChange={(val) => {
                setMatchTarget(val);
                if (gameMode === 'online') mpSocket?.emit('room_settings_update', { code: mpRoomCode, matchTarget: val, upgradePriority });
              }} onReturnToSetup={() => { setStatus('start'); localStorage.removeItem('chess_room_code'); mpSocket?.disconnect(); }}
              onProposeRematch={handleProposeRematch}
              onAcceptRematch={handleAcceptRematch}
              onDeclineRematch={handleDeclineRematch}
              rematchProposal={rematchProposal}
              rematchDeclined={rematchDeclined}
              playerColor={mpColor}
            />
          )}

        </AnimatePresence>
      </main>
      <DebugArtifactMenu/>
    </div>
  )}
  </>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameUI />
    </GameProvider>
  );
}