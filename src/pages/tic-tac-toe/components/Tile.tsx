import * as React from "react";
import { TileProps } from "../interfaces/components.i";

const Tile: React.FC<TileProps> = (props): JSX.Element => {
  const {
    disableClicks,
    id,
    disableTileClicks,
    player: { noPlayers, player1, player2, currentPlayer },
    board: { tiles },
    takeTurn,
    takeAITurn,
    currentTurn,
  } = props;

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
