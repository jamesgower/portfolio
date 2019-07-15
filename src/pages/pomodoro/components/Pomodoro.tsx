import * as React from "react";
import { Howl } from "howler";
import { Row, Col } from "reactstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import * as playButton from "../../../../public/images/play.png";
import * as stopButton from "../../../../public/images/stop.png";
import * as sound1 from "../../../../public/media/alarm.mp3";
import * as sound2 from "../../../../public/media/alarm2.mp3";
import PomodoroState from "../interfaces/pomodoro.i";
import HiddenNavBar from "../../nav-bar/components/HiddenNavBar";
import Arrows from "./Arrows";

class Pomodoro extends React.Component<{}, PomodoroState> {
  public readonly state: PomodoroState = {
    workTime: 25,
    breakTime: 5,
  };

  private workAlarm = new Howl({
    src: [sound1],
    volume: 0.5,
  });
  private breakAlarm = new Howl({
    src: [sound2],
    volume: 0.5,
  });

  public componentWillUnmount(): void {
    this.workAlarm.stop();
    this.breakAlarm.stop();
  }

  private onStartTimer = (): void => {};

  private onStopTimer = (): void => {};

  private onArrowClick = (work: boolean, add: boolean): void => {
    const { workTime, breakTime } = this.state;
    if (workTime >= 1 && work) {
      add
        ? this.setState({ workTime: workTime + 1 })
        : this.setState({ workTime: workTime - 1 });
    }
    if (breakTime > 1 && !work) {
      add
        ? this.setState({ breakTime: breakTime + 1 })
        : this.setState({ breakTime: breakTime - 1 });
    }
  };

  public render(): JSX.Element {
    const { workTime, breakTime } = this.state;
    return (
      <div>
        <HiddenNavBar color="#FFF" />
        <div className="pomodoro">
          <div id="pomo" className="animated slideInDown">
            <div id="title-pomo">Pomodoro Clock</div>
            <div id="subtitle" className="text-center">
              Many people work better when they know they have a break on the way! <br />
              Choose the length of time you wish to work - and the break you can reward
              yourself with!
            </div>
            <Row>
              <Col sm={6}>
                <Arrows workTime={workTime} onHandleArrowClick={this.onArrowClick} />
              </Col>
              <Col sm={6}>
                <Arrows breakTime={breakTime} onHandleArrowClick={this.onArrowClick} />
              </Col>
            </Row>
            <div id="circle-container">
              <CircularProgressbar
                value={workTime}
                maxValue={workTime * 60}
                minValue={0}
              />
            </div>

            <div className="buttons">
              <img
                src={playButton}
                alt="Play button"
                id="goBtn"
                role="button"
                onClick={this.onStartTimer}
              />
              <img
                src={stopButton}
                alt="Stop button"
                role="button"
                id="stopBtn"
                onClick={this.onStopTimer}
              />
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
