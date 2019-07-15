import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Button } from "reactstrap";
import { setNumPlayers } from "../actions/player.action";
import ActionTypes, {
  SetNumPlayersAction,
  OpponentDispatchProps,
} from "../interfaces/actions.i";

interface ChooseOpponentsProps {
  setNumPlayers: Function;
}

const ChooseOpponents: React.SFC<ChooseOpponentsProps> = ({
  setNumPlayers,
}): JSX.Element => {
  return (
    <div
      style={{
        fontFamily: "Oswald",
      }}
    >
      <div className="opponents__container animated slideInDown">
        <h1 className="opponents__title">Welcome to Tic-Tac-Toe!</h1>
        <h3 className="opponents__subtitle">
          Would you like to try your luck against the computer,
          <br />
          or play against a friend?
        </h3>
        <h3 className="opponents__subtitle-two">
          There are 3 different difficulties to choose <br />
          when playing a one player game!
        </h3>
        <div className="opponents__button-container">
          <Button
            className="opponents__button"
            outline
            color="secondary"
            size="lg"
            onClick={(): void => setNumPlayers(1)}
          >
            1 Player
          </Button>
          <Button
            className="opponents__button"
            outline
            color="secondary"
            size="lg"
            onClick={(): void => setNumPlayers(2)}
          >
            2 Player
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>): OpponentDispatchProps => ({
  setNumPlayers: (num: number): SetNumPlayersAction => dispatch(setNumPlayers(num)),
});

export default connect<{}, OpponentDispatchProps>(
  null,
  mapDispatchToProps,
)(ChooseOpponents);
