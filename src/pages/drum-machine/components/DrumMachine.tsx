import React from "react";
import { Howl, Howler } from "howler";
import DrumMachineState from "../interfaces/drumMachine.i";

class DrumMachine extends React.Component<{}, DrumMachineState> {
  public readonly state: DrumMachineState = {
    kit: "heater",
    power: true,
    current: "Heater Kit",
  };

  private heater1 = new Howl({
    src: [require("../audio/Heater-1.mp3")],
  });
  private heater2 = new Howl({
    src: [require("../audio/Heater-2.mp3")],
  });
  private heater3 = new Howl({
    src: [require("../audio/Heater-3.mp3")],
  });
  private heater4 = new Howl({
    src: [require("../audio/Heater-4_1.mp3")],
  });
  private heater5 = new Howl({
    src: [require("../audio/Heater-6.mp3")],
  });
  private heater6 = new Howl({
    src: [require("../audio/Dsc_Oh.mp3")],
  });
  private heater7 = new Howl({
    src: [require("../audio/Kick_n_Hat.mp3")],
  });
  private heater8 = new Howl({
    src: [require("../audio/RP4_KICK_1.mp3")],
  });
  private heater9 = new Howl({
    src: [require("../audio/Cev_H2.mp3")],
  });

  private piano1 = new Howl({
    src: [require("../audio/Chord_1.mp3")],
  });
  private piano2 = new Howl({
    src: [require("../audio/Chord_2.mp3")],
  });
  private piano3 = new Howl({
    src: [require("../audio/Chord_3.mp3")],
  });
  private piano4 = new Howl({
    src: [require("../audio/Give_us_a_light.mp3")],
  });
  private piano5 = new Howl({
    src: [require("../audio/Dry_Ohh.mp3")],
  });
  private piano6 = new Howl({
    src: [require("../audio/Bld_H1.mp3")],
  });
  private piano7 = new Howl({
    src: [require("../audio/punchy_kick_1.mp3")],
  });
  private piano8 = new Howl({
    src: [require("../audio/side_stick_1.mp3")],
  });
  private piano9 = new Howl({
    src: [require("../audio/Brk_Snr.mp3")],
  });

  public componentDidMount(): void {
    document.addEventListener("keydown", this.onKeyDown);
  }

  public componentWillUnmount(): void {
    document.removeEventListener("keydown", this.onKeyDown);
  }

  private onFlashKey = (key: string): void => {
    const { power, kit } = this.state;
    if (!power) return;
    const tile = document.getElementById(key);
    tile.classList.add("drum__flash");
    this.onPlaySound(key);
    let value: string;
    switch (key) {
      case "1":
        value = kit === "heater" ? "Heater 1" : "Chord 1";
        break;
      case "2":
        value = kit === "heater" ? "Heater 2" : "Chord 2";
        break;
      case "3":
        value = kit === "heater" ? "Heater 3" : "Chord 3";
        break;
      case "4":
        value = kit === "heater" ? "Heater 4" : "Shaker";
        break;
      case "5":
        value = kit === "heater" ? "Clap" : "Open HH";
        break;
      case "6":
        value = kit === "heater" ? "Open HH" : "Closed HH";
        break;
      case "7":
        value = kit === "heater" ? "Kick n' Hat" : "Punchy Kick";
        break;
      case "8":
        value = kit === "heater" ? "Kick" : "Side Stick";
        break;
      case "9":
        value = kit === "heater" ? "Closed HH" : "Snare";
        break;
      default:
        return;
    }

    document.getElementById("current").innerHTML = value;
    setTimeout((): void => {
      tile.classList.remove("drum__flash");
    }, 100);
    setTimeout((): void => {
      document.getElementById("current").innerHTML = "";
    }, 1000);
  };

  private onKeyDown = (e: KeyboardEvent): void => {
    const { power } = this.state;
    if (!power) return;
    switch (e.key) {
      case "q":
        this.onFlashKey("1");
        break;
      case "w":
        this.onFlashKey("2");
        break;
      case "e":
        this.onFlashKey("3");
        break;
      case "a":
        this.onFlashKey("4");
        break;
      case "s":
        this.onFlashKey("5");
        break;
      case "d":
        this.onFlashKey("6");
        break;
      case "z":
        this.onFlashKey("7");
        break;
      case "x":
        this.onFlashKey("8");
        break;
      case "c":
        this.onFlashKey("9");
        break;
      default:
        break;
    }
  };

  private onSetVolume = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { power } = this.state;
    if (!power) return;
    const volume: number = parseInt(e.target.value, 10);
    Howler.volume(volume / 100);
    document.getElementById("current").innerHTML = `Volume: ${volume}`;
    setTimeout((): void => {
      document.getElementById("current").innerHTML = "";
    }, 1000);
  };

  private onPlaySound = (key: string): void => {
    const { power, kit } = this.state;
    if (!power) return;
    switch (key) {
      case "1":
        kit === "heater" ? this.heater1.play() : this.piano1.play();
        break;
      case "2":
        kit === "heater" ? this.heater2.play() : this.piano2.play();
        break;
      case "3":
        kit === "heater" ? this.heater3.play() : this.piano3.play();
        break;
      case "4":
        kit === "heater" ? this.heater4.play() : this.piano4.play();
        break;
      case "5":
        kit === "heater" ? this.heater5.play() : this.piano5.play();
        break;
      case "6":
        kit === "heater" ? this.heater6.play() : this.piano6.play();
        break;
      case "7":
        kit === "heater" ? this.heater7.play() : this.piano7.play();
        break;
      case "8":
        kit === "heater" ? this.heater8.play() : this.piano8.play();
        break;
      case "9":
        kit === "heater" ? this.heater9.play() : this.piano9.play();
        break;
      default:
        break;
    }
  };

  public render(): JSX.Element {
    const { current } = this.state;
    return (
      <div className="drum__container">
        <div className="drum__machine">
          <div>
            <div className="drum__row">
              <div
                className="drum__button"
                role="button"
                tabIndex={0}
                id="1"
                onClick={(): void => this.onFlashKey("1")}
              >
                Q
              </div>
              <div
                className="drum__button"
                role="button"
                tabIndex={0}
                id="2"
                onClick={(): void => this.onFlashKey("2")}
              >
                W
              </div>
              <div
                className="drum__button"
                role="button"
                tabIndex={0}
                id="3"
                onClick={(): void => this.onFlashKey("3")}
              >
                E
              </div>
            </div>
            <div className="drum__row">
              <div
                className="drum__button"
                role="button"
                tabIndex={0}
                id="4"
                onClick={(): void => this.onFlashKey("4")}
              >
                A
              </div>
              <div
                className="drum__button"
                role="button"
                tabIndex={0}
                id="5"
                onClick={(): void => this.onFlashKey("5")}
              >
                S
              </div>
              <div
                className="drum__button"
                role="button"
                tabIndex={0}
                id="6"
                onClick={(): void => this.onFlashKey("6")}
              >
                D
              </div>
            </div>
            <div className="drum__row">
              <div
                className="drum__button"
                role="button"
                tabIndex={0}
                id="7"
                onClick={(): void => this.onFlashKey("7")}
              >
                Z
              </div>
              <div
                className="drum__button"
                role="button"
                tabIndex={0}
                id="8"
                onClick={(): void => this.onFlashKey("8")}
              >
                X
              </div>
              <div
                className="drum__button"
                role="button"
                tabIndex={0}
                id="9"
                onClick={(): void => this.onFlashKey("9")}
              >
                C
              </div>
            </div>
          </div>
          <div className="drum__display">
            <div>
              <div className="drum__slider-container">
                <p className="drum__label">Power</p>
                <label
                  htmlFor="power"
                  className="drum__switch"
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <input
                    id="power"
                    type="checkbox"
                    defaultChecked
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                      this.setState({ power: e.target.checked })
                    }
                  />
                  <span className="drum__slider" />
                </label>
              </div>
            </div>
            <h4 id="current" className="drum__current">
              {current}
            </h4>
            <input
              className="drum__volume"
              type="range"
              min="0"
              max="100"
              step="1"
              onChange={this.onSetVolume}
            />
            <div className="drum__slider-container">
              <p className="drum__label">Kit</p>
              <label htmlFor="soundBoard" className="drum__switch">
                <input
                  id="soundBoard"
                  type="checkbox"
                  defaultChecked
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    this.setState({
                      kit: e.target.checked ? "heater" : "piano",
                      current: e.target.checked ? "Heater Kit" : "Smooth Piano Kit",
                    });
                  }}
                />
                <span className="drum__slider" />
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DrumMachine;
