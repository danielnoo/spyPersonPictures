export interface User {
  key?: string | null;
  name?: string;
  team?: string;
}

export interface Game {
  name: string;
  players: User[];
}
