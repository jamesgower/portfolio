import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LandingPage from '../components/LandingPage';
import Portfolio from '../components/Portfolio';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export const history = createHistory();

const AppRouter = () => (
	<Router history={history}>
			<div>
				<Switch>
					<Route path="/" component={LandingPage} exact={true} />
					<Route path="/dashboard" component={DashboardPage} />
					<Route path="/portfolio" component={Portfolio} />
					<Route component={NotFoundPage} />
				</Switch>
			</div>
	</Router>
);

export default AppRouter;
