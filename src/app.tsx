import * as React from "react";
import * as ReactDOM from "react-dom";
import AppRouter from "./routes/Router";
import LoadingPage from "./components/LoadingPage";
import "normalize.css/normalize.css";
import "react-dates/lib/css/_datepicker.css";
import "./scss/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";

declare global {
  interface Window {
    $: any;
    jQuery: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

window.$ = $;
window.jQuery = jQuery;

let hasRendered = false;

const renderApp = (): void => {
  if (!hasRendered) {
    ReactDOM.render(<AppRouter />, document.getElementById("app"));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById("app"));
renderApp();
