import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowseAsGuestAction } from "../../interfaces/auth.redux.i";
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
    {
      text: "Browse as Guest",
      icon: "fas fa-male",
      link: "/",
      onClick: (): BrowseAsGuestAction => dispatch(authActions.browseAsGuest()),
      name: "guest",
    },
  ];
  return (
    <div
      className="login__container"
      style={{
        background: `url(${landing}) no-repeat center center`,
      }}
    >
      <div className="login__button-container">
        {buttonInfo.map(
          (button): JSX.Element => (
            <LoginButton key={button.name} {...button} />
          ),
        )}
      </div>
    </div>
  );
};

export default Login;
