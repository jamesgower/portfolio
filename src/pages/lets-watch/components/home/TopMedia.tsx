import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "reactstrap";
import { AppState } from "../../../../store/store";
import * as tmdbActions from "../../actions/tmdb.actions";
import Card from "../containers/Card";
import Carousel from "../containers/Carousel";

interface Props {
  type: string;
  autoplay: number;
}

const TopMedia: React.FC<Props> = ({ type, autoplay }): JSX.Element => {
  const media = useSelector((state: AppState) => state.letsWatch.tmdb[type]);
  const dispatch = useDispatch();
  useEffect((): void => {
    type === "movies"
      ? dispatch(tmdbActions.fetchTopMovies())
      : dispatch(tmdbActions.fetchTopTV());
  }, []);

  return (
    <Row>
      {media && (
        <Carousel
          options={{
            type: "carousel",
            perView: 5,
            breakpoints: {
              980: {
                perView: 4,
              },
              740: {
                perView: 3,
                peek: 50,
              },
              480: {
                perView: 2,
                peek: 50,
              },
            },
            swipeThreshold: false,
            dragThreshold: false,
            autoplay,
            animationTimingFunc: "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
            direction: type === "movies" ? "ltr" : "rtl",
          }}
          element={type}
        >
          {media.map(
            (show): JSX.Element => {
              return (
                <Card
                  id={show.id}
                  key={show.id}
                  posterLink={show.poster_path}
                  title={show.title}
                  type={type}
                />
              );
            },
          )}
        </Carousel>
      )}
    </Row>
  );
};

export default TopMedia;
