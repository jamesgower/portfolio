import { PlayerState } from "./components.i";

export interface ScoreBoardProps {
  onResetClick: () => void;
  player?: PlayerState;
  player1ScoreRef: React.RefObject<HTMLDivElement>;
  player2ScoreRef: React.RefObject<HTMLDivElement>;
}
