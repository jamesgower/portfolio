import * as React from "react";
import ActionProps from "../interfaces/action.i";

const Action: React.SFC<ActionProps> = ({ handlePick, hasOptions }): JSX.Element => (
  <div>
    <button
      className="indecision--buttonLarge"
      onClick={handlePick}
      disabled={!hasOptions}
      type="button"
    >
      What should I do?
    </button>
  </div>
);

export default Action;
