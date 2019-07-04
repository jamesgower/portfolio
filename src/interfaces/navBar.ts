/* NavBar */
export interface NavBarProps {
  closeNav?: Function;
}

export interface NavBarState {
  isOpen: boolean;
  hiddenNav: boolean;
}

/* HiddenNavBar */
export interface HiddenNavState {
  showNav: boolean;
}
