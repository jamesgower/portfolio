import React from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav } from "reactstrap";
import { NavBarProps, NavBarState } from "../interfaces/navBar.i";
import logo from "../images/logo.png";

/**
 * TODO
 * [ ] Fix X so it fits inline with navbar toggler
 */

class NavBar extends React.Component<NavBarProps, NavBarState> {
  public readonly state: NavBarState = {
    isOpen: false,
    hiddenNav: false,
    collapsed: window.innerWidth <= 767,
  };

  private navBarRef = React.createRef<HTMLDivElement>();
  private closeBtnRef = React.createRef<HTMLImageElement>();
  private homeLink = React.createRef<HTMLParagraphElement>();
  private portfolioLink = React.createRef<HTMLParagraphElement>();
  private skillsLink = React.createRef<HTMLParagraphElement>();
  private aboutMeLink = React.createRef<HTMLParagraphElement>();

  public componentWillMount(): void {
    const { closeNav } = this.props;
    if (closeNav) this.setState({ hiddenNav: true });
  }

  public componentDidMount(): void {
    const { color, closeNav } = this.props;

    this.homeLink.current.style.color = color;
    this.portfolioLink.current.style.color = color;
    this.skillsLink.current.style.color = color;
    this.aboutMeLink.current.style.color = color;

    window.addEventListener(
      "resize",
      (): void => this.setState({ collapsed: window.innerWidth <= 767 }),
    );

    if (closeNav) {
      this.closeBtnRef.current.style.color = color;
    }
  }

  public componentWillUnmount(): void {
    window.removeEventListener(
      "resize",
      (): void => this.setState({ collapsed: window.innerWidth <= 767 }),
    );
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

    closeBtn.classList.add("fadeOut");
    setTimeout((): void => {
      nav.classList.add("animated", "slideOutUp");
    }, 500);

    setTimeout((): void => {
      closeNav();
    }, 700);
  };

  public render(): JSX.Element {
    const { isOpen, hiddenNav, collapsed } = this.state;
    const { navBackground, color } = this.props;
    return (
      <>
        <div
          className="nav__container"
          ref={this.navBarRef}
          style={{
            borderBottom: collapsed ? `1px solid ${color}` : "",
            borderRadius: collapsed ? "10px" : "",
            background:
              collapsed && isOpen ? `url(${navBackground}) no-repeat fixed center` : "",
          }}
        >
          {hiddenNav && (
            <i
              onClick={this.onCloseButton}
              role="button"
              tabIndex={0}
              className="fa fa-times animated pulse infinite nav__close-button"
              ref={this.closeBtnRef}
            />
          )}
          <Navbar
            className={collapsed && isOpen ? "nav__collapsed" : ""}
            color="faded"
            dark={hiddenNav}
            light={!hiddenNav}
            expand="md"
          >
            <NavLink to="/">
              <img src={logo} alt="JG Web Developer" className="nav__logo" />
            </NavLink>
            <hr className="nav__separator" />
            <NavbarToggler
              className={`nav__toggle--${color}`}
              onClick={this.onNavToggle}
            />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavLink
                  className="nav__home"
                  exact
                  to="/"
                  activeClassName="nav__home--active"
                >
                  <p ref={this.homeLink} className="nav__link-text">
                    Home
                  </p>
                </NavLink>
                <NavLink
                  className="nav__portfolio"
                  to="/portfolio"
                  activeClassName="nav__portfolio--active"
                >
                  <p ref={this.portfolioLink} className="nav__link-text">
                    Portfolio
                  </p>
                </NavLink>
                <NavLink
                  className="nav__skills"
                  to="/skills"
                  activeClassName="nav__skills--active"
                >
                  <p ref={this.skillsLink} className="nav__link-text">
                    Skills
                  </p>
                </NavLink>
                <NavLink
                  className="nav__about-me"
                  to="/contact-me"
                  activeClassName="nav__about-me--active"
                >
                  <p ref={this.aboutMeLink} className="nav__link-text">
                    About Me
                  </p>
                </NavLink>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </>
    );
  }
}

export default NavBar;
