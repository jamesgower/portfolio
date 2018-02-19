import React from 'react';
import NavBar from './NavBar';
import Headroom from 'react-headroom';
import { Container } from 'reactstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Grid from './Grid';

export default class Portfolio extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="background">
				<Headroom>
					<NavBar />
				</Headroom>
				<Container className="content-container">
					<h1 className="portfolio--title">Portfolio</h1>
					<h3 className="portfolio--subtitle">Here is some </h3>
					<MuiThemeProvider>
						<Grid className="grid-container" />
					</MuiThemeProvider>
				</Container>
			</div>
		);
	}
}
