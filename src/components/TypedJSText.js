import React from 'react';
import Typed from 'typed.js';

class TypedJSText extends React.Component {
	componentDidMount() {
		const options = {
			strings: [
				'responsive websites.',
				'full-stack applications',
				'java applications',
				'mobile friendly websites',
			],
			startDelay: 1000,
			backDelay: 1000,
			typeSpeed: 100,
			loop: true,
			loopCount: false,
			backSpeed: 100,
			shuffle: true,
			autoInsertCss: true,
			cursorChar: '|'
		};
		this.typed = new Typed(this.el, options);
	}

	componentWillUnmount() {
		// Destroying Typed instance on unmounting to prevent memory leaks
		this.typed.destroy();
	}

	render() {
		return (
			<div className="type-wrap">
				<h1 className="typed animated bounceInLeft">Hello, I am James.</h1>
				<h2 id="typedSubHeading" className="typed animated bounceInLeft 100">
					I design and build&nbsp;
					<span
						style={{ whiteSpace: 'pre' }}
						ref={el => {
							this.el = el;
						}}
					/>
				</h2>
			</div>
		);
	}
}

export default TypedJSText;
