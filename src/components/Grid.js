import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import { Redirect } from 'react-router-dom';

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

/*
	TODO
 	[x]	Change subtitles and authors in grid
 	[x]	Add correct href references
 	[ ]	Add loading page
	[ ] Restyle blogify and adjust image to suit 
	[x] Add images to grid
	[x]	Style grid and add animations
	[ ] Add tags array to tiles object for sorting via tags.
	[ ] Create different styles for the grid and text based on window size
*/

const tilesData = [
	{
		img: '/images/pomodoro.jpg',
		title: 'Pomodoro Clock',
		subtitle: 'Built with React, Pure JavaScript, jQuery, Babel & CSS',
		href: '/portfolio/pomodoro',
	},
	{
		img: '/images/blogify.jpg',
		title: 'Blogify App',
		subtitle: 'Built in React 16, Redux, React-Router, Webpack, SASS & Jest',
		featured: true,
		href: '/portfolio/blogify',
	},
	{
		img: '/images/tictactoe.jpg',
		title: 'Tic-Tac-Toe with Minimax Algorithm',
		subtitle: 'Built in React 16, SASS & Babel',
		featured: true,
		href: '/portfolio/tic-tac-toe',
	},
	{
		img: '/images/calculator.jpg',
		title: 'Calculator',
		subtitle: 'Built in React 16, SASS & Babel',
		href: '/portfolio/calculator',
	},
	{
		img: '/images/wiki.jpg',
		title: 'Wikipedia API',
		subtitle: 'Built with jQuery, AJAX and pure JavaScript',
		href: '/portfolio/wikipedia',
	},
	{
		img: '/images/expensify.jpg',
		title: 'Expensify App',
		subtitle: 'Built in React 16, Redux, React-Router, Webpack, SASS & Jest',
		featured: true,
		href: '/portfolio/expensify',
	},
	{
		img: '/images/twitch.jpg',
		title: 'Twitch API',
		subtitle: "Build with React, Webpack, Twitch's API & SCSS",
		href: '/portfolio/twitch',
	},
	{
		img: '/images/simon.jpg',
		title: 'Simon Says Game',
		subtitle: "Build with React, Webpack, & SCSS",
		href: '/portfolio/simon',
	},
	{
		img: '/images/indecision.jpg',
		title: 'Indecision App',
		subtitle: 'Build with React, Webpack & React-Router',
		href: '/portfolio/indecision-app',
	},
];

export class Grid extends React.Component {
	constructor() {
		super();

		this.state = {
			redirect: false,
		};
	}
	//Random animation for each element in the grid
	randomAnimation() {
		const e = document.getElementById(`tile${Math.floor(Math.random() * tilesData.length)}`);
		let animations = ['bounce', 'pulse', 'swing', 'tada', 'flash', 'rubberBand'];
		//Random animation gets picked
		let random = animations[Math.floor(Math.random() * animations.length)];
		e.className = 'animated ' + random + ' grid-list';
	}

	componentDidMount = () => {
		this.animations = setInterval(() => {
			this.randomAnimation();
		}, 8000);
		document.getElementById('grid').className = 'animated fadeIn';
	};

	componentWillUnmount = () => {
		clearInterval(this.animations);
	};

	handleOnClick = route => {
		if (route === '/portfolio/expensify') {
			window.open('https://react-expenify-app.herokuapp.com/');
		} else if (route === '/portfolio/blogify') {
			window.open('https://blogify-react.herokuapp.com/');
		} else {
			this.setState({
				route,
				redirect: true,
			});
		}
	};

	render() {
		if (this.state.redirect) {
			return <Redirect push to={this.state.route} />;
		}
		return (
			//GridTile are mapped from the TilesData array so each element is rendered
			<div className="grid-container" id="grid" style={styles.root}>
				<GridList cols={3} cellHeight={240} padding={20} style={styles.gridList}>
					{tilesData.map((tile, i) => (
						<GridTile
							id={`tile${i}`}
							key={`tile${i}`}
							className="grid-list"
							onClick={() => {
								this.handleOnClick(tile.href);
							}}
							title={tile.title}
							subtitle={tile.subtitle}
							actionPosition="left"
							titlePosition="bottom"
							titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
							cols={tile.featured ? 2 : 1}
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
