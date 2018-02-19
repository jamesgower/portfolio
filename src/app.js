import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter, { history } from './routers/AppRouter';
import LoadingPage from './components/LoadingPage';
import { $, jQuery } from 'jquery';
import 'jquery-ui';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

window.$ = $;
window.jQuery = jQuery;

const store = configureStore();
const App = () => (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

let hasRendered = false;

const renderApp = () => {
	if (!hasRendered) {
		ReactDOM.render(<App />, document.getElementById('app'));
		hasRendered = true;
	}
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));
renderApp();
history.push('/');
