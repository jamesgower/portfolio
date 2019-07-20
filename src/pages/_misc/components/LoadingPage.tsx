import React from "react";
import loaderImg from "../images/loader.gif";

const LoadingPage: React.SFC = (): JSX.Element => (
  <div className="loader">
    <img className="loader__image" src={loaderImg} alt="Loading Spinner" />
  </div>
);

export default LoadingPage;
