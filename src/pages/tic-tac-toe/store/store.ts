import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose, Store } from "redux";
import { AppState } from "../interfaces/components.i";
import playerReducer from "../reducers/player.reducer";
import boardReducer from "../reducers/board.reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (): Store<AppState> => {
  const store: Store<AppState> = createStore<AppState>(
    combineReducers({
      player: playerReducer,
      board: boardReducer,
    }),
    composeEnhancers(applyMiddleware(thunk)),
  );
  return store;
};
