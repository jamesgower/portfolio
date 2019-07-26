import React from "react";
import { useSelector } from "react-redux";
import { TileProps, AppState, PlayerState } from "../interfaces/components.i";

const Tile: React.FC<TileProps> = ({
  takeTurn,
  id,
  disableClicks,
  takeAITurn,
  disableTileClicks,
  currentTurn,
}): JSX.Element => {
  const { noPlayers, player1, player2, currentPlayer } = useSelector(
    (state: AppState): PlayerState => state.player,
  );
  const tiles = useSelector((state: AppState): number[] => state.board.tiles);

  const setDisabled = (): void => {
    disableTileClicks();
  };

  const onTileClick = (): void => {
    currentTurn.current.className = "";

    if (typeof tiles[id] === "number") {
      if (noPlayers === 1) {
        const aiTurn: boolean = takeTurn(id, player1.counter);
        setDisabled();
        if (aiTurn) {
          setTimeout((): void => {
            takeAITurn();
          }, 1000);
        }
      } else {
        currentPlayer === 1
          ? takeTurn(id, player1.counter)
          : takeTurn(id, player2.counter);
      }
    }
  };

  return (
    <div className="tile__container">
      <div
        className="tile__text"
        id={id}
        role="button"
        tabIndex={0}
        onClick={!disableClicks ? onTileClick : undefined}
      />
    </div>
  );
};

export default Tile;
