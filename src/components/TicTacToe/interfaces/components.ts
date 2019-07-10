export interface PlayerState {
  noPlayers: number;
  player1: Player;
  player2: Player;
  difficulty: number;
  currentPlayer: number;
  readyToPlay: boolean;
  currentTurn: string;
}

export interface BoardState {
  tiles: number[];
}

export interface SetupProps {
  player: PlayerState;
}

export interface Player {
  name: string;
  counter: string;
  score: number;
}

export interface NameState {
  player1: Player;
  player2: Player;
  difficulty: number;
  readyToPlay: boolean;
}

export interface NameProps {
  noPlayers: number;
  reset?: (e) => void;
  setupPlayers?: (state) => void;
}

export interface PlayProps {
  player?: PlayerState;
  board?: BoardState;
  reset?: () => void;
  addMove?: (board) => void;
  changePlayer?: () => void;
  playerOneScore?: () => void;
  playerTwoScore?: () => void;
  updateCurrentTurn?: (turn) => void;
  resetBoard?: () => void;
  resetScore?: () => void;
  setCurrentPlayer?: (player) => void;
}

export interface PlayState {
  disableClicks: boolean;
  gameFinished: boolean;
}

export interface GameWon {
  index: string;
  player: string;
}

export interface Move {
  index?: number;
  score?: number;
}
