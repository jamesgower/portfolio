import React from "react";
import Option from "./Option";
import OptionContainerProps from "../interfaces/optionContainer.i";

const Options: React.FC<OptionContainerProps> = ({
  handleDeleteOptions,
  handleDeleteOption,
  options,
}): JSX.Element => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">Your Options</h3>
      <button onClick={handleDeleteOptions} type="button" className="indecision--link">
        Remove All
      </button>
    </div>
    {options.length === 0 && (
      <p className="widget__title">Please add an option to get started!</p>
    )}
    {options.map(
      (option, index): JSX.Element => (
        <Option
          key={option}
          count={index + 1}
          optionText={option}
          handleDeleteOption={handleDeleteOption}
        />
      ),
    )}
  </div>
);

export default Options;
