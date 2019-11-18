import {
  FETCH_USER,
  LOGOUT,
  AuthActionTypes,
  BROWSE_AS_GUEST,
  ADD_TO_USER,
  REMOVE_FROM_USER,
} from "../interfaces/auth.redux.i";
import { AuthState } from "../interfaces/app.i";

const defaultState: AuthState = {
  profile: null,
};

export default (state = defaultState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case FETCH_USER:
      return {
        profile: action.payload || null,
      };
    case LOGOUT:
      return {
        profile: null,
      };
    case BROWSE_AS_GUEST:
      return {
        profile: {
          _id: null,
          userID: null,
          firstName: "Guest",
          lastName: null,
          email: null,
          tvShows: null,
          movies: null,
        },
      };
    case ADD_TO_USER:
      return {
        profile: action.payload,
      };
    case REMOVE_FROM_USER:
      return {
        profile: action.payload,
      };
    default:
      return state;
  }
};
