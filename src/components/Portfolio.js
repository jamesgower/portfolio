import React from 'react';
import NavBar from './NavBar';
import Headroom from 'react-headroom';
import { Container } from 'reactstrap';
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
					<p className="blog-text" style={{ marginTop: '20px' }}>
						Here are a selection of some of the projects I have completed during my software engineering
						career so far, I mainly use front-end JavaScript frameworks such as React, Vue.js and Angular to
						build projects; however I am also able to build back-end servers/API's in Node.JS or Java if it
						is necessary.
					</p>
					<p className="blog-text" style={{ marginBottom: '20px' }}>
						All web development projects are fully responsive for desktops, tablets and phones by using CSS
						flexbox, or alternatively CSS frameworks such as Materialize-CSS or Bootstrap 4 to make a sleek
						and user friendly interface. I am always open to learning new frameworks or styles for any
						project I undertake. All projects' source code can be found on my GitHub page, including this
						portfolio <a href="https://www.github.com/jamesgower">here</a>.
					</p>
					<Grid />
				</Container>
			</div>
		);
	}
}
