import React from "react";
import { useSelector } from "react-redux";
import PlayGame from "./PlayGame";
import ChooseNames from "./ChooseNames";
import ChooseOpponents from "./ChooseOpponents";
import HiddenNavBar from "../../nav-bar/components/HiddenNavBar";
import { AppState } from "../interfaces/components.i";
import background from "../images/background.jpg";

const Setup: React.SFC = (): JSX.Element => {
  const noPlayers = useSelector((state: AppState): number => state.player.noPlayers);
  const readyToPlay = useSelector((state: AppState): boolean => state.player.readyToPlay);

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
