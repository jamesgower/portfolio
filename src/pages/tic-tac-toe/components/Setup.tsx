import React from "react";
import { connect } from "react-redux";
import PlayGame from "./PlayGame";
import ChooseNames from "./ChooseNames";
import ChooseOpponents from "./ChooseOpponents";
import HiddenNavBar from "../../nav-bar/components/HiddenNavBar";
import { SetupProps, AppState } from "../interfaces/components.i";
import background from "../images/background.jpg";

const Setup: React.SFC<SetupProps> = ({
  player: { noPlayers, readyToPlay },
}): JSX.Element => {
  return (
    <>
      <HiddenNavBar color="black" navBackground={background} />
      <div
        className="tic-tac-toe__container"
        style={{
          background: `url(${background}) no-repeat fixed center`,
          backgroundSize: "cover",
        }}
      >
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
