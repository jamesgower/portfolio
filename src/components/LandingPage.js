import React from 'react';
import TypedJSText from './TypedJSText';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const LandingPage = () => (
	<div className="landingPageBackground">
		<TypedJSText />
		<div className="button__container">
			<Link className="button__link" to="/portfolio">
				<Button outline size="lg" color="secondary" className="button__enter animated slideInRight">
					Enter Site
				</Button>
			</Link>
		</div>
	</div>
);
export default LandingPage;
