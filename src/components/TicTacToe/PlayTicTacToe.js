import React from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import TicTacToe from './components/TicTacToe';
import { connect } from 'react-redux';

class PlayTicTacToe extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{this.props.player.noPlayers === 0 && <WelcomeScreen />}
				{this.props.player.noPlayers > 0 && <TicTacToe />}
			</div>
			// NEED TO SORT MAPPING OUT FOR TILES AND CONTINUE FROM THERE
		);
	}
}

const mapStateToProps = state => {
	return {
		player: state.player,
	};
};

export default connect(mapStateToProps)(PlayTicTacToe);
