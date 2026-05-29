import { useState } from 'react';
import { Board, Position, Piece } from '../types';
import { createInitialBoard } from '../chessLogic';

export function useGameState() {
  const [board, setBoard] = useState<Board>(() => createInitialBoard(1, [], []));
  const [turn, setTurn] = useState<'white' | 'black'>('white');
  const [selectedPos, setSelectedPos] = useState<Position | null>(null);
  const [validMoves, setValidMoves] = useState<Position[]>([]);
  const [explodedCells, setExplodedCells] = useState<Position[]>([]);
  const [enPassantTarget, setEnPassantTarget] = useState<Position | null>(null);
  const [flameSquares, setFlameSquares] = useState<{ r: number; c: number; turnsLeft: number }[]>([]);
  const [capturedByWhite, setCapturedByWhite] = useState<Piece[]>([]);
  const [capturedByBlack, setCapturedByBlack] = useState<Piece[]>([]);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [crumblingColor, setCrumblingColor] = useState<'white' | 'black' | null>(null);

  return {
    board, setBoard,
    turn, setTurn,
    selectedPos, setSelectedPos,
    validMoves, setValidMoves,
    explodedCells, setExplodedCells,
    enPassantTarget, setEnPassantTarget,
    flameSquares, setFlameSquares,
    capturedByWhite, setCapturedByWhite,
    capturedByBlack, setCapturedByBlack,
    moveHistory, setMoveHistory,
    crumblingColor, setCrumblingColor
  };
}