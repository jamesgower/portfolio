/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import Modal from "./Modal";

interface CardProps {
  posterLink: string;
  title: string;
  id: number;
  type: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ posterLink, title, id, type }): JSX.Element => {
  const [open, isOpen] = useState(false);
  return (
    <>
      <div className="card__container animated fadeIn">
        <img
          className="card__image"
          src={
            posterLink
              ? `http://image.tmdb.org/t/p/w300/${posterLink}`
              : "https://www.rspcansw.org.au/wp-content/themes/noPhotoFound.png"
          }
          style={{ border: posterLink ? "none" : "1px solid white" }}
          alt={title}
          onClick={(): void => isOpen(true)}
        />
        <p className="card__text">{title}</p>
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
