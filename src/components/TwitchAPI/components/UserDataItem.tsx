import * as React from "react";
import { UserDataItemState, UserDataItemProps } from "../interfaces/userDataItem.i";

const moment = require("moment");
const notFoundImage = require("../../../../public/images/twitch-not-found.jpg");

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
  public readonly state = initialState;

  public componentDidMount(): void {
    const { name } = this.props;
    const userDataJSON = localStorage.getItem(name);
    const userData = JSON.parse(userDataJSON);
    this.setState({ userData, desktop: window.innerWidth >= 990 });
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  public componentWillUnmount(): void {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  private updateWindowDimensions = (): void => {
    const desktop = window.innerWidth >= 990;
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
        <p className="user__text">
          <span className="user__boldText">Status: </span> Live now!
        </p>
        <p className="user__text">
          <span className="user__boldText">Currently Playing: </span> {game}
        </p>
        <p className="user__text">
          <span className="user__boldText">Stream Title: </span> {status}
        </p>
        <p className="user__text">
          <span className="user__boldText">Viewers: </span> {viewers}
        </p>
        <p className="user__text">
          <span className="user__boldText">Mature Content: </span>{" "}
          {mature ? " Yes " : " No "}
        </p>
      </>
    );

    const OfflineUserDetails = (): JSX.Element => {
      return !userData ? (
        <>
          <p className="user__text">
            <span className="user__boldText">Status:</span> User is offline
          </p>
          <p className="user__text">
            <span className="user__boldText">Last Seen:</span> Never
          </p>
        </>
      ) : (
        <>
          <p className="user__text">
            <span className="user__boldText">Status:</span> User is offline
          </p>
          <p className="user__text">
            <span className="user__boldText">Last Played: </span> {userData.lastGame}
          </p>
          <p className="user__text">
            <span className="user__boldText">Last Streamed: </span>
            {moment(userData.lastSeen).format("Do MMMM @ hh:mmA")}
          </p>
        </>
      );
    };

    return (
      showComponent && (
        <div id={name} className="user__container animated fadeInLeft">
          <div className="user__details">
            <div className={online ? "user__online" : "user__offline"}>
              <div className="user__imageContainer">
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <img
                    alt={name}
                    src={
                      image !== undefined
                        ? image
                        : userData
                        ? userData.image
                        : "/images/placeholder.png"
                    }
                    className="user__image"
                  />
                </a>
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
                  src={preview !== undefined ? preview : notFoundImage}
                  id={`${name}-img`}
                  className={
                    mature && matureFilter
                      ? "user__streamPreview--mature"
                      : "user__streamPreview"
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
