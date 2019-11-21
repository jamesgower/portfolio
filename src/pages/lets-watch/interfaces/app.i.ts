export interface LetsWatchState {
  auth?: AuthState;
  tmdb?: TMDBState;
}

export interface AuthState {
  profile: ProfileState;
}

export interface TMDBState {
  movies: any;
  tv: any;
  current: any;
}

export interface ProfileState {
  _id: string;
  userID: string;
  firstName: string;
  lastName: string;
  email: string;
  tvShows: number[];
  movies: number[];
  error?: boolean;
  image: string;
}
