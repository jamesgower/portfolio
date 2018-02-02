import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter, { history } from './routers/AppRouter';
import LoadingPage from './components/LoadingPage';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';



const jsx = <AppRouter />;
let hasRendered = false;

const renderApp = () => {
	if (!hasRendered) {
		ReactDOM.render(jsx, document.getElementById('app'));
		hasRendered = true;
	}
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));
renderApp();
history.push('/');
