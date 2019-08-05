import React, { Component, MouseEvent } from "react";
import { evaluate } from "mathjs/dist/math.min";
import CalculatorState from "../interfaces/calculator.i";
/* 
	TODO
	[x] Complete calculator
	[x] Put calculator component in react modal on click from portfolio 
	[x] add CE functionality
*/
class Calculator extends Component<{}, CalculatorState> {
  public readonly state: CalculatorState = {
    answer: undefined,
    currentNumArray: [],
    previousNums: [],
    equation: [],
    lockEquations: false,
    lockDot: false,
    lockNums: false,
  };

  private onButtonClick = (e: MouseEvent<HTMLButtonElement>): void => {
    const { currentNumArray } = this.state;
    const { length } = currentNumArray;
    if (length > 6 && length < 10) {
      document.getElementById("outcome").className = "smallerInput";
    } else if (length >= 10) {
      document.getElementById("outcome").className = "smallestInput";
    } else {
      document.getElementById("outcome").className = "";
    }
    const { value } = e.target as HTMLButtonElement;
    if (value === ".") {
      this.setState({ lockDot: true });
    }
    currentNumArray.push(parseInt(value, 10));
    this.setState({ currentNumArray, lockEquations: false });
  };

  private onEquationClick = (e: MouseEvent<HTMLButtonElement>): void => {
    const { previousNums, equation, currentNumArray } = this.state;
    const { length } = previousNums;
    const { value: method } = e.target as HTMLButtonElement;
    document.getElementById("outcome").className = "";
    if (previousNums.length > 0) {
      this.setState({
        answer: undefined,
        currentNumArray: [],
        equation: [previousNums[length - 1], [method]],
        lockEquations: true,
        lockDot: false,
        lockNums: false,
      });
    } else {
      equation.push(currentNumArray.join(""));
      equation.push(method);
      this.setState({ equation, currentNumArray: [], lockEquations: true });
    }
  };

  private onCancelClick = (e: MouseEvent<HTMLButtonElement>): void => {
    const { currentNumArray } = this.state;
    const { length } = currentNumArray;
    const { value: cancelType } = e.target as HTMLButtonElement;
    document.getElementById("outcome").className = "";
    if (cancelType === "ce") {
      if (length > 0) {
        this.setState({
          currentNumArray: currentNumArray.slice(0, -1),
          lockNums: false,
        });
      }
    } else {
      this.setState({
        answer: undefined,
        currentNumArray: [],
        equation: [],
        lockEquations: false,
        lockDot: false,
        lockNums: false,
        previousNums: [],
      });
    }
  };

  private onEqualsClick = (): void => {
    const { equation, currentNumArray, previousNums } = this.state;
    if (equation !== undefined) {
      equation.push(currentNumArray.join(""));
      const answer = evaluate(equation.join(""));
      previousNums.push(answer);
      const { length } = answer.toString().split("");
      if (length > 6 && length < 10) {
        document.getElementById("outcome").className = "smallerInput";
      } else if (length >= 10) {
        document.getElementById("outcome").className = "smallestInput";
      } else {
        document.getElementById("outcome").className = "";
      }
      this.setState({
        answer,
        equation,
        previousNums,
        currentNumArray: [],
        lockEquations: false,
        lockDot: false,
        lockNums: true,
      });
    }
  };

  public render(): JSX.Element {
    const {
      answer,
      equation,
      currentNumArray,
      lockEquations,
      lockDot,
      lockNums,
    } = this.state;
    return (
      <div className="calculator-container">
        <div id="calculator">
          <div id="title" className="text-center">
            <h4>
              <b>Electronic Calculator</b>
            </h4>
          </div>

          <div id="entrybox" className="text-right">
            <div id="outcome">
              {answer === undefined
                ? currentNumArray.length > 0
                  ? currentNumArray.join("")
                  : 0
                : answer}
            </div>
            <div id="sums">{equation.join("")}</div>
          </div>

          <div id="buttons">
            <button
              className="red-btn calcBtn"
              type="button"
              onClick={this.onCancelClick}
              value="ac"
            >
              AC
            </button>
            <button
              className="red-btn calcBtn"
              type="button"
              onClick={this.onCancelClick}
              value="ce"
            >
              CE
            </button>
            <button
              className={
                !lockEquations ? "orange-btn calcBtn" : "orange-btn calcBtn--disabled"
              }
              type="button"
              onClick={!lockEquations ? this.onEquationClick : undefined}
              value="/"
            >
              &divide;
            </button>
            <button
              className={
                !lockEquations ? "orange-btn calcBtn" : "orange-btn calcBtn--disabled"
              }
              type="button"
              onClick={!lockEquations ? this.onEquationClick : undefined}
              value="*"
            >
              x
            </button>

            <button
              className={!lockNums ? "calcBtn" : "calcBtn--disabled"}
              type="button"
              onClick={!lockNums ? this.onButtonClick : undefined}
              value="7"
            >
              7
            </button>
            <button
              className={!lockNums ? "calcBtn" : "calcBtn--disabled"}
              type="button"
              onClick={!lockNums && this.onButtonClick}
              value="8"
            >
              8
            </button>
            <button
              className={!lockNums ? "calcBtn" : "calcBtn--disabled"}
              type="button"
              onClick={!lockNums ? this.onButtonClick : undefined}
              value="9"
            >
              9
            </button>
            <button
              className={
                !lockEquations ? "orange-btn calcBtn" : "orange-btn calcBtn--disabled"
              }
              type="button"
              onClick={!lockEquations ? this.onEquationClick : undefined}
              value="-"
            >
              -
            </button>

            <button
              className={!lockNums ? "calcBtn" : "calcBtn--disabled"}
              type="button"
              onClick={!lockNums ? this.onButtonClick : undefined}
              value="4"
            >
              4
            </button>
            <button
              className={!lockNums ? "calcBtn" : "calcBtn--disabled"}
              type="button"
              onClick={!lockNums ? this.onButtonClick : undefined}
              value="5"
            >
              5
            </button>
            <button
              className={!lockNums ? "calcBtn" : "calcBtn--disabled"}
              type="button"
              onClick={!lockNums ? this.onButtonClick : undefined}
              value="6"
            >
              6
            </button>
            <button
              className={
                !lockEquations ? "orange-btn calcBtn" : "orange-btn calcBtn--disabled"
              }
              type="button"
              onClick={!lockEquations ? this.onEquationClick : undefined}
              value="+"
            >
              +
            </button>

            <button
              className={!lockNums ? "calcBtn" : "calcBtn--disabled"}
              type="button"
              onClick={!lockNums ? this.onButtonClick : undefined}
              value="1"
            >
              1
            </button>
            <button
              className={!lockNums ? "calcBtn" : "calcBtn--disabled"}
              type="button"
              onClick={!lockNums ? this.onButtonClick : undefined}
              value="2"
            >
              2
            </button>
            <button
              className={!lockNums ? "calcBtn" : "calcBtn--disabled"}
              type="button"
              onClick={!lockNums ? this.onButtonClick : undefined}
              value="3"
            >
              3
            </button>
            <button
              className={!lockNums ? "calcBtn" : "calcBtn--disabled"}
              type="button"
              onClick={!lockNums ? this.onButtonClick : undefined}
              id="zeroButton"
              value="0"
            >
              0
            </button>
            <button
              className="calcBtn"
              type="button"
              onClick={!lockDot ? this.onButtonClick : undefined}
              value="."
            >
              .
            </button>
            <button
              className={
                !lockEquations ? "green-btn calcBtn" : "green-btn calcBtn--disabled"
              }
              type="button"
              onClick={!lockEquations ? this.onEqualsClick : undefined}
              id="equalButton"
              value="="
            >
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Calculator;
