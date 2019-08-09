import React from "react";
import scrollToElement from "scroll-to-element";
import { NavLink, withRouter } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav } from "reactstrap";
import { NavBarProps, NavBarState } from "../interfaces/navBar.i";
import logo from "../images/logo.png";

/*
  TODO
  [ ] Nav toggler color set from navColor
  [x] Remove focused outline on Nav
*/

class NavBar extends React.Component<NavBarProps, NavBarState> {
  public readonly state: NavBarState = {
    isOpen: false,
    hiddenNav: false,
    collapsed: window.innerWidth <= 767,
  };

  private navBarRef = React.createRef<HTMLDivElement>();
  private closeBtnRef = React.createRef<HTMLImageElement>();
  private homeLink = React.createRef<HTMLDivElement>();
  private portfolioLink = React.createRef<HTMLDivElement>();
  private contactLink = React.createRef<HTMLDivElement>();
  private aboutMeLink = React.createRef<HTMLDivElement>();

  public componentWillMount(): void {
    const { closeNav } = this.props;
    if (closeNav) this.setState({ hiddenNav: true });
  }

  public componentDidMount(): void {
    const { color, closeNav } = this.props;
    this.homeLink.current.style.color = color;
    this.portfolioLink.current.style.color = color;
    this.contactLink.current.style.color = color;
    this.aboutMeLink.current.style.color = color;

    window.addEventListener("resize", this.onWindowResize);

    if (closeNav) {
      this.closeBtnRef.current.style.color = color;
    }
  }

  public componentWillUnmount(): void {
    window.removeEventListener("resize", this.onWindowResize);
  }

  private onWindowResize = (): void =>
    this.setState({ collapsed: window.innerWidth <= 767 });

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
    const { navBackground, color, active, history, home, navColor } = this.props;
    return (
      <>
        <div
          className="nav__container"
          ref={this.navBarRef}
          style={{
            borderBottom: collapsed ? `1px solid ${color}` : "",
            borderRadius: collapsed ? "10px" : "",
            background:
              collapsed && isOpen && navBackground
                ? `url(${navBackground}) no-repeat fixed center`
                : collapsed && isOpen && navColor
                ? navColor
                : "",
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
            <div className="nav__separator" />
            <NavbarToggler
              className={`nav__toggle--${color}`}
              onClick={this.onNavToggle}
            />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <div
                  className={active === "home" ? "nav__home--active" : "nav__home"}
                  ref={this.homeLink}
                  role="button"
                  tabIndex={0}
                  onClick={(): void => {
                    home ? scrollToElement("#landing-page") : history.push("/");
                  }}
                >
                  Home
                </div>
                <div
                  className={
                    active === "about" ? "nav__about-me--active" : "nav__about-me"
                  }
                  ref={this.aboutMeLink}
                  role="button"
                  tabIndex={0}
                  onClick={(): void => {
                    home ? scrollToElement("#about-me") : history.push("/#about-me");
                  }}
                >
                  About Me
                </div>
                <div
                  className={
                    active === "portfolio" ? "nav__portfolio--active" : "nav__portfolio"
                  }
                  ref={this.portfolioLink}
                  role="button"
                  tabIndex={0}
                  onClick={(): void => {
                    home
                      ? scrollToElement("#current-work")
                      : history.push("/#current-work");
                  }}
                >
                  Portfolio
                </div>
                <div
                  className={
                    active === "contact" ? "nav__contact--active" : "nav__contact"
                  }
                  ref={this.contactLink}
                  role="button"
                  tabIndex={0}
                  onClick={(): void => {
                    home
                      ? scrollToElement("#contact-form")
                      : history.push("/#contact-form");
                  }}
                >
                  Contact Me
                </div>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </>
    );
  }
}

export default withRouter(NavBar);
