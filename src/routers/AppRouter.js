import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LandingPage from '../components/LandingPage';
import Portfolio from '../components/Portfolio';
import Pomodoro from '../components/Pomodoro';
import PlayTicTacToe from '../components/TicTacToeSetup';


export const history = createHistory();

const AppRouter = () => (
	<Router history={history}>
		<div>
			<Switch>
				<Route path="/" component={PlayTicTacToe} exact />
				<Route path="/dashboard" component={DashboardPage} />
				<Route path="/portfolio" exact component={Portfolio} />
				<Route path="/portfolio/pomodoro" component={Pomodoro} />
				<Route path="/portfolio/tic-tac-toe" component={PlayTicTacToe} />				
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</Router>
);

export default AppRouter;
