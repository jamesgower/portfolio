export interface ScoreBoardProps {
  player1ScoreRef: React.RefObject<HTMLDivElement>;
  player2ScoreRef: React.RefObject<HTMLDivElement>;
  enableTiles: () => void;
}
