import React from 'react';
import UserDataItem from './UserDataItem';
import { Button, Input, FormGroup } from 'reactstrap';

/*
	TODO
	[x] Add local storage or database for previously streamed game, logo etc.
	[x] Add online/offline/all buttons
	[ ] Fix async problems
	[x] Add option to add streamers
	[ ] Add NavBar component
	[ ] Look at smoother animations !! Look at onTransitionEnd
	[ ] Add remove option for streamers
	[ ] Map unremoveable streamers first
	[ ] Add streamer on enter click
*/

class TwitchAPI extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			users: ['Yogscast', 'FreeCodeCamp', 'Sips_', '888poker', 'HatFilms', 'BuckArmy', 'BigBangs06'],
			onlineUserData: [],
			offlineUserData: [],
			isLoaded: false,
			matureFilter: true,
			show: 'all',
			newStreamer: '',
		};
	}

	getData = name => {
		fetch(`https://wind-bow.gomix.me/twitch-api/streams/${name}`)
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
				}
			);
	};

	onNewStreamer = () => {
		const streamer = this.state.newStreamer;
		const users = this.state.users;
		users.push(streamer);
		this.getData(streamer);
		this.setState({ users });
		const json = JSON.stringify(this.state.users);
		localStorage.setItem('users', json);
	};

	onAnimate = (nodes, hide) => {
		for (var i = 0; i < nodes.length; i++) {
			(function(i) {
				setTimeout(() => {
					if (hide) {
						nodes[i].classList = 'user animated fadeOutLeft';
						setTimeout(() => {
							nodes[i].classList = 'hidden';
						}, 500);
					} else {
						nodes[i].classList = 'user animated fadeInLeft';
					}
				}, 500 * i);
			})(i);
		}
		return true;
	};

	onOnlineChange = () => {
		const offline = document.getElementById('offline-users').childNodes;
		const online = document.getElementById('online-users').childNodes;
		if (this.state.show === 'all') {
			this.onAnimate(offline, true, online);
		} else if (this.state.show === 'offline') {
			this.offlineToOnline(online, offline);
		}
		this.setState({ show: 'online' });
	};

	onAllChange = () => {
		const offline = document.getElementById('offline-users').childNodes;
		const online = document.getElementById('online-users').childNodes;
		if (this.state.show === 'online') {
			this.onAnimate(offline, false);
		} else if (this.state.show === 'offline') {
			this.onAnimate(online, false);
		}
		this.setState({ show: 'all' });
	};

	onOfflineClick = () => {
		const offline = document.getElementById('offline-users').childNodes;
		const online = document.getElementById('online-users').childNodes;
		if (this.state.show === 'all') {
			this.onAnimate(online, true);
		} else if (this.state.show === 'online') {
			this.onlineToOffline(online, offline);
		}
		this.setState({ show: 'offline' });
	};

	onStreamerChange = e => {
		let newStreamer = e.target.value;
		this.setState({ newStreamer });
		const json = JSON.stringify(this.state.users);
		localStorage.setItem('users', json);
	};

	async onlineToOffline(online, offline) {
		try {
			const onlineAnimation = await this.onAnimate(online, true);
			const offlineAnimation = await this.onAnimate(offline, false);
		} catch (err) {
			console.log(err);
		}
	}

	async offlineToOnline(online, offline) {
		try {
			const offlineAnimation = await this.onAnimate(offline, true);
			const onlineAnimation = await this.onAnimate(online, false);
		} catch (err) {
			console.log(err);
		}
	}

	onHandleMature = e => {
		const value = e.target.checked;
		this.setState({ matureFilter: value });
	};

	onRemoveUser = (user, online) => {
		const users = this.state.users;
		let onlineUsers = this.state.onlineUserData;
		let offlineUsers = this.state.offlineUserData;
		if (online) {
			for (let key in onlineUsers) {
				if (onlineUsers.hasOwnProperty(key)) {
					const val = onlineUsers[key];
					if (val.name === user) {
						delete onlineUsers[key];
					}
				}
			}
		} else {
			for (let key in offlineUsers) {
				if (offlineUsers.hasOwnProperty(key)) {
					const val = offlineUsers[key];
					if (val.name === user) {
						delete offlineUsers[key];
					}
				}
			}
		}
		var i = users.indexOf(user);
		users.splice(i, 1);
		//May or may not remove localStorage for users when deleted ??
		const userData = JSON.parse(localStorage.getItem('users'));
		const index = userData.indexOf(user);
		userData.splice(index, 1);
		localStorage.setItem('users', JSON.stringify(userData));
		this.setState({ users, onlineUserData: onlineUsers, offlineUserData: offlineUsers });
	};

	componentWillMount() {
		// localStorage.setItem('users', JSON.stringify(this.state.users));

		try {
			const savedUsersJSON = localStorage.getItem('users');
			const savedUsers = JSON.parse(savedUsersJSON);
			if (savedUsers) {
				this.setState(() => ({ users: savedUsers }));
			}
		} catch (e) {
			console.log(e);
		}
	}

	componentDidMount() {
		for (let i = 0; i < this.state.users.length; i++) {
			this.getData(this.state.users[i]);
		}
	}

	render() {
		return (
			<div className="twitch">
				<div className="header">
					<h1 className="text-center twitch-title">Twitch Streamers</h1>
					<p className="info-text">
						Feel free to add any streamers you wish to track. All streamers are saved so you can come back
						and check their status.
					</p>
					<p className="info-subtext">
						You can also remove any streamers you don't want to follow by pressing the red cross.
					</p>
					<div className="buttons-twitch">
						<Button
							className="btn-twitch"
							active={this.state.show === 'online'}
							size="lg"
							outline
							color="success"
							onClick={this.onOnlineChange}
						>
							Online
						</Button>
						<Button
							className="btn-twitch"
							active={this.state.show === 'all'}
							size="lg"
							outline
							color="warning"
							onClick={this.onAllChange}
						>
							All
						</Button>
						<Button
							className="btn-twitch"
							active={this.state.show === 'offline'}
							size="lg"
							outline
							color="danger"
							onClick={this.onOfflineClick}
						>
							Offline
						</Button>
					</div>
					<div className="newStreamer">
						<FormGroup>
							<Input
								id="streamerInput"
								value={this.state.newStreamer}
								onChange={this.onStreamerChange}
								placeholder="Enter new streamer here"
							/>
							<Button id="streamerBtn" outline color="info" onClick={this.onNewStreamer}>
								Add Streamer
							</Button>
						</FormGroup>
					</div>
					<div className="mature-filter">
						<h3 className="text-center mature-text">Mature Filter:</h3>
						<div className="mature-switch">
							<label className="switch">
								<input
									type="checkbox"
									checked={this.state.matureFilter}
									value={this.state.matureFilter}
									onChange={this.onHandleMature}
								/>
								<span className="slider round" />
							</label>
						</div>
					</div>
				</div>

				<div id="online-users">
					{this.state.onlineUserData.length === 0 ? (
						<div className="user">No users</div>
					) : (
						this.state.onlineUserData.map((user, index) => {
							return (
								<UserDataItem
									key={index}
									{...user}
									usersToKeep={this.state.usersToKeep}
									state={this.state}
									removeUser={this.onRemoveUser}
								/>
							);
						})
					)}
				</div>
				<div id="offline-users">
					{this.state.offlineUserData.length === 0 ? (
						<div className="user">No Users</div>
					) : (
						this.state.offlineUserData.map((user, index) => {
							return (
								<UserDataItem
									key={index}
									{...user}
									usersToKeep={this.state.usersToKeep}
									removeUser={this.onRemoveUser}
								/>
							);
						})
					)}
				</div>
				<div className="footer">sjdfskdjf</div>
			</div>
		);
	}
}

export default TwitchAPI;
