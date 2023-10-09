export interface User {
  key?: string | null;
  name?: string;
  team?: string;
}

export interface GameData {
  key?: string | null;
  name?: string;
  players?: User[];
}

export interface LocalPlayerData {
  gameName: string,
  playerName: string
}
