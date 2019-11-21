import React, { useState } from "react";
import { Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { ProfileState } from "../../interfaces/app.i";
import * as authActions from "../../actions/auth.actions";
import spinner from "./spinSmall.gif";
import { AppState } from "../../../../store/store";

interface Props {
  type: string;
  id: number;
}

const DatabaseButton: React.FC<Props> = ({ type, id }): JSX.Element => {
  console.log(type);
  const { tvShows, movies } = useSelector(
    (state: AppState): ProfileState => state.letsWatch.auth.profile,
  );
  const [requesting, setRequesting] = useState(false);
  const dispatch = useDispatch();
  const added = type === "movie" ? movies.indexOf(id) !== -1 : tvShows.indexOf(id) !== -1;
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
    setTimeout((): void => {
      setRequesting(false);
    }, 800);
  };

  const removeFromDatabase = async (): Promise<void> => {
    setRequesting(true);
    await dispatch(authActions.removeFromUser(id, type === "tv" ? "tvShows" : "movies"));
    setTimeout((): void => {
      setRequesting(false);
    }, 800);
  };

  return (
    <div className="modal__button-container">
      <Button
        outline
        className="modal__button"
        color={added ? "danger" : "success"}
        size="lg"
        onClick={
          added
            ? (): Promise<void> => removeFromDatabase()
            : (): Promise<void> => addToDatabase()
        }
        style={{ display: "inline-block" }}
      >
        {text}
      </Button>
    </div>
  );
};

export default DatabaseButton;
