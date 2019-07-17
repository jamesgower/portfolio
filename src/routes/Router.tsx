import * as React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import NotFoundPage from "../pages/_misc/components/NotFoundPage";
import LandingPage from "../pages/landing-page/components/LandingPage";
import Portfolio from "../pages/portfolio/components/Portfolio";
import Pomodoro from "../pages/pomodoro/components/Pomodoro";
import PlayTicTacToe from "../pages/tic-tac-toe/components/Setup";
import Calculator from "../pages/calculator/components/Calculator";
import WikipediaAPI from "../pages/wikipedia-api/components/WikipediaAPI";
import IndecisionApp from "../pages/indecision-app/components/IndecisionApp";
import TwitchAPI from "../pages/twitch-api/components/TwitchAPI";
import SimonSays from "../pages/simon-says/components/SimonSays";
import Skills from "../pages/skills/components/Skills";
import DrumMachine from "../pages/drum-machine/components/DrumMachine";
import AboutMe from "../pages/about-me/components/AboutMe";
import configureStore from "../pages/tic-tac-toe/store/store";

export const history = createHistory();

const store = configureStore();

const AppRouter: React.SFC = (): JSX.Element => (
  <Router history={history}>
    <Provider store={store}>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/portfolio" exact component={Portfolio} />
        <Route path="/portfolio/pomodoro" component={Pomodoro} />
        <Route path="/portfolio/calculator" component={Calculator} />
        <Route path="/portfolio/wikipedia" component={WikipediaAPI} />
        <Route path="/portfolio/indecision-app" component={IndecisionApp} />
        <Route path="/portfolio/twitch" component={TwitchAPI} />
        <Route path="/portfolio/simon-says" component={SimonSays} />
        <Route path="/contact-me" component={AboutMe} />
        <Route path="/skills" component={Skills} />
        <Route path="/portfolio/drum-machine" component={DrumMachine} />
        <Route path="/portfolio/tic-tac-toe" component={PlayTicTacToe} />
        <Route component={NotFoundPage} />
      </Switch>
    </Provider>
  </Router>
);

export default AppRouter;
