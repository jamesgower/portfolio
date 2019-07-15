import * as React from "react";
import { connect } from "react-redux";
import PlayGame from "./PlayGame";
import ChooseNames from "./ChooseNames";
import ChooseOpponents from "./ChooseOpponents";
import HiddenNavBar from "../../nav-bar/components/HiddenNavBar";
import { SetupProps, AppState } from "../interfaces/components.i";

const Setup: React.SFC<SetupProps> = ({
  player: { noPlayers, readyToPlay },
}): JSX.Element => {
  return (
    <>
      <HiddenNavBar color="#000" />
      <div className="tic-tac-toe__container">
        {!readyToPlay ? (
          noPlayers === undefined ? (
            <ChooseOpponents />
          ) : (
            <ChooseNames noPlayers={noPlayers} />
          )
        ) : (
          <PlayGame />
        )}
      </div>
    </>
  );
};

const mapStateToProps = ({ player }): AppState => ({ player });

export default connect<AppState>(mapStateToProps)(Setup);
