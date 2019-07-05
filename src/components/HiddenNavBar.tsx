import * as React from "react";
import { HiddenNavState } from "../interfaces/navBar";
import NavBar from "./NavBar";
/**
 * TODO
 * [ ] Sort out styling for TicTacToe & Pomodoro navbars
 */

const initialState: HiddenNavState = {
  showNav: false,
};

class HiddenNavBar extends React.Component<{}, HiddenNavState> {
  public readonly state = initialState;
  private navBurgerRef = React.createRef<HTMLElement>();

  private onOpenNav = (): void => {
    const navBurger = this.navBurgerRef.current;
    navBurger.classList.remove("pulse", "infinite");
    navBurger.classList.add("fadeOut");
    setTimeout((): void => {
      this.setState({ showNav: true });
    }, 300);
  };

  private onCloseNav = (): void => {
    const navBurger = this.navBurgerRef.current;
    navBurger.classList.remove("fadeOut");
    navBurger.classList.add("pulse", "infinite", "fadeIn");
    setTimeout((): void => {
      navBurger.classList.remove("fadeIn");
      this.setState({ showNav: false });
    }, 300);
  };

  public render(): JSX.Element {
    const { showNav } = this.state;
    return (
      <div>
        <i
          className="fa fa-bars animated pulse infinite nav__burger"
          role="button"
          ref={this.navBurgerRef}
          tabIndex={0}
          onClick={this.onOpenNav}
        />
        {showNav && (
          <div className="animated slideInDown">
            <NavBar closeNav={this.onCloseNav} />
          </div>
        )}
      </div>
    );
  }
}

export default HiddenNavBar;
