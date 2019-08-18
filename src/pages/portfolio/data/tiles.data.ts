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

export default [
  {
    img: emailyImage,
    title: "Emaily App (Full Stack)",
    subtitle:
      "Built with Express, SendGrid, MongoDB, React, Redux, React-Router, SCSS & Webpack",
    href: "https://github.com/jamesgower/emaily",
    redirect: true,
    color: "#ea454b",
    class: "fas fa-envelope",
    sourceCode: "https://github.com/jamesgower/emaily",
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
    buttonColor: "light",
    class: "fab fa-twitter",
    sourceCode: "https://github.com/jamesgower/twitter-clone",
  },
  {
    img: chatterImage,
    title: "Chatter (Chat App)",
    subtitle: "Built with TypeScript, Socket.io, Axios, Express, React, Redux & SCSS",
    href: "/chatter",
    featured: true,
    redirect: true,
    color: "#2E5D82",
    class: "far fa-comments",
    sourceCode: "https://github.com/jamesgower/portfolio/tree/prod/src/pages/chatter",
  },
  {
    img: simonImage,
    title: "Simon Says",
    subtitle: "Built with React, TypeScript, SCSS & Howler",
    href: "/simon-says",
    color: "#1970a6",
    class: "fas fa-trophy",
    sourceCode: "https://github.com/jamesgower/portfolio/tree/prod/src/pages/simon-says",
  },
  {
    img: pomodoroImage,
    title: "Pomodoro Clock",
    subtitle: "Built with React, TypeScript & SCSS",
    href: "/pomodoro",
    color: "#303030",
    class: "far fa-clock",
    sourceCode: "https://github.com/jamesgower/portfolio/tree/prod/src/pages/pomodoro",
  },
  {
    img: ticTacToeImage,
    title: "Tic-Tac-Toe with AI",
    subtitle: "Built with React, Redux (with Hooks!), TypeScript & SCSS",
    featured: true,
    href: "/tic-tac-toe",
    color: "#999285",
    class: "fas fa-gamepad",
    sourceCode: "https://github.com/jamesgower/portfolio/tree/prod/src/pages/tic-tac-toe",
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
    sourceCode: "https://github.com/jamesgower/blogify",
  },
  {
    img: wikipediaImage,
    title: "Wikipedia API",
    subtitle: "Built with TypeScript, Fetch API & React",
    href: "/wikipedia",
    color: "#0114E4",
    class: "fab fa-wikipedia-w",
    sourceCode:
      "https://github.com/jamesgower/portfolio/tree/prod/src/pages/wikipedia-api",
  },
  {
    img: indecisionImage,
    title: "Indecision App",
    subtitle: "Built with React, TypeScript SCSS & Local Storage",
    href: "/indecision-app",
    color: "#8359CE",
    class: "fas fa-question",
    sourceCode:
      "https://github.com/jamesgower/portfolio/tree/prod/src/pages/indecision-app",
  },
  {
    img: twitchImage,
    title: "Twitch API",
    subtitle: "Built with React, TypeScript, Fetch API & Twitch API",
    href: "/twitch",
    color: "#7c30ff",
    class: "fab fa-twitch",
    featured: true,
    sourceCode: "https://github.com/jamesgower/portfolio/tree/prod/src/pages/twitch-api",
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
    href: "/drum-machine",
    color: "#c6c6c6",
    class: "fas fa-headphones",
    sourceCode: "https://github.com/jamesgower/expensify",
  },
  {
    img: calculatorImage,
    title: "Calculator",
    subtitle: "Built with ReactModal, TypeScript, SCSS & Math.JS",
    color: "#00d397",
    class: "fas fa-calculator",
    click: true,
    sourceCode: "https://github.com/jamesgower/portfolio/tree/prod/src/pages/calculator",
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
    sourceCode: "https://github.com/jamesgower/portfolio",
  },
];
