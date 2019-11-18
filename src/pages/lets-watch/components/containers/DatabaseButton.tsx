import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../interfaces/app.i";
import * as authActions from "../../actions/auth.actions";
import spinner from "./spinSmall.gif";

interface Props {
  type: string;
  id: number;
}

const DatabaseButton: React.FC<Props> = ({ type, id }) => {
  console.log(type);
  const { tvShows, movies } = useSelector(
    (state): AppState => state.letsWatch.auth.profile,
  );
  const [requesting, setRequesting] = useState(false);
  const dispatch = useDispatch();
  const added = type === "movie" ? movies.indexOf(id) !== -1 : tvShows.indexOf(id) !== -1;
  console.log(added);
  const text = requesting ? (
    <img src={spinner} alt="Loading..." className="database__spinner" />
  ) : type === "movie" ? (
    added ? (
      "Remove from My Movies"
    ) : (
      "Add to My Movies"
    )
  ) : added ? (
    "Remove from My TV Shows"
  ) : (
    "Add to My TV Shows"
  );

  const addToDatabase = async (): Promise<void> => {
    setRequesting(true);
    await dispatch(authActions.addToUser(id, type === "tv" ? "tvShows" : "movies"));
    setTimeout(() => {
      setRequesting(false);
    }, 800);
  };

  const removeFromDatabase = async (): Promise<void> => {
    setRequesting(true);
    await dispatch(authActions.removeFromUser(id, type === "tv" ? "tvShows" : "movies"));
    setTimeout(() => {
      setRequesting(false);
    }, 800);
  };

  return (
    <div className="modal__button-container">
      <Button
        outline
        className="modal__button"
        color="success"
        onClick={added ? () => removeFromDatabase() : () => addToDatabase()}
        style={{ display: "inline-block" }}
      >
        {text}
      </Button>
    </div>
  );
};

export default DatabaseButton;
