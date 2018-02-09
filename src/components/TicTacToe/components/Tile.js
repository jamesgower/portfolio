import React from 'react';

export default class Tile extends React.Component {
	render() {
		return <div className="tile">{this.props.value}</div>;
	}
}
