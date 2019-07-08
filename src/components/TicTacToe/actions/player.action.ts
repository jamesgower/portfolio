import { PlayerState } from "../interfaces/components";
import {
  CHANGE_PLAYER_AFTER_MOVE,
  RESET,
  SET_NUM_PLAYERS,
  SETUP_PLAYERS,
  ChangePlayerAction,
  ResetAction,
  SetNumPlayersAction,
  SetupPlayersAction,
  PLAYER_SCORE,
  PlayerScoreAction,
} from "../interfaces/actions";

export const changePlayer = (): ChangePlayerAction => ({
  type: CHANGE_PLAYER_AFTER_MOVE,
});

export const reset = (): ResetAction => ({
  type: RESET,
});

export const setNumPlayers = (numPlayers: number): SetNumPlayersAction => ({
  type: SET_NUM_PLAYERS,
  numPlayers,
});

export const setupPlayers = (setup: PlayerState): SetupPlayersAction => ({
  type: SETUP_PLAYERS,
  setup,
});

export const playerScore = (player: number): PlayerScoreAction => ({
  type: PLAYER_SCORE,
  player,
});
