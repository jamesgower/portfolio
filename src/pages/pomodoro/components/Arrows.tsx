import React from "react";
import ArrowsProps from "../interfaces/arrows.i";
import arrowLeft from "../images/arrowLeft.png";
import arrowRight from "../images/arrowRight.png";

const Arrows: React.FC<ArrowsProps> = ({
  onHandleArrowClick,
  workTime,
  breakTime,
  work,
}): JSX.Element => {
  return (
    <div className="arrows__container">
      <p className="arrows__time-container">Minutes {work ? "to work" : "on break"}</p>
      <div
        className="arrows__pulse-animation"
        role="button"
        tabIndex={0}
        onClick={(): void => {
          work ? onHandleArrowClick(true, false) : onHandleArrowClick(false, false);
        }}
      >
        <img
          src={arrowLeft}
          alt={`Subtract one from ${workTime ? "work" : "break"} timer`}
          className="arrows__image"
        />
      </div>
      <div className="arrows__current-number">{workTime || breakTime}</div>
      <div
        className="arrows__pulse-animation"
        role="button"
        tabIndex={0}
        onClick={(): void => {
          work ? onHandleArrowClick(true, true) : onHandleArrowClick(false, true);
        }}
      >
        <img
          src={arrowRight}
          alt={`Add one to ${workTime ? "work" : "break"} timer`}
          className="arrows__image"
        />
      </div>
    </div>
  );
};

export default Arrows;
