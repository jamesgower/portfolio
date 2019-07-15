import React from "react";
import loaderImg from "../../../../public/images/loader.gif";

const LoadingPage = () => (
  <div className="loader">
    <img className="loader__image" src={loaderImg} />
  </div>
);

export default LoadingPage;
