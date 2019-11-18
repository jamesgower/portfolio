/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import Modal from "./Modal";

interface CardProps {
  posterLink: string;
  title: string;
  id: number;
  type: string;
}

const Card: React.FC<CardProps> = ({ posterLink, title, id, type }): JSX.Element => {
  const [open, isOpen] = useState(false);
  return (
    <>
      <div className="card__container">
        <img
          className="card__image"
          src={`http://image.tmdb.org/t/p/w300/${posterLink}`}
          alt={title}
          onClick={(): void => isOpen(true)}
        />
      </div>
      {open && (
        <Modal
          isOpen={open}
          closeModal={(): void => isOpen(false)}
          id={id}
          type={type === "tv" ? "tv" : "movie"}
        />
      )}
    </>
  );
};

export default Card;
