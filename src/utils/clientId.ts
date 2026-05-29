export function getClientId(): string {
  let id = localStorage.getItem('chess_client_id');
  if (!id) {
    id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('chess_client_id', id);
  }
  return id;
}

export function getStoredPlayerName(): string {
  return localStorage.getItem('chess_player_name') || '';
}

export function setStoredPlayerName(name: string): void {
  localStorage.setItem('chess_player_name', name);
}