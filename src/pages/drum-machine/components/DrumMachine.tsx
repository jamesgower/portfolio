import React from "react";
import { Howl, Howler } from "howler";

const heater1 = new Howl({
  src: [require("../../../../public/media/drum/Heater-1.mp3")],
});
const heater2 = new Howl({
  src: [require("../../../../public/media/drum/Heater-2.mp3")],
});
const heater3 = new Howl({
  src: [require("../../../../public/media/drum/Heater-3.mp3")],
});
const heater4 = new Howl({
  src: [require("../../../../public/media/drum/Heater-4_1.mp3")],
});
const heater5 = new Howl({
  src: [require("../../../../public/media/drum/Heater-6.mp3")],
});
const heater6 = new Howl({
  src: [require("../../../../public/media/drum/Dsc_Oh.mp3")],
});
const heater7 = new Howl({
  src: [require("../../../../public/media/drum/Kick_n_Hat.mp3")],
});
const heater8 = new Howl({
  src: [require("../../../../public/media/drum/RP4_KICK_1.mp3")],
});
const heater9 = new Howl({
  src: [require("../../../../public/media/drum/Cev_H2.mp3")],
});

const piano1 = new Howl({
  src: [require("../../../../public/media/drum/Chord_1.mp3")],
});
const piano2 = new Howl({
  src: [require("../../../../public/media/drum/Chord_2.mp3")],
});
const piano3 = new Howl({
  src: [require("../../../../public/media/drum/Chord_3.mp3")],
});
const piano4 = new Howl({
  src: [require("../../../../public/media/drum/Give_us_a_light.mp3")],
});
const piano5 = new Howl({
  src: [require("../../../../public/media/drum/Dry_Ohh.mp3")],
});
const piano6 = new Howl({
  src: [require("../../../../public/media/drum/Bld_H1.mp3")],
});
const piano7 = new Howl({
  src: [require("../../../../public/media/drum/punchy_kick_1.mp3")],
});
const piano8 = new Howl({
  src: [require("../../../../public/media/drum/side_stick_1.mp3")],
});
const piano9 = new Howl({
  src: [require("../../../../public/media/drum/Brk_Snr.mp3")],
});

interface DrumMachineState {
  power: boolean;
  kit: string;
  volume: number;
  current: string;
}

const initialState: DrumMachineState = {
  kit: "heater",
  volume: 0.5,
  power: true,
  current: "Heater Kit",
};

class DrumMachine extends React.Component {
  public readonly state = initialState;

  public componentDidMount(): void {
    document.addEventListener("keydown", this.onKeyDown);
  }

  public componentWillUnmount(): void {
    document.addEventListener("keydown", this.onKeyDown);
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
    const volume: number = parseInt(e.target.value);
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
        kit === "heater" ? heater1.play() : piano1.play();
        break;
      case "2":
        kit === "heater" ? heater2.play() : piano2.play();
        break;
      case "3":
        kit === "heater" ? heater3.play() : piano3.play();
        break;
      case "4":
        kit === "heater" ? heater4.play() : piano4.play();
        break;
      case "5":
        kit === "heater" ? heater5.play() : piano5.play();
        break;
      case "6":
        kit === "heater" ? heater6.play() : piano6.play();
        break;
      case "7":
        kit === "heater" ? heater7.play() : piano7.play();
        break;
      case "8":
        kit === "heater" ? heater8.play() : piano8.play();
        break;
      case "9":
        kit === "heater" ? heater9.play() : piano9.play();
        break;
      default:
        return;
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
