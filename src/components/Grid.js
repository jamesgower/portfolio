import React from 'react';
import {Redirect} from 'react-router-dom';

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
        title: 'Simon Says with Unbeatable AI',
        subtitle: 'React, Webpack, React-Router',
        href: '/portfolio/simon-says',
        color: '#57C139',
        class: 'fas fa-trophy',
    }, {
        img: '/images/emaily.jpg',
        title: 'Emaily App (Full Stack)',
        subtitle: 'Built with Express, SendGrid, MongoDB, React, Redux, React-Router, SASS & Redux-Form',
        href: '/portfolio/emaily',
        featured: true,
        color: '#ea454b',
        class: 'fas fa-envelope'
    }, {
        img: '/images/chatter.jpg',
        title: 'Chatter (Chat App)',
        subtitle: 'Built with Socket.io, Axios, Express, Moment.js, Mustache, React, Reactstrap, React-Router & CSS',
        href: '/portfolio/chatter',
        featured: true,
        color: '#2E5D82',
        class: 'far fa-comments'
    }, {
        img: '/images/emaily.jpg',
        title: 'Emaily App (Full Stack)',
        subtitle: 'Express, SendGrid, MongoDB, React, Redux',
        href: '/portfolio/emaily',
        color: '#2E5D82',
        class: 'fas fa-envelope'
    }, {
        img: '/images/tictactoe.jpg',
        title: 'Tic-Tac-Toe with AI',
        subtitle: 'React, SASS, Pure JS, Babel',
        href: '/portfolio/tic-tac-toe',
        color: '#c1b9a8',
        class: 'fas fa-gamepad'
    }, {
        img: '/images/pomodoro.jpg',
        title: 'Pomodoro Clock',
        featured: true,
        subtitle: 'React, Pure JS, jQuery, Babel',
        href: '/portfolio/pomodoro',
        color: '#303030',
        class: 'far fa-clock'
    }, {
        img: '/images/blogify.jpg',
        title: 'Blogify App',
        subtitle: 'React, Redux, React-Router, Webpack',
        featured: true,
        href: '/portfolio/blogify',
        color: '#2655A5',
        class: "fas fa-pencil-alt"
    }, {
        img: '/images/wiki.jpg',
        title: 'Wikipedia API',
        subtitle: 'jQuery, AJAX, Pure JS, React',
        href: '/portfolio/wikipedia',
        color: '#0114E4',
        class: "fab fa-wikipedia-w"
    }, {
        img: '/images/twitch.jpg',
        title: 'Twitch API',
        subtitle: 'React, Webpack, Fetch API, Twitch API',
        href: '/portfolio/twitch',
        color: 'blueviolet',
        class: 'fab fa-twitch'
    }, {
        img: '/images/indecision.jpg',
        title: 'Indecision App',
        subtitle: 'React, Webpack, SASS, LocalStorage',
        featured: true,
        href: '/portfolio/indecision-app',
        color: 'blueviolet',
        class: 'fas fa-question'
    }, {
        img: '/images/calculator.jpg',
        title: 'Calculator',
        subtitle: 'React, SASS, Pure JS',
        href: '/portfolio/calculator',
        featured: true,
        color: '#364051',
        class: 'fas fa-calculator'
    }, {
        img: '/images/expensify.jpg',
        title: 'Expensify App',
        subtitle: 'React, Redux, FireBase, Webpack, Jest',
        href: '/portfolio/expensify',
        color: '#364051',
        class: 'far fa-money-bill-alt'
    }
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
        document
            .getElementById('grid')
            .className = 'animated fadeIn';
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    };

    componentWillUnmount = () => {
        clearInterval(this.animations);
        window.removeEventListener('resize', this.updateWindowDimensions);
    };

    handleOnClick = route => {
        this.setState({route, redirect: true});
    };

    updateWindowDimensions = () => {
        let desktop = window.innerWidth > 768;
        this.setState({desktop});
    };

    render() {
        if (this.state.redirect) {
            return <Redirect push to={this.state.route}/>;
        }

        const allData = tilesData.map((tile, i) => {
            return (
                <div
                    className={tile.featured
                        ? `gridTile col-md-7 col-6`
                        : `gridTile col-md-5 col-6`
                    }
                    key={i}                    
                >
                    <div
                        id={`tile${i}`}
                        style={{
                            background: tile.color,
                        }}
                        className="border"
                        onClick={() => this.handleOnClick(tile.href)}
                    >
                            <img src={tile.img} className="animated"/>
                            <i
                                className={`${tile.class}`}
                                style={{
                                color: tile.color
                            }}/>
                            <div
                                className="tile-information"
                            >
                                <p className="tile--title">{tile.title}</p>
                                <p className="tile--subtitle">{tile.subtitle}</p>
                            </div>
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
