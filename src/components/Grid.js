import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { Link, Redirect } from 'react-router-dom';
import LoadingPage from './LoadingPage';
const styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
	},
	gridList: {
		minWidth: 'auto',
		minHeight: '100%',
		overflow: 'hidden',
	},
};

const tilesData = [
	{
		img: '/images/pomodoro.jpg',
		title: 'Pomodoro Clock',
		subtitle: 'Built with JavaScript & CSS',
		href: '/portfolio/pomodoro',
	},
	{
		img: '/images/blogify.png',
		title: 'Blogify App',
		subtitle: 'Built in React 16, Redux, Webpack, SASS & Babel',
		featured: true,
		href: '/portfolio/blogify',
	},
	{
		img: '/images/tictactoe.jpg',
		title: 'Tic-Tac-Toe with Minimax Alogorthm',
		author: 'pashminu',
		featured: true,
		href: '/portfolio/tic-tac-toe',
	},
	{
		img: '/images/calculator.jpg',
		title: 'Calculator',
		author: '',
		href: '/portfolio/calculator',
	},
	{
		img: '/images/wiki.jpg',
		title: 'Wikipedia API',
		author: 'fancycravel',
		href: '/portfolio/wikipedia',
	},
	{
		img: '/images/expensify.png',
		title: 'Expensify App',
		author: 'pashminu',
		featured: true,
		href: '/portfolio/expensify',
	},
];

export class Grid extends React.Component {


	//Random animation for each element in the grid
	randomAnimation() {
		const e = document.getElementById(`tile${Math.floor(Math.random() * tilesData.length)}`);
		let animations = ['bounce', 'pulse', 'swing', 'tada'];
		//Random animation gets picked
		let random = animations[Math.floor(Math.random() * animations.length)];
		e.className = 'animated ' + random + ' grid';
	}

	componentDidMount = () => {
		this.animations = setInterval(() => {
			this.randomAnimation();
		}, 8000);
	}

	componentWillUnmount = () => {
		clearInterval(this.animations);
	}

	render() {
		//RandomAnimation function gets called every 8 seconds to animate a random element in the Grid.

		return (
			//GridTile are mapped from the TilesData array so each element is rendered
			<div className="grid-container" style={styles.root}>
				<GridList cols={3} cellHeight={240} padding={20} style={styles.gridList}>
					{tilesData.map((tile, i) => (
						<GridTile
							id={`tile${i}`}
							key={`tile${i}`}
							className="grid-box"
							href={tile.href}
							target="_blank"
							title={tile.title}
							actionIcon={
								<Link to={tile.href}>
									<IconButton>
										<StarBorder color="white"/>
									</IconButton>
								</Link>
							}
							actionPosition="left"
							titlePosition="bottom"
							titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
							cols={tile.featured ? 2 : 1}
							rows={2}
						>
							<img src={tile.img} className="grid-item" />
						</GridTile>
					))}
				</GridList>
			</div>
		);
	}
}

export default Grid;
