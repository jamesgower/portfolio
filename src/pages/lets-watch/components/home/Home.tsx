import React, { useEffect } from "react";
import { Container } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions/auth.actions";
import NavBar from "../navbar/NavBar";
import TopMedia from "./TopMedia";
import { AppState } from "../../../../store/store";
import { ProfileState } from "../../interfaces/app.i";

const Home: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  useEffect((): void => {
    dispatch(actions.fetchUser());
  }, []);
  const { firstName } = useSelector(
    (state: AppState): ProfileState => state.letsWatch.auth.profile,
  );
  return (
    <div className="home__container">
      <NavBar />
      <Container>
        <p className="home__welcome">{`Welcome back, ${firstName}.`} </p>
        <p className="home__saved">
          Access your saved movies & TV shows in the profile tab.
        </p>
        <p className="home__text">
          Here are the most popular things to watch right now...
        </p>
        <h2 className="home__title">Popular Movies</h2>
        <TopMedia type="movies" autoplay={2000} />
        <h2 className="home__title">Popular TV Shows</h2>
        <TopMedia type="tv" autoplay={2500} />
      </Container>
    </div>wwww
  );
};

export default Home;
