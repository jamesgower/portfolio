import thunk from "redux-thunk";
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  Store,
  Reducer,
} from "redux";
import playerReducer from "../pages/tic-tac-toe/reducers/player.reducer";
import boardReducer from "../pages/tic-tac-toe/reducers/board.reducer";
import { TicTacToeState } from "../pages/tic-tac-toe/interfaces/components.i";
import { ChatterState } from "../pages/chatter/interfaces/components.i";
import usersReducer from "../pages/chatter/reducers/user.reducer";
import roomReducer from "../pages/chatter/reducers/room.reducer";

declare global {
  interface Window {
    // eslint-disable-next-line no-undef
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface AppState {
  chatter: ChatterState;
  tictactoe: TicTacToeState;
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (): Store => {
  const tictactoe: Reducer<TicTacToeState> = combineReducers<TicTacToeState>({
    player: playerReducer,
    board: boardReducer,
  });

  const chatter: Reducer<ChatterState> = combineReducers<ChatterState>({
    user: usersReducer,
    room: roomReducer,
  });

  const store: Store<AppState> = createStore(
    combineReducers<AppState>({
      tictactoe,
      chatter,
    }),
    composeEnhancers(applyMiddleware(thunk)),
  );
  return store;
};
