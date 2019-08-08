import "core-js/stable";
import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routes/Router";
import "normalize.css/normalize.css";
import "./scss/styles.scss";
import "bootstrap-css-only/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/brands.min.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/css/regular.min.css";
import withLoading from "./utils/components/withLoading";

const App = (): JSX.Element => {
  const [isLoading, setLoading] = useState(true);
  const RouterWithLoading = withLoading(AppRouter);

  useEffect((): void => {
    if (isLoading) {
      setTimeout((): void => {
        setLoading(false);
      }, 300);
    }
  });
  return <RouterWithLoading loading={isLoading} />;
};

ReactDOM.render(<App />, document.getElementById("app"));
