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
					<h3 className="portfolio--subtitle">Here is some of the work which I have completed in my path to becoming a web developer. Most of the projects below are built in with React, however I am currently learning Node.JS, Angular5 and Vue.JS, so expect projects from these technologies soon. </h3>
					<h3 className="portfolio--subtitle">Each project can be viewed by clicking on the image, along with source code which can be found on my GitHub page <a href="" target="_blank">here</a></h3>
					<MuiThemeProvider>
						<Grid {...this.state} />
					</MuiThemeProvider>
				</Container>
			</div>
		);
	}
}
