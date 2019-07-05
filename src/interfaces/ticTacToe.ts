export interface SetupState {
  noPlayers: number;
  playerInfo: Player[];
  currentPlayer: number;
  origBoard: number[];
  difficulty: number;
  readyToPlay: boolean;
  showComponent: boolean;
  ttt: boolean;
  navbar: boolean;
}

export interface SetupProps {
  player: SetupState;
}

export interface Player {
  name: string;
  counter: string;
  ai?: boolean;
}

export interface NameState {
  playerInfo: Player[];
  difficulty: number;
  readyToPlay: boolean;
}

export interface NameProps {
  noPlayers: number;
  reset: (e) => void;
  setupPlayers: (state) => void;
}
