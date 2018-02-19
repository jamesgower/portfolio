import React from 'react';
import { Button, Input, Row, Col, FormGroup } from 'reactstrap';

class ChooseNames extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			p1name: '',
			p2name: '',
			difficulty: 2,
			easySelected: false,
			normalSelected: true,
			unbeatableSelected: false,
			player1Counter: this.props.player1Counter,
			player2Counter: this.props.player2Counter,
			aiCounter: this.props.aiCounter,
		};
	}

	onP1Change = e => {
		const p1name = e.target.value;
		this.setState({ p1name });
	};

	onP2Change = e => {
		const p2name = e.target.value;
		this.setState({ p2name });
	};

	onEasyDiff = () => {
		this.setState({
			difficulty: 1,
			easySelected: true,
			normalSelected: false,
			unbeatableSelected: false,
		});
	};

	onNormalDiff = () => {
		this.setState({
			difficulty: 2,
			easySelected: false,
			normalSelected: true,
			unbeatableSelected: false,
		});
	};

	onUnbeatableDiff = () => {
		this.setState({
			difficulty: 3,
			easySelected: false,
			normalSelected: false,
			unbeatableSelected: true,
		});
	};

	onSubmit = e => {
		e.preventDefault();
		this.props.update({
			p1name: this.state.p1name === '' ? 'Player 1' : this.state.p1name,
			p2name: this.state.p2name === '' ? 'Player 2' : this.state.p2name,
			difficulty: this.state.difficulty === undefined ? 2 : this.state.difficulty,
			player1Counter: this.state.player1Counter,
			player2Counter: this.state.player2Counter,
			aiCounter: this.state.aiCounter
		});
	};

	changeCounter = () => {
		this.setState({
			player1Counter: this.state.player1Counter === 'X' ? 'O' : 'X',
			player2Counter: this.state.player2Counter === 'O' ? 'X' : 'O',
			aiCounter: this.state.aiCounter === 'O' ? 'X' : 'O',
		});
	};
	render() {
		return (
			<div className="setup-TTT">
				{this.props.noPlayers === 1 && (
					<h2 className="onePlayerNames">
						Please input your name and choose the difficulty you wish to play on.
					</h2>
				)}
				{this.props.noPlayers === 2 && (
					<h2 className="twoPlayerNames">Please input your names, then optionally click on to change your coun.</h2>
				)}
				<Row className="pNameInput">
					<Col xs={4}>
						<label className="playerLbl">Player 1:</label>
					</Col>
					<Col xs={8}>
						<Input onChange={this.onP1Change} autoFocus value={this.state.p1name} />
					</Col>
				</Row>

				{this.props.noPlayers === 2 && (
					<Row className="pNameInput">
						<Col xs={4}>
							<label className="playerLbl">Player 2:</label>
						</Col>
						<Col xs={8}>
							<Input onChange={this.onP2Change} value={this.state.p2name} />
						</Col>
					</Row>
				)}

				{this.props.noPlayers === 1 && (
					<div>
						<h3 className="chooseDiff">What difficulty would you like to play against?</h3>
						<div className="button-container">
							<Button
								className="diffBtn"
								active={this.state.easySelected}
								onClick={this.onEasyDiff}
								outline
								size="lg"
								color="success"
							>
								Easy
							</Button>
							<Button
								className="diffBtn"
								active={this.state.normalSelected}
								onClick={this.onNormalDiff}
								outline
								size="lg"
								color="warning"
							>
								Normal
							</Button>
							<Button
								className="diffBtn"
								onClick={this.onUnbeatableDiff}
								active={this.state.unbeatableSelected}
								outline
								size="lg"
								color="danger"
							>
								Unbeatable
							</Button>
						</div>
					</div>
				)}
				<div className={this.props.noPlayers === 1 ? 'chooseCounterOne' : 'chooseCounterTwo'}>
					<div onClick={this.changeCounter} className="counters-container">
						<label className="counterLbl">Player One:</label>
						<div className="counter">{this.state.player1Counter}</div>
					</div>
					<div className="counters-container" onClick={this.changeCounter}>
						<label className="counterLbl">{this.props.noPlayers === 1 ? 'Computer' : 'Player 2:'}</label>
						<div className="counter">{this.props.noPlayers === 1 ? this.state.aiCounter : this.state.player2Counter}</div>
					</div>
				</div>
				<div className="button-container">
					<Button className="playBtn" outline size="lg" color="primary" onClick={this.onSubmit}>
						Play Game!
					</Button>
				</div>
			</div>
		);
	}
}

export default ChooseNames;
