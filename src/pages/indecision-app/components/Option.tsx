import React from "react";
import OptionProps from "../interfaces/option.i";

const Option: React.FC<OptionProps> = ({
  count,
  optionText,
  handleDeleteOption,
}): JSX.Element => (
  <div className="option">
    <p className="option__text">
      {count}. {optionText}
    </p>
    <button
      className="button indecision--linkButton"
      onClick={(): void => {
        handleDeleteOption(optionText);
      }}
      type="button"
    >
      remove
    </button>
  </div>
);

export default Option;
