import * as React from "react";
import { TileProps } from "../interfaces/components";

const Tile: React.FC<TileProps> = (props): JSX.Element => {
  const { disableClicks, id, disableTileClicks } = props;

  const setDisabled = (): void => {
    disableTileClicks();
  };

  const onTileClick = (): void => {
    const { player, board, takeTurn, takeAITurn } = props;
    const { noPlayers, player1, player2, currentPlayer } = player;
    const { tiles } = board;
    document.getElementById("currentTurn").className = "";

    if (typeof tiles[id] === "number") {
      if (noPlayers === 1) {
        const aiTurn: boolean = takeTurn(id, player1.counter);
        setDisabled();
        if (aiTurn) {
          setTimeout((): void => {
            takeAITurn();
          }, 1000);
        }
      } else if (currentPlayer === 1) {
        takeTurn(id, player1.counter);
      } else {
        takeTurn(id, player2.counter);
      }
    }
  };

  return (
    <div className="tile">
      <div
        className="tile-text"
        id={id}
        role="button"
        tabIndex={0}
        onClick={!disableClicks ? onTileClick : undefined}
      />
    </div>
  );
};

export default Tile;
