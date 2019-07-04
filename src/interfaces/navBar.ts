/* NavBar */
export interface NavBarProps {
  onCloseNav?: Function;
  close?: boolean;
}

export interface NavBarState {
  isOpen: boolean;
}

/* HiddenNavBar */
export interface HiddenNavState {
  showNav: boolean;
}
