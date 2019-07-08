import {
  PlayerActionTypes,
  CHANGE_PLAYER_AFTER_MOVE,
  RESET,
  SET_NUM_PLAYERS,
  SETUP_PLAYERS,
  PLAYER_SCORE,
} from "../interfaces/actions";
import { PlayerState } from "../interfaces/components";

const defaultPlayerState: PlayerState = {
  noPlayers: undefined,
  player1: {
    name: undefined,
    counter: "X",
    score: 0,
  },
  player2: {
    name: undefined,
    counter: "O",
    score: 0,
  },
  difficulty: 2,
  currentPlayer: 1,
  readyToPlay: false,
  currentTurn: undefined,
};

export default (state = defaultPlayerState, action: PlayerActionTypes): PlayerState => {
  switch (action.type) {
    case CHANGE_PLAYER_AFTER_MOVE:
      return {
        ...state,
        currentPlayer: state.currentPlayer === 1 ? 2 : 1,
      };
    case RESET:
      return defaultPlayerState;
    case SET_NUM_PLAYERS:
      return {
        ...state,
        noPlayers: action.numPlayers,
      };
    case SETUP_PLAYERS:
      return {
        ...state,
        ...action.setup,
        currentTurn: `It's ${action.setup.player1.name}'s turn.`,
      };
    case PLAYER_SCORE:
      return {
        ...state,
        player1: {
          ...state.player1,
          score: action.player === 1 && state.player1.score + 1,
        },
        player2: {
          ...state.player2,
          score: action.player === 2 && state.player2.score + 1,
        },
      };
    default:
      return state;
  }
};
