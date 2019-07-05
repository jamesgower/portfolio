import * as React from "react";
import { connect } from "react-redux";
import { Button, Input, Row, Col } from "reactstrap";
import { NameState, NameProps } from "../../interfaces/ticTacToe";
import { reset, setupPlayers } from "./actions/player.action";

/**
 * {
    p1name: "",
    p2name: "",
    difficulty: 2,
    easySelected: false,
    normalSelected: true,
    unbeatableSelected: false,
    player1Counter: this.props.player1Counter,
    player2Counter: this.props.player2Counter,
    aiCounter: this.props.aiCounter,
  };
 */

class ChooseNames extends React.Component<NameProps, NameState> {
  public readonly state: NameState = {
    playerInfo: [
      {
        name: "",
        counter: "X",
      },
      {
        name: "",
        counter: "O",
        ai: this.props.noPlayers === 1,
      },
    ],
    difficulty: 2,
    readyToPlay: false,
  };

  public componentDidMount(): void {
    document.getElementById("players-TTT").classList.add("animated", "fadeIn");
  }

  private onPlayerNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    player: number,
  ): void => {
    const name = e.target.value;
    const { playerInfo } = this.state;
    playerInfo[player === 1 ? 0 : 1].name = name;
    this.setState({
      playerInfo,
    });
  };

  private onChangeCounter = (): void => {
    const { playerInfo } = this.state;
    if (playerInfo[0].counter === "X") {
      playerInfo[0].counter = "O";
      playerInfo[1].counter = "X";
    } else {
      playerInfo[0].counter = "X";
      playerInfo[1].counter = "O";
    }
    this.setState({
      playerInfo,
    });
  };

  private onChangeDifficulty = (difficulty: number): void => {
    this.setState({ difficulty });
  };

  private onSubmit = (): void => {
    const state = {
      ...this.state,
      readyToPlay: true,
    };
    const { setupPlayers } = this.props;
    setupPlayers(state);
  };

  public render(): JSX.Element {
    const { difficulty, playerInfo } = this.state;
    const { reset, noPlayers } = this.props;
    return (
      <div
        id="players-TTT"
        style={{
          fontFamily: "Oswald",
        }}
      >
        <div id="backBtnContainer" onClick={reset} role="button" tabIndex={0}>
          <i className="fa fa-undo" />
        </div>

        {noPlayers === 1 && (
          <h2 className="onePlayerNames">
            Please input your name and choose the difficulty you wish to play
            on.
          </h2>
        )}
        {noPlayers === 2 && (
          <h2 className="twoPlayerNames">
            Please input your names. You can also change your counter by
            clicking on your player name too.
          </h2>
        )}
        <Row className="pNameInput">
          <Col xs={{ size: 4, offset: 1 }}>
            <p className="playerLbl">Player 1:</p>
          </Col>
          <Col xs={6}>
            <Input
              className="playerInput"
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                this.onPlayerNameChange(e, 1)
              }
              autoFocus
              value={playerInfo[0].name}
            />
          </Col>
        </Row>

        {noPlayers === 2 && (
          <Row className="pNameInput">
            <Col xs={{ size: 4, offset: 1 }}>
              <p className="text-center playerLbl">Player 2:</p>
            </Col>
            <Col xs={6}>
              <Input
                className="playerInput"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  this.onPlayerNameChange(e, 2)
                }
                value={playerInfo[1].name}
              />
            </Col>
          </Row>
        )}

        {noPlayers === 1 && (
          <div>
            <h3 className="chooseDiff">
              What difficulty would you like to play against?
            </h3>
            <div className="button-container">
              <Button
                active={difficulty === 1}
                className="diffBtn"
                color="success"
                onClick={(): void => this.onChangeDifficulty(1)}
                outline
                size="lg"
              >
                Easy
              </Button>
              <Button
                active={difficulty === 2}
                className="diffBtn"
                color="warning"
                onClick={(): void => this.onChangeDifficulty(2)}
                outline
                size="lg"
              >
                Normal
              </Button>
              <Button
                active={difficulty === 3}
                className="diffBtn"
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
          className={noPlayers === 1 ? "chooseCounterOne" : "chooseCounterTwo"}
        >
          <div
            onClick={this.onChangeCounter}
            role="button"
            tabIndex={0}
            className="counters-container"
          >
            <p className="counterLbl">
              {playerInfo[0].name.length > 0 ? playerInfo[0].name : "Player 1"}:
            </p>
            <div className="counter">{playerInfo[0].counter}</div>
          </div>
          <div
            className="counters-container"
            onClick={this.onChangeCounter}
            role="button"
            tabIndex={0}
          >
            <p className="counterLbl">
              {noPlayers === 1
                ? "Computer"
                : playerInfo[1].name.length > 0
                ? playerInfo[1].name
                : "Player 2"}
              :
            </p>
            <div className="counter">{playerInfo[1].counter}</div>
          </div>
        </div>
        <div className="button-container">
          <Button
            className="playBtn"
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

const mapDispatchToProps = dispatch => ({
  reset: () => dispatch(reset()),
  setupPlayers: state => dispatch(setupPlayers(state)),
});

export default connect(
  undefined,
  mapDispatchToProps,
)(ChooseNames);
