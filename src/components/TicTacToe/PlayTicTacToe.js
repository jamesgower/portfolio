import React from 'react';

const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];

export class TicTacToe extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			noPlayers: this.props ? this.props.noPlayers : 1,
			player1Counter: this.props ? this.props.player1Counter : 'X',
			player2Counter: this.props ? this.props.player2Counter : 'O',
			aiCounter: this.props.player1Counter === 'X' ? 'O' : 'X',
			currentPlayer: 1,
			origBoard: Array.from(Array(9).keys()),
			difficulty: this.props ? this.props.difficulty : 1,
			player1Score: 0,
			player2Score: 0,
			aiScore: 0,
			winningOutcome: undefined,
			endGame: false,
			p1name: this.props ? this.props.p1name : 'Player 1',
			p2name: this.props ? this.props.p2name : 'Player 2',
		};
	}

	onClick = e => {
		const id = e.target.id;
		if (typeof this.state.origBoard[id] === 'number') {
			if (!this.checkTie() && this.state.noPlayers === 1) {
				this.turn(id, this.state.player1Counter);
			} else {
				if (this.state.currentPlayer === 1) {
					this.turn(id, this.state.player1Counter);
					this.setState({
						currentPlayer: 2,
					});
				} else if (this.state.currentPlayer === 2 && !this.checkTie()) {
					this.turn(id, this.state.player2Counter);
					this.setState({
						currentPlayer: 1,
					});
				}
			}
			if (
				!this.checkTie() &&
				this.state.noPlayers === 1 &&
				!this.checkWin(this.state.origBoard, this.state.player1Counter)
			) {
				this.setState({endGame: true});				
				setTimeout(() => {
					this.turn(this.bestSpot(), this.state.aiCounter);
					this.setState({endGame: false});				
				}, 1000);
			}
		}
	};

	turn = (squareId, playerCounter) => {
		const newBoard = this.state.origBoard;
		newBoard[squareId] = playerCounter;
		this.setState({
			origBoard: newBoard,
		});
		const tile = document.getElementById(squareId);
		tile.innerText = playerCounter;
		tile.className = 'tile-text animated fadeIn';
		let gameWon = this.checkWin(this.state.origBoard, playerCounter);
		if (gameWon) {
			this.gameOver(gameWon);
		}
	};

	checkWin = (board, player) => {
		let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
		let gameWon = null;
		for (let [index, win] of winCombos.entries()) {
			if (win.every(elem => plays.indexOf(elem) > -1)) {
				gameWon = {
					index: index,
					player: player,
				};
				break;
			}
		}
		return gameWon;
	};

	gameOver = gameWon => {
		for (let index of winCombos[gameWon.index]) {
			document.getElementById(index).style.backgroundColor =
				gameWon.player === this.state.player1Counter ? 'green' : 'red';
			document.getElementById(index).className = 'tile-text animated tada';
		}
		if (this.state.noPlayers === 1) {
			this.declareWinner(gameWon.player === this.state.player1Counter ? 'You Win!' : 'You Lose!');
			gameWon.player === this.state.player1Counter
				? this.setState({
						player1Score: this.state.player1Score + 1,
					})
				: this.setState({
						aiScore: this.state.aiScore + 1,
					});
		} else {
			this.declareWinner(gameWon.player === this.state.player1Counter ? 'Player 1 Wins!' : 'Player 2 Wins!');
			gameWon.player === this.state.player1Counter
				? this.setState({
						player1Score: this.state.player1Score + 1,
					})
				: this.setState({
						player1Score: this.state.player2Score + 1,
					});
		}
	};

	onReplayClick = () => {
		// Add AI to go first function in future
		this.setState({
			origBoard: Array.from(Array(9).keys()),
			winningOutcome: undefined,
			endGame: false,
		});
		for (var i = 0; i < 9; i++) {
			document.getElementById(i).style.background = 'none';			
			document.getElementById(i).innerText = '';
		}
	};

	onResetClick = () => {
		// Add AI to go first function in future
		this.setState({
			currentPlayer: 1,
			origBoard: Array.from(Array(9).keys()),
			player1Score: 0,
			player2Score: 0,
			aiScore: 0,
			winningOutcome: undefined,
			endGame: false,
		});
		for (var i = 0; i < 9; i++) {
			document.getElementById(i).style.background = 'none';
			document.getElementById(i).innerText = '';
		}
	};

	declareWinner = result => {
		this.setState({
			endGame: true,
		});
		this.setState({
			winningOutcome: result,
		});
	};

	emptyTiles = () => {
		return this.state.origBoard.filter(s => typeof s == 'number');
	};

	bestSpot = () => {
		if (this.state.difficulty === 1) {
			return this.emptyTiles()[0];
		} else if (this.state.difficulty === 2) {
			var length = this.emptyTiles().length;
			return this.emptyTiles()[Math.floor(Math.random(length) + 1)];
		} else if (this.state.difficulty === 3) {
			return this.minimax(this.state.origBoard, this.state.aiCounter).index;
		}
	};

	checkTie = () => {
		if (
			this.emptyTiles().length === 0 &&
			!this.checkWin(this.state.origBoard, 'X') &&
			!this.checkWin(this.state.origBoard, 'O')
		) {
			this.declareWinner('Tie Game!');
			return true;
		}
		return false;
	};

	minimax = (newBoard, player) => {
		var availSpots = this.emptyTiles(newBoard);

		if (this.checkWin(newBoard, this.state.player1Counter)) {
			return {
				score: -10,
			};
		} else if (this.checkWin(newBoard, this.state.aiCounter)) {
			return {
				score: 10,
			};
		} else if (availSpots.length === 0) {
			return {
				score: 0,
			};
		}
		var moves = [];
		for (var i = 0; i < availSpots.length; i++) {
			var move = {};
			move.index = newBoard[availSpots[i]];
			newBoard[availSpots[i]] = player;

			if (player == this.state.aiCounter) {
				let result = this.minimax(newBoard, this.state.player1Counter);
				move.score = result.score;
			} else {
				let result = this.minimax(newBoard, this.state.aiCounter);
				move.score = result.score;
			}

			newBoard[availSpots[i]] = move.index;

			moves.push(move);
		}

		var bestMove;
		if (player === this.state.aiCounter) {
			let bestScore = -10000;
			for (let i = 0; i < moves.length; i++) {
				if (moves[i].score > bestScore) {
					bestScore = moves[i].score;
					bestMove = i;
				}
			}
		} else {
			let bestScore = 10000;
			for (let i = 0; i < moves.length; i++) {
				if (moves[i].score < bestScore) {
					bestScore = moves[i].score;
					bestMove = i;
				}
			}
		}
		return moves[bestMove];
	};

	render() {
		return (
			<div>
				<div className="grid">
					<div className="tile">
						<div className="tile-text" id={0} onClick={!this.state.endGame && this.onClick} />
					</div>
					<div className="tile">
						<div className="tile-text" id={1} onClick={!this.state.endGame && this.onClick} />
					</div>
					<div className="tile">
						<div className="tile-text" id={2} onClick={!this.state.endGame && this.onClick} />
					</div>
					<div className="tile">
						<div className="tile-text" id={3} onClick={!this.state.endGame && this.onClick} />
					</div>
					<div className="tile">
						<div className="tile-text" id={4} onClick={!this.state.endGame && this.onClick} />
					</div>
					<div className="tile">
						<div className="tile-text" id={5} onClick={!this.state.endGame && this.onClick} />
					</div>
					<div className="tile">
						<div className="tile-text" id={6} onClick={!this.state.endGame && this.onClick} />
					</div>
					<div className="tile">
						<div className="tile-text" id={7} onClick={!this.state.endGame && this.onClick} />
					</div>
					<div className="tile">
						<div className="tile-text" id={8} onClick={!this.state.endGame && this.onClick} />
					</div>
				</div>
				<div className="scores">
					<button id="replayBtn" onClick={this.onReplayClick}>
						Replay
					</button>
					<button id="resetBtn" onClick={this.onResetClick}>
						Reset
					</button>
					<div id="p1">
						<div id="player1name"> {this.state.p1name}:</div>
						<span className="scoreNum"> {this.state.player1Score} </span>
					</div>
					{this.state.noPlayers === 1 ? (
						<div className="p2">
							<div className="player2name"> Computer: </div>
							<span className="scoreNum"> {this.state.aiScore} </span>
						</div>
					) : (
						<div className="p2">
							<div className="player2name"> {this.state.p2name}: </div>
							<span className="scoreNum"> {this.state.player2Score} </span>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default TicTacToe;
