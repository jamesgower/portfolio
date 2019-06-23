import * as React from "react";
import UserDataItem from "./UserDataItem";
import { Button, Input, Container } from "reactstrap";
import TwitchState from "../interfaces/TwitchAPI";
/*
	TODO
	[ ] Fix async problems
	[ ] Look at smoother animations !! Look at onTransitionEnd
	[ ] Add streamer on enter click
	[ ] Look to change passing all state to UserDataItem
*/

const initialState: TwitchState = {
    users: ["Yogscast", "FreeCodeCamp", "Sips_", "888poker", "NickMercs", "BuckArmy", "BigBangs06"],
    onlineUserData: [],
    offlineUserData: [],
    isLoaded: false,
    matureFilter: true,
    show: "all",
    newStreamer: "",
};

class TwitchAPI extends React.Component<{}, TwitchState> {
    state = initialState;

    getData = (name: string) => {
        fetch(`https://api.twitch.tv/kraken/streams/${name}`, {
            headers: {
                "Client-ID": "acmgohwns9updtn48z6vtd67urgziz",
                Authorization: "o*******",
            },
        })
            .then(res => res.json())
            .then(
                result => {
                    if (result.stream !== null) {
                        let onlineUserData = this.state.onlineUserData;

                        const user = {
                            name,
                            game: result.stream.game,
                            status: result.stream.channel.status,
                            viewers: result.stream.viewers,
                            fps: result.stream.average_fps,
                            image: result.stream.channel.logo,
                            online: true,
                            preview: result.stream.preview.medium,
                            mature: result.stream.channel.mature,
                            link: `https://www.twitch.tv/${name}`,
                        };

                        const savedUser = {
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
                            isLoaded: true,
                            onlineUserData,
                        });
                    } else if (result.stream === null) {
                        let offlineUserData = this.state.offlineUserData;
                        const user = {
                            name,
                            online: false,
                            link: `https://www.twitch.tv/${name}`,
                        };
                        offlineUserData.push(user);
                        this.setState({
                            isLoaded: true,
                            offlineUserData,
                        });
                    }
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                },
            );
    };

    onNewStreamer = () => {
        const { newStreamer, users } = this.state;
        const streamer = newStreamer;
        users.push(streamer);
        this.getData(streamer);
        this.setState({ users });
        const json = JSON.stringify(users);
        localStorage.setItem("users", json);
    };

    onAnimate = (nodes, hide: boolean) => {
        for (var i = 0; i < nodes.length; i++) {
            (function(i) {
                setTimeout(() => {
                    if (hide) {
                        nodes[i].classList = "user animated fadeOutLeft";
                        setTimeout(() => {
                            nodes[i].classList = "hidden";
                        }, 500);
                    } else {
                        nodes[i].classList = "user animated fadeInLeft";
                    }
                }, 500 * i);
            })(i);
        }
        return true;
    };

    onOnlineChange = () => {
        const { show } = this.state;
        const offline = document.getElementById("offline-users").childNodes;
        const online = document.getElementById("online-users").childNodes;
        if (show === "all") {
            this.onAnimate(offline, true);
            this.onAnimate(online, true);
        } else if (show === "offline") {
            this.offlineToOnline(online, offline);
        }
        this.setState({ show: "online" });
    };

    onAllChange = () => {
        const { show } = this.state;
        const offline = document.getElementById("offline-users").childNodes;
        const online = document.getElementById("online-users").childNodes;
        if (show === "online") {
            this.onAnimate(offline, false);
        } else if (show === "offline") {
            this.onAnimate(online, false);
        }
        this.setState({ show: "all" });
    };

    onOfflineClick = () => {
        const { show } = this.state;
        const offline = document.getElementById("offline-users").childNodes;
        const online = document.getElementById("online-users").childNodes;
        if (show === "all") {
            this.onAnimate(online, true);
        } else if (show === "online") {
            this.onlineToOffline(online, offline);
        }
        this.setState({ show: "offline" });
    };

    onStreamerChange = (e: { target: { value: string } }) => {
        let newStreamer = e.target.value;
        this.setState({ newStreamer });
        const json = JSON.stringify(this.state.users);
        localStorage.setItem("users", json);
    };

    async onlineToOffline(online, offline) {
        try {
            await this.onAnimate(online, true);
            await this.onAnimate(offline, false);
        } catch (err) {
            console.log(err);
        }
    }

    async offlineToOnline(online, offline) {
        try {
            await this.onAnimate(offline, true);
            await this.onAnimate(online, false);
        } catch (err) {
            console.log(err);
        }
    }

    onHandleMature = (e: { target: { checked: boolean } }) => {
        const value = e.target.checked;
        this.setState({ matureFilter: value });
    };

    onRemoveUser = (user: string, online: any) => {
        const { users, onlineUserData, offlineUserData } = this.state;
        if (online) {
            for (let key in onlineUserData) {
                if (onlineUserData.hasOwnProperty(key)) {
                    const val = onlineUserData[key];
                    if (val.name === user) {
                        delete onlineUserData[key];
                    }
                }
            }
        } else {
            for (let key in offlineUserData) {
                if (offlineUserData.hasOwnProperty(key)) {
                    const val = offlineUserData[key];
                    if (val.name === user) {
                        delete offlineUserData[key];
                    }
                }
            }
        }
        var i = users.indexOf(user);
        users.splice(i, 1);
        const userData = JSON.parse(localStorage.getItem("users"));
        const index = userData.indexOf(user);
        userData.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(userData));
        this.setState({ users, onlineUserData, offlineUserData });
    };

    componentWillMount() {
        try {
            const savedUsers = JSON.parse(localStorage.getItem("users"));
            if (savedUsers) {
                this.setState(() => ({ users: savedUsers }));
            }
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        const { users } = this.state;
        for (const user of users) {
            this.getData(user);
        }
    }

    render() {
        const {
            onlineUserData,
            offlineUserData,
            show,
            newStreamer,
            usersToKeep,
            matureFilter,
        } = this.state;
        return (
            <div className="twitch">
                <div className="header">
                    <Container>
                        <h1 className="text-center twitch-title">Twitch Streamers</h1>
                        <p className="info-text">
                            Feel free to add any streamers you wish to track. All streamers are
                            saved so you can come back and check their status.
                        </p>
                        <p className="info-subtext">
                            You can also remove any streamers you don't want to follow by pressing
                            the red cross.
                        </p>
                        <div className="buttons-twitch">
                            <Button
                                className="btn-twitch"
                                active={show === "online"}
                                size="lg"
                                outline
                                color="success"
                                onClick={this.onOnlineChange}
                            >
                                Online
                            </Button>
                            <Button
                                className="btn-twitch"
                                active={show === "all"}
                                size="lg"
                                outline
                                color="warning"
                                onClick={this.onAllChange}
                            >
                                All
                            </Button>
                            <Button
                                className="btn-twitch"
                                active={show === "offline"}
                                size="lg"
                                outline
                                color="danger"
                                onClick={this.onOfflineClick}
                            >
                                Offline
                            </Button>
                        </div>
                        <div className="newStreamer">
                            <Input
                                id="streamerInput"
                                value={newStreamer}
                                onChange={this.onStreamerChange}
                                placeholder="Enter new streamer here"
                            />
                            <Button
                                id="streamerBtn"
                                outline
                                color="info"
                                onClick={this.onNewStreamer}
                            >
                                Add Streamer
                            </Button>
                        </div>
                        <div className="mature-filter">
                            <h3 className="mature-text">Mature Filter:</h3>
                            <div className="mature-switch">
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={matureFilter}
                                        onChange={this.onHandleMature}
                                    />
                                    <span className="slider round" />
                                </label>
                            </div>
                        </div>
                    </Container>
                </div>
                <Container>
                    <div id="online-users">
                        {onlineUserData.length > 0 &&
                            onlineUserData.map((user, index) => (
                                <UserDataItem
                                    key={index}
                                    {...user}
                                    usersToKeep={usersToKeep}
                                    matureFilter={matureFilter}
                                    removeUser={this.onRemoveUser}
                                />
                            ))}
                    </div>
                    <div id="offline-users">
                        {offlineUserData.length > 0 &&
                            offlineUserData.map((user, index) => (
                                <UserDataItem
                                    key={index}
                                    {...user}
                                    usersToKeep={usersToKeep}
                                    matureFilter={matureFilter}
                                    removeUser={this.onRemoveUser}
                                />
                            ))}
                    </div>
                </Container>
                <div className="footer" />
            </div>
        );
    }
}

export default TwitchAPI;
