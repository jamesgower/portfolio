import { ProfileState } from "./app.i";

export const FETCH_USER = "fetch_user";
export const LOGOUT = "logout";
export const LOGIN = "login";
export const BROWSE_AS_GUEST = "browse_as_guest";
export const ADD_TO_USER = "add_show_to_user";
export const REMOVE_FROM_USER = "remove_from_user";

export interface FetchUserAction {
  type: typeof FETCH_USER;
  payload: ProfileState;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export interface BrowseAsGuestAction {
  type: typeof BROWSE_AS_GUEST;
}

export interface AddToUserAction {
  type: typeof ADD_TO_USER;
  payload: ProfileState;
}

export interface RemoveFromUserAction {
  type: typeof REMOVE_FROM_USER;
  payload: ProfileState;
}

export type AuthActionTypes =
  | FetchUserAction
  | LogoutAction
  | BrowseAsGuestAction
  | AddToUserAction
  | RemoveFromUserAction;
