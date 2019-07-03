import * as React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import NotFoundPage from "../components/NotFoundPage";
import LandingPage from "../components/LandingPage";
import Portfolio from "../components/Portfolio";
import Pomodoro from "../components/Pomodoro";
import PlayTicTacToe from "../components/TicTacToe/TicTacToeSetup";
import Calculator from "../components/Calculator";
import WikipediaAPI from "../components/WikipediaAPI/WikipediaAPI";
import IndecisionApp from "../components/Indecision/IndecisionApp";
import TwitchAPI from "../components/TwitchAPI/TwitchAPI";
import SimonSays from "../components/SimonSays";
import Skills from "../components/Skills";
import Chatter from "../components/Chatter";
import DrumMachine from "../components/DrumMachine";
import AboutMe from "../components/AboutMe";

export const history = createHistory();

const AppRouter = (): JSX.Element => (
  <Router history={history}>
    <Switch>
      <Route path="/" component={WikipediaAPI} exact />
      <Route path="/portfolio" exact component={Portfolio} />
      <Route path="/portfolio/pomodoro" component={Pomodoro} />
      <Route path="/portfolio/tic-tac-toe" component={PlayTicTacToe} />
      <Route path="/portfolio/calculator" component={Calculator} />
      <Route path="/portfolio/wikipedia" component={WikipediaAPI} />
      <Route path="/portfolio/indecision-app" component={IndecisionApp} />
      <Route path="/portfolio/twitch" component={TwitchAPI} />
      <Route path="/portfolio/simon-says" component={SimonSays} />
      <Route path="/contact-me" component={AboutMe} />
      <Route path="/skills" component={Skills} />
      <Route path="/portfolio/chatter" component={Chatter} />
      <Route path="/portfolio/drum-machine" component={DrumMachine} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default AppRouter;
