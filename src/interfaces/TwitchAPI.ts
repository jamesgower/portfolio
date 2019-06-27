export default interface TwitchState {
  users: string[];
  onlineUserData: OnlineUser[];
  offlineUserData: OfflineUser[];
  isLoaded: boolean;
  matureFilter: boolean;
  show: string;
  newStreamer: string;
  error?: boolean;
  usersToKeep?: string[];
}

export interface UserDataItemState {
  showComponent: boolean;
  userData: OnlineUser;
  usersToKeep: string[];
  desktop: boolean;
}

export interface APICall {
  result: object;
  stream: {
    game: string;
    viewers: string;
    average_fps: number;
    created_at: string;
    preview: {
      medium: string;
    };
    channel: {
      status: string;
      logo: string;
      mature: boolean;
    };
  };
  game: object;
}

export interface UserDataItemProps {
  name: string;
  game?: string;
  status?: string;
  viewers?: string;
  fps?: number;
  image?: string;
  online: boolean;
  preview?: string;
  mature?: boolean;
  link: string;
  removeUser: Function;
  usersToKeep: string[];
  matureFilter: boolean;
}

export interface OnlineUser {
  name: string;
  game: string;
  status: string;
  viewers: string;
  fps: number;
  image: string;
  online: boolean;
  preview: string;
  mature: boolean;
  link: string;
  lastSeen?: string;
  lastGame?: string;
}

export interface SavedUser {
  name: string;
  lastGame: string;
  image: string;
  lastSeen: string;
  link: string;
}

export interface OfflineUser {
  name: string;
  online: boolean;
  link: string;
}
