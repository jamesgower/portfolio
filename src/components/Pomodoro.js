import React from "react";
import { circleProgress } from "jquery-circle-progress"; // eslint-disable-line no-unused-vars
import Timer from "easytimer";
import NavBar from "./NavBar";
import { Howl } from "howler";
import arrowLeft from "../../public/images/arrowLeft.png";
import arrowRight from "../../public/images/arrowRight.png";
import playButton from "../../public/images/play.png";
import stopButton from "../../public/images/stop.png";
import sound1 from "../../public/media/alarm.mp3";
import sound2 from "../../public/media/alarm2.mp3";

const alarm1 = new Howl({
    src: [sound1],
    volume: 0.5,
});

const alarm2 = new Howl({
    src: [sound2],
    volume: 0.5,
});

var breakTimer = new Timer();
var timer = new Timer();

class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            pomo: true,
            navbar: true,
        };
        this.updateState = this.updateState.bind(this);
    }

    componentWillUnmount() {
        timer.stop();
        breakTimer.stop();
        alarm1.stop();
        alarm2.stop();
    }

    updateState = update => {
        this.setState({ showComponent: update });
    };

    render() {
        var workTime = 25;
        var breakTime = 5;
        $(document).ready(function() {
            $("#leftWork").click(function() {
                if (workTime > 1) {
                    workTime--;
                }
                $("#workNum").text(workTime);
            });
            $("#rightWork").click(function() {
                workTime++;
                $("#workNum").text(workTime);
            });
            $("#leftBreak").click(function() {
                if (breakTime > 1) {
                    breakTime--;
                }
                $("#breakNum").text(breakTime);
            });
            $("#rightBreak").click(function() {
                breakTime++;
                $("#breakNum").text(breakTime);
            });

            var circle = $("#circle-container"),
                btn = $("#goBtn");

            circle.circleProgress({
                value: 0,
                size: 340,
                emptyFill: "rgb(255, 255, 255)",
            });

            btn.click(function() {
                $(this).prop("disabled", true);
                timer.stop();
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
                    emptyFill: "rgb(255, 255, 255)",
                    fill: {
                        gradient: ["red", "orange"],
                    },
                    animation: {
                        duration: workTime * 1000 * 60,
                    },
                });

                //change time left every second to #countdown
                $("#countdown .values").html(timer.getTimeValues().toString());
                timer.addEventListener("secondsUpdated", function() {
                    $("#countdown .values").html(timer.getTimeValues().toString());
                });
                //event when timer is finished
                timer.addEventListener("targetAchieved", function() {
                    alarm1.play();
                    $("#countdown .values").html("Time to rest!");
                    breakTimer.stop();
                    //start breakTimer straight after timer is finished
                    breakTimer.start({
                        countdown: true,
                        startValues: {
                            minutes: breakTime,
                        },
                    });

                    circle.circleProgress({
                        value: 1,
                        emptyFill: "rgb(255, 255, 255)",
                        fill: {
                            gradient: ["blue", "purple"],
                        },
                        animation: {
                            duration: breakTime * 1000 * 60,
                        },
                        reverse: true,
                    });

                    $("#countdown .values").html(breakTimer.getTimeValues().toString());
                    breakTimer.addEventListener("secondsUpdated", function() {
                        $("#countdown .values").html(breakTimer.getTimeValues().toString());
                    });
                    breakTimer.addEventListener("targetAchieved", function() {
                        alarm2.play();
                        $("#countdown .values").html("Time to work!");

                        timer.start({
                            countdown: true,
                            startValues: {
                                minutes: workTime,
                            },
                        });

                        circle.circleProgress({
                            value: 1,
                            size: 340,
                            emptyFill: "rgb(255, 255, 255)",
                            fill: {
                                gradient: ["red", "orange"],
                            },
                            animation: {
                                duration: workTime * 1000 * 60,
                            },
                        });
                    });
                });
            });

            $("#stopBtn").click(function() {
                $(this).prop("disabled", true);
                $("#goBtn").prop("disabled", false);
                var el = $("#circle-container");
                $(
                    el.circleProgress({
                        value: 0,
                    }),
                );
                timer.stop();
                breakTimer.stop();
                alarm1.stop();
                alarm2.stop();

                $("#countdown .values").html("00:00:00");
            });
        });

        return (
            <div>
                {this.state.showComponent && (
                    <NavBar update={this.updateState} id="navbar-pomo" {...this.state} />
                )}

                <div className="pomodoro">
                    <div id="pomo" className="animated slideInDown">
                        <span className="openNav" onClick={this.updateState}>
                            <i className="fa fa-bars animated pulse infinite" />
                        </span>

                        <div id="title-pomo">Pomodoro Clock</div>
                        <div id="subtitle" className="text-center">
                            Many people work better when they know they have a break on the way!{" "}
                            <br />
                            Choose the length of time you wish to work - and the break you can
                            reward yourself with!
                        </div>
                        <div className="row">
                            <div className="col-sm-6 test">
                                <div id="workTimer" className="text-center">
                                    <p className="times">Minutes to work</p>
                                    <img
                                        src={arrowLeft}
                                        id="leftWork"
                                        className="arrows hvr-pulse-grow"
                                    />
                                    <div id="workNum" className="num" value="25">
                                        25
                                    </div>
                                    <img
                                        src={arrowRight}
                                        id="rightWork"
                                        className="arrows hvr-pulse-grow"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6 test">
                                <div id="breakTimer" className="text-center">
                                    <p className="times">Minutes on break</p>
                                    <img
                                        src={arrowLeft}
                                        id="leftBreak"
                                        className="arrows hvr-pulse-grow"
                                    />
                                    <div id="breakNum" className="num">
                                        5
                                    </div>
                                    <img
                                        src={arrowRight}
                                        id="rightBreak"
                                        className="arrows hvr-pulse-grow"
                                    />
                                </div>
                            </div>
                        </div>
                        <div id="circle-container" />

                        <div className="buttons">
                            <img src={playButton} id="goBtn" />
                            <img src={stopButton} id="stopBtn" />
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
