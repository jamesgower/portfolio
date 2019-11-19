export default interface TwitchState {
  users: string[];
  onlineUserData: OnlineUser[];
  offlineUserData: OfflineUser[];
}

export interface FetchCall {
  title: string;
  game_id: string;
  viewer_count: number;
  started_at: string;
  thumbnail_url: string;
  display_name: string;
  profile_image_url: string;
  offline_image_url: string;
  name: string;
}

export interface StreamAPICall {
  title: string;
  game_id: string;
  viewer_count: number;
  started_at: string;
  thumbnail_url: string;
}

export interface ProfileAPICall {
  display_name: string;
  profile_image_url: string;
  offline_image_url: string;
}

export interface OnlineUser {
  name: string;
  game: string;
  status: string;
  viewers: number;
  image: string;
  online: boolean;
  preview: string;
  link: string;
}

export interface SavedUser {
  name: string;
  lastGame: string;
  image: string;
  offline_image: string;
  lastSeen: string;
  link: string;
}

export interface OfflineUser {
  name: string;
  online: boolean;
  image: string;
  link: string;
  offline_image: string;
}
