import React from "react";
import { Howl } from "howler";
import { Row, Col } from "reactstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import sound1 from "../audio/alarm.mp3";
import sound2 from "../audio/alarm2.mp3";
import PomodoroState from "../interfaces/pomodoro.i";
import HiddenNavBar from "../../nav-bar/components/HiddenNavBar";
import Arrows from "./Arrows";
import background from "../images/background.jpg";

class Pomodoro extends React.Component<{}, PomodoroState> {
  public readonly state: PomodoroState = {
    workTime: 25,
    breakTime: 5,
    timerSeconds: 0,
    workTimerOn: true,
    time: "00 : 00",
  };

  private workAlarm = new Howl({
    src: [sound1],
    volume: 0.5,
  });
  private breakAlarm = new Howl({
    src: [sound2],
    volume: 0.5,
  });

  public timer: number;

  public componentWillUnmount(): void {
    window.clearInterval(this.timer);
    this.workAlarm.stop();
    this.breakAlarm.stop();
  }

  private onArrowClick = (work: boolean, add: boolean): void => {
    const { workTime, breakTime } = this.state;
    if (work) {
      add
        ? this.setState({ workTime: workTime + 1 })
        : this.setState({ workTime: workTime > 1 ? workTime - 1 : 1 });
    } else {
      add
        ? this.setState({ breakTime: breakTime + 1 })
        : this.setState({ breakTime: breakTime > 1 ? breakTime - 1 : 1 });
    }
  };

  private onStopTimer = (): void => {
    clearInterval(this.timer);
    this.workAlarm.stop();
    this.breakAlarm.stop();
    this.setState({ timerSeconds: 0, time: "00:00", workTimerOn: true });
  };

  private onStartTimer = (): void => {
    const { workTime, breakTime } = this.state;
    let current = workTime * 60;
    this.timer = window.setInterval((): void => {
      if (current === 0) {
        const { workTimerOn } = this.state;
        this.setState({ workTimerOn: !workTimerOn });
        workTimerOn ? this.workAlarm.play() : this.breakAlarm.play();
        setTimeout((): void => {
          current = workTimerOn ? breakTime * 60 : workTime * 60;
        }, 500);
      } else {
        const hours = current > 3600 ? Math.floor(current / 3600) : null;
        const minutes = Math.floor(current / 60);
        const seconds = current % 60;

        const time = this.formatTime(hours, minutes, seconds);
        this.setState({ timerSeconds: current, time });
        current--;
      }
    }, 1000);
  };

  private formatTime = (hrs: number, mins: number, secs: number): string => {
    const hours = hrs ? `${hrs} : ` : "";
    if (hrs) {
      mins %= 60;
    }
    const minutes = mins < 10 ? `0${mins}` : mins;

    const seconds = secs < 10 ? `0${secs}` : secs;
    return `${hours}${minutes} : ${seconds}`;
  };

  public render(): JSX.Element {
    const { workTime, breakTime, timerSeconds, workTimerOn, time } = this.state;
    return (
      <div
        className="pomodoro__background"
        style={{ background: `url(${background}) no-repeat fixed center` }}
      >
        <div className="pomodoro__nav-container">
          <HiddenNavBar color="white" navBackground={background} />
        </div>
        <div className="pomodoro__container animated fadeIn">
          <div className="pomodoro__title">Pomodoro Clock</div>
          <div className="pomodoro__subtitle">
            Many people work better when they know they have a break on the way! <br />
            Choose the length of time you wish to work - and the break you can reward
            yourself with.
          </div>
          <Row>
            <Col sm={6}>
              <Arrows work workTime={workTime} onHandleArrowClick={this.onArrowClick} />
            </Col>
            <Col sm={6}>
              <Arrows breakTime={breakTime} onHandleArrowClick={this.onArrowClick} />
            </Col>
          </Row>
          <div className="pomodoro__timer-container">
            <CircularProgressbar
              value={timerSeconds}
              maxValue={workTimerOn ? workTime * 60 : breakTime * 60}
              counterClockwise={workTimerOn}
              styles={buildStyles({
                pathTransitionDuration: 1,
                trailColor: "rgba(191, 191, 191, 0.1)",
                pathColor: `rgba(255, 255, 255, ${timerSeconds / 20}`,
                strokeLinecap: "butt",
              })}
            />

            <div className="pomodoro__buttons-container">
              <i
                role="button"
                tabIndex={0}
                className="pomodoro__button--start far fa-play-circle"
                onClick={this.onStartTimer}
              />
              <i
                role="button"
                tabIndex={0}
                className="pomodoro__button--stop far fa-stop-circle"
                onClick={this.onStopTimer}
              />
            </div>
            <div className="pomodoro__countdown-container">
              <div
                className={
                  timerSeconds === 0
                    ? "pomodoro__countdown-text--inactive"
                    : "pomodoro__countdown-text"
                }
              >
                {time}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Pomodoro;
