import * as React from "react";
const moment = require("moment");
const notFoundImage = require("../../public/images/twitch-not-found.jpg");
import { UserDataItemState, UserDataItemProps } from "../interfaces/TwitchAPI";

/* 
	TODO
	[ ] Fix flexbox for online and offline
*/
const defaultState: UserDataItemState = {
    showComponent: true,
    usersToKeep: [],
    desktop: false,
    userData: null,
};

class UserDataItem extends React.Component<UserDataItemProps, UserDataItemState> {
    state = defaultState;

    componentDidMount() {
        const userDataJSON = localStorage.getItem(name);
        const userData = JSON.parse(userDataJSON);
        this.setState({ userData, desktop: window.innerWidth > 1000 });
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        let desktop = window.innerWidth > 1000;
        this.setState({ desktop });
    };

    onRemoveUser = () => {
        const { removeUser, name, online } = this.props;
        const userToRemove = document.getElementById(name);
        userToRemove.className = "user animated fadeOutLeft";
        setTimeout(() => {
            this.setState({ showComponent: false });
            removeUser(name, online);
        }, 500);
    };

    render() {
        const { desktop, showComponent } = this.state;
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
        } = this.props;

        return (
            showComponent && (
                <div className="user__container">
                    <div id={name} className="user__details animated fadeIn">
                        {online ? (
                            <div className="online-user">
                                <i onClick={this.onRemoveUser} className="fa fa-times deleteBtn" />
                                <div className="user-image">
                                    <img src={image} className="user-logo" />
                                    <h4 className="user-name">{name}</h4>
                                </div>
                                <div className="user-info">
                                    <p>
                                        <b>Status:</b> Live now!
                                    </p>
                                    <p>
                                        <b>Currently Playing:</b> {game}
                                    </p>
                                    <p className="sub-game">
                                        <em>- {status}</em>
                                    </p>
                                    <p>
                                        <b>Viewers:</b> {viewers}
                                    </p>
                                    <p>
                                        <b>Mature Content:</b> {mature ? " Yes " : " No "}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="offline-user">
                                <div className="user-image">
                                    <img
                                        src={
                                            this.state.userData
                                                ? this.state.userData.image
                                                : "/images/placeholder.png"
                                        }
                                        className="user-logo"
                                    />
                                    <h4 className="user-name">{name}</h4>
                                </div>
                                <div
                                    className={
                                        this.state.userData !== null
                                            ? "offline-with-info"
                                            : "offline-user-info"
                                    }
                                >
                                    {!this.state.userData ? (
                                        <div>
                                            <p>
                                                <b>Status:</b> User is offline
                                            </p>
                                            <p>
                                                <b>Last Seen:</b> Never
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p>
                                                <b>Status:</b> User is offline
                                            </p>
                                            <p>
                                                <b>Last Played:</b> {this.state.userData.lastGame}
                                            </p>
                                            <p>
                                                <b>Last Streamed:</b>{" "}
                                                {moment(this.state.userData.lastSeen).format(
                                                    "Do MMMM @ hh:mmA",
                                                )}
                                            </p>
                                        </div>
                                    )}
                                    <i
                                        onClick={this.onRemoveUser}
                                        className="fa fa-times deleteBtn"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    {desktop && (
                        <div className="user__preview">
                            <a href={link} target="_blank">
                                <img
                                    src={notFoundImage}
                                    id={`${name}-img`}
                                    className="preview-img"
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
