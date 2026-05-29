import { useState } from 'react';
import type { Socket } from 'socket.io-client';

export function useMultiplayer() {
  const [mpSocket, setMpSocket] = useState<Socket | null>(null);
  const [mpColor, setMpColor] = useState<'white' | 'black'>('white');
  const [mpRoomCode, setMpRoomCode] = useState('');
  const [mpOppName, setMpOppName] = useState('');
  const [mpPlayerName, setMpPlayerName] = useState('');
  const [opponentTempDisconnected, setOpponentTempDisconnected] = useState(false);
  const [disconnectCountdown, setDisconnectCountdown] = useState(0);
  const [opponentLeft, setOpponentLeft] = useState(false);
  return {
    mpSocket, setMpSocket,
    mpColor, setMpColor,
    mpRoomCode, setMpRoomCode,
    mpOppName, setMpOppName,
    mpPlayerName, setMpPlayerName,
    opponentTempDisconnected, setOpponentTempDisconnected,
    disconnectCountdown, setDisconnectCountdown,
    opponentLeft, setOpponentLeft
  };
}