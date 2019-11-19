export interface UserDataItemProps {
  name: string;
  game?: string;
  status?: string;
  viewers?: number;
  image?: string;
  online: boolean;
  preview?: string;
  link: string;
  lastGame?: string;
  lastSeen?: string;
  offline_image?: string;
  removeUser: (user, online) => void;
}

export interface UserDataItemState {
  showComponent: boolean;
  userData: UserDataItemProps;
  desktop: boolean;
}
