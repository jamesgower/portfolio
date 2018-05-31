import React from 'react';
import Headroom from 'react-headroom';
import NavBar from './NavBar';
import { Container } from 'reactstrap';

export default class Skills extends React.Component {
	constructor() {
		super();

		this.state = {
			desktop: window.innerWidth > 768,
			mobile: window.innerWidth < 576,
			modalChoice: 'design'
		};
	}

	componentDidMount() {
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions = () => {
		let desktop = window.innerWidth > 768;
		let mobile = window.innerWidth < 576;

			this.setState({ desktop, mobile });
	};

	render() {
		var ProgressBar = require('react-progressbar.js');
		var Circle = ProgressBar.Circle;

		const frontEndSkills = [{
				skill: 'React',
				rating: 80,
				color: '#17A2B8',
				description: 'Very strong understand of React - Completed multiple courses and built majority of apps with this technology.'
			},
			{
				skill: 'Redux',
				rating: 70,
				color: '#007BFF',
				description: 'Strong understanding of Redux - Used this technology in a large portion of my projects & completed courses on Redux.'
			},
			{
				skill: 'HTML',
				rating: 90,
				color: '#DC3545',
				description: 'Very strong understanding of all coding techniques.'
			},
		];

		const backEndSkills = [{
				skill: 'Node.JS',
				rating: 65,
				color: '#FFC107',
				description: 'Currently learning this technology, can build back-end servers with Node.JS with Express.'
			},
			{
				skill: 'Java',
				rating: 55,
				color: '#6C757D',
				description: 'Understanding of Object-Oriented concepts and good practices. Studied for years in college.'
			},
		];

		const designSkills = [{
			skill: 'SASS',
			rating: 60,
			color: '#28A745',
			description: 'Strong understanding of SASS functions and coding techniques. Used in almost all portfolio projects.'
		}];

		const groupSkills = [{
			skill: 'Front End Skills',
			rating: 80,
			color: '#7d42f4',
			description: 'Test'
		},
		{
			skill: 'Back End Skills',
			rating: 60,
			color: '#417df4',
			description: 'Test',
		},
		{
			skill: 'Design Skills',
			rating: 60,
			color: '#f49441',
			description: 'Test'
		}];

		const skillSet = (skill) => {
			return skill.sort((a, b) => {
				return b.rating > a.rating;
			})
			.map((skill, i) => {
				return (
					<div className="col-md-4 col-sm-6 col-xs-6 skillSet">
						<div className="skillContainer" onClick={() => alert(skill.skill)}>				
							<Circle
								key={i}
								options={{
									strokeWidth: 5,
									color: skill.color,
									duration: 2000,
									easing: 'bounce',
									trailColor: '#eee',
									text: {
										value: skill.skill,
										style: {
											fontSize: this.state.desktop ? '22px' : this.state.mobile ? '12px' : '16px',
											position: 'absolute',
											left: '50%',
											top: '50%',
											padding: 0,
											margin: 0,
											transform: {
												prefix: true,
												value: 'translate(-50%, -50%)',
											},
										},
									},
								}}
								text={skill.skill}
								progress={skill.rating / 100}
								initialAnimate={true}
								containerStyle={{
									marginTop: '5px',
									width: '100%',
									height: '100%',
								}}
							/>
						</div>
					</div>
				);
			});
		};

		const frontEnd = skillSet(frontEndSkills);
		const backEnd = skillSet(backEndSkills);
		const design = skillSet(designSkills);
		const group = skillSet(groupSkills);

		return (
			<div className="background">
				<Headroom>
					<NavBar />
				</Headroom>
				<Container className="content-container">
					<h1 className="skills--title">Skills</h1>
					<p className="blog-text">
						I began my programming journey by learning Java and Web Development at West Kent College while
						completing my HNC in Computing course. I continued building these skills for a while longer
						after I left by completed courses on Udemy and training with sites such as CodeWars and
						HackerRank.
					</p>
					<p className="blog-text">
						I then become interested the buzz around JavaScript frameworks like React and Angular, so I
						completed various courses on all the different skills I would need to create applications, until
						I could do just that - build applications!
					</p>
					<div className="row">
						<div className="skillCircle">
							{group}
						</div>
					</div>
					<h2 className="blog-subtitle">Courses</h2>
					<ul>
						<li>HNC in Computing @ West Kent College - Completed course in 2017 with 3 * Pass Grade</li>
						<li>BTEC Level 3 in ICT Practitioners @ West Kent College - Completed course in 2014 with 3 * Pass Grade</li>
						<li>FreeCodeCamp Front End Development Certification - Completed certification in 2018</li>
						<li>Andrew Mead's Complete React Masterclass Course (With Redux) - Completed course in 2018</li>
						<li>Stephen Grider's Node with React: Full Stack Web Development course - Completed course in 2018</li>
						<li>Andrew Mead's The Complete Node.js Developer Course - Currently completing</li>
						<li>Tim Buchulka's Complete Java Masterclass course - Currently completing</li>
						<li>Maximillian Schwarzmuller's Angular 5 - The Complete Guide course - Currently completing</li>
						<li>Brad Hussey's Ultimate Web Designer & Developer Course - Currently completing</li>
					</ul>
					<img src="https://www.codewars.com/users/jamesgower94/badges/large" />
				</Container>
			</div>
		);
	}
}
