import React from "react";
import day from "dayjs";
import { UserDataItemState, UserDataItemProps } from "../interfaces/userDataItem.i";
import notFoundImage from "../images/twitch-not-found.jpg";
import placeholder from "../images/placeholder.png";

const initialState: UserDataItemState = {
  showComponent: true,
  desktop: false,
  userData: null,
};

class UserDataItem extends React.Component<UserDataItemProps, UserDataItemState> {
  public readonly state = initialState;

  public componentWillMount(): void {
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
    const { name, link, online, image, game, viewers, preview, status } = this.props;

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
      </>
    );

    const OfflineUserDetails = (): JSX.Element => (
      <>
        <p className="user__text">
          <span className="user__boldText">Status:</span> User is offline
        </p>
        {userData.lastGame && (
          <p className="user__text">
            <span className="user__boldText">Last Played: </span> {userData.lastGame}
          </p>
        )}
        <p className="user__text">
          <span className="user__boldText">
            {userData.lastSeen ? "Last Streamed: " : "Last Seen: "}
          </span>
          {userData.lastSeen
            ? ` ${day(userData.lastSeen).format("MMMM D @ hh:mmA")}`
            : " Never"}
        </p>
      </>
    );

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
                        : placeholder
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
                  src={
                    online
                      ? preview !== undefined
                        ? preview
                        : notFoundImage
                      : userData
                      ? userData.offline_image || notFoundImage
                      : notFoundImage
                  }
                  id={`${name}-img`}
                  className="user__streamPreview"
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
