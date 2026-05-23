import React from 'react';
import { Board, Position } from '../types';
import { ChessPiece } from './ChessPiece';
import { motion, AnimatePresence } from 'motion/react';

interface ChessBoardProps {
  board: Board;
  selectedPos: Position | null;
  validMoves: Position[];
  onCellClick: (r: number, c: number) => void;
  explodedCells: Position[];
  playerUpgrades: string[];
  opponentUpgrades: string[];
  theme: 'classic' | 'retro-green' | 'retro-cyber';
  crumblingColor: 'white' | 'black' | null;
  flipped?: boolean;
}

export const ChessBoard: React.FC<ChessBoardProps> = ({
  board,
  selectedPos,
  validMoves,
  onCellClick,
  explodedCells,
  playerUpgrades,
  opponentUpgrades,
  theme,
  crumblingColor,
  flipped = false,
}) => {
  const isSelected = (r: number, c: number) =>
    selectedPos !== null && selectedPos.r === r && selectedPos.c === c;

  const isValidMove = (r: number, c: number) =>
    validMoves.some(m => m.r === r && m.c === c);

  const isExploded = (r: number, c: number) =>
    explodedCells.some(e => e.r === r && e.c === c);

  // Set borders and board layout outlines depending on theme
  let boardBorderClass = 'border-4 border-zinc-800 bg-black shadow-[8px_8px_0px_#27272a]';
  let selectedClass = 'bg-yellow-500/25 border-2 border-yellow-400 z-30';
  let validDotClass = 'bg-white';

  if (theme === 'retro-green') {
    boardBorderClass = 'border-4 border-green-500 bg-black shadow-[8px_8px_0px_#14532d]';
    selectedClass = 'bg-green-400/20 border-2 border-green-400 z-30';
    validDotClass = 'bg-green-400';
  } else if (theme === 'retro-cyber') {
    boardBorderClass = 'border-4 border-sky-400 bg-black shadow-[8px_8px_0px_#f43f5e]';
    selectedClass = 'bg-sky-400/25 border-2 border-sky-400 z-30';
    validDotClass = 'bg-sky-400';
  }

  return (
    <div className={`relative w-full aspect-square max-w-[480px] mx-auto select-none overflow-hidden ${boardBorderClass}`}>
      <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
        {(flipped ? [7,6,5,4,3,2,1,0] : [0,1,2,3,4,5,6,7]).map(r =>
          (flipped ? [7,6,5,4,3,2,1,0] : [0,1,2,3,4,5,6,7]).map(c => {
            const piece = board[r][c];
            const selected = isSelected(r, c);
            const valid = isValidMove(r, c);
            const exploded = isExploded(r, c);
            const isDarkSquare = (r + c) % 2 === 1;

            // Compute the beautiful 2-color checkerboard backgrounds per theme
            let cellBgClass = '';
            if (theme === 'classic') {
              cellBgClass = isDarkSquare 
                ? 'bg-[#1e293b] hover:bg-[#334155]' // Elegant deep gray
                : 'bg-[#f1f5f9] hover:bg-[#e2e8f0]'; // Warm soft white
            } else if (theme === 'retro-green') {
              cellBgClass = isDarkSquare 
                ? 'bg-[#388c64] hover:bg-[#3d986d]' // Saffron retro green (shadows)
                : 'bg-[#a3d3a5] hover:bg-[#b0dfb2]'; // Light authentic mint (lights)
            } else { // 'retro-cyber'
              cellBgClass = isDarkSquare 
                ? 'bg-[#120a2c] hover:bg-[#1c1143]' // Glowing dark neon violet
                : 'bg-[#05030f] hover:bg-[#0c0822]'; // Synthetic deep midnight space
            }

            return (
              <div
                key={`${r}-${c}`}
                onClick={() => onCellClick(r, c)}
                className={`relative flex items-center justify-center cursor-pointer select-none transition-colors duration-100
                  ${cellBgClass}
                  ${selected ? selectedClass : ''}
                `}
                id={`cell-${r}-${c}`}
                style={{ imageRendering: 'pixelated' }}
              >
                <div className="w-[82%] h-[82%] relative z-10 flex items-center justify-center select-none">
                  <AnimatePresence mode = "wait">
                    {piece && (
                      <motion.div
                        key={piece.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.12 }}
                        className="absolute inset-0 w-full h-full flex items-center justify-center select-none"
                      >
                        <ChessPiece
                          type={piece.type}
                          color={piece.color}
                          activeBoons={piece.color === 'white' ? playerUpgrades : opponentUpgrades}
                          theme={theme}
                          isCrumbling={piece.color === crumblingColor}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. Absolute Centered Pixelated Move Suggestion Dot */}
                {valid && !piece && (
                  <div className={`absolute w-3.5 h-3.5 border border-black animate-pulse shadow-[2px_2px_0px_rgba(0,0,0,0.5)] z-20 ${validDotClass}`} />
                )}

                {/* 3. Absolute Centered Pixelated Capture Highlight */}
                {valid && piece && (
                  <div className="absolute inset-1.5 border-2 border-dashed border-rose-500 z-20 pointer-events-none animate-pulse" />
                )}

                {/* 4. Absolute Block Explosion Overlay */}
                {exploded && (
                  <div className="absolute inset-0 bg-red-600 animate-ping pointer-events-none z-30" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
