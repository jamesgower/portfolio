import * as React from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav } from "reactstrap";
import { NavBarProps, NavBarState } from "../interfaces/navBar";

const closeIcon = require("../../public/images/closeBtn.svg");

/**
 * TODO
 * [ ] Fix animation for clicking X button when close prop is passed
 * [ ] Better close button
 */

const logo = require("../../public/images/logo.png");

const initialState = {
  isOpen: false,
  hiddenNav: false,
};

class NavBar extends React.Component<NavBarProps, NavBarState> {
  public readonly state = initialState;
  private navBarRef = React.createRef<HTMLDivElement>();
  private closeBtnRef = React.createRef<HTMLImageElement>();

  public componentWillMount(): void {
    const { closeNav } = this.props;
    if (closeNav) this.setState({ hiddenNav: true });
  }

  private onNavToggle = (): void => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  private onCloseButton = (): void => {
    const { closeNav } = this.props;
    const nav = this.navBarRef.current;
    const closeBtn = this.closeBtnRef.current;

    nav.classList.add("animated", "slideOutUp");
    closeBtn.classList.add("animated", "slideOutUp");
    setTimeout((): void => {
      closeNav();
    }, 300);
  };

  public render(): JSX.Element {
    const { isOpen, hiddenNav } = this.state;
    return (
      <>
        <div className="nav__container" ref={this.navBarRef}>
          <Navbar color="faded" light expand="md">
            <NavLink to="/">
              <img src={logo} alt="JG Web Developer" className="logo" />
            </NavLink>
            <hr className="seperator" />
            <NavbarToggler onClick={this.onNavToggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavLink
                  className="nav__home"
                  exact
                  to="/"
                  activeClassName="nav__home--active"
                >
                  Home
                </NavLink>
                <NavLink
                  className="nav__portfolio"
                  to="/portfolio"
                  activeClassName="nav__portfolio--active"
                >
                  Portfolio
                </NavLink>
                <NavLink
                  className="nav__skills"
                  to="/skills"
                  activeClassName="nav__skills--active"
                >
                  Skills
                </NavLink>
                <NavLink
                  className="nav__about-me"
                  to="/contact-me"
                  activeClassName="nav__about-me--active"
                >
                  About Me
                </NavLink>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        {hiddenNav && (
          <span
            role="button"
            tabIndex={0}
            className="closeNav"
            onClick={this.onCloseButton}
          >
            <img
              alt="Close Nav Button"
              src={closeIcon}
              className="animated pulse infinite"
              ref={this.closeBtnRef}
            />
          </span>
        )}
      </>
    );
  }
}

export default NavBar;
