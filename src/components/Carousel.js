import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';

class CarouselPortfolio extends Component {
	render() {
		return (
			<Carousel autoPlay infiniteLoop showThumbs={false}>
				<div>
					<img src='./images/expensify.png'/>
					<p className="legend">Expensify App - Build with React 16 & Redux</p>
				</div>
				<div>
					<img src="./images/expensify.png" />
					<p className="legend">Legend 2</p>
				</div>
				<div>
					<img src="./images/expensify.png" />
					<p className="legend">Legend 3</p>
				</div>
			</Carousel>
		);
	}
}
export default CarouselPortfolio;