export interface NavBarProps {
  closeNav?: () => void;
  color: string;
  navBackground?: string;
}

export interface NavBarState {
  isOpen: boolean;
  hiddenNav: boolean;
  collapsed: boolean;
}
