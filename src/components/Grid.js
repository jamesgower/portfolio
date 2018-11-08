import React from "react";
import { Redirect } from "react-router-dom";

/*
	!! TODO
	[ ]	Add loading page
	[ ] Make different components for Headroom Navbar and normal Navbar
	[x] Restyle blogify and adjust image to suit
	[ ] Add tags array to tiles object for sorting via tags.
	[ ] Readme.md for all GitHub projects with relevant installation & usage info
    [ ] Post bug for Grid in Materialize UI GitHub issues.
    [ ] Add sounds for games ??
*/

const tilesData = [
    {
        img: "/images/emaily.jpg",
        title: "Emaily App (Full Stack)",
        subtitle:
            "Built with Express, SendGrid, MongoDB, React, Redux, React-Router, SASS & Redux-" +
            "Form",
        href: "https://github.com/jamesgower/emaily",
        redirect: true,
        color: "#ea454b",
        class: "fas fa-envelope",
    },
    {
        img: "/images/clone.jpg",
        title: "Twitter Clone",
        subtitle: "Built with React, Redux, Webpack, Express (Node.js), MongoDB, React-Router",
        href: "https://github.com/jamesgower/twitter-clone",
        redirect: true,
        featured: true,
        color: "#1DA1F2",
        class: "fab fa-twitter",
    },
    {
        img: "/images/chatter.jpg",
        title: "Chatter (Chat App)",
        subtitle: "Built with Socket.io, Axios, Express, Moment.js, Mustache, React & CSS",
        href: "https://github.com/jamesgower/chatter",
        featured: true,
        redirect: true,
        color: "#2E5D82",
        class: "far fa-comments",
    },
    {
        img: "/images/simon.jpg",
        title: "Simon Says",
        subtitle: "Built with React, Redux, Webpack, React-Router",
        href: "/portfolio/simon-says",
        color: "#57C139",
        class: "fas fa-trophy",
    },
    {
        img: "/images/pomodoro.jpg",
        title: "Pomodoro Clock",
        subtitle: "Built with React, Pure JS, jQuery, Babel",
        href: "/portfolio/pomodoro",
        color: "#303030",
        class: "far fa-clock",
    },
    {
        img: "/images/tictactoe.jpg",
        title: "Tic-Tac-Toe with AI",
        subtitle: "Built with React, SASS, Pure JS, Babel",
        featured: true,
        href: "/portfolio/tic-tac-toe",
        color: "#c1b9a8",
        class: "fas fa-gamepad",
    },
    {
        img: "/images/blogify.jpg",
        title: "Blogify App",
        subtitle: "Built with React, Redux, React-Router, Webpack",
        featured: true,
        href: "https://github.com/jamesgower/blogify",
        redirect: true,
        color: "#2655A5",
        class: "fas fa-pencil-alt",
    },
    {
        img: "/images/wiki.jpg",
        title: "Wikipedia API",
        subtitle: "Built with jQuery, AJAX, Pure JS, React",
        href: "/portfolio/wikipedia",
        color: "#0114E4",
        class: "fab fa-wikipedia-w",
    },
    {
        img: "/images/indecision.jpg",
        title: "Indecision App",
        subtitle: "Built with React, Webpack, SASS & Local Storage",
        href: "/portfolio/indecision-app",
        color: "#8359CE",
        class: "fas fa-question",
    },
    {
        img: "/images/twitch.jpg",
        title: "Twitch API",
        subtitle: "Built with React, Webpack, Fetch API & Twitch API",
        href: "/portfolio/twitch",
        color: "blueviolet",
        class: "fab fa-twitch",
        featured: true,
    },
    {
        img: "/images/expensify.jpg",
        title: "Expensify App",
        subtitle: "Built with React, Redux, FireBase, Webpack & Jest",
        href: "https://github.com/jamesgower/expensify",
        redirect: true,
        color: "#364051",
        class: "far fa-money-bill-alt",
        featured: true,
    },
    // {
    //     img: "/images/calculator.jpg",
    //     title: "Calculator",
    //     subtitle: "Built with React, SASS & Pure JS",
    //     href: "/portfolio/calculator",
    //     color: "#00d6ae",
    //     class: "fas fa-calculator",
    // },
    {
        img: "/images/drum.jpg",
        title: "Drum Machine",
        subtitle: "Built with React, Vanilla JS, Howler & CSS",
        href: "/portfolio/drum-machine",
        color: "#c6c6c6",
        class: "fas fa-headphones",
    },
];

export class Grid extends React.Component {
    constructor() {
        super();

        this.state = {
            redirect: false,
            desktop: window.innerWidth > 768,
            data: "all",
        };
    }
    //Random animation for each element in the grid
    randomAnimation() {
        const e = document.getElementById(`tile${Math.floor(Math.random() * tilesData.length)}`);
        const previous = e.className;
        let animations = ["bounce", "pulse", "swing", "tada", "rubberBand"];
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
        document.getElementById("grid").className = "animated fadeIn";
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    };

    componentWillUnmount = () => {
        clearInterval(this.animations);
        window.removeEventListener("resize", this.updateWindowDimensions);
    };

    handleOnClick = route => {
        this.setState({ route, redirect: true });
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
                    className={
                        tile.featured ? `gridTile col-md-7 col-6` : `gridTile col-md-5 col-6`
                    }
                    key={i}
                >
                    <div
                        id={`tile${i}`}
                        style={{
                            background: tile.color,
                        }}
                        className="border"
                        onClick={
                            tile.redirect
                                ? () => (location.href = tile.href)
                                : () => this.handleOnClick(tile.href)
                        }
                    >
                        <img src={tile.img} className="animated" />
                        <i
                            className={`${tile.class}`}
                            style={{
                                color: tile.color,
                            }}
                        />
                        <p className="tile--title">{tile.title}</p>
                        <p className="tile--subtitle">{tile.subtitle}</p>
                    </div>
                </div>
            );
        });
        return (
            <div
                id="grid"
                className="container"
                style={{
                    paddingBottom: "40px",
                    margin: "0 20px",
                }}
            >
                <div className="row">{this.state.data === "all" && allData}</div>
            </div>
        );
    }
}

export default Grid;
