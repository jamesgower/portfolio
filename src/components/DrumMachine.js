import React, {Component} from 'react';
import {Howl, Howler} from 'howler';

const heater1 = new Howl({src: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3']});
const heater2 = new Howl({src: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3']});
const heater3 = new Howl({src: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3']});
const heater4 = new Howl({src: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3']});
const heater5 = new Howl({src: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3']});
const heater6 = new Howl({src: ['https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3']});
const heater7 = new Howl({src: ['https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3']});
const heater8 = new Howl({src: ['https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3']});
const heater9 = new Howl({src: ['https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3']});

const piano1 = new Howl({src: ['https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3']});
const piano2 = new Howl({src: ['https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3']});
const piano3 = new Howl({src: ['https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3']});
const piano4 = new Howl({src: ['https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3']});
const piano5 = new Howl({src: ['https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3']});
const piano6 = new Howl({src: ['https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3']});
const piano7 = new Howl({src: ['https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3']});
const piano8 = new Howl({src: ['https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3']});
const piano9 = new Howl({src: ['https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3']});

class DrumMachine extends Component {
    constructor() {
        super();

        this.state = {
            kit: 'heater',
            volume: 0.5,
            power: true
        };
    }

    render() {

        const onKeyDown = (e) => {
            if (!this.state.power) return;
            var key = e.keyCode;
            switch (key) {
                case 81:
                    return onFlashKey(1);
                case 87:
                    return onFlashKey(2);
                case 69:
                    onFlashKey(3);
                    break;
                case 65:
                    onFlashKey(4);
                    break;
                case 83:
                    onFlashKey(5);
                    break;
                case 68:
                    onFlashKey(6);
                    break;
                case 90:
                    onFlashKey(7);
                    break;
                case 88:
                    onFlashKey(8);
                    break;
                case 67:
                    onFlashKey(9);
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', onKeyDown);

        const onSetVolume = (e) => {
            if (!this.state.power) return;            
            const volume = e.target.value;
            Howler.volume(volume / 100);
            document
                .getElementById('current')
                .innerHTML = `Volume: ${volume}`;
            setTimeout(() => {
                document
                    .getElementById('current')
                    .innerHTML = '';
            }, 1000);
        };

        const onFlashKey = (key) => {
            if (!this.state.power) 
                return;
            else {
                const tile = document.getElementById(key);
                tile
                    .classList
                    .add('flash');
                onPlaySound(key);
                const value = tile.getAttribute('value');
                document
                    .getElementById('current')
                    .innerHTML = value;
                setTimeout(() => {
                    tile
                        .classList
                        .remove('flash');
                }, 100);
            }
        };

        const onPlaySound = (index) => {
            if (!this.state.power) return;
            switch (index) {
                case 1:
                    this.state.kit === 'heater'
                        ? heater1.play()
                        : piano1.play();
                    break;
                case 2:
                    this.state.kit === 'heater'
                        ? heater2.play()
                        : piano2.play();
                    break;
                case 3:
                    this.state.kit === 'heater'
                        ? heater3.play()
                        : piano3.play();
                    break;
                case 4:
                    this.state.kit === 'heater'
                        ? heater4.play()
                        : piano4.play();
                    break;
                case 5:
                    this.state.kit === 'heater'
                        ? heater5.play()
                        : piano5.play();
                    break;
                case 6:
                    this.state.kit === 'heater'
                        ? heater6.play()
                        : piano6.play();
                    break;
                case 7:
                    this.state.kit === 'heater'
                        ? heater7.play()
                        : piano7.play();
                    break;
                case 8:
                    this.state.kit === 'heater'
                        ? heater8.play()
                        : piano8.play();
                    break;
                case 9:
                    this.state.kit === 'heater'
                        ? heater9.play()
                        : piano9.play();
                    break;
                default:
                    break;
            }
        };

        return (
            <div className="drum-background">
                <div id="drum-machine">
                    <div id="keys">
                        <div className="drum-row">
                            <div
                                className="drum-pad"
                                id="1"
                                value={this.state.kit === 'heater'
                                ? 'Heater 1'
                                : 'Chord 1'}
                                onClick={() => onFlashKey(1)}>Q</div>
                            <div
                                className="drum-pad"
                                id="2"
                                value={this.state.kit === 'heater'
                                ? 'Heater 2'
                                : 'Chord 2'}
                                onClick={() => onFlashKey(2)}>W</div>
                            <div
                                className="drum-pad"
                                id="3"
                                value={this.state.kit === 'heater'
                                ? 'Heater 3'
                                : 'Chord 3'}
                                onClick={() => onFlashKey(3)}>E</div>
                        </div>
                        <div className="drum-row">
                            <div
                                className="drum-pad"
                                id="4"
                                value={this.state.kit === 'heater'
                                ? 'Heater 4'
                                : 'Shaker'}
                                onClick={() => onFlashKey(4)}>A</div>
                            <div
                                className="drum-pad"
                                id="5"
                                value={this.state.kit === 'heater'
                                ? 'Clap'
                                : 'Open HH'}
                                onClick={() => onFlashKey(5)}>S</div>
                            <div
                                className="drum-pad"
                                id="6"
                                value={this.state.kit === 'heater'
                                ? 'Open HH'
                                : 'Closed HH'}
                                onClick={() => onFlashKey(6)}>D</div>
                        </div>
                        <div className="drum-row">
                            <div
                                className="drum-pad"
                                id="7"
                                value={this.state.kit === 'heater'
                                ? 'Kick n\' Hat'
                                : 'Punchy Kick'}
                                onClick={() => onFlashKey(7)}>Z</div>
                            <div
                                className="drum-pad"
                                id="8"
                                value={this.state.kit === 'heater'
                                ? 'Kick'
                                : 'Side Stick'}
                                onClick={() => onFlashKey(8)}>X</div>
                            <div
                                className="drum-pad"
                                id="9"
                                value={this.state.kit === 'heater'
                                ? 'Closed HH'
                                : 'Snare'}
                                onClick={() => onFlashKey(9)}>C</div>
                        </div>
                    </div>
                    <div id="display">
                        <div className="power">
                            <div className="sliderContainer">
                                <label className="label-switch">Power</label>
                                <label
                                    className="switch"
                                    style={{
                                    marginBottom: '20px'
                                }}>
                                    <input
                                        id="power"
                                        type="checkbox"
                                        defaultChecked
                                        onChange={e => this.setState({power: e.target.checked})}/>
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>
                        <h4 id="current">{this.state.current}</h4>
                        <input
                            id="volume"
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            onChange={e => onSetVolume(e)}/>
                        <div className="sliderContainer">
                            <label className="label-switch">Kit</label>
                            <label className="switch">
                                <input
                                    id="soundBoard"
                                    type="checkbox"
                                    defaultChecked
                                    onChange={e => {
                                    this.setState({
                                        kit: e.target.checked
                                            ? 'heater'
                                            : 'piano',
                                        current: e.target.checked
                                            ? 'Heater Kit'
                                            : 'Smooth Piano Kit'
                                    });
                                }}/>
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DrumMachine;
