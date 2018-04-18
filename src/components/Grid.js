import React from 'react';
import { Redirect } from 'react-router-dom';

/*
	!! TODO
	? Find API key in portfolio and secure it -- possibly in other file
	[ ]	Add loading page
	[ ] Make different components for Headroom Navbar and normal Navbar
	[x] Restyle blogify and adjust image to suit 
	[ ] Add tags array to tiles object for sorting via tags.
	[ ] Readme.md for all GitHub projects with relevant installation & usage info
	[ ] Post bug for Grid in Materialize UI GitHub issues.
*/

const tilesData = [
	{
		img: '/images/simon.jpg',
		title: 'Simon Says',
		subtitle: 'React, Webpack, React-Router',
		href: '/portfolio/simon-says',
		color: 'yellow',
	},
	{
		img: '/images/emaily.jpg',
		title: 'Emaily App (Full Stack)',
		subtitle: 'Express, SendGrid, MongoDB, React, Redux',
		href: '/portfolio/emaily',
		featured: true,
		color: 'red',
	},
	{
		img: '/images/tictactoe.jpg',
		title: 'Tic-Tac-Toe with AI',
		subtitle: 'React, SASS, Pure JS, Babel',
		featured: true,
		href: '/portfolio/tic-tac-toe',
		color: 'green',
	},
	{
		img: '/images/pomodoro.jpg',
		title: 'Pomodoro Clock',
		subtitle: 'React, Pure JS, jQuery, Babel',
		href: '/portfolio/pomodoro',
		color: '#303030',
	},
	{
		img: '/images/wiki.jpg',
		title: 'Wikipedia API',
		subtitle: 'jQuery, AJAX, Pure JS, React',
		href: '/portfolio/wikipedia',
		color: 'blue',
	},
	{
		img: '/images/blogify.jpg',
		title: 'Blogify App',
		subtitle: 'React, Redux, React-Router, Webpack',
		featured: true,
		href: '/portfolio/blogify',
		color: '#2655A5',
	},
	{
		img: '/images/twitch.jpg',
		title: 'Twitch API',
		subtitle: 'React, Webpack, Fetch API, Twitch API',
		featured: true,
		href: '/portfolio/twitch',
		color: 'blueviolet',
	},
	{
		img: '/images/indecision.jpg',
		title: 'Indecision App',
		subtitle: 'React, Webpack, SASS, LocalStorage',
		href: '/portfolio/indecision-app',
		color: 'darkblue',
	},
	{
		img: '/images/calculator.jpg',
		title: 'Calculator',
		subtitle: 'React, SASS, Pure JS',
		href: '/portfolio/calculator',
		color: 'turquoise',
	},
	{
		img: '/images/expensify.jpg',
		title: 'Expensify App',
		subtitle: 'React, Redux, React-Router, Webpack, Jest',
		featured: true,
		href: '/portfolio/expensify',
		color: '#364051',
	},
];

export class Grid extends React.Component {
	constructor() {
		super();

		this.state = {
			redirect: false,
			desktop: window.innerWidth > 768,
			data: 'all'
		};
	}
	//Random animation for each element in the grid
	randomAnimation() {
		const e = document.getElementById(`tile${Math.floor(Math.random() * tilesData.length)}`);
		const previous = e.className;
		let animations = ['bounce', 'pulse', 'swing', 'tada', 'rubberBand'];
		//Random animation gets picked
		let random = ` animated ${animations[Math.floor(Math.random() * animations.length)]}`;
		e.className += random;
		setTimeout(() => {
			e.className = previous;
		}, 1000);
	}

	componentDidMount = () => {
		this.animations = setInterval(() => {
			this.randomAnimation();
		}, 8000);
		document.getElementById('grid').className = 'animated fadeIn';
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	};

	componentWillUnmount = () => {
		clearInterval(this.animations);
		window.removeEventListener('resize', this.updateWindowDimensions);
	};

	handleOnClick = route => {
		this.setState({
			route,
			redirect: true,
		});
	};

	updateWindowDimensions = () => {
		let desktop = window.innerWidth > 768;
		this.setState({ desktop });
	};

	render() {
		if (this.state.redirect) {
			return <Redirect push to={this.state.route} />;
		}

		const allData = tilesData.map((tile, i) => {
			return (
				<div
					className={tile.featured ? 'gridTile col-md-7 col-6' : 'gridTile col-md-5 col-6'}
					id={`tile${i}`}
					key={i}
					style={{ border: `4px solid ${tile.color}` }}
					onClick={() => this.handleOnClick(tile.href)}
				>
					<img src={tile.img} />
					<div
						className="tile-information"
						style={{ background: `linear-gradient(to bottom, ${tile.color} 0%, black 100%)` }}
					>
						<p className="tile--title">{tile.title}</p>
						<p className="tile--subtitle">{tile.subtitle}</p>
					</div>
				</div>
			);
		});

		return (
			//GridTile are mapped from the TilesData array so each element is rendered
			<div id="grid" className="container" style={{ paddingBottom: '40px', margin: '0 20px' }}>
				<div className="row">{this.state.data === 'all' && allData}</div>
			</div>
		);
	}
}

export default Grid;
