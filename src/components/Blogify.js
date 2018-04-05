import React from 'react';
import Headroom from 'react-headroom';
import NavBar from './NavBar';
import { Container, Button } from 'reactstrap';

// TODO
// [ ] Media queries for mobile

export default () => {
	return (
		<div className="background">
			<Headroom>
				<NavBar />
			</Headroom>
			<Container className="content-container">
				<h2 className="portfolio--title">B L O G I F Y</h2>
				<h2 className="blog-header">Accessing the Project</h2>
				<p className="blog-text">
					The project's source code can be found on GitHub using the 'View Source Code' button below, or
					alternatively the application can be accessed using the 'View Project' button. The application is
					hosted on Heroku's free plan, so it may take a few seconds for the server to retrieve the
					application for the first time.
				</p>
				<div className="blogify-btn-container">
					<Button
						outline
						color="success"
						size="lg"
						className="btn-left"
						onClick={() => (location.href = 'https://blogify-react.herokuapp.com/')}
					>
						View Project
					</Button>
					<Button
						outline
						color="secondary"
						size="lg"
						className="btn-right"
						onClick={() => (location.href = 'https://github.com/jamesgower/react-blog')}
					>
						View Source Code
					</Button>
				</div>
				<h2 className="blog-header">Overview</h2>
				<p className="blog-text">
					Blogify is an application which I built to test my React and Redux skills after completing various
					courses through Udemy. Blogify is a blogging application which can be browsed anonymously via the
					'Search' button, or alternatively a user can log in through one of the many social media options to
					publish a blog post to the servers.
				</p>
				<img src="/images/blogifyLogin.jpg" alt="Login via social media image" className="login" />

				<p className="blog-text">
					Once logged in, there are options to filter all of your posts, so you can search, edit or delete
					them as you feel necessary. The different ways that they can be filtered through is via the posts
					title or through any tags that were applied when the post was created. You can also filter the posts
					through the date which they were created by using the date pickers.
				</p>
				<p className="blog-text">
					The user can create a blog post using the <span className="button__add">Add Post</span> button which
					then shows a form for the user to create a post in. The blog post itself can be edited using the
					Quill editor, so it can be styled like a WYSIWYG Microsoft Word document. The editor also has the
					ability for code highlighting using the highlight.js library. This feature allows the user to add
					different code snippets, which are highlighted in different colours for different languages.
				</p>
				<img src="/images/post.jpg" alt="Post creation form image" className="post" />

				<p className="blog-header">Technologies Used</p>
				<ul className="blog-text">
					<li>Babel - for using latest JS features in all modern browsers</li>
					<li>Express - for creating development server</li>
					<li>FireBase - database for storing posts</li>
					<li>Quill - editor for creating blog posts</li>
					<li>React 16 - for the user interface</li>
					<li>React-Redux - for connecting React & Redux</li>
					<li>React-Router - for navigating around the application</li>
					<li>Redux - for maintaining consistent state throughout the whole application</li>
					<li>Redux Thunk - allows action creators to be functions rather than an action</li>
					<li>Webpack - used for bundling all modules together</li>
					<li>Jest & Enzyme - For testing react components</li>
				</ul>
			</Container>
		</div>
	);
};
