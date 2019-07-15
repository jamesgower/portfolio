export interface NavBarProps {
  closeNav?: () => void;
  color: string;
}

export interface NavBarState {
  isOpen: boolean;
  hiddenNav: boolean;
}
