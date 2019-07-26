import React from "react";
import { Redirect } from "react-router-dom";
import Modal from "react-modal";
import Calculator from "../../calculator/components/Calculator";
import emailyImage from "../images/emaily.jpg";
import twitterImage from "../images/clone.jpg";
import chatterImage from "../images/chatter.jpg";
import simonImage from "../images/simon.jpg";
import pomodoroImage from "../images/pomodoro.jpg";
import ticTacToeImage from "../images/tictactoe.jpg";
import blogifyImage from "../images/blogify.jpg";
import wikipediaImage from "../images/wiki.jpg";
import indecisionImage from "../images/indecision.jpg";
import twitchImage from "../images/twitch.jpg";
import expensifyImage from "../images/expensify.jpg";
import drumImage from "../images/drum.jpg";
import calculatorImage from "../images/calculator.jpg";
import portfolioImage from "../images/portfolio.jpg";
import GridState from "../interfaces/grid.i";
/*
	TODO
	[ ]	Add loading page
  [ ] Readme.md for all GitHub projects with relevant installation & usage info
  [ ] Add imgBot back to compress images.
  [ ] Finish styling all components for mobile
  [ ] Add HiddenNavBar to Twitch component
*/

export class Grid extends React.Component<{}, GridState> {
  public readonly state: GridState = {
    redirect: false,
    isOpen: false,
  };

  public animations: number;

  private customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "20px 40px",
    },
  };

  private tilesData = [
    {
      img: emailyImage,
      title: "Emaily App (Full Stack)",
      subtitle:
        "Built with Express, SendGrid, MongoDB, React, Redux, React-Router, SCSS & Webpack",
      href: "https://github.com/jamesgower/emaily",
      redirect: true,
      color: "#ea454b",
      class: "fas fa-envelope",
    },
    {
      img: twitterImage,
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
      img: chatterImage,
      title: "Chatter (Chat App)",
      subtitle: "Built with Socket.io, Axios, Express, Moment.js, React & SCSS",
      href: "https://github.com/jamesgower/chatter",
      featured: true,
      redirect: true,
      color: "#2E5D82",
      class: "far fa-comments",
    },
    {
      img: simonImage,
      title: "Simon Says",
      subtitle: "Built with React, TypeScript, SCSS & Howler",
      href: "/portfolio/simon-says",
      color: "#57C139",
      class: "fas fa-trophy",
    },
    {
      img: pomodoroImage,
      title: "Pomodoro Clock",
      subtitle: "Built with React, TypeScript & SCSS",
      href: "/portfolio/pomodoro",
      color: "#303030",
      class: "far fa-clock",
    },
    {
      img: ticTacToeImage,
      title: "Tic-Tac-Toe with AI",
      subtitle: "Built with React, Redux (with Hooks!), TypeScript & SCSS",
      featured: true,
      href: "/portfolio/tic-tac-toe",
      color: "#999285",
      class: "fas fa-gamepad",
    },
    {
      img: blogifyImage,
      title: "Blogify App",
      subtitle: "Built with React, Redux, React-Router, Webpack",
      featured: true,
      href: "https://github.com/jamesgower/blogify",
      redirect: true,
      color: "#2655A5",
      class: "fas fa-pencil-alt",
    },
    {
      img: wikipediaImage,
      title: "Wikipedia API",
      subtitle: "Built with TypeScript, Fetch API & React",
      href: "/portfolio/wikipedia",
      color: "#0114E4",
      class: "fab fa-wikipedia-w",
    },
    {
      img: indecisionImage,
      title: "Indecision App",
      subtitle: "Built with React, TypeScript SCSS & Local Storage",
      href: "/portfolio/indecision-app",
      color: "#8359CE",
      class: "fas fa-question",
    },
    {
      img: twitchImage,
      title: "Twitch API",
      subtitle: "Built with React, TypeScript, Fetch API & Twitch API",
      href: "/portfolio/twitch",
      color: "#7c30ff",
      class: "fab fa-twitch",
      featured: true,
    },
    {
      img: expensifyImage,
      title: "Expensify App",
      subtitle: "Built with React, Redux, FireBase & Jest",
      href: "https://github.com/jamesgower/expensify",
      redirect: true,
      color: "#364051",
      class: "far fa-money-bill-alt",
      featured: true,
    },
    {
      img: drumImage,
      title: "Drum Machine",
      subtitle: "Built with React, TypeScript, Howler & SCSS",
      href: "/portfolio/drum-machine",
      color: "#c6c6c6",
      class: "fas fa-headphones",
    },
    {
      img: calculatorImage,
      title: "Calculator",
      subtitle: "Built with ReactModal, TypeScript, SCSS & Math.JS",
      color: "#00d397",
      class: "fas fa-calculator",
      click: (): void => this.setState({ isOpen: true }),
    },
    {
      img: portfolioImage,
      title: "Personal Portfolio",
      subtitle: "Built with React, TypeScript, Redux & Jest",
      href: "https://github.com/jamesgower/portfolio",
      redirect: true,
      color: "#343746",
      class: "fas fa-laptop-code",
      featured: true,
    },
  ];

  public componentDidMount = (): void => {
    this.animations = window.setInterval((): void => {
      this.randomAnimation();
    }, 8000);
    document.getElementById("grid").className = "animated fadeIn";
  };

  public componentWillUnmount = (): void => {
    clearInterval(this.animations);
  };

  // Random animation for each element in the grid
  private randomAnimation = (): void => {
    const e = document.getElementById(
      `tile${Math.floor(Math.random() * this.tilesData.length)}`,
    );
    const previous = e.className;
    const animations = ["bounce", "pulse", "swing", "tada", "rubberBand"];
    // Random animation gets picked
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

  public render(): JSX.Element {
    const { redirect, route } = this.state;
    if (redirect) {
      return <Redirect push to={route} />;
    }
    const { isOpen } = this.state;
    return (
      <>
        <Modal
          isOpen={isOpen}
          onRequestClose={(): void => this.setState({ isOpen: false })}
          style={this.customStyles}
          contentLabel="Calculator"
        >
          <Calculator />
        </Modal>
        <div
          id="grid"
          className="container"
          style={{
            paddingBottom: "40px",
            margin: "0 20px",
          }}
        >
          <div className="row">
            {this.tilesData.map(
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
                        tile.click
                          ? tile.click
                          : tile.redirect
                          ? (): void => {
                              location.href = tile.href;
                            }
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
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Grid;
