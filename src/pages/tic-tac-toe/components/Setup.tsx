import React from "react";
import { useSelector } from "react-redux";
import PlayGame from "./PlayGame";
import ChooseNames from "./ChooseNames";
import ChooseOpponents from "./ChooseOpponents";
import HiddenNavBar from "../../nav-bar/components/HiddenNavBar";
import { PlayerState } from "../interfaces/components.i";
import background from "../images/background.jpg";
import { AppState } from "../../../store/store";

const Setup: React.SFC = (): JSX.Element => {
  const { noPlayers, readyToPlay } = useSelector(
    ({ tictactoe }: AppState): PlayerState => tictactoe.player,
  );

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
            <ChooseNames />
          )
        ) : (
          <PlayGame />
        )}
      </div>
    </>
  );
};

export default Setup;
