import * as React from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav } from "reactstrap";
import { NavBarProps, NavBarState } from "../interfaces/navBar.i";

const closeIcon = require("../../../../public/images/closeBtn.svg");
const logo = require("../../../../public/images/logo.png");

const initialState: NavBarState = {
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
              <img src={logo} alt="JG Web Developer" className="nav__logo" />
            </NavLink>
            <hr className="nav__separator" />
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
          <span role="button" tabIndex={0} className="closeNav">
            <div
              className="animated pulse infinite nav__close-button"
              ref={this.closeBtnRef}
              onClick={this.onCloseButton}
              role="button"
              tabIndex={0}
            >
              <img alt="Close Nav Button" src={closeIcon} />
            </div>
          </span>
        )}
      </>
    );
  }
}

export default NavBar;
