import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose, Store } from "redux";
import playerReducer from "../reducers/player.reducer";
import boardReducer from "../reducers/board.reducer";

declare global {
  interface Window {
    // eslint-disable-next-line no-undef
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (): Store => {
  const store = createStore(
    combineReducers({
      player: playerReducer,
      board: boardReducer,
    }),
    composeEnhancers(applyMiddleware(thunk)),
  );
  return store;
};
