import React from 'react';
import { connect } from 'react-redux';
import { setPlayers } from '../../../actions/player';
import { changeSize } from '../../../actions/tiles';

class WelcomeScreen extends React.Component {
	onePlayer = () => {
		this.props.setPlayers(1);
	}

	twoPlayer = () => {
		this.props.setPlayers(2);
	}

	onSizeChange = (e) => {
		let boardSize = parseInt(e.target.value);
		const newBoard = [];
		for(let i=0; i<boardSize*boardSize; i++) {
			newBoard.push(undefined);
		}
		this.props.changeSize(newBoard, boardSize*boardSize);
	}
	render() {
		return (
			<div className="welcomeScreen">
				<h1>Welcome to Tic-Tac-Toe!</h1>
				<h3>How many people are playing?</h3>
				<button onClick={this.onePlayer} className="playBtn">1 Player</button>
				<button onClick={this.twoPlayer} className="playBtn">2 Players</button>
				<h3>Size of Board:</h3><input className="input" type="num" defaultValue={3} onChange={this.onSizeChange}/>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	setPlayers: (noPlayers) => dispatch(setPlayers(noPlayers)),
	changeSize: (newBoard, boardSize) => dispatch(changeSize(newBoard, boardSize))

});

export default connect(undefined, mapDispatchToProps)(WelcomeScreen);