import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoginButton from "./LoginButton";
import landing from "./img/landing.jpg";
import * as authActions from "../../actions/auth.actions";

const Login: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  useEffect((): void => {
    dispatch(authActions.fetchUser());
  }, []);

  const buttonInfo = [
    {
      text: "Login with Google",
      icon: "fab fa-google",
      link: "/auth/google",
      name: "google",
    },
    {
      text: "Login with Facebook",
      icon: "fab fa-facebook-f",
      link: "/auth/facebook",
      name: "facebook",
    },
    {
      text: "Login with GitHub",
      icon: "fab fa-github-alt",
      link: "/auth/github",
      name: "github",
    },
    {
      text: "Login with Reddit",
      icon: "fab fa-reddit-alien",
      link: "/auth/reddit",
      name: "reddit",
    },
  ];
  return (
    <>
      <div
        className="login__container"
        style={{
          background: `url(${landing}) no-repeat center center`,
        }}
      >
        <div className="login__button-container">
          <p className="login__title">Lets Watch</p>
          <p className="login__text">Login to begin searching for TV shows & Movies</p>
          {buttonInfo.map(
            (button): JSX.Element => (
              <LoginButton key={button.name} {...button} />
            ),
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
