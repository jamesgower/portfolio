import * as React from "react";
import { Redirect } from "react-router-dom";

/*
	TODO
	[ ]	Add loading page
	[ ] Make different components for Headroom Navbar and normal Navbar
	[x] Restyle blogify and adjust image to suit
	[ ] Add tags array to tiles object for sorting via tags.
	[ ] Readme.md for all GitHub projects with relevant installation & usage info
  [x] Add sounds for games - webpack 
*/

const tilesData = [
  {
    img: require("../../public/images/emaily.jpg"),
    title: "Emaily App (Full Stack)",
    subtitle:
      "Built with Express, SendGrid, MongoDB, React, Redux, React-Router, SCSS & Webpack",
    href: "https://github.com/jamesgower/emaily",
    redirect: true,
    color: "#ea454b",
    class: "fas fa-envelope",
  },
  {
    img: require("../../public/images/clone.jpg"),
    title: "Twitter Clone",
    subtitle:
      "Built with React, Redux, Webpack, Express (Node.JS), MongoDB, React-Router",
    href: "https://github.com/jamesgower/twitter-clone",
    redirect: true,
    featured: true,
    color: "#1DA1F2",
    class: "fab fa-twitter",
  },
  {
    img: require("../../public/images/chatter.jpg"),
    title: "Chatter (Chat App)",
    subtitle:
      "Built with Socket.io, Axios, Express, Moment.js, Mustache, React & CSS",
    href: "https://github.com/jamesgower/chatter",
    featured: true,
    redirect: true,
    color: "#2E5D82",
    class: "far fa-comments",
  },
  {
    img: require("../../public/images/simon.jpg"),
    title: "Simon Says",
    subtitle: "Built with React, Redux, Webpack, React-Router",
    href: "/portfolio/simon-says",
    color: "#57C139",
    class: "fas fa-trophy",
  },
  {
    img: require("../../public/images/pomodoro.jpg"),
    title: "Pomodoro Clock",
    subtitle: "Built with React, Pure JS, jQuery, Babel",
    href: "/portfolio/pomodoro",
    color: "#303030",
    class: "far fa-clock",
  },
  {
    img: require("../../public/images/tictactoe.jpg"),
    title: "Tic-Tac-Toe with AI",
    subtitle: "Built with React, SCSS, Pure JS, Babel",
    featured: true,
    href: "/portfolio/tic-tac-toe",
    color: "#c1b9a8",
    class: "fas fa-gamepad",
  },
  {
    img: require("../../public/images/blogify.jpg"),
    title: "Blogify App",
    subtitle: "Built with React, Redux, React-Router, Webpack",
    featured: true,
    href: "https://github.com/jamesgower/blogify",
    redirect: true,
    color: "#2655A5",
    class: "fas fa-pencil-alt",
  },
  {
    img: require("../../public/images/wiki.jpg"),
    title: "Wikipedia API",
    subtitle: "Built with TypeScript, Fetch API & React",
    href: "/portfolio/wikipedia",
    color: "#0114E4",
    class: "fab fa-wikipedia-w",
  },
  {
    img: require("../../public/images/indecision.jpg"),
    title: "Indecision App",
    subtitle: "Built with React, SCSS & Local Storage",
    href: "/portfolio/indecision-app",
    color: "#8359CE",
    class: "fas fa-question",
  },
  {
    img: require("../../public/images/twitch.jpg"),
    title: "Twitch API",
    subtitle: "Built with React, TypeScript, Fetch API & Twitch API",
    href: "/portfolio/twitch",
    color: "blueviolet",
    class: "fab fa-twitch",
    featured: true,
  },
  {
    img: require("../../public/images/expensify.jpg"),
    title: "Expensify App",
    subtitle: "Built with React, Redux, FireBase & Jest",
    href: "https://github.com/jamesgower/expensify",
    redirect: true,
    color: "#364051",
    class: "far fa-money-bill-alt",
    featured: true,
  },
  {
    img: require("../../public/images/drum.jpg"),
    title: "Drum Machine",
    subtitle: "Built with React, Vanilla JS, Howler & SCSS",
    href: "/portfolio/drum-machine",
    color: "#c6c6c6",
    class: "fas fa-headphones",
  },
];

interface GridState {
  redirect: boolean;
  desktop: boolean;
  data: string;
  route?: string;
}

const initialState: GridState = {
  redirect: false,
  desktop: window.innerWidth > 768,
  data: "all",
};

export class Grid extends React.Component {
  public readonly state = initialState;

  private allData = tilesData.map(
    (tile, i): JSX.Element => {
      return (
        <div
          className={
            tile.featured
              ? "gridTile col-md-7 col-6"
              : "gridTile col-md-5 col-6"
          }
          key={i}
        >
          <div
            id={`tile${i}`}
            style={{
              background: tile.color,
            }}
            role="button"
            tabIndex={0}
            className="border"
            onClick={
              tile.redirect
                ? (): string => (location.href = tile.href)
                : (): void => this.handleOnClick(tile.href)
            }
          >
            <img src={tile.img} alt={tile.title} className="animated" />
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
    },
  );

  public componentDidMount = (): void => {
    this.animations = setInterval((): void => {
      this.randomAnimation();
    }, 8000);
    document.getElementById("grid").className = "animated fadeIn";
  };

  public componentWillUnmount = (): void => {
    clearInterval(this.animations);
  };

  //Random animation for each element in the grid
  private randomAnimation = (): void => {
    const e = document.getElementById(
      `tile${Math.floor(Math.random() * tilesData.length)}`,
    );
    const previous = e.className;
    const animations = ["bounce", "pulse", "swing", "tada", "rubberBand"];
    //Random animation gets picked
    const random = ` animated ${
      animations[Math.floor(Math.random() * animations.length)]
    }`;
    e.className += random;
    setTimeout((): void => {
      e.className = previous;
    }, 1000);
  };

  private handleOnClick = (route: string): void => {
    this.setState({ route, redirect: true });
  };

  public animations;

  public render(): JSX.Element {
    const { redirect, route, data } = this.state;
    if (redirect) {
      return <Redirect push to={route} />;
    }

    return (
      <div
        id="grid"
        className="container"
        style={{
          paddingBottom: "40px",
          margin: "0 20px",
        }}
      >
        <div className="row">{data === "all" && this.allData}</div>
      </div>
    );
  }
}

export default Grid;
