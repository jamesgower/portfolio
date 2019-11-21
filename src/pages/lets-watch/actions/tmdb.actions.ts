import axios from "axios";
import { Dispatch } from "redux";
import {
  FETCH_TOP_MOVIES,
  FETCH_TOP_TV,
  FETCH_CURRENT_MOVIE,
  FETCH_CURRENT_TV,
} from "../interfaces/tmdb.redux.i";

export const fetchTopMovies = (): ((dispatch: Dispatch) => Promise<void>) => async (
  dispatch,
): Promise<void> => {
  const res = await axios.get(
    `${process.env.TMDB_URL}/movie/popular${process.env.TMDB_API_KEY}`,
  );
  dispatch({
    type: FETCH_TOP_MOVIES,
    payload: res.data.results,
  });
};

export const fetchTopTV = (): ((dispatch: Dispatch) => Promise<void>) => async (
  dispatch,
): Promise<void> => {
  const res = await axios.get(
    `${process.env.TMDB_URL}/tv/popular${process.env.TMDB_API_KEY}`,
  );
  dispatch({
    type: FETCH_TOP_TV,
    payload: res.data.results,
  });
};

export const fetchCurrentMovie = (
  id: number,
): ((dispatch: Dispatch) => Promise<void>) => async (dispatch): Promise<void> => {
  const res = await axios.get(
    `${process.env.TMDB_URL}/movie/${id}${process.env.TMDB_API_KEY}`,
  );
  dispatch({
    type: FETCH_CURRENT_MOVIE,
    payload: res.data,
  });
};

export const fetchCurrentTV = (
  id: number,
): ((dispatch: Dispatch) => Promise<void>) => async (dispatch): Promise<void> => {
  const res = await axios.get(
    `${process.env.TMDB_URL}/tv/${id}${process.env.TMDB_API_KEY}`,
  );
  dispatch({
    type: FETCH_CURRENT_TV,
    payload: res.data,
  });
};
