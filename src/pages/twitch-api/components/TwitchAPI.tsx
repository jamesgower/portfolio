import * as React from "react";
import { Button, Input, Container } from "reactstrap";
import UserDataItem from "./UserDataItem";
import TwitchState, { OnlineUser, SavedUser, APICall } from "../interfaces/twitchAPI.i";

/*
	TODO
	[x] Fix async problems
	[ ] Look at smoother animations !! Look at onTransitionEnd
	[x] Add streamer on enter click
	[x] Look to change passing all state to UserDataItem
	[x] Fix cross to be in top right
	[x] Fix animations when clicking online button
	[x] Fix text size for mature filter & make switch smaller with it
*/

const initialState: TwitchState = {
  users: [
    "Yogscast",
    "FreeCodeCamp",
    "Sips_",
    "888poker",
    "NickMercs",
    "BuckArmy",
    "BigBangs06",
  ],
  onlineUserData: [],
  offlineUserData: [],
  matureFilter: true,
  show: "all",
  newStreamer: "",
};

class TwitchAPI extends React.Component<{}, TwitchState> {
  public readonly state = initialState;

  public componentWillMount(): void {
    /**
     * Attempt to get information from all saved users in local storage.
     * If any data exists, store it in the state. If there are any errors,
     * log it into the console.
     */
    try {
      const users = JSON.parse(localStorage.getItem("users"));
      if (users) this.setState({ users });
    } catch (err) {
      console.error(err);
    }
  }

  public componentDidMount(): void {
    /**
     * Get all available user data by looping through all of the users
     * found in the state from componentWillMount using the getData function.
     */
    const { users } = this.state;
    for (const user of users) {
      this.getData(user);
    }
    /**
     * Add the event listener for pressing enter while focused on the input
     * to add a new streamer.
     */
    const input = document.getElementById("streamer-input");
    input.addEventListener(
      "keydown",
      (e: KeyboardEvent): void => {
        if (e.keyCode === 13) {
          this.onNewStreamer();
        }
      },
    );
  }

  public componentWillUnmount(): void {
    /**
     * Remove the event listener when the component is unmounted to avoid
     * memory leaks.
     */
    const input = document.getElementById("streamer-input");
    input.removeEventListener(
      "keydown",
      (e: KeyboardEvent): void => {
        if (e.keyCode === 13) {
          this.onNewStreamer();
        }
      },
    );
  }

  public onNewStreamer = (): void => {
    const { newStreamer, users } = this.state;
    users.push(newStreamer);
    this.getData(newStreamer);
    this.setState({ users, newStreamer: "" });
    localStorage.setItem("users", JSON.stringify(users));
  };

  private onAnimate = (nodes: HTMLCollection, hide: boolean): boolean => {
    for (let i = 0; i < nodes.length; i++) {
      (function(i): void {
        setTimeout((): void => {
          if (hide) {
            nodes[i].className = "user__container animated fadeOutLeft";
            setTimeout((): void => {
              nodes[i].className = "hidden";
            }, 500);
          } else {
            nodes[i].className = "user__container animated fadeInLeft";
          }
        }, 500 * i);
      })(i);
    }
    return true;
  };

  private onOnlineChange = (): void => {
    const { show } = this.state;
    const online = document.getElementById("online-users").children;
    const offline = document.getElementById("offline-users").children;

    switch (show) {
      case "all":
        this.onAnimate(offline, true);
        break;
      case "offline":
        this.onAnimate(offline, true);
        this.onAnimate(online, false);
        break;
      default:
        return;
    }
    this.setState({ show: "online" });
  };

  private onAllChange = (): void => {
    const { show } = this.state;
    const online = document.getElementById("online-users").children;
    const offline = document.getElementById("offline-users").children;

    switch (show) {
      case "online":
        this.onAnimate(offline, false);
        break;
      case "offline":
        this.onAnimate(online, false);
        break;
      default:
        return;
    }
    this.setState({ show: "all" });
  };

  private onOfflineChange = (): void => {
    const { show } = this.state;
    const online = document.getElementById("online-users").children;
    const offline = document.getElementById("offline-users").children;

    switch (show) {
      case "all":
        this.onAnimate(online, true);
        break;
      case "online":
        this.onAnimate(online, true);
        this.onAnimate(offline, false);
        break;
      default:
        return;
    }
    this.setState({ show: "offline" });
  };

  public onStreamerChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { users } = this.state;
    this.setState({ newStreamer: e.target.value });
    localStorage.setItem("users", JSON.stringify(users));
  };

  public getData = async (name: string): Promise<void> => {
    const res = await fetch(`https://api.twitch.tv/kraken/streams/${name}`, {
      headers: {
        "Client-ID": process.env.twitch_client_id,
        Authorization: process.env.twitch_authorization,
      },
    });
    const result: APICall = await res.json();
    if (result.stream !== null) {
      const { onlineUserData } = this.state;
      const user: OnlineUser = {
        name,
        game: result.stream.game || "TEST",
        status: result.stream.channel.status,
        viewers: result.stream.viewers,
        fps: result.stream.average_fps,
        image: result.stream.channel.logo,
        online: true,
        preview: result.stream.preview.medium,
        mature: result.stream.channel.mature,
        link: `https://www.twitch.tv/${name}`,
      };

      const savedUser: SavedUser = {
        name,
        lastGame: result.stream.game,
        image: result.stream.channel.logo,
        lastSeen: result.stream.created_at,
        link: `https://www.twitch.tv/${name}`,
      };

      onlineUserData.push(user);
      if (localStorage.getItem(savedUser.name) === null) {
        localStorage.setItem(savedUser.name, JSON.stringify(savedUser));
      }
      this.setState({
        onlineUserData,
      });
    } else {
      const { offlineUserData } = this.state;
      const user = {
        name,
        online: false,
        link: `https://www.twitch.tv/${name}`,
      };
      offlineUserData.push(user);
      this.setState({
        offlineUserData,
      });
    }
  };

  private onHandleMature = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ matureFilter: e.target.checked });
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
    const {
      onlineUserData,
      offlineUserData,
      show,
      newStreamer,
      usersToKeep,
      matureFilter,
    } = this.state;

    return (
      <div className="twitch__container">
        <div className="twitch__header">
          <Container>
            <h1 className="text-center twitch__title">Twitch Streamers</h1>
            <p className="twitch__header-text">
              Feel free to add any streamers you wish to track. All streamers are saved so
              you can come back and check their status.
            </p>
            <p className="twitch__header-subtext">
              You can also remove any streamers you don&apos;t want to follow by pressing
              the red cross.
            </p>
            <div className="twitch__buttons-container">
              <Button
                className="twitch__button"
                active={show === "online"}
                size="lg"
                outline
                color="success"
                onClick={this.onOnlineChange}
              >
                Online
              </Button>
              <Button
                className="twitch__button"
                active={show === "all"}
                size="lg"
                outline
                color="warning"
                onClick={this.onAllChange}
              >
                All
              </Button>
              <Button
                className="twitch__button"
                active={show === "offline"}
                size="lg"
                outline
                color="danger"
                onClick={this.onOfflineChange}
              >
                Offline
              </Button>
            </div>
            <div className="twitch__input-container">
              <Input
                id="streamer-input"
                value={newStreamer}
                onChange={this.onStreamerChange}
                placeholder="Enter new streamer here"
              />
              <Button id="streamer-btn" outline color="info" onClick={this.onNewStreamer}>
                Add Streamer
              </Button>
            </div>
            <div className="twitch__mature-container">
              <h3 className="twitch__mature-text">Mature Filter:</h3>
              <div className="twitch__mature-switch">
                <label htmlFor="check" className="twitch__switch">
                  <input
                    id="check"
                    type="checkbox"
                    checked={matureFilter}
                    onChange={this.onHandleMature}
                  />
                  <span className="twitch__slider twitch__round" />
                </label>
              </div>
            </div>
          </Container>
        </div>
        <Container>
          <div id="online-users">
            {onlineUserData.length > 0 &&
              onlineUserData.map(
                (user, index): JSX.Element => (
                  <UserDataItem
                    key={index}
                    {...user}
                    usersToKeep={usersToKeep}
                    matureFilter={matureFilter}
                    removeUser={this.onRemoveUser}
                  />
                ),
              )}
          </div>
          <div id="offline-users">
            {offlineUserData.length > 0 &&
              offlineUserData.map(
                (user, index): JSX.Element => (
                  <UserDataItem
                    key={index}
                    {...user}
                    usersToKeep={usersToKeep}
                    matureFilter={matureFilter}
                    removeUser={this.onRemoveUser}
                  />
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
