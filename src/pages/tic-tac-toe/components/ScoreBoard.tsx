import React, { Component } from "react";
import { connect } from "react-redux";
import { ScoreBoardProps } from "../interfaces/scoreboard.i";
import { AppState } from "../interfaces/components.i";

class ScoreBoard extends Component<ScoreBoardProps> {
  public render(): JSX.Element {
    const {
      player: { player1, player2 },
      player1ScoreRef,
      player2ScoreRef,
      onResetClick,
    } = this.props;

    return (
      <div className="scores__container">
        <div className="scores__player1--container animated slideInLeft">
          {player1.name || "Player 1"}:{" "}
          <div id="p1score" ref={player1ScoreRef}>
            {player1.score}
          </div>
        </div>
        <div id="scores__back-button" role="button" tabIndex={0} onClick={onResetClick}>
          <i className="fa fa-undo" />
        </div>
        <div className="scores__player2--container animated slideInRight">
          {player2.name}:{" "}
          <div id="p2score" ref={player2ScoreRef}>
            {player2.score}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ player }): AppState => ({ player });

export default connect(mapStateToProps)(ScoreBoard);
