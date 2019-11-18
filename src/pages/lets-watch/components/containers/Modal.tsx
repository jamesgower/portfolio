import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import * as tmdbActions from "../../actions/tmdb.actions";
import * as authActions from "../../actions/auth.actions";
import { AppState } from "../../interfaces/app.i";
import spinner from "./spinner.gif";
import DatabaseButton from "./DatabaseButton";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  id: number;
  type: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, id, type }): JSX.Element => {
  const dispatch = useDispatch();
  dayjs.extend(advancedFormat);

  useEffect((): void => {
    type === "tv"
      ? dispatch(tmdbActions.fetchCurrentTV(id))
      : dispatch(tmdbActions.fetchCurrentMovie(id));
  }, []);

  const { current } = useSelector((state): AppState => state.letsWatch.tmdb);

  const styles = {
    overlay: {
      backgroundColor: "rgba(255, 255, 255, 0.45)",
      border: "1px solid black",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      minWidth: "400px",
      minHeight: "400px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      padding: "40px 20px",
      borderRadius: "10px",
      background: "#131319",
      border: "none",
    },
  };
  ReactModal.setAppElement("#app");
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={styles}
      contentLabel={current?.title ?? current?.name}
    >
      {current ? (
        <div className="modal__container">
          <div className="modal__header">
            <div className="modal__poster-container">
              <img
                className="modal__poster"
                alt={current.title}
                src={`http://image.tmdb.org/t/p/w300/${current.poster}`}
              />
            </div>
            <div className="modal__header-text-container">
              <p className="modal__title">{current.title}</p>
              {current.tagline && (
                <p className="modal__tagline">{`"${current.tagline}"`}</p>
              )}
              <p className="modal__header-text">
                {`Released ${dayjs(current.releaseDate).format("Do MMMM YYYY")}`}
              </p>
              <div className="modal__genres">
                {current.genres.map((genre) => (
                  <div key={genre} className={`modal__genre-${genre} modal__genre`}>
                    {genre}
                  </div>
                ))}
              </div>
              {!!current.rating && <p className="modal__rating">{current.rating}/10</p>}
            </div>
          </div>

          <p className="modal__overview">{current.overview}</p>
          <DatabaseButton type={type} id={id} />
        </div>
      ) : (
        <img src={spinner} alt="Loading..." className="modal__loading-spinner" />
      )}
      <i
        className="fas fa-times modal__close-btn"
        role="button"
        tabIndex={0}
        onClick={(): void => closeModal()}
      />
    </ReactModal>
  );
};

export default Modal;
