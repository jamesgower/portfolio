import * as React from "react";
import { connect } from "react-redux";
import { PlayProps, PlayState, GameWon, Move } from "./interfaces/components";
import {
  reset,
  changePlayer,
  playerScore,
  updateCurrentTurn,
  resetScore,
} from "./actions/player.action";
import { addMove, resetBoard } from "./actions/board.action";

/**
 * TODO
 * [ ] Fix onTileClick
 * [ ] Refactor
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
    gameFinished: false,
    endGame: false,
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
      this.onResetBoard();
    }
  }

  public componentDidUpdate(): void {
    document.getElementById("currentTurn").className = "animated fadeIn";
    setTimeout((): void => {
      document.getElementById("currentTurn").className = "";
    }, 300);
  }

  public onTileClick = (event): void => {
    const { player, board } = this.props;
    const { noPlayers, player1, player2, currentPlayer } = player;
    const { tiles } = board;

    const id = event.target.id;
    document.getElementById("currentTurn").className = "";

    if (typeof tiles[id] === "number") {
      if (!this.checkTie()) {
        if (noPlayers === 1) {
          this.takeTurn(id, player1.counter);
          if (!this.checkWin(player1.counter) && !this.checkTie()) {
            this.setState({ endGame: true });
            setTimeout((): void => {
              this.takeTurn(this.bestSpot(), player2.counter);
              if (this.checkTie() || this.checkWin(player2.counter)) {
                return this.setState({ gameFinished: true });
              }
              this.setState({ endGame: false });
            }, 1000);
          }
        } else {
          if (!this.checkTie()) {
            if (currentPlayer === 1) {
              this.takeTurn(id, player1.counter);
            } else if (currentPlayer === 2) {
              this.takeTurn(id, player2.counter);
            }
          }
        }
      }
    }
  };

  private takeTurn = (squareId: string, playerCounter: string): void => {
    const { player, addMove, changePlayer, board, updateCurrentTurn } = this.props;
    const { currentPlayer, player1, player2 } = player;
    const { tiles } = board;

    // ! CHANGE TO MAPPING SOON (addMove) //
    const newBoard = tiles;
    newBoard[squareId] = playerCounter;

    const tile = document.getElementById(squareId);
    tile.innerText = playerCounter;
    tile.className =
      currentPlayer === 1
        ? "tile-text-p1 animated fadeIn"
        : "tile-text-p2 animated fadeIn";

    addMove(newBoard);
    currentPlayer === 1 ? this.checkWin(player1.counter) : this.checkWin(player2.counter);
    if (currentPlayer === 1) {
      updateCurrentTurn(`It's ${player2.name}'s turn`);
    } else {
      updateCurrentTurn(`It's ${player1.name}'s turn`);
    }
    changePlayer();
  };

  public checkWin = (player): GameWon => {
    const { board } = this.props;
    const { tiles } = board;

    const plays = tiles.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
    let gameWon = null;
    for (const [index, win] of winCombos.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        gameWon = {
          index: index,
          player: player,
        };
        break;
      }
    }
    if (gameWon) {
      this.gameOver(gameWon);
    }
    return gameWon;
  };

  private gameOver = (gameWon: GameWon): void => {
    const { player, playerScore, updateCurrentTurn, resetBoard } = this.props;
    const { player1, player2, noPlayers } = player;

    for (const index of winCombos[gameWon.index]) {
      document.getElementById(index).style.backgroundColor =
        gameWon.player === player1.counter ? "green" : "red";
      document.getElementById(index).className = "tile-text animated tada";
    }
    if (noPlayers === 1) {
      gameWon.player === player1.counter
        ? document.getElementById("p1score").classList.add("scoringAnimation")
        : document.getElementById("p2score").classList.add("scoringAnimation");

      if (gameWon.player === player1.counter) {
        playerScore(1);
        return updateCurrentTurn(`${player1.name} Wins!`);
      }
      playerScore(2);
      updateCurrentTurn("The Computer Wins!");
    } else {
      if (gameWon.player === player1.counter) {
        playerScore(1);
        return updateCurrentTurn(`${player1.name} Wins!`);
      }
      playerScore(2);
      return updateCurrentTurn(`${player2.name} Wins!`);
    }
    this.setState({
      endGame: true,
      gameFinished: true,
    });
    resetBoard();
  };

  private onResetClick = (): void => {
    const { resetBoard, resetScore } = this.props;
    setTimeout((): void => {
      this.setState({
        endGame: false,
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
    return tiles.filter((s): boolean => typeof s == "number");
  };

  private bestSpot = (): string => {
    const { player } = this.props;
    const { difficulty, player2 } = player;
    const length = this.emptyTiles().length;
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
    }
  };

  private onResetBoard = (): void => {
    const { player, resetBoard } = this.props;
    const { noPlayers, currentPlayer, player1, player2 } = player;

    setTimeout((): void => {
      resetBoard();
      this.setState({
        endGame: false,
        gameFinished: false,
      });
      if (noPlayers === 2) {
        if (currentPlayer === 1) {
          updateCurrentTurn(`It's ${player2.name}'s turn`);
        } else {
          updateCurrentTurn(`It's ${player1.name}'s turn`);
        }
      } else {
        if (currentPlayer === 1) {
          updateCurrentTurn("AI is thinking...");
        } else {
          updateCurrentTurn(`It's ${player1.name}'s turn`);
        }
      }
      document.getElementById("p1score").className = "";
      document.getElementById("p2score").className = "";

      for (let i = 0; i < 9; i++) {
        const index = i.toString();
        document.getElementById(index).style.background = "none";
        document.getElementById(index).innerText = "";
      }

      if (currentPlayer === 1 && noPlayers === 1) {
        this.setState({ endGame: true });
        setTimeout((): void => {
          this.takeTurn(this.bestSpot(), player2.counter);
          this.setState({ endGame: false });
        }, 1000);
      }
    }, 1500);
  };

  private checkTie = (): boolean => {
    const { updateCurrentTurn } = this.props;
    if (this.emptyTiles().length === 0 && !this.checkWin("X") && !this.checkWin("O")) {
      this.setState({
        gameFinished: true,
        endGame: true,
      });
      updateCurrentTurn("It's a draw!");
      return true;
    }
    return false;
  };

  private minimax = (counter): Move => {
    const { player, board } = this.props;
    const { player1, player2 } = player;
    const { tiles } = board;
    const availSpots = this.emptyTiles();

    if (this.checkWin(player1.counter)) {
      return {
        score: -10,
      };
    } else if (this.checkWin(player2.counter)) {
      return {
        score: 10,
      };
    } else if (availSpots.length === 0) {
      return {
        score: 0,
      };
    }

    const moves: Move[] = [];
    for (let i = 0; i < availSpots.length; i++) {
      const move: Move = {};
      move.index = tiles[availSpots[i]];
      tiles[availSpots[i]] = counter;
      if (counter == player2.counter) {
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

    const { endGame } = this.state;
    const { player } = this.props;
    const { difficulty, noPlayers, player1, player2, currentTurn } = player;
    return (
      <div style={styles}>
        <div className="scores">
          <div className="player1score">
            <div className="player1Label animated slideInLeft">
              {player1.name || "Player 1"}:{" "}
            </div>
            <div id="p1score">{player1.score}</div>
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
              onClick={!endGame ? this.onTileClick : undefined}
            />
          </div>
          <div className="tile">
            <div
              className="tile-text"
              id="1"
              role="button"
              tabIndex={0}
              onClick={!endGame ? this.onTileClick : undefined}
            />
          </div>
          <div className="tile">
            <div
              className="tile-text"
              id="2"
              role="button"
              tabIndex={0}
              onClick={!endGame ? this.onTileClick : undefined}
            />
          </div>
          <div className="tile">
            <div
              className="tile-text"
              id="3"
              role="button"
              tabIndex={0}
              onClick={!endGame ? this.onTileClick : undefined}
            />
          </div>
          <div className="tile">
            <div
              className="tile-text"
              id="4"
              role="button"
              tabIndex={0}
              onClick={!endGame ? this.onTileClick : undefined}
            />
          </div>
          <div className="tile">
            <div
              className="tile-text"
              id="5"
              role="button"
              tabIndex={0}
              onClick={!endGame ? this.onTileClick : undefined}
            />
          </div>
          <div className="tile">
            <div
              className="tile-text"
              id="6"
              role="button"
              tabIndex={0}
              onClick={!endGame ? this.onTileClick : undefined}
            />
          </div>
          <div className="tile">
            <div
              className="tile-text"
              id="7"
              role="button"
              tabIndex={0}
              onClick={!endGame ? this.onTileClick : undefined}
            />
          </div>
          <div className="tile">
            <div
              className="tile-text"
              id="8"
              role="button"
              tabIndex={0}
              onClick={!endGame ? this.onTileClick : undefined}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ player, board }) => ({ player, board });

const mapDispatchToProps = (dispatch): any => ({
  reset: () => dispatch(reset()),
  resetBoard: () => dispatch(resetBoard()),
  addMove: tiles => dispatch(addMove(tiles)),
  changePlayer: () => dispatch(changePlayer()),
  updateCurrentTurn: turn => dispatch(updateCurrentTurn(turn)),
  playerScore: player => dispatch(playerScore(player)),
  resetScore: () => dispatch(resetScore()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TicTacToe);
