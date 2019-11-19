import React from "react";
import { Container } from "reactstrap";
import UserDataItem from "./UserDataItem";
import TwitchState, {
  OnlineUser,
  SavedUser,
  StreamAPICall,
  ProfileAPICall,
  FetchCall,
} from "../interfaces/twitchAPI.i";
import background from "../images/background.jpg";
import Header from "./Header";

const initialState: TwitchState = {
  users: ["Yogscast", "FreeCodeCamp", "sips_", "888poker", "NickMercs", "BuckArmy"],
  onlineUserData: [],
  offlineUserData: [],
};

/**
  TODO
  [ ] Get details via profile endpoint, return error on UserDataItem component if no details found
 */

class TwitchAPI extends React.Component<{}, TwitchState> {
  public readonly state = initialState;

  public async componentDidMount(): Promise<void> {
    /**
     * Attempt to get information from all saved users in local storage.
     * If any data exists, store it in the state. If there are any errors,
     * log it into the console.
     */

    const users = JSON.parse(localStorage.getItem("users"));
    if (users) {
      this.setState({ users });
      for (const user of users) {
        this.getData(user);
      }
    } else {
      const { users } = this.state;
      for (const user of users) {
        this.getData(user);
      }
      localStorage.setItem("users", JSON.stringify(users));
    }
  }

  public onNewStreamer = (streamer): void => {
    const { users } = this.state;
    users.push(streamer);
    this.getData(streamer);
    this.setState({ users });
    localStorage.setItem("users", JSON.stringify(users));
  };

  public replaceFields = (str): string => {
    str = str.replace("{width}", "1280");
    str = str.replace("{height}", "720");
    return str;
  };

  public fetchData = async (url: string): Promise<FetchCall> => {
    let res;
    if (process.env.TWITCH_CLIENT_ID) {
      res = await fetch(`https://api.twitch.tv/helix/${url}`, {
        headers: {
          "Client-ID": process.env.TWITCH_CLIENT_ID,
        },
      });
    } else {
      res = await fetch(`https://wind-bow.glitch.me/helix/${url}`);
    }
    const data = await res.json();
    return data.data[0];
  };

  public getData = async (name: string): Promise<void> => {
    const stream: StreamAPICall = await this.fetchData(`streams?user_login=${name}`);
    const profile: ProfileAPICall = await this.fetchData(`users?login=${name}`);
    let game;
    if (stream && profile) game = await this.fetchData(`games?id=${stream.game_id}`);
    if (stream && game) {
      const { onlineUserData } = this.state;
      const user: OnlineUser = {
        name: profile.display_name,
        game: game.name,
        status: stream.title,
        viewers: stream.viewer_count,
        image: profile.profile_image_url,
        online: true,
        preview: this.replaceFields(stream.thumbnail_url),
        link: `https://www.twitch.tv/${profile.display_name}`,
      };

      const savedUser: SavedUser = {
        name: profile.display_name,
        lastGame: game.name,
        image: profile.profile_image_url,
        offline_image: profile.offline_image_url,
        lastSeen: stream.started_at,
        link: `https://www.twitch.tv/${profile.display_name}`,
      };

      onlineUserData.push(user);
      localStorage.setItem(savedUser.name, JSON.stringify(savedUser));
      this.setState({
        onlineUserData,
      });
    } else {
      const { offlineUserData } = this.state;
      console.log(name, profile.display_name);
      const user = {
        name: profile.display_name,
        image: profile.profile_image_url,
        online: false,
        offline_image: profile.offline_image_url,
        link: `https://www.twitch.tv/${profile.display_name}`,
      };
      offlineUserData.push(user);
      this.setState({
        offlineUserData,
      });
      if (localStorage.getItem(user.name) === null) {
        localStorage.setItem(user.name, JSON.stringify(user));
      }
    }
  };

  private onRemoveUser = (user: string, online: boolean): void => {
    const { users, onlineUserData, offlineUserData } = this.state;
    if (online) {
      for (const key in onlineUserData) {
        if (onlineUserData.hasOwnProperty(key)) {
          const val = onlineUserData[key];
          if (val.name === user) delete onlineUserData[key];
        }
      }
    } else {
      for (const key in offlineUserData) {
        if (offlineUserData.hasOwnProperty(key)) {
          const val = offlineUserData[key];
          if (val.name === user) delete offlineUserData[key];
        }
      }
    }
    const idx = users.indexOf(user);
    users.splice(idx, 1);
    const userData = JSON.parse(localStorage.getItem("users"));
    const index = userData.indexOf(user);
    userData.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(userData));
    this.setState({ users, onlineUserData, offlineUserData });
  };

  public render(): JSX.Element {
    const { onlineUserData, offlineUserData } = this.state;

    return (
      <div className="twitch__container" style={{ background: `url(${background})` }}>
        <Header onNewStreamer={this.onNewStreamer} />
        <Container>
          <div id="online-users">
            {onlineUserData.length > 0 &&
              onlineUserData
                .sort((a, b): number => {
                  return a.viewers > b.viewers ? -1 : 1;
                })
                .map(
                  (user, i): JSX.Element => (
                    <UserDataItem key={i} {...user} removeUser={this.onRemoveUser} />
                  ),
                )}
          </div>
          <div id="offline-users">
            {offlineUserData.length > 0 &&
              offlineUserData.map(
                (user, i): JSX.Element => (
                  <UserDataItem key={i} {...user} removeUser={this.onRemoveUser} />
                ),
              )}
          </div>
        </Container>
        <div className="twitch__footer-container">
          <footer className="twitch__footer" />
        </div>
      </div>
    );
  }
}

export default TwitchAPI;
