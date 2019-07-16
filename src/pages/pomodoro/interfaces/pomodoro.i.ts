interface PomodoroState {
  workTime: number;
  breakTime: number;
  timerSeconds: number;
  workTimerOn: boolean;
  time: string;
}

export { PomodoroState as default };
