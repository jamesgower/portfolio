import React from 'react';
import { Container, Button } from 'reactstrap';
import Headroom from 'react-headroom';
import NavBar from './NavBar';

export default () => {
	return (
		<div className="background">
			<Headroom>
				<NavBar />
			</Headroom>
			<Container className="content-container">
				<h2 className="blog-title">E X P E N S I F Y</h2>
				<h2 className="blog-subtitle">Accessing the project</h2>
				<p className="blog-text">
					The projects source code can be accessed using the 'View Source Code' button below, which is hosted
					on GitHub. The full project can be found on Heroku using the 'View Project' button. The project is
					hosted using Heroku's free plan, so it may take a few seconds for it to be retrieved on the first
					time.
				</p>
				<div className="blogify-btn-container">
					<Button
						outline
						color="success"
						size="lg"
						className="btn-left"
						onClick={() => (location.href = 'https://react-expenify-app.herokuapp.com/')}
					>
						View Project
					</Button>
					<Button
						outline
						color="secondary"
						size="lg"
						className="btn-right"
						onClick={() => (location.href = 'https://github.com/jamesgower/react-course-expensify-app')}
					>
						View Source Code
					</Button>
				</div>
				<h2 className="blog-subtitle">Overview</h2>
				<p className="blog-text">
					Expensify is a project that was built alongside Andrew Mead's 'Complete React Web Development'
					course. During this course I learnt the fundamentals of React, Redux, FireBase and Webpack. The
					project is a finance tracking app, where all expenses are stored through the expense form, which are
					then stored in a FireBase database.
				</p>
				<img src='./images/expenses.jpg' alt="Expense in app Dashboard" className="expenses"/>
				<p className="blog-text">
					The expenses can be filtered through the date added, or alternatively through the cost of the
					expense. All expenses can be edited and deleted as needed. There is also an option to view all of
					the expenses which are hidden through the filter options, so a user can know how much money they've
					input into the application from their first use.
				</p>
				<h2 className="blog-subtitle">Technologies Used</h2>
				<ul className="blog-text">
					<li>Babel - for using the latest JS features in all modern browsers</li>
					<li>Express - for creating a development server</li>
					<li>React 16 - for the user interface</li>
					<li>Redux - for maintaining consistent state throughout the whole application</li>
					<li>Redux Thunk - allows action creators to be functions rather than actions</li>
					<li>Webpack - used for bundling all modules together</li>
					<li>Jest & Enzyme - For testing react components</li>
				</ul>
			</Container>
		</div>
	);
};
