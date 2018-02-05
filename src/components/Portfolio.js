import React from 'react';
import NavBar from './NavBar';
import Headroom from 'react-headroom';
import Carousel from './Carousel';
import { Container, Row, Col } from 'reactstrap';

export default class Portfolio extends React.Component {
	render() {
		return (
			<div>
				<Headroom>
					<div className="nav-container">
						<NavBar />
					</div>
				</Headroom>
				<Container className="content-container">
					<h1 className="portfolio--title">Portfolio</h1>
					<h4 className="portfolio--subtitle">test tagline</h4>
					<Row>
						<Col sm="12" md="6">
							<h3 className="text-center">Latest Projects</h3>
							<p>
								Here are a few of my latest projects. I am currently exploring React and Redux, which is
								what most of these projects are built in. I am also undertaking a course to learn
								vue.js, so expect to see projects built
							</p>
							<div className="carousel-container">
								<Carousel />
							</div>
						</Col>
						<Col md="4" />
					</Row>
				</Container>
				<div className="left-container">
					<div className="content-container" />
				</div>
			</div>
		);
	}
}
