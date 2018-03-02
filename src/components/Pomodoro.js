import React from 'react';
import { circleProgress } from 'jquery-circle-progress'; // eslint-disable-line no-unused-vars
import { soundManager } from 'soundmanager2';
import Timer from 'easytimer';
import NavBar from './NavBar';

class Pomodoro extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showComponent: false,
			pomo: true,
			navbar: true
		};
		this.updateState = this.updateState.bind(this);
	}

	updateState = (update) => {
		this.setState({ showComponent: update });
	}

	render() {
		var workTime = 25;
		var breakTime = 5;
		var breakTimer = new Timer();
		var timer = new Timer();

		$(document).ready(function() {
			$('#leftWork').click(function() {
				if (workTime > 1) {
					workTime--;
				}
				$('#workNum').text(workTime);
			});
			$('#rightWork').click(function() {
				workTime++;
				$('#workNum').text(workTime);
			});
			$('#leftBreak').click(function() {
				if (breakTime > 1) {
					breakTime--;
				}
				$('#breakNum').text(breakTime);
			});
			$('#rightBreak').click(function() {
				breakTime++;
				$('#breakNum').text(breakTime);
			});

			soundManager.setupOptions = {
				useConsole: false,
				consoleOnly: false,
			};

			soundManager.defaultOptions = {
				volume: 50,
			};

			var alarm = soundManager.createSound({
				id: 'alarm1',
				url: '/images/alarm.mp3',
				volume: 50,
			});

			var alarm2 = soundManager.createSound({
				id: 'alarm2',
				url: '/images/alarm2.mp3',
				volume: 50,
			});

			var circle = $('#circle-container'),
				btn = $('#goBtn');

			circle.circleProgress({ 
				value: 0,
				size: 340,
				emptyFill: 'rgb(255, 255, 255)',
			});

			btn.click(function() {
				$(this).prop('disabled', true);
				//start work timer
				timer.start({
					countdown: true,
					startValues: {
						minutes: workTime,
					},
				});

				circle.circleProgress({
					value: 1,
					size: 340,
					emptyFill: 'rgb(255, 255, 255)',
					fill: {
						gradient: ['red', 'orange'],
					},
					animation: {
						duration: workTime * 1000 * 60,
					},
				});

				//change time left every second to #countdown
				$('#countdown .values').html(timer.getTimeValues().toString());
				timer.addEventListener('secondsUpdated', function() {
					$('#countdown .values').html(timer.getTimeValues().toString());
				});
				//event when timer is finished
				timer.addEventListener('targetAchieved', function() {
					alarm.play();
					$('#countdown .values').html('Time to rest!');
					//start breakTimer straight after timer is finished
					breakTimer.start({
						countdown: true,
						startValues: {
							minutes: breakTime,
						},
					});

					circle.circleProgress({
						value: 1,
						emptyFill: 'rgb(255, 255, 255)',
						fill: {
							gradient: ['blue', 'purple'],
						},
						animation: {
							duration: breakTime * 1000 * 60,
						},
						reverse: true,
					});

					$('#countdown .values').html(breakTimer.getTimeValues().toString());
					breakTimer.addEventListener('secondsUpdated', function() {
						$('#countdown .values').html(breakTimer.getTimeValues().toString());
					});
					breakTimer.addEventListener('targetAchieved', function() {
						alarm2.play();
						$('#countdown .values').html('Time to work!');

						timer.start({
							countdown: true,
							startValues: {
								minutes: workTime,
							},
						});

						circle.circleProgress({
							value: 1,
							size: 340,
							emptyFill: 'rgb(255, 255, 255)',
							fill: {
								gradient: ['red', 'orange'],
							},
							animation: {
								duration: workTime * 1000 * 60,
							},
						});
					});
				});
			});

			$('#stopBtn').click(function() {
				$(this).prop('disabled', true);
				$('#goBtn').prop('disabled', false);
				var el = $('#circle-container');
				$(
					el.circleProgress({
						value: 0,
					})
				);
				timer.stop();
				breakTimer.stop();
				soundManager.stop('alarm');
				soundManager.stop('alarm2');

				$('#countdown .values').html('00:00:00');
			});
		});

		return (
			<div>
				{this.state.showComponent && (
					<NavBar
						update={this.updateState}
						id="navbar-pomo"
						{...this.state }
					/>
				)}

				<div className="pomodoro">
					<div id="pomo" className="animated slideInDown">
						<span className="openNav" onClick={this.updateState}>
							<i className="fa fa-bars animated pulse infinite" />
						</span>

						<div id="title-pomo">Pomodoro Clock</div>
						<div id="subtitle" className="text-center">
							Many people work better when they know they have a break on the way! <br />
							Choose the length of time you wish to work - and the break you can reward yourself with!
						</div>
						<div className="row">
							<div className="col-sm-6 test">
								<div id="workTimer" className="text-center">
									<p className="times">Minutes to work</p>
									<img src="/images/arrowLeft.png" id="leftWork" className="arrows hvr-pulse-grow" />
									<div id="workNum" className="num" value="25">
										25
									</div>
									<img
										src="/images/arrowRight.png"
										id="rightWork"
										className="arrows hvr-pulse-grow"
									/>
								</div>
							</div>
							<div className="col-sm-6 test">
								<div id="breakTimer" className="text-center">
									<p className="times">Minutes on break</p>
									<img src="/images/arrowLeft.png" id="leftBreak" className="arrows hvr-pulse-grow" />
									<div id="breakNum" className="num">
										5
									</div>
									<img
										src="/images/arrowRight.png"
										id="rightBreak"
										className="arrows hvr-pulse-grow"
									/>
								</div>
							</div>
						</div>
						<div id="circle-container" />

						<div className="buttons">
							<img src="/images/play.png" id="goBtn" />
							<img src="/images/stop.png" id="stopBtn" />
						</div>

						<div id="countdown">
							<div className="values">00:00:00</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Pomodoro;
