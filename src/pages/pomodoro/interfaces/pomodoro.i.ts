interface PomodoroState {
  workTime: number;
  breakTime: number;
  workTimerSeconds: number;
  breakTimerSeconds: number;
  currentTimer: string;
}

export { PomodoroState as default };
