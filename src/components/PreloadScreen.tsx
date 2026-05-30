import React from 'react';
import { motion } from 'motion/react';

export const PreloadScreen = () => {
  return (
    <motion.div
      key="preload-screen"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
        <motion.div className="flex flex-col items-center">
            <div className="p-10 border-4 border-white bg-black mb-5 text-emerald-400 shadow-[4px_4px_0px_#4b5563]">
                <svg viewBox="0 0 45 45" className="w-30 h-30" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: `<path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"/>` }} />
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white uppercase font-pixel animate-pulse mt-10">
                NORMAL CHESS
            </h1>
        </motion.div>
    </motion.div>
  );
};