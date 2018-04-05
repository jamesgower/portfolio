import React from 'react';
import Headroom from 'react-headroom';
import NavBar from './NavBar';
import { Container, Row, Col, Button } from 'reactstrap';

export default () => {
	return (
		<div className="background">
			<Headroom>
				<NavBar />
			</Headroom>
			<Container className="content-container">
				<h2 className="portfolio--title">E M A I L Y</h2>
				<h2 className="blog-header">Accessing the Project</h2>
				<p className="blog-text">
					The project's source code can be found on GitHub using the 'View Source Code' button below, or
					alternatively the application can be accessed by using the 'View Project' button. The application is
					hosted on Heroku's free plan, so it may take a few seconds for the server to retrieve the
					application for the first time.
				</p>
				<div className="blogify-btn-container">
					<Button
						outline
						color="success"
						size="lg"
						className="btn-left"
						onClick={() => (location.href = 'https://emaily-full-stack.herokuapp.com')}
					>
						View Project
					</Button>
					<Button
						outline
						color="secondary"
						size="lg"
						className="btn-right"
						onClick={() => (location.href = 'https://github.com/jamesgower/emaily')}
					>
						View Source Code
					</Button>
				</div>
				<Row>
					<Col sm="8" className="overview-container">
						<h2 className="blog-header">Overview</h2>
						<p className="blog-text">
							Emaily is a Full-Stack application built alongside Stephen Grider's Node With React: Full
							Stack Web Development course on Udemy, which can be found{' '}
							<a href="https://www.udemy.com/node-with-react-fullstack-web-development" target="_blank">
								here
							</a>.
						</p>
						<p className="blog-text">
							Emaily is an application which allows customers to buy credits securely through Stripe, so
							they can then send emails to up to 200,000 different users to get feedback on their product.
							The email can be fully customisable by the customer, although the main objective is to send
							a question which can be answered with a simple 'Yes' or 'No' click. All clicks are recorded
							in the Emaily dashboard, so the customer can get a quick overview of what the customers
							thought of which product. Customers can send 1 batch of emails per 1 credit, and customers
							can buy as many credits as they see fit in a 'pay-as-you-go' purchasing technique.
						</p>
					</Col>
					<Col sm="4">
						<div className="stripe-container">
							<img
								src="/images/emaily-payment.png"
								alt="Payment with Stripe"
								className="stripe-payment"
							/>
						</div>
					</Col>
				</Row>
				<Row>
					<Col lg={{ size: 12 }}>
						<h2 className="blog-header">Usage</h2>
						<p className="blog-text" style={{ marginBottom: '30px' }}>
							The customer must login through Google's OAuth authentication, by logging in with their
							Google account. Once the user is logged in, the customer must add payment by using the 'Add
							Credits' button. To create a mock payment, the user must enter any email and use '4242 4242
							4242 4242' as the credit card number. No payment is made during this mock transaction. One
							the customer has 'paid', surveys can be sent using the survey creation form. Any emails
							which are input into the 'recipients' field are then sent an email, of which they can
							respond 'Yes' or 'No' to. All results are then displayed on the dashboard - as shown in the
							image below.
						</p>
					</Col>
					<Col sm={{ size: 8, offset: 2 }}>
						<div className="emaily-container">
							<img
								src="/images/emaily-dashboard.png"
								alt="Example of the Emaily dashboard after surveys sent"
								className="emaily-dashboard"
							/>
						</div>
					</Col>
				</Row>
				<h2 className="blog-header">Technologies</h2>
				<h2 className="blog-subtitle">Back-End</h2>
				<ul className="blog-text">
					<li>Body Parser - for formatting the fetch request's body</li>
					<li>Concurrently - to load server & client servers concurrently</li>
					<li>Cookie Sessions - to store data in cookie's with configuration</li>
					<li>Express - to set up the server</li>
					<li>Nodemon - to keep the server running without needing to restart when changes are made</li>
					<li>Stripe - for secure payments through the server</li>
					<li>SendGrid - dedicated API for sending emails through express server</li>
				</ul>
				<h2 className="blog-subtitle">Front-End</h2>
				<ul className="blog-text">
					<li>Axios - for making XML HTTP requests from node/browser</li>
					<li>Materialize-CSS - for styling the front-end</li>
					<li>React 16 - for creating the front end components</li>
					<li>React-Redux - for connecting React & Redux</li>
					<li>React-Router - for navigating around the application</li>
					<li>Redux - for maintaining consistent state throughout the whole application</li>
					<li>Redux Form - for creating form components which can be stored via Redux</li>
					<li>Redux Thunk - allows action creators to be functions rather than an action</li>
				</ul>
			</Container>
		</div>
	);
};
