export const ADD_MOVE = "ADD_MOVE";
export const RESET_BOARD = "RESET_BOARD";

export interface AddMoveAction {
  type: typeof ADD_MOVE;
  tiles: number[];
}

export interface ResetBoardAction {
  type: typeof RESET_BOARD;
}

type BoardActionsTypes = AddMoveAction | ResetBoardAction;
export default BoardActionsTypes;
