import * as React from "react";
import ArrowsProps from "../interfaces/arrows.i";
import * as arrowLeft from "../../../../public/images/arrowLeft.png";
import * as arrowRight from "../../../../public/images/arrowRight.png";

const Arrows: React.FC<ArrowsProps> = ({
  onHandleArrowClick,
  workTime,
  breakTime,
}): JSX.Element => {
  return (
    <div id="breakTimer" className="text-center">
      <p className="times">Minutes on break</p>
      <div
        className="hvr-pulse-grow"
        role="button"
        tabIndex={0}
        onClick={(): void => onHandleArrowClick(!!workTime, false)}
      >
        <img
          src={arrowLeft}
          alt={`Subtract one from ${workTime ? "work" : "break"} timer`}
          className="arrows"
        />
      </div>
      <div id="breakNum" className="num">
        {workTime || breakTime}
      </div>
      <div
        className="hvr-pulse-grow"
        role="button"
        tabIndex={0}
        onClick={(): void => onHandleArrowClick(!!workTime, true)}
      >
        <img
          src={arrowRight}
          alt={`Add one to ${workTime ? "work" : "break"} timer`}
          className="arrows"
        />
      </div>
    </div>
  );
};

export default Arrows;
