import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Button, Input } from "reactstrap";
import * as playerActions from "../actions/player.action";
import { NameState, Player, NameProps } from "../interfaces/components.i";
import ActionTypes, {
  ResetAction,
  SetupPlayersAction,
  NameDispatchProps,
} from "../interfaces/actions.i";

class ChooseNames extends React.Component<NameProps, NameState> {
  public readonly state: NameState = {
    player1: {
      name: "",
      counter: "X",
    },
    player2: {
      name: "",
      counter: "O",
    },
    difficulty: 2,
  };

  public componentDidMount(): void {
    const { player2 } = this.state;
    const { noPlayers } = this.props;
    if (noPlayers === 1) {
      this.setState({
        player2: {
          ...player2,
          name: "Normal AI",
        },
      });
    }
  }

  private onPlayerNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    player: number,
  ): void => {
    const name = e.target.value;
    const { player1, player2 } = this.state;
    player === 1
      ? this.setState({
          player1: {
            ...player1,
            name,
          },
        })
      : this.setState({
          player2: {
            ...player2,
            name,
          },
        });
  };

  private onChangeCounter = (): void => {
    const { player1, player2 } = this.state;
    this.setState({
      player1: {
        ...player1,
        counter: player1.counter === "X" ? "O" : "X",
      },
      player2: {
        ...player2,
        counter: player2.counter === "X" ? "O" : "X",
      },
    });
  };

  private onChangeDifficulty = (difficulty: number): void => {
    let name;
    switch (difficulty) {
      case 1:
        name = "Easy AI";
        break;
      case 2:
        name = "Normal AI";
        break;
      case 3:
        name = "Unbeatable AI";
        break;
      default:
        break;
    }

    const { player2 } = this.state;
    this.setState({
      difficulty,
      player2: {
        ...player2,
        name,
      },
    });
  };

  private onSubmit = (): void => {
    const { player1, player2, difficulty } = this.state;
    const { setupPlayers } = this.props;

    if (player1.name.length === 0) player1.name = "Player 1";
    if (player2.name.length === 0) player2.name = "Player 2";

    setupPlayers(player1, player2, difficulty);
  };

  public render(): JSX.Element {
    const { difficulty, player1, player2 } = this.state;
    const { reset, noPlayers } = this.props;
    return (
      <div
        className="names__container animated fadeIn"
        style={{
          fontFamily: "Oswald",
        }}
      >
        <div id="scores__back-button" onClick={reset} role="button" tabIndex={0}>
          <i className="fa fa-undo" />
        </div>
        <div className="names__player-text-container">
          {noPlayers === 1 ? (
            <h2 className="names__player-text">
              Please input your name and choose the difficulty you wish to play on.
            </h2>
          ) : (
            <h2 className="names__player-text">
              Please input your names. You can also change your counter by clicking on
              your player name too.
            </h2>
          )}
        </div>
        <div className="names__setup-names--container">
          <div className="names__player-container">
            <p className="names__player-label-text">Player 1:</p>
            <Input
              className="names__player-input"
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                this.onPlayerNameChange(e, 1)
              }
              autoFocus
              value={player1.name}
            />
          </div>

          {noPlayers === 2 && (
            <div className="names__player-container">
              <p className="names__player-label-text">Player 2:</p>
              <Input
                className="names__player-input"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  this.onPlayerNameChange(e, 2)
                }
                value={player2.name}
              />
            </div>
          )}
        </div>

        {noPlayers === 1 && (
          <div>
            <h3 className="names__choose-difficulty">
              What difficulty would you like to play against?
            </h3>
            <div className="names__button-container">
              <Button
                active={difficulty === 1}
                className="names__difficulty-button"
                color="success"
                onClick={(): void => this.onChangeDifficulty(1)}
                outline
                size="lg"
              >
                Easy
              </Button>
              <Button
                active={difficulty === 2}
                className="names__difficulty-button"
                color="warning"
                onClick={(): void => this.onChangeDifficulty(2)}
                outline
                size="lg"
              >
                Normal
              </Button>
              <Button
                active={difficulty === 3}
                className="names__difficulty-button"
                color="danger"
                onClick={(): void => this.onChangeDifficulty(3)}
                outline
                size="lg"
              >
                Unbeatable
              </Button>
            </div>
          </div>
        )}
        <div
          className={
            noPlayers === 1
              ? "names__counter-container--player1"
              : "names__counter-container--player2"
          }
        >
          <div
            onClick={this.onChangeCounter}
            role="button"
            tabIndex={0}
            className="names__counter-container"
          >
            <p>{player1.name.length > 0 ? player1.name : "Player 1"}:</p>
            <div className="names__counter--player1">{player1.counter}</div>
          </div>
          <div
            className="names__counter-container"
            onClick={this.onChangeCounter}
            role="button"
            tabIndex={0}
          >
            <p>{player2.name.length > 0 ? player2.name : "Player 2"}:</p>
            <div className="names__counter--player2">{player2.counter}</div>
          </div>
        </div>
        <div className="names__button-container">
          <Button
            className="names__play-button"
            outline
            size="lg"
            color="primary"
            onClick={this.onSubmit}
          >
            Play Game!
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>): NameDispatchProps => ({
  reset: (): ResetAction => dispatch(playerActions.reset()),
  setupPlayers: (
    player1: Player,
    player2: Player,
    difficulty: number,
  ): SetupPlayersAction =>
    dispatch(playerActions.setupPlayers(player1, player2, difficulty)),
});

export default connect<NameDispatchProps>(
  null,
  mapDispatchToProps,
)(ChooseNames);
