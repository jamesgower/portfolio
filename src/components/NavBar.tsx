import * as React from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav } from "reactstrap";
import { NavBarProps, NavBarState } from "../interfaces/navBar";

/**
 * TODO
 * [ ] Fix animation for clicking X button when close prop is passed
 * [ ] Better close button
 */

const logo = require("../../public/images/logo.png");

const initialState = {
  isOpen: false,
};

class NavBar extends React.Component<NavBarProps, NavBarState> {
  public readonly state = initialState;

  private toggle = (): void => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  public render(): JSX.Element {
    const { isOpen } = this.state;
    const { close, onCloseNav } = this.props;
    return (
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
        {close && (
          <span
            role="button"
            tabIndex={0}
            className="closeNav"
            onClick={() => onCloseNav()}
          >
            <i className="fa fa-times animated pulse infinite" />
          </span>
        )}
      </div>
    );
  }
}

export default NavBar;
