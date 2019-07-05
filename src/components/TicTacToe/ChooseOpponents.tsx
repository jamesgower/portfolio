import * as React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { setNumPlayers } from "./actions/player.action";

interface ChooseOpponentsProps {
  setNumPlayers: Function;
}

const ChooseOpponents: React.SFC<ChooseOpponentsProps> = (
  props,
): JSX.Element => {
  const styles = {
    fontFamily: "Oswald",
  };

  const { setNumPlayers } = props;

  return (
    <div style={styles}>
      <div className="setup-TTT animated slideInDown">
        <h1 id="title-TTT">Welcome to Tic-Tac-Toe!</h1>
        <h3 className="subtitle-TTT">
          Would you like to try your luck against the computer,
          <br />
          or play against a friend?
        </h3>
        <h3 className="subtitle-2-TTT">
          There are 3 different difficulties to choose <br />
          when playing a one player game!
        </h3>
        <div className="button-container-TTT">
          <Button
            className="playerChoice"
            outline
            color="secondary"
            size="lg"
            onClick={() => setNumPlayers(1)}
          >
            1 Player
          </Button>
          <Button
            className="playerChoice"
            outline
            color="secondary"
            size="lg"
            onClick={() => setNumPlayers(2)}
          >
            2 Player
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setNumPlayers: numPlayers => dispatch(setNumPlayers(numPlayers)),
});

export default connect(
  undefined,
  mapDispatchToProps,
)(ChooseOpponents);
