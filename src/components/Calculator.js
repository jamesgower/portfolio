import React from 'react';
import math from 'mathjs';
/* 
	TODO
	[x] Complete calculator
	[ ] Put calculator component in react modal on click from portfolio 
	[x] add CE functionality
	[ ] add tests
*/
class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			answer: undefined,
			currentNumArray: [],
			previousNums: [],
			equation: [],
			lockEquations: false,
			lockDot: false,
			lockNums: false,
		};
	}

	onButtonClick = e => {
		if (this.state.currentNumArray.length > 6 && this.state.currentNumArray.length < 10) {
			document.getElementById('outcome').classList = 'smallerInput';
		} else if (this.state.currentNumArray.length >= 10) {
			document.getElementById('outcome').classList = 'smallestInput';
		} else {
			document.getElementById('outcome').classList = '';
		}
		const value = e.target.value;
		if (value === '.') {
			this.setState({ lockDot: true });
		}
		let nums = this.state.currentNumArray;
		nums.push(value);
		this.setState({ currentNumArray: nums, lockEquations: false });
	};

	onEquationClick = e => {
		document.getElementById('outcome').classList = '';
		if (this.state.previousNums.length > 0) {
			this.setState({
				answer: undefined,
				currentNumArray: [],
				equation: [this.state.previousNums[this.state.previousNums.length - 1], [e.target.value]],
				lockEquations: true,
				lockDot: false,
				lockNums: false,
			});
		} else {
			const method = e.target.value;
			const equation = this.state.equation;
			equation.push(this.state.currentNumArray.join(''));
			equation.push(method);
			this.setState({ equation, currentNumArray: [], lockEquations: true });
		}
	};

	onCancelClick = e => {
		document.getElementById('outcome').classList = '';
		const cancelType = e.target.value;
		if (cancelType === 'ce') {
			if (this.state.currentNumArray.length > 0) {
				let newNumArr = this.state.currentNumArray;
				newNumArr = newNumArr.slice(0, -1);
				this.setState({
					currentNumArray: newNumArr,
					lockNums: false,
				});
			}
		} else if (cancelType === 'ac') {
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

	onEqualsClick = () => {
		if (this.state.equation !== undefined) {
			const equation = this.state.equation;
			equation.push(this.state.currentNumArray.join(''));
			const answer = math.eval(equation.join(''));
			const previousNums = this.state.previousNums;
			previousNums.push(answer);
			if (answer.toString().split('').length > 6 && answer.toString().split('').length < 10) {
				document.getElementById('outcome').classList = 'smallerInput';
			} else if (answer.toString().split('').length >= 10) {
				document.getElementById('outcome').classList = 'smallestInput';
			} else {
				document.getElementById('outcome').classList = '';
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

	render() {
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
							{this.state.answer === undefined
								? this.state.currentNumArray.length > 0 ? this.state.currentNumArray.join('') : 0
								: this.state.answer}
						</div>
						<div id="sums">{this.state.equation.join('')}</div>
					</div>

					<div id="buttons">
						<button className="redBtn calcBtn" onClick={this.onCancelClick} value="ac">
							AC
						</button>
						<button className="redBtn calcBtn" onClick={this.onCancelClick} value="ce">
							CE
						</button>
						<button
							className={!this.state.lockEquations ? 'orangeBtn calcBtn' : 'orangeBtn calcBtn--disabled'}
							onClick={!this.state.lockEquations && this.onEquationClick}
							value="/"
						>
							&divide;
						</button>
						<button
							className={!this.state.lockEquations ? 'orangeBtn calcBtn' : 'orangeBtn calcBtn--disabled'}
							onClick={!this.state.lockEquations && this.onEquationClick}
							value="*"
						>
							x
						</button>

						<button
							className={!this.state.lockNums ? 'calcBtn' : 'calcBtn--disabled'}
							onClick={!this.state.lockNums && this.onButtonClick}
							value="7"
						>
							7
						</button>
						<button
							className={!this.state.lockNums ? 'calcBtn' : 'calcBtn--disabled'}
							onClick={!this.state.lockNums && this.onButtonClick}
							value="8"
						>
							8
						</button>
						<button
							className={!this.state.lockNums ? 'calcBtn' : 'calcBtn--disabled'}
							onClick={!this.state.lockNums && this.onButtonClick}
							value="9"
						>
							9
						</button>
						<button
							className={!this.state.lockEquations ? 'orangeBtn calcBtn' : 'orangeBtn calcBtn--disabled'}
							onClick={!this.state.lockEquations && this.onEquationClick}
							value="-"
						>
							-
						</button>

						<button
							className={!this.state.lockNums ? 'calcBtn' : 'calcBtn--disabled'}
							onClick={!this.state.lockNums && this.onButtonClick}
							value="4"
						>
							4
						</button>
						<button
							className={!this.state.lockNums ? 'calcBtn' : 'calcBtn--disabled'}
							onClick={!this.state.lockNums && this.onButtonClick}
							value="5"
						>
							5
						</button>
						<button
							className={!this.state.lockNums ? 'calcBtn' : 'calcBtn--disabled'}
							onClick={!this.state.lockNums && this.onButtonClick}
							value="6"
						>
							6
						</button>
						<button
							className={!this.state.lockEquations ? 'orangeBtn calcBtn' : 'orangeBtn calcBtn--disabled'}
							onClick={!this.state.lockEquations && this.onEquationClick}
							value="+"
						>
							+
						</button>

						<button
							className={!this.state.lockNums ? 'calcBtn' : 'calcBtn--disabled'}
							onClick={!this.state.lockNums && this.onButtonClick}
							value="1"
						>
							1
						</button>
						<button
							className={!this.state.lockNums ? 'calcBtn' : 'calcBtn--disabled'}
							onClick={!this.state.lockNums && this.onButtonClick}
							value="2"
						>
							2
						</button>
						<button
							className={!this.state.lockNums ? 'calcBtn' : 'calcBtn--disabled'}
							onClick={!this.state.lockNums && this.onButtonClick}
							value="3"
						>
							3
						</button>
						<button
							className={!this.state.lockNums ? 'calcBtn' : 'calcBtn--disabled'}
							onClick={!this.state.lockNums && this.onButtonClick}
							id="zeroButton"
							value="0"
						>
							0
						</button>
						<button className="calcBtn" onClick={!this.state.lockDot && this.onButtonClick} value=".">
							.
						</button>
						<button
							className={!this.state.lockEquations ? 'greenBtn calcBtn' : 'greenBtn calcBtn--disabled'}
							onClick={!this.state.lockEquations && this.onEqualsClick}
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
