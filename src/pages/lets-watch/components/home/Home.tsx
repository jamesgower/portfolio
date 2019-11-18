import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from "reactstrap";
import NavBar from "../navbar/NavBar";
import TopMedia from "./TopMedia";
import * as authActions from "../../actions/auth.actions";

const Home: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  useEffect((): void => {
    dispatch(authActions.fetchUser());
  }, []);
  return (
    <div className="home__container">
      <NavBar />
      <Container>
        <h2 className="home__title">Popular Movies</h2>
        <TopMedia type="movies" autoplay={2000} />
        <h2 className="home__title">Popular TV Shows</h2>
        <TopMedia type="tv" autoplay={2500} />
      </Container>
    </div>
  );
};

export default Home;
