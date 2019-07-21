interface CalculatorState {
  answer: number;
  currentNumArray: number[];
  previousNums: number[];
  equation: (number[] | string[] | number | string)[];
  lockEquations: boolean;
  lockDot: boolean;
  lockNums: boolean;
}

export { CalculatorState as default };
