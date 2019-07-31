import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routes/Router";
import LoadingPage from "./pages/_misc/components/LoadingPage";
import "normalize.css/normalize.css";
import "react-dates/lib/css/_datepicker.css";
import "./stylesheets/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

let hasRendered = false;

const renderApp = (): void => {
  if (!hasRendered) {
    ReactDOM.render(<AppRouter />, document.getElementById("app"));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById("app"));
renderApp();
