import React from "react";
import AddOptionProps from "../interfaces/addOption.i";

const { useState } = React;

const AddOption: React.FC<AddOptionProps> = ({ handleAddOption }): JSX.Element => {
  const [error, setError] = useState("");

  const handleError = (error): void => {
    setError(error);
  };

  const onHandleAddOption = (e): void => {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = handleAddOption(option);

    if (!error) e.target.elements.option.value = "";
    if (error) {
      handleError(error);
    }
  };

  return (
    <div>
      {error && <p className="indecision--optionError">{error}</p>}
      <form className="indecision--addOption" onSubmit={onHandleAddOption}>
        <input className="indecision--addOption__input" type="text" name="option" />
        <button type="submit" className="indecision--addOptionButton">
          Add Option
        </button>
      </form>
    </div>
  );
};

export default AddOption;
