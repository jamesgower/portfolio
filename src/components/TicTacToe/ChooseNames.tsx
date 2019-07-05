import * as React from "react";
import { connect } from "react-redux";
import { Button, Input, Row, Col } from "reactstrap";
import { NameState, NameProps } from "../../interfaces/ticTacToe";
import { reset } from "./actions/player.action";

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
        ai: undefined,
      },
    ],
    difficulty: 2,
  };

  public componentWillMount(): void {}

  public componentDidMount(): void {
    document.getElementById("players-TTT").className =
      "players-TTT animated fadeIn";
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

  // private onPlayer2NameChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  // ): void => {
  //   const name = e.target.value;
  //   const { playerInfo } = this.state;
  //   playerInfo[1].name = name;
  //   this.setState({
  //     playerInfo,
  //   });
  // };

  private onChangeDifficulty = (difficulty: number): void => {
    this.setState({ difficulty });
  };

  private onSubmit = (e): void => {
    e.preventDefault();
    // this.props.update({
    //   p1name: this.state.p1name === "" ? "Player One" : this.state.p1name,
    //   p2name: this.state.p2name === "" ? "Player Two" : this.state.p2name,
    //   difficulty:
    //     this.state.difficulty === undefined ? 2 : this.state.difficulty,
    //   player1Counter: this.state.player1Counter,
    //   player2Counter: this.state.player2Counter,
    //   aiCounter: this.state.aiCounter,
    // });
  };

  private onChangeCounter = (): void => {
    const { playerInfo } = this.state;
    playerInfo[0].counter === "X" ? "O" : "X";
    playerInfo[1].counter === "X" ? "O" : "X";
    this.setState({
      playerInfo,
    });
  };

  public render(): JSX.Element {
    const { difficulty, playerInfo } = this.state;
    return (
      <div id="players-TTT">
        <div id="backBtnContainer" onClick={this.props.restart}>
          <i className="fa fa-undo" />
        </div>

        {this.props.noPlayers === 1 && (
          <h2 className="onePlayerNames">
            Please input your name and choose the difficulty you wish to play
            on.
          </h2>
        )}
        {this.props.noPlayers === 2 && (
          <h2 className="twoPlayerNames">
            Please input your names. You can also change your counter by
            clicking on your player name too.
          </h2>
        )}
        <Row className="pNameInput">
          <Col xs={{ size: 2 }} />
          <Col xs={{ size: 4 }}>
            <label className="playerLbl">Player 1:</label>
          </Col>
          <Col xs={5}>
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

        {this.props.noPlayers === 2 && (
          <Row className="pNameInput">
            <Col xs={{ size: 2 }} />
            <Col xs={{ size: 4 }}>
              <label className="playerLbl">Player 2:</label>
            </Col>
            <Col xs={5}>
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

        {this.props.noPlayers === 1 && (
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
          className={
            this.props.noPlayers === 1 ? "chooseCounterOne" : "chooseCounterTwo"
          }
        >
          <div onClick={this.onChangeCounter} className="counters-container">
            <label className="counterLbl">
              {playerInfo[0].name.length > 0 ? playerInfo[0].name : "Player 1"}:
            </label>
            <div className="counter">{playerInfo[0].counter}</div>
          </div>
          <div className="counters-container" onClick={this.onChangeCounter}>
            <label className="counterLbl">
              {this.props.noPlayers === 1
                ? "Computer"
                : playerInfo[1].name.length > 0
                ? playerInfo[1].name
                : "Player 2"}
              :
            </label>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChooseNames);
