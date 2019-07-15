import * as React from "react";
import { HiddenNavState, HiddenNavProps } from "../interfaces/hiddenNavBar.i";
import NavBar from "./NavBar";

class HiddenNavBar extends React.Component<HiddenNavProps, HiddenNavState> {
  public readonly state: HiddenNavState = {
    showNav: false,
  };
  private navBurgerRef = React.createRef<HTMLElement>();

  public componentDidMount(): void {
    const { color } = this.props;
    if (color) this.navBurgerRef.current.style.color = color;
  }

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
    const { color } = this.props;
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
            <NavBar closeNav={this.onCloseNav} color={color} />
          </div>
        )}
      </div>
    );
  }
}

export default HiddenNavBar;
