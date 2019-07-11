import * as React from "react";
import { connect } from "react-redux";
import { PlayProps, PlayState, GameWon, Move } from "./interfaces/components";
import * as playerActions from "./actions/player.action";
import * as boardActions from "./actions/board.action";

/**
 * TODO
 * [x] Fix onTileClick
 * [ ] Refactor
 * [ ] Fix reset after result
 * [ ] Create tile component instead of divs ??
 * [ ] Fix correct names for next player when outcome is achieved.
 *
 * !! TAKE TURN AND ONTILECLICK NEEDS FIX
 */

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

class TicTacToe extends React.Component<PlayProps, PlayState> {
  public readonly state = {
    disableClicks: false,
    gameFinished: false,
  };

  public componentDidMount(): void {
    setTimeout((): void => {
      const p1score = document.getElementById("p1score");
      p1score.style.visibility = "visible";
      p1score.className = "animated fadeIn";
      const p2score = document.getElementById("p2score");
      p2score.style.visibility = "visible";
      p2score.className = "animated fadeIn";
    }, 1000);
  }

  public componentWillUpdate(nextProps, nextState): void {
    document.getElementById("currentTurn").className = "";
    if (nextState.gameFinished) {
      nextState.gameFinished = false;
      setTimeout((): void => {
        const { player, updateCurrentTurn, changePlayer } = this.props;
        const { player1, player2, noPlayers, currentPlayer } = player;

        if (currentPlayer === 1) {
          updateCurrentTurn(`It's ${player1.name}'s turn.`);
        } else {
          noPlayers === 1
            ? updateCurrentTurn("AI is thinking...")
            : updateCurrentTurn(`It's ${player2.name}'s turn.`);
        }
        this.onResetBoard();
      }, 1500);
    }
  }

  public componentDidUpdate(): void {
    document.getElementById("currentTurn").className = "animated fadeIn";
    setTimeout((): void => {
      document.getElementById("currentTurn").className = "";
    }, 300);
  }

  private onTileClick = (event): void => {
    const { player, board } = this.props;
    const { noPlayers, player1, player2, currentPlayer } = player;
    const { tiles } = board;
    const { id } = event.target;
    document.getElementById("currentTurn").className = "";

    if (typeof tiles[id] === "number") {
      if (noPlayers === 1) {
        const aiTurn = this.takeTurn(id, player1.counter);
        this.setState({ disableClicks: true });
        if (aiTurn) {
          setTimeout((): void => {
            this.takeAITurn();
          }, 1000);
        }
      } else if (currentPlayer === 1) {
        this.takeTurn(id, player1.counter);
      } else {
        this.takeTurn(id, player2.counter);
      }
    }
  };

  private takeAITurn = (): void => {
    const { player } = this.props;
    const { player2 } = player;
    this.takeTurn(this.bestSpot(), player2.counter);
    this.setState({ disableClicks: false });
  };

  private takeTurn = (squareId: string, playerCounter: string): boolean => {
    const {
      player,
      addMove,
      board,
      updateCurrentTurn,
      setCurrentPlayer,
      changePlayer,
    } = this.props;
    const { currentPlayer, player1, player2, noPlayers } = player;
    const { tiles } = board;

    // ! CHANGE TO MAPPING SOON (addMove) //
    const newBoard = tiles;
    newBoard[squareId] = playerCounter;
    addMove(newBoard);

    const tile = document.getElementById(squareId);
    tile.innerText = playerCounter;
    tile.className =
      currentPlayer === 1
        ? "tile-text-p1 animated fadeIn"
        : "tile-text-p2 animated fadeIn";

    const draw = this.checkTie();
    const won = this.checkWin(playerCounter);
    if (!won && !draw) {
      if (currentPlayer === 1) {
        noPlayers === 1
          ? updateCurrentTurn("AI is thinking...")
          : updateCurrentTurn(`It's ${player2.name}'s turn`);
      } else {
        updateCurrentTurn(`It's ${player1.name}'s turn`);
      }
      changePlayer();
      return true;
    }
    return false;
  };

  public checkWin = (counter, minMax?: boolean): GameWon => {
    const { board } = this.props;
    const { tiles } = board;

    const plays = tiles.reduce(
      (a, e, i): number[] => (e === counter ? a.concat(i) : a),
      [],
    );
    let gameWon = null;
    for (const [index, win] of winCombos.entries()) {
      if (win.every((elem: number): boolean => plays.indexOf(elem) > -1)) {
        gameWon = {
          index,
          player: counter,
        };
        break;
      }
    }
    if (gameWon && !minMax) {
      this.gameOver(gameWon);
    }
    return gameWon;
  };

  private checkTie = (): boolean => {
    const { updateCurrentTurn, changePlayer } = this.props;

    if (this.emptyTiles().length === 0 && !this.checkWin("X") && !this.checkWin("O")) {
      updateCurrentTurn("It's a draw!");
      setTimeout((): void => {
        this.setState({
          disableClicks: true,
          gameFinished: true,
        });
      }, 1000);
      changePlayer();
      return true;
    }
    return false;
  };

  private gameOver = (gameWon: GameWon): void => {
    const {
      player: { player1 },
      playerOneScore,
      playerTwoScore,
    } = this.props;

    for (const index of winCombos[gameWon.index]) {
      document.getElementById(index).style.backgroundColor =
        gameWon.player === player1.counter ? "green" : "red";
      document.getElementById(index).className = "tile-text animated tada";
    }

    gameWon.player === player1.counter
      ? document.getElementById("p1score").classList.add("scoringAnimation")
      : document.getElementById("p2score").classList.add("scoringAnimation");

    gameWon.player === player1.counter ? playerOneScore() : playerTwoScore();

    this.setState({
      disableClicks: true,
      gameFinished: true,
    });

    document.getElementById("currentTurn").className = "";
  };

  private onResetClick = (): void => {
    const { resetBoard, resetScore } = this.props;
    setTimeout((): void => {
      this.setState({
        disableClicks: false,
      });
      resetScore();
      resetBoard();

      for (let i = 0; i < 9; i++) {
        const index = i.toString();
        document.getElementById(index).style.background = "none";
        document.getElementById(index).innerText = "";
      }
    }, 200);
  };

  private emptyTiles = (): number[] => {
    const { board } = this.props;
    const { tiles } = board;
    return tiles.filter((tile: number): boolean => typeof tile === "number");
  };

  private bestSpot = (): string => {
    const { player } = this.props;
    const { difficulty, player2 } = player;
    const { length } = this.emptyTiles();
    const randomNum = Math.floor(Math.random() * Math.floor(length));

    switch (difficulty) {
      case 1:
        return this.emptyTiles()[0].toString();
      case 2:
        if (length === 1) {
          return this.emptyTiles()[0].toString();
        }
        return this.emptyTiles()[randomNum].toString();
      case 3:
        return this.minimax(player2.counter).index.toString();
      default:
        return null;
    }
  };

  private onResetBoard = (): void => {
    const { player, resetBoard, changePlayer } = this.props;
    const { noPlayers, currentPlayer } = player;

    for (let i = 0; i < 9; i++) {
      const index = i.toString();
      document.getElementById(index).style.background = "none";
      document.getElementById(index).innerText = "";
    }

    resetBoard();

    if (noPlayers === 1 && currentPlayer === 2) {
      setTimeout((): void => {
        this.takeAITurn();
      }, 1000);
    } else {
      this.setState({ disableClicks: false });
    }

    document.getElementById("p1score").className = "";
    document.getElementById("p2score").className = "";
  };

  private minimax = (counter): Move => {
    const { player, board } = this.props;
    const { player1, player2 } = player;
    const { tiles } = board;
    const availSpots = this.emptyTiles();

    if (this.checkWin(player1.counter, true)) {
      return {
        score: -10,
      };
    }
    if (this.checkWin(player2.counter, true)) {
      return {
        score: 10,
      };
    }
    if (availSpots.length === 0) {
      return {
        score: 0,
      };
    }

    const moves: Move[] = [];
    for (let i = 0; i < availSpots.length; i++) {
      const move: Move = {};
      move.index = tiles[availSpots[i]];
      tiles[availSpots[i]] = counter;
      if (counter === player2.counter) {
        const result = this.minimax(player1.counter);
        move.score = result.score;
      } else {
        const result = this.minimax(player2.counter);
        move.score = result.score;
      }

      tiles[availSpots[i]] = move.index;

      moves.push(move);
    }
    let bestMove;
    if (counter === player2.counter) {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  };

  public render(): JSX.Element {
    const styles = {
      fontFamily: "Oswald",
    };

    const { disableClicks } = this.state;
    const { player } = this.props;
    const {
      difficulty,
      noPlayers,
      player1,
      player2,
      currentTurn,
      currentPlayer,
    } = player;
    return (
      <div style={styles}>
        <div className="scores">
          <div className="player1score">
            <div className="player1Label animated slideInLeft">
              {player1.name || "Player 1"}:{" "}
            </div>
            <div id="p1score">{player1.score}</div>
            <div>{currentPlayer}</div>
          </div>
          <div className="player2score">
            <div className="player2Label animated slideInRight">
              {noPlayers === 2
                ? player2.name
                : `${(difficulty === 1 && "Easy") ||
                    (difficulty === 2 && "Normal") ||
                    (difficulty === 3 && "Unbeatable")} AI`}
              :
            </div>
            <div id="p2score">{player2.score}</div>
          </div>
        </div>
        <div id="currentTurn">{currentTurn}</div>
        <div id="backBtnContainer" role="button" tabIndex={0} onClick={this.onResetClick}>
          <i className="fa fa-undo" />
        </div>
        <div className="grid">
          <div className="tile">
            <div
              className="tile-text"
              id="0"
              role="button"
              tabIndex={0}
              onClick={!disableClicks ? this.onTileClick : undefined}
            />
          </div>
          <div className="tile">
            <div
              className="tile-text"
              id="1"
              role="button"
              tabIndex={0}
              onClick={!disableClicks ? this.onTileClick : undefined}
            />
          </div>
          <div className="tile">
            <div
              className="tile-text"
              id="2"
              role="button"
              tabIndex={0}
              onClick={!disableClicks ? this.onTileClick : undefined}
            />
          </div>
          <div className="tile">
            <div
              className="tile-text"
              id="3"
              role="button"
              tabIndex={0}
              onClick={!disableClicks ? this.onTileClick : undefined}
            />
          </div>
          <div className="tile">
            <div
              className="tile-text"
              id="4"
              role="button"
              tabIndex={0}
              onClick={!disableClicks ? this.onTileClick : undefined}
            />
          </div>
          <div className="tile">
            <div
              className="tile-text"
              id="5"
              role="button"
              tabIndex={0}
              onClick={!disableClicks ? this.onTileClick : undefined}
            />
          </div>
          <div className="tile">
            <div
              className="tile-text"
              id="6"
              role="button"
              tabIndex={0}
              onClick={!disableClicks ? this.onTileClick : undefined}
            />
          </div>
          <div className="tile">
            <div
              className="tile-text"
              id="7"
              role="button"
              tabIndex={0}
              onClick={!disableClicks ? this.onTileClick : undefined}
            />
          </div>
          <div className="tile">
            <div
              className="tile-text"
              id="8"
              role="button"
              tabIndex={0}
              onClick={!disableClicks ? this.onTileClick : undefined}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch): any => ({
  reset: (): void => dispatch(playerActions.reset()),
  changePlayer: (): void => dispatch(playerActions.changePlayer()),
  updateCurrentTurn: (turn: string): void =>
    dispatch(playerActions.updateCurrentTurn(turn)),
  playerOneScore: (): void => dispatch(playerActions.playerOneScore()),
  playerTwoScore: (): void => dispatch(playerActions.playerTwoScore()),
  resetScore: (): void => dispatch(playerActions.resetScore()),
  setCurrentPlayer: (player: number): void =>
    dispatch(playerActions.setCurrentPlayer(player)),
  resetBoard: (): void => dispatch(boardActions.resetBoard()),
  addMove: (board): void => dispatch(boardActions.addMove(board)),
});

const mapStateToProps = ({ player, board }) => ({ player, board });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TicTacToe);
