import {
  RESET_BOARD,
  ADD_MOVE,
  AddMoveAction,
  ResetBoardAction,
} from "../interfaces/actions";

export const addMove = (tile: number, currentPlayer: string): AddMoveAction => ({
  type: ADD_MOVE,
  tile,
  currentPlayer,
});

export const resetBoard = (): ResetBoardAction => ({
  type: RESET_BOARD,
});
