import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routes/Router";
import LoadingPage from "./pages/_misc/components/LoadingPage";
import "normalize.css/normalize.css";
import "./scss/styles.scss";
import "bootstrap-css-only/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

let hasRendered = false;

const renderApp = (): void => {
  if (!hasRendered) {
    ReactDOM.render(<AppRouter />, document.getElementById("app"));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById("app"));
renderApp();
