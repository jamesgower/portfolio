import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import { Redirect } from 'react-router-dom';

/*
	TODO //
	!! Find API key in portfolio and secure it 
	[ ]	Add loading page
	[ ] Make different components for Headroom Navbar and normal Navbar
	[x]	Add correct href references
 	[x]	Change subtitles and authors in grid
	[ ] Restyle blogify and adjust image to suit 
	[x] Add images to grid
	[x]	Style grid and add animations
	[ ] Add tags array to tiles object for sorting via tags.
	[x] Create different styles for the grid and text based on window size
	[x] Links in Wikipedia Component not working
	[x] Fix wrong path for fail.mp3 in Simon Component
	[x] Add font back to Pomodoro component
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
		title: 'Emaily App',
		subtitle: 'Full Stack App - Express, SendGrid, MongoDB, React, Redux, Stripe',
		href: '/portfolio/emaily',
		featured: true,
		color: 'red',
	},
	{
		img: '/images/tictactoe.jpg',
		title: 'Tic-Tac-Toe with Minimax Algorithm',
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
		img: '/images/expensify.jpg',
		title: 'Expensify App',
		subtitle: 'React, Redux, React-Router, Webpack, SASS, Jest',
		featured: true,
		href: '/portfolio/expensify',
		color: '#364051',
	},
	{
		img: '/images/twitch.jpg',
		title: 'Twitch API',
		subtitle: "React, Webpack, XHR, Twitch API & SCSS",
		featured: true,
		href: '/portfolio/twitch',
		color: 'blueviolet',
	},
	{
		img: '/images/indecision.jpg',
		title: 'Indecision App',
		subtitle: 'React, Webpack, React-Router, Local Storage',
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
		img: '/images/blogify.jpg',
		title: 'Blogify App',
		subtitle: 'React, Redux, React-Router, Webpack, SASS, Jest',
		featured: true,
		href: '/portfolio/blogify',
		color: 'blue',
	},
];

export class Grid extends React.Component {
	constructor() {
		super();

		this.state = {
			redirect: false,
			desktop: window.innerWidth > 800,
		};
	}
	//Random animation for each element in the grid
	randomAnimation() {
		const e = document.getElementById(`tile${Math.floor(Math.random() * tilesData.length)}`);
		let animations = ['bounce', 'pulse', 'swing', 'tada', 'rubberBand'];
		//Random animation gets picked
		let random = animations[Math.floor(Math.random() * animations.length)];
		e.className = 'animated ' + random + ' grid-list';
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
		let desktop = window.innerWidth > 800;
		this.setState({ desktop });
	};

	render() {
		if (this.state.redirect) {
			return <Redirect push to={this.state.route} />;
		}

		const styles = {
			root: {
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'space-around',
				overflow: 'hidden',
				marginBottom: '80px',
			},
			gridList: {
				minWidth: 'auto',
				minHeight: '100%',
				overflow: 'hidden',
			},
		};

		return (
			//GridTile are mapped from the TilesData array so each element is rendered
			<div className="grid-container" id="grid" style={styles.root}>
				<GridList
					cols={this.state.desktop ? 3 : 2}
					cellHeight={this.state.desktop ? 240 : 140}
					padding={20}
					style={styles.gridList}
				>
					{tilesData.map((tile, i) => (
						<GridTile
							id={`tile${i}`}
							key={`tile${i}`}
							className="grid-list"
							onClick={() => this.handleOnClick(tile.href)}
							title={tile.title}
							titleStyle={{
								fontSize: this.state.desktop ? '16px' : '13px'
							}}
							subtitle={tile.subtitle}
							subtitleStyle={{
								fontSize: this.state.desktop ? '13px' : '8px',
							}}
							style={{
								border: `4px solid ${tile.color}`,
							}}
							actionPosition="left"
							titlePosition="bottom"
							titleBackground={`linear-gradient(to bottom, ${tile.color} 0%, black 100%)`}
							cols={this.state.desktop ? (tile.featured ? 2 : 1) : 1}
							rows={2}
						>
							<img src={tile.img} className="grid-list" />
						</GridTile>
					))}
				</GridList>
			</div>
		);
	}
}

export default Grid;
