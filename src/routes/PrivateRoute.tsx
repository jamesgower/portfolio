import React, { useEffect, Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import NavBar from "../pages/lets-watch/components/navbar/NavBar";
import * as actions from "../pages/lets-watch/actions/auth.actions";
import { AppState } from "../store/store";

class PrivateRoute extends Component {
  public constructor(props) {
    super(props);
    this.props.fetchUser();
  }
  public render(): JSX.Element {
    const {
      letsWatch: {
        auth: { profile },
      },
      ...rest
    } = this.props;
    console.log(profile);
    return (
      <Route
        {...rest}
        component={(props): JSX.Element =>
          profile !== null ? (
            <>
              <NavBar />
              <Component {...props} />
            </>
          ) : (
            <Redirect to="/lets-watch" />
          )
        }
      />
    );
  }
}

const mapStateToProps = ({ letsWatch }) => ({ letsWatch });

export default connect(mapStateToProps, actions)(PrivateRoute);
