import * as React from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav } from "reactstrap";

const logo = require("../../public/images/logo.png");

/**
 * TODO
 * [ ] Sort out styling for TicTacToe & Pomodoro navbars
 */

interface NavBarProps {
  update?: Function;
  pomo?: boolean;
  ttt?: boolean;
}

interface NavBarState {
  active: boolean;
  isOpen: boolean;
}

const initialState: NavBarState = {
  active: false,
  isOpen: false,
};

export default class NavBar extends React.Component<NavBarProps, NavBarState> {
  public readonly state = initialState;

  private onClose = (): void => {
    const { update } = this.props;
    this.setState({ active: true });
    setTimeout((): void => {
      update(false);
    }, 1000);
  };

  private toggle = (): void => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  public render(): JSX.Element {
    const { active, isOpen } = this.state;
    const { update } = this.props;
    return (
      <div className={active ? "animated slideOutUp" : "animated slideInDown"}>
        <div className="nav-container">
          <Navbar className="navbar" color="faded" light expand="md">
            <NavLink to="/">
              <img src={logo} alt="JG Web Developer" className="logo" />
            </NavLink>
            <hr className="seperator" />
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavLink
                  className="nav-item nav-home"
                  exact
                  to="/"
                  activeClassName="active--home"
                >
                  Home
                </NavLink>
                <NavLink
                  className="nav-item nav-portfolio"
                  to="/portfolio"
                  activeClassName="active--portfolio"
                >
                  Portfolio
                </NavLink>
                <NavLink
                  className="nav-item nav-qual"
                  to="/skills"
                  activeClassName="active--qualifications"
                >
                  Skills
                </NavLink>
                <NavLink
                  className="nav-item nav-me"
                  to="/contact-me"
                  activeClassName="active--qualifications"
                >
                  About Me
                </NavLink>
              </Nav>
            </Collapse>
          </Navbar>
          {update && (
            <span
              role="button"
              tabIndex={0}
              className="closeNav"
              onClick={this.onClose}
            >
              <i className="fa fa-times animated pulse infinite" />
            </span>
          )}
        </div>
      </div>
    );
  }
}
