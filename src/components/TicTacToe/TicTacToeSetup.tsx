import * as React from "react";
import { connect } from "react-redux";
import { TicTacToe } from "./PlayTicTacToe";
import ChooseNames from "./ChooseNames";
import ChooseOpponents from "./ChooseOpponents";
import HiddenNavBar from "../HiddenNavBar";
import { SetupProps, SetupState } from "../../interfaces/ticTacToe";

const initialState: SetupState = {
  noPlayers: undefined,
  playerInfo: [
    {
      name: "",
      counter: "X",
    },
    {
      name: "",
      counter: "O",
      ai: false,
    },
  ],
  currentPlayer: 1,
  origBoard: Array.from(Array(9).keys()),
  difficulty: undefined,
  readyToPlay: false,
  showComponent: false,
  ttt: true,
  navbar: true,
};

class TicTacToeSetup extends React.Component<SetupProps, SetupState> {
  public readonly state = initialState;

  public render(): JSX.Element {
    const { player } = this.props;
    const { noPlayers, readyToPlay } = player;
    console.log(player);
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
            <TicTacToe />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({ player });

export default connect(mapStateToProps)(TicTacToeSetup);
