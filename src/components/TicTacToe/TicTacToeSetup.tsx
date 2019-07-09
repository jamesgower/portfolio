import * as React from "react";
import { connect } from "react-redux";
import TicTacToe from "./PlayTicTacToe";
import ChooseNames from "./ChooseNames";
import ChooseOpponents from "./ChooseOpponents";
import HiddenNavBar from "../HiddenNavBar";
import { SetupProps } from "./interfaces/components";

const TicTacToeSetup: React.SFC<SetupProps> = ({ player }, props): JSX.Element => {
  const { noPlayers, readyToPlay } = player;

  return (
    <div>
      <HiddenNavBar />
      <div className="background-TTT">
        {!readyToPlay ? (
          noPlayers === undefined ? (
            <ChooseOpponents />
          ) : (
            <ChooseNames noPlayers={noPlayers} />
          )
        ) : (
          <TicTacToe {...props} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ player }) => ({ player });

export default connect(mapStateToProps)(TicTacToeSetup);
