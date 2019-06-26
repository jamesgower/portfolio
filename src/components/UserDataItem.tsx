import * as React from "react";
import { UserDataItemState, UserDataItemProps } from "../interfaces/TwitchAPI";

const moment = require("moment");
const notFoundImage = require("../../public/images/twitch-not-found.jpg");

/* 
	TODO
	[x] Fix flexbox for online and offline
*/
const initialState: UserDataItemState = {
  showComponent: true,
  usersToKeep: [],
  desktop: false,
  userData: null,
};

class UserDataItem extends React.Component<UserDataItemProps, UserDataItemState> {
  public state = initialState;

  public componentDidMount(): void {
    const { name } = this.props;
    const userDataJSON = localStorage.getItem(name);
    const userData = JSON.parse(userDataJSON);
    this.setState({ userData, desktop: window.innerWidth > 1000 });
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  public componentWillUnmount(): void {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  private updateWindowDimensions = (): void => {
    const desktop = window.innerWidth > 1000;
    this.setState({ desktop });
  };

  private onRemoveUser = (): void => {
    const { removeUser, name, online } = this.props;
    const userToRemove = document.getElementById(name);
    userToRemove.className = "user__container animated fadeOutLeft";
    setTimeout((): void => {
      this.setState({ showComponent: false });
      removeUser(name, online);
    }, 500);
  };

  public render(): JSX.Element {
    const { desktop, showComponent, userData } = this.state;
    const {
      name,
      link,
      online,
      image,
      game,
      viewers,
      mature,
      preview,
      matureFilter,
      status,
    } = this.props;

    const OnlineUserDetails = (): JSX.Element => (
      <>
        <p>
          <b>Status:</b> Live now!
        </p>
        <p>
          <b>Currently Playing:</b> {game}
        </p>
        <p className="sub-game">
          <em>- {status} -</em>
        </p>
        <p>
          <b>Viewers:</b> {viewers}
        </p>
        <p>
          <b>Mature Content:</b> {mature ? " Yes " : " No "}
        </p>
      </>
    );

    const OfflineUserDetails = (): JSX.Element => {
      return !userData ? (
        <>
          <p>
            <b>Status:</b> User is offline
          </p>
          <p>
            <b>Last Seen:</b> Never
          </p>
        </>
      ) : (
        <>
          <p>
            <b>Status:</b> User is offline
          </p>
          <p>
            <b>Last Played:</b> {userData.lastGame}
          </p>
          <p>
            <b>Last Streamed:</b> {moment(userData.lastSeen).format("Do MMMM @ hh:mmA")}
          </p>
        </>
      );
    };

    return (
      showComponent && (
        <div id={name} className="user__container animated fadeIn">
          <div className="user__details">
            <div className={online ? "user__online" : "user__offline"}>
              <div className="user__imageContainer">
                <img
                  alt={name}
                  src={image ? image : "/images/placeholder.png"}
                  className="user__image"
                />
                <h4 className="user__name">{name}</h4>
              </div>
              <div className="user__infoContainer">
                {online ? <OnlineUserDetails /> : <OfflineUserDetails />}
              </div>
            </div>
            <i
              role="button"
              onClick={this.onRemoveUser}
              onKeyPress={this.onRemoveUser}
              className="fa fa-times user__deleteIcon"
              tabIndex={0}
            />
          </div>
          {desktop && (
            <div className="user__preview">
              <a href={link} target="_blank" rel="noopener noreferrer">
                <img
                  alt={`${name} stream preview`}
                  src={preview ? preview : notFoundImage}
                  id={`${name}-img`}
                  className={
                    mature && matureFilter ? "user__streamPreview--mature" : "user__streamPreview"
                  }
                />
              </a>
            </div>
          )}
        </div>
      )
    );
  }
}

export default UserDataItem;
