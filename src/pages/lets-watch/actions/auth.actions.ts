import axios from "axios";
import { Dispatch } from "redux";
import {
  FETCH_USER,
  LOGOUT,
  BROWSE_AS_GUEST,
  BrowseAsGuestAction,
  ADD_TO_USER,
  REMOVE_FROM_USER,
} from "../interfaces/auth.redux.i";

export const fetchUser = (): ((dispatch: Dispatch) => Promise<void>) => async (
  dispatch,
): Promise<void> => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const logout = (history): ((dispatch: Dispatch) => void) => async (
  dispatch,
): Promise<void> => {
  await axios.get("/api/logout");
  history.push("/lets-watch");
  dispatch({ type: LOGOUT });
};

export const addToUser = (
  showID: number,
  type: string,
): ((dispatch: Dispatch) => void) => async (dispatch): Promise<void> => {
  const res = await axios.put("/api/add_to_user", { showID, type });
  dispatch({
    type: ADD_TO_USER,
    payload: res.data,
  });
};

export const removeFromUser = (showID, type): ((dispatch: Dispatch) => void) => async (
  dispatch,
): Promise<void> => {
  const res = await axios.patch("/api/remove_from_user", { showID, type });
  dispatch({
    type: REMOVE_FROM_USER,
    payload: res.data,
  });
};
