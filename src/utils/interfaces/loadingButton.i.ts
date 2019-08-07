export interface LoadingButtonProps {
  children: string;
  awaitingResponse: boolean;
  color?: string;
  onClick: () => void;
}
