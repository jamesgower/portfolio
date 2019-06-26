import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routes/AppRouter";
import LoadingPage from "./components/LoadingPage";
import "normalize.css/normalize.css";
import "react-dates/lib/css/_datepicker.css";
import "./styles/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import configureStore from "./store/configureStore";

declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}

window.$ = $;
window.jQuery = jQuery;

const store = configureStore();

const App: React.FC = (): JSX.Element => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(<App />, document.getElementById("app"));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById("app"));
renderApp();
