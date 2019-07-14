import * as React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import NotFoundPage from "../components/NotFoundPage";
import LandingPage from "../components/LandingPage";
import Portfolio from "../components/Portfolio";
import Pomodoro from "../components/Pomodoro";
import PlayTicTacToe from "../components/TicTacToe/components/Setup";
import Calculator from "../components/Calculator";
import WikipediaAPI from "../components/WikipediaAPI/components/WikipediaAPI";
import IndecisionApp from "../components/Indecision/components/IndecisionApp";
import TwitchAPI from "../components/TwitchAPI/components/TwitchAPI";
import SimonSays from "../components/SimonSays";
import Skills from "../components/Skills";
import Chatter from "../components/Chatter";
import DrumMachine from "../components/DrumMachine";
import AboutMe from "../components/AboutMe";
import configureStore from "../components/TicTacToe/store/store";

export const history = createHistory();

const store = configureStore();

const AppRouter: React.SFC = (): JSX.Element => (
  <Router history={history}>
    <Provider store={store}>
      <Switch>
        <Route path="/" component={IndecisionApp} exact />
        <Route path="/portfolio" exact component={Portfolio} />
        <Route path="/portfolio/pomodoro" component={Pomodoro} />
        <Route path="/portfolio/calculator" component={Calculator} />
        <Route path="/portfolio/wikipedia" component={WikipediaAPI} />
        <Route path="/portfolio/indecision-app" component={IndecisionApp} />
        <Route path="/portfolio/twitch" component={TwitchAPI} />
        <Route path="/portfolio/simon-says" component={SimonSays} />
        <Route path="/contact-me" component={AboutMe} />
        <Route path="/skills" component={Skills} />
        <Route path="/portfolio/chatter" component={Chatter} />
        <Route path="/portfolio/drum-machine" component={DrumMachine} />
        <Route path="/portfolio/tic-tac-toe" component={PlayTicTacToe} />
        <Route component={NotFoundPage} />
      </Switch>
    </Provider>
  </Router>
);

export default AppRouter;
