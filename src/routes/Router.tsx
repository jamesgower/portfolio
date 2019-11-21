import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserHistory } from "history";
import NotFoundPage from "../pages/_misc/components/NotFoundPage";
import Pomodoro from "../pages/pomodoro/components/Pomodoro";
import Portfolio from "../pages/portfolio/components/Portfolio";
import TicTacToe from "../pages/tic-tac-toe/components/Setup";
import WikipediaAPI from "../pages/wikipedia-api/components/WikipediaAPI";
import IndecisionApp from "../pages/indecision-app/components/IndecisionApp";
import TwitchAPI from "../pages/twitch-api/components/TwitchAPI";
import SimonSays from "../pages/simon-says/components/SimonSays";
import DrumMachine from "../pages/drum-machine/components/DrumMachine";
import Chatter from "../pages/chatter/components/Landing";
import { AppState } from "../store/store";
import Home from "../pages/lets-watch/components/home/Home";
import Login from "../pages/lets-watch/components/login/Login";
import MyTV from "../pages/lets-watch/components/my-tv/MyTV";
import MyMovies from "../pages/lets-watch/components/my-tv/MyMovies";
import Movies from "../pages/lets-watch/components/tv/Movies";
import TVShows from "../pages/lets-watch/components/tv/TVShows";

const history = createBrowserHistory();

const AppRouter: React.SFC = (): JSX.Element => {
  const profile = useSelector((state: AppState) => state.letsWatch.auth.profile);
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={Portfolio} exact />
        <Route path="/pomodoro" component={Pomodoro} />
        <Route path="/wikipedia" component={WikipediaAPI} />
        <Route path="/indecision-app" component={IndecisionApp} />
        <Route path="/twitch" component={TwitchAPI} />
        <Route path="/simon-says" component={SimonSays} />
        <Route path="/drum-machine" component={DrumMachine} />
        <Route path="/tic-tac-toe" component={TicTacToe} />
        <Route path="/chatter" exact component={Chatter} />
        <Route path="/lets-watch" exact component={profile ?? false ? Home : Login} />
        <Route path="/lets-watch/my-tv-shows" component={MyTV} />
        <Route path="/lets-watch/my-movies" component={MyMovies} />
        <Route path="/lets-watch/movies" component={Movies} />
        <Route path="/lets-watch/tv-shows" component={TVShows} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
