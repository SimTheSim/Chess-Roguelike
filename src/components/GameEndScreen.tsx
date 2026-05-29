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
  playerColor: 'black' | 'white';
  onAiDifficultyChange: (d: number) => void;
  onUpgradePriorityChange: (p: 'loser-only' | 'loser-then-winner') => void;
  onMatchTargetChange: (t: number) => void;
  onReturnToSetup: () => void;
  onProposeRematch?: () => void;
  onAcceptRematch?: () => void;
  onDeclineRematch?: () => void;
  rematchProposal?: any;
  rematchDeclined?: boolean;
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
  onProposeRematch,
  onAcceptRematch,
  onDeclineRematch,
  rematchProposal,
  rematchDeclined,
  playerColor,
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
      className={`text-center py-16 max-w-sm mx-auto select-none font-pixel`}
      id={`match-${result}-screen`}
    >
      <div className={`p-4 border-4 bg-black inline-block mb-6 text-4xl ${won ? 'border-yellow-400 shadow-[4px_4px_0px_#10b981]' : 'border-rose-500 shadow-[4px_4px_0px_rgba(239,68,68,0.2)]'}`}>
        {won ? (
          <svg viewBox="0 0 24 24" className="w-10 h-10 text-yellow-400 fill-current" xmlns="http://www.w3.org/2000/svg">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
          </svg>
        ) : (
          <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.15035 12.4307V13.7234C7.15035 13.9563 7.34811 14.146 7.59275 14.146H8.67163C8.91552 14.146 9.11329 13.9563 9.11329 13.7234V12.6409H9.48168V13.7234C9.48168 13.9563 9.67944 14.146 9.92333 14.146H11.0029C11.2468 14.146 11.4453 13.9563 11.4453 13.7234V12.6409H11.813V13.7234C11.813 13.9563 12.0108 14.146 12.2554 14.146H13.3343C13.5782 14.146 13.7759 13.9563 13.7759 13.7234V12.4307C14.9002 12.104 16.7774 11.346 17.4161 9.81375C17.8797 8.69972 17.6981 7.23342 17.0037 4.407C16.3078 1.57912 14.2863 0 10.4623 0C6.63838 0 4.6176 1.57912 3.92254 4.407C3.22747 7.23342 3.04508 8.69972 3.51018 9.81375C4.14814 11.346 6.02535 12.1033 7.15035 12.4307ZM13.1313 5.10136C14.1479 4.93509 15.1396 5.73637 15.3461 6.88992C15.5519 8.04422 14.8949 9.11428 13.8791 9.2813C12.861 9.44681 11.8686 8.64703 11.6628 7.49198C11.457 6.33839 12.1147 5.26833 13.1313 5.10136ZM11.8942 10.374H10.4623H9.03191L10.4623 8.66311L11.8942 10.374ZM5.57929 6.88992C5.78732 5.73637 6.77755 4.93509 7.79413 5.10136C8.81146 5.26838 9.46991 6.33844 9.26263 7.49198C9.0568 8.64703 8.06586 9.44681 7.04854 9.2813C6.03046 9.11428 5.37346 8.04422 5.57929 6.88992Z" fill="#ED333B"/>
            <path d="M19.5107 18.6482C18.7423 18.3084 17.8393 18.5941 17.4255 19.2818C17.1215 19.6598 16.6491 19.5118 16.4323 19.4166C16.2711 19.3455 14.591 18.6028 12.5959 17.7217C14.3105 16.9366 15.7262 16.2884 16.0097 16.1587C16.7926 15.8005 17.3551 15.605 17.8715 16.0284C18.3219 16.629 19.1701 16.8538 19.8908 16.5242C20.7001 16.1543 21.0422 15.2263 20.6547 14.4522C20.4211 13.9834 19.9728 13.6802 19.477 13.5945C19.7187 13.1712 19.7531 12.6482 19.518 12.1787C19.1313 11.4046 18.1615 11.0779 17.3522 11.4478C16.6513 11.7686 16.3019 12.5069 16.4719 13.2019C16.5121 13.7249 15.7336 14.1438 15.2172 14.3804C14.8568 14.5452 12.6303 15.5838 10.2499 16.6854C8.01162 15.6966 5.94326 14.7833 5.59245 14.6287C4.80364 14.2801 4.28726 13.9908 4.29828 13.3411C4.49459 12.6263 4.13497 11.8579 3.40911 11.5364C2.59541 11.1775 1.63006 11.5174 1.25361 12.2967C1.02584 12.7684 1.06756 13.2913 1.31586 13.7125C0.820718 13.804 0.376905 14.1123 0.149843 14.584C-0.225907 15.3641 0.129312 16.2869 0.943812 16.6465C1.64914 16.9578 2.4665 16.744 2.91697 16.1756C3.3132 15.8116 4.14669 16.1177 4.66526 16.3485C4.93625 16.4679 6.26197 17.0428 7.91647 17.7628C5.92428 18.6783 4.23678 19.4437 3.97166 19.528C3.8142 19.5785 3.67283 19.5843 3.54833 19.5661C3.53881 19.5448 3.53075 19.5221 3.51978 19.5016C3.13381 18.7274 2.16331 18.4 1.35401 18.7706C0.544671 19.1405 0.202624 20.0693 0.590093 20.8434C0.824468 21.3107 1.27198 21.6146 1.76783 21.7003C1.52684 22.1237 1.49244 22.6473 1.72606 23.1161C2.11423 23.8903 3.08323 24.2177 3.89258 23.8478C4.65725 23.497 5.00365 22.651 4.71434 21.9069C4.60447 21.4425 5.02414 21.1876 5.23948 21.0887C5.43209 21.0016 7.79712 19.9183 10.2676 18.7875C12.9665 19.9674 15.6794 21.1649 15.9856 21.3473C16.1262 21.4308 16.2214 21.5312 16.2859 21.6344C16.2741 21.655 16.2624 21.6747 16.2522 21.696C15.8764 22.4753 16.2309 23.3974 17.0461 23.7585C17.8606 24.1173 18.8252 23.7775 19.2016 22.9982C19.4287 22.5272 19.3869 22.0036 19.1394 21.5831C19.6345 21.4908 20.0776 21.1817 20.3054 20.7115C20.6811 19.9315 20.3259 19.0078 19.5107 18.6482Z" fill="#ED333B"/>
          </svg>
        )}
      </div>

      <h1 className="text-lg font-bold text-white uppercase tracking-tight">
        {won ? 'YOU WIN !' : 'YOU LOSE !'}
      </h1>

      <div className="mt-6 p-4 bg-zinc-950 border-2 border-zinc-850 text-left">
        <span className="text-[12px] block uppercase text-zinc-500 mb-3">SCORECARD</span>
        <p className="text-xs text-white font-bold mb-1">{p1Label}: {playerScore}</p>
        <p className="text-xs text-white font-bold">{p2Label}: {opponentScore}</p>
      </div>

      {gameMode === 'online' && playerColor === 'white' ? (
        <>
          <div className="mt-6 p-4 bg-zinc-950 border-2 border-zinc-850 text-left">
            <span className="text-[12px] block uppercase text-zinc-500 mb-3">REMATCH SETTINGS</span>
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
            <div>
              <span className="text-[7.5px] uppercase text-zinc-400 block mb-1.5">FIRST TO...</span>
              <div className="flex gap-2">
                <button
                  onClick={() => onMatchTargetChange(3)}
                  className={`flex-1 py-1.5 border-2 text-[7px] font-pixel cursor-pointer ${matchTarget === 3 ? 'bg-emerald-950 border-emerald-400 text-emerald-400' : 'bg-black border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
                >
                  3
                </button>
                <button
                  onClick={() => onMatchTargetChange(5)}
                  className={`flex-1 py-1.5 border-2 text-[7px] font-pixel cursor-pointer ${matchTarget === 5 ? 'bg-emerald-950 border-emerald-400 text-emerald-400' : 'bg-black border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
                >
                  5
                </button>
                <button
                  onClick={() => onMatchTargetChange(7)}
                  className={`flex-1 py-1.5 border-2 text-[7px] font-pixel cursor-pointer ${matchTarget === 7 ? 'bg-emerald-950 border-emerald-400 text-emerald-400' : 'bg-black border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
                >
                  7
                </button>
              </div>
            </div>
          </div>
          
          <button
            onClick={onProposeRematch}
            className="mt-4 border-4 border-emerald-400 bg-black hover:bg-emerald-950 text-emerald-400 text-xs uppercase py-3.5 px-8 shadow-[4px_4px_0px_#10b981] transition-all cursor-pointer w-full"
          >
            PROPOSE REMATCH
          </button>
          <button
            onClick={onReturnToSetup}
            className="mt-3 border-4 border-zinc-700 bg-black hover:bg-zinc-900 text-zinc-400 text-xs uppercase py-3.5 px-8 shadow-[4px_4px_0px_#3f3f46] transition-all cursor-pointer w-full"
          >
            RETURN TO SETUP
          </button>
        </>
      ) : gameMode === 'online' && playerColor === 'black' ? (
        <>
        {rematchProposal ? (
          <div className="mt-6">
            <div className="p-4 bg-zinc-950 border-2 border-emerald-900 text-left mb-4">
              <span className="text-[10px] block uppercase text-emerald-400 mb-2">REMATCH PROPOSED</span>
              <p className="text-zinc-300 text-[8px] uppercase">FIRST TO {rematchProposal.matchTarget}</p>
              <p className="text-zinc-300 text-[8px] uppercase mt-1">DRAFT: {rematchProposal.upgradePriority.replace('-', ' ')}</p>
            </div>
            <button
              onClick={onAcceptRematch}
              className="mt-2 border-4 border-emerald-400 bg-black hover:bg-emerald-950 text-emerald-400 text-xs uppercase py-3.5 px-8 shadow-[4px_4px_0px_#10b981] transition-all cursor-pointer w-full"
            >
              ACCEPT REMATCH
            </button>
            <button
              onClick={onDeclineRematch}
              className="mt-3 border-4 border-rose-500 bg-black hover:bg-rose-950 text-rose-500 text-xs uppercase py-3.5 px-8 shadow-[4px_4px_0px_#f43f5e] transition-all cursor-pointer w-full"
            >
              DECLINE
            </button>
          </div>
        ) : rematchDeclined ? (
          <div className="mt-6">
            <div className="p-4 bg-rose-950 border-2 border-rose-900 text-center mb-4">
              <span className="text-[10px] block uppercase text-rose-400">OPPONENT DECLINED</span>
            </div>
            <button
              onClick={onReturnToSetup}
              className="mt-3 border-4 border-zinc-700 bg-black hover:bg-zinc-900 text-zinc-400 text-xs uppercase py-3.5 px-8 shadow-[4px_4px_0px_#3f3f46] transition-all cursor-pointer w-full"
            >
              RETURN TO SETUP
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <h1 className="text-l uppercase text-white block mb-6">Waiting for opponent...</h1>
            <button
                onClick={onReturnToSetup}
                className="mt-3 border-4 border-zinc-700 bg-black hover:bg-zinc-900 text-zinc-400 text-xs uppercase py-3.5 px-8 shadow-[4px_4px_0px_#3f3f46] transition-all cursor-pointer w-full"
              >
                RETURN TO SETUP
            </button>
          </div>
        )}
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