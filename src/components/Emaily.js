import React from 'react';
import Headroom from 'react-headroom';
import NavBar from './NavBar';
import { Container, Button } from 'reactstrap';

export default () => {
	return (
		<div className="background">
			<Headroom>
				<NavBar />
			</Headroom>
			<Container className="content-container">
				<h2 className="portfolio--title">E M A I L Y</h2>
				<h2 className="blog-subtitle">Accessing the Project</h2>
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
				<div className="row">
					<div className="col-md-8 overview-container">
						<h2 className="blog-subtitle">Overview</h2>
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
					</div>
					<div className="col-md-4">
						<div className="stripe-container">
							<img
								src="/images/emaily-payment.png"
								alt="Payment with Stripe"
								className="stripe-payment"
							/>
						</div>
					</div>
				</div>
				<img
					src="/images/emaily-dashboard.png"
					alt="Example of the Emaily dashboard after surveys sent"
					className="emaily-dashboard"
				/>

				<h2 className="blog-subtitle">Usage</h2>
				<p className="blog-text">
					The customer must login through Google's OAuth authentication, by logging in with their Google
					account. Once the user is logged in, the customer must add payment by using the 'Add Credits'
					button. To create a mock payment, the user must enter any email and use '4242 4242 4242 4242' as the
					credit card number. No payment is made during this mock transaction. One the customer has 'paid',
					surveys can be sent using the survey creation form. Any emails which are input into the 'recipients'
					field are then sent an email, of which they can respond 'Yes' or 'No' to. All results are then
					displayed on the dashboard - as shown in the left image.
				</p>
			</Container>
		</div>
	);
};
