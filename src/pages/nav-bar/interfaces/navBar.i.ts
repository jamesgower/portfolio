import { History } from "history";

export interface NavBarProps {
  closeNav?: () => void;
  color: string;
  navBackground?: string;
  active: string;
  home?: boolean;
  history: History;
}

export interface NavBarState {
  isOpen: boolean;
  hiddenNav: boolean;
  collapsed: boolean;
}

export interface NavContext {
  color: string;
  navBackground: string;
}
