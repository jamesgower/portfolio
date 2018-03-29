import React from 'react';
import Headroom from 'react-headroom';
import NavBar from './NavBar';

export default () => {
	return (
		
		<div>
			<Headroom>
				<NavBar />
			</Headroom>
			<div className="content-container">
				<h2 className="portfolio--title">E M A I L Y</h2>		
			</div>
		</div>
	);
};
