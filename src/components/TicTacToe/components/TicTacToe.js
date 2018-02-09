import React from 'react';
import { connect } from 'react-redux';
import Tile from './Tile';

export class TicTacToe extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const Grid = () => (
			<div className={`grid-${this.props.board.boardSize}`}>
				{this.props.tiles.map((value, tile) => <Tile key={tile} state={value} />)}
			</div>
		);

		return <Grid />;
	}
}

const mapStateToProps = state => {
	return {
		player: state.player,
		tiles: state.board.tiles,
		board: state.board,
	};
};
export default connect(mapStateToProps)(TicTacToe);
