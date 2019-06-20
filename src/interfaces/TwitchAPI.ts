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
    userData?: OnlineUser;
    usersToKeep?: string[];
    state?: TwitchState;
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
    mature?: string;
    link: string;
    state: TwitchState;
    removeUser: Function;
    usersToKeep: string[];
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
    mature: string;
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
