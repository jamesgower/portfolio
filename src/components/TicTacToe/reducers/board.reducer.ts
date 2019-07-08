import { BoardState } from "../interfaces/components";
import { BoardActionsTypes, RESET_BOARD, ADD_MOVE } from "../interfaces/actions";

const defaultBoardState: BoardState = {
  tiles: Array.from(Array(9).keys()),
};

export default (state: BoardState, action: BoardActionsTypes): BoardState => {
  state = defaultBoardState;
  switch (action.type) {
    case ADD_MOVE:
      return {
        ...state,
        tiles: action.board,
      };
    case RESET_BOARD:
      return defaultBoardState;
    default:
      return state;
  }
};
