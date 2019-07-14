import { OnlineUser } from "./twitchAPI.i";

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

export interface UserDataItemState {
  showComponent: boolean;
  userData: OnlineUser;
  usersToKeep: string[];
  desktop: boolean;
}
