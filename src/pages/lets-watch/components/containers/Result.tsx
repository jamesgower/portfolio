import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import relative from "dayjs/plugin/relativeTime";
import advanced from "dayjs/plugin/advancedFormat";
import { Container, Button, Spinner } from "reactstrap";
import * as actions from "../../actions/auth.actions";
import spinner from "./spinner.gif";

interface Props {
  type: string;
  id: number;
}

const Result: React.FC<Props> = ({ type, id }): JSX.Element => {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  dayjs.extend(relative);
  dayjs.extend(advanced);
  const [data, setData] = useState(null);

  const getData = async (): Promise<void> => {
    const res = await axios.get(
      `${process.env.TMDB_URL}/${type}/${id}${process.env.TMDB_API_KEY}`,
    );
    setData(res.data);
  };
  useEffect((): void => {
    getData();
  }, []);

  return data && visible ? (
    <Container>
      <div className="result__container">
        <div className="result__poster">
          <img
            src={`http://image.tmdb.org/t/p/w300${data.poster_path}`}
            alt={data.name || data.title}
            className="result__img"
          />
        </div>
        <div className="result__text-container">
          <h3 className="result__title">
            {data.name || data.title}{" "}
            {data.tagline && (
              <span className="result__tagline"> - &ldquo;{data.tagline}&ldquo;</span>
            )}
          </h3>
          {data.next_episode_to_air && (
            <p className="result__text">
              Next episode &ldquo;{data.next_episode_to_air.name}&ldquo; airs{" "}
              {dayjs(data.next_episode_to_air.air_date).fromNow()}
            </p>
          )}
          <div className="result__genres">
            {data.genres?.map(
              ({ name }, i): JSX.Element => (
                <div key={i} className="result__genre">
                  {name}
                </div>
              ),
            )}
          </div>
          {data.vote_average && (
            <p className="result__text">
              <b>Rating:</b> {data.vote_average}/10
            </p>
          )}
          {data.first_air_date && (
            <p className="result__text">
              <b>First aired:</b> {dayjs(data.first_air_date).format("MMMM Do YYYY")}
            </p>
          )}
          {data.release_date && (
            <p className="result__text">
              <b>Release Date:</b> {dayjs(data.release_date).format("MMMM Do YYYY")}
            </p>
          )}
          <p className="result__overview">{data.overview}</p>
          <Button
            color="danger"
            outline
            style={{ width: "300px", margin: "0 auto", fontSize: "15px" }}
            onClick={(): void => {
              setLoading(true);
              setTimeout((): void => {
                dispatch(
                  actions.removeFromUser(id, type === "tv" ? "tvShows" : "movies"),
                );
                setVisible(false);
                setLoading(false);
              }, 800);
            }}
          >
            {!loading ? (
              type === "tv" ? (
                "Remove from My TV Shows"
              ) : (
                "Remove from My Movies"
              )
            ) : (
              <Spinner color="success" />
            )}
          </Button>
        </div>
      </div>
    </Container>
  ) : null;
};

export default Result;
