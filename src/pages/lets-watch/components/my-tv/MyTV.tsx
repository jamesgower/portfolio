import React, { Component } from "react";
import { connect } from "react-redux";
import Result from "../containers/Result";
import * as actions from "../../actions/auth.actions";
import NavBar from "../navbar/NavBar";
import { AuthState, LetsWatchState } from "../../interfaces/app.i";

interface Props {
  fetchUser: () => void;
  letsWatch: LetsWatchState;
  auth: AuthState;
}

class MyTV extends Component<Props> {
  public constructor(props) {
    super(props);
    const { fetchUser } = this.props;
    fetchUser();
  }
  public render(): JSX.Element {
    const {
      letsWatch: {
        auth: { profile },
      },
    } = this.props;
    return profile ? (
      <div className="tv__container">
        <NavBar />
        {profile.tvShows ? (
          profile.tvShows.map(
            (show): JSX.Element => <Result key={show} id={show} type="tv" />,
          )
        ) : (
          <p>Add some tv shows to see them here! </p>
        )}
      </div>
    ) : (
      <p>Loading</p>
    );
  }
}

const mapStateToProps = ({ letsWatch }) => ({ letsWatch });

export default connect(mapStateToProps, actions)(MyTV);
