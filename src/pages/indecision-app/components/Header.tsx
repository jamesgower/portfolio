import React from "react";
import { Redirect } from "react-router-dom";

const { useState } = React;

const Header: React.FC = (): JSX.Element => {
  const [redirect, setRedirect] = useState(false);

  const handleOnClick = (): void => {
    setRedirect(true);
  };

  return redirect ? (
    <Redirect push to="/#current-work" />
  ) : (
    <div className="header">
      <div className="container">
        <h1 className="header__title">Indecision</h1>
        <h2 className="header__subtitle">Put your life in the hands of a computer.</h2>
        <button
          className="indecision--backButton indecision--addOptionButton"
          onClick={handleOnClick}
          type="button"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

Header.defaultProps = {
  title: "Indecision",
};

export default Header;
