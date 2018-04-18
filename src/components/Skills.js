import React from 'react';
import Headroom from 'react-headroom';
import NavBar from './NavBar';
import { Container } from 'reactstrap';

export default class Skills extends React.Component {
	constructor() {
		super();

		this.state = {
			desktop: window.innerWidth > 768,
			mobile: window.innerWidth < 576
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

		const skills = [
			{
				skill: 'React',
				rating: 80,
				color: '#17A2B8',
			},
			{
				skill: 'Redux',
				rating: 70,
				color: '#007BFF',
			},
			{
				skill: 'HTML',
				rating: 90,
				color: '#DC3545',
			},
			{
				skill: 'SASS',
				rating: 60,
				color: '#28A745',
			},
			{
				skill: 'Java',
				rating: 60,
				color: '#6C757D',
			},
			{
				skill: 'Node.JS',
				rating: 60,
				color: '#FFC107',
			},
		];

		const skillSet = skills
			.sort((a, b) => {
				return b.rating > a.rating;
			})
			.map((skill, i) => {
				return (
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
							width: this.state.desktop ? '120px' : this.state.mobile ? '50px' : '80px',
							height: this.state.desktop ? '120px' : this.state.mobile ? '50px' : '80px',
							display: 'inline-block',
							margin: '5px'
						}}
					/>
				);
			});

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
					<div className="skillContainer">{skillSet}</div>
				</Container>
			</div>
		);
	}
}
