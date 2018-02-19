import React from 'react';
import { TicTacToe } from './PlayTicTacToe';
import ChooseNames from './ChooseNames';
import { Button } from 'reactstrap';

export default class TicTacToeSetup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			noPlayers: undefined,
			p1name: '',
			p2name: '',
			player1Counter: 'X',
			player2Counter: 'O',
			aiCounter: 'O',
			currentPlayer: 1,
			origBoard: Array.from(Array(9).keys()),
			difficulty: undefined,
			readyToPlay: false,
		};
		this.onUpdate = this.onUpdate.bind(this);
	}

	onOnePlayerClick = () => {
		this.setState({ noPlayers: 1 });
	};

	onTwoPlayersClick = () => {
		this.setState({ noPlayers: 2, difficulty: null });
	};

	onUpdate = updates => {
		this.setState({
			p1name: updates.p1name, 
			p2name: updates.p2name, 
			difficulty: updates.difficulty, 
			player1Counter: updates.player1Counter,
			player2Counter: updates.player2Counter,
			aiCounter: updates.aiCounter,
			readyToPlay: true });
	};

	render() {
		const ChooseOpponents = () => (
			<div className="setup-TTT animated slideInDown">
				<h1 id="title-TTT">Welcome to Tic-Tac-Toe!</h1>
				<h3 className="subtitle-TTT">
					Would you like to try your luck against the computer,
					<br />or play against a friend?
				</h3>
				<h3 className="subtitle-2-TTT">
					There are 3 different difficulties to choose <br />
					when playing a one player game!
				</h3>

				<div className="button-container-TTT">
					<Button className="playerChoice" color="primary" size="lg" onClick={this.onOnePlayerClick}>
						1 Player
					</Button>
					<Button className="playerChoice" color="info" size="lg" onClick={this.onTwoPlayersClick}>
						2 Player
					</Button>
				</div>
			</div>
		);

		return (
			<div className="background-TTT">
				<div>
					{this.state.noPlayers === undefined && !this.state.readyToPlay && <ChooseOpponents />}
					{this.state.noPlayers !== undefined &&
						!this.state.readyToPlay && <ChooseNames update={this.onUpdate} {...this.state} />}
					{this.state.readyToPlay && <TicTacToe {...this.state} />}
				</div>
			</div>
		);
	}
}
