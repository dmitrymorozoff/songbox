import React from "react";
import { connect } from "react-redux";
import Sound from "../../helpers/sound";
import "./style.css";
import Slider from "react-rangeslider";
import { audioContext } from "../App";

class Synth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detune: 0
        };
        this.sound = new Sound("", audioContext, false, event => {});
    }
    handleKeyClick = event => {
        let id = event.target.getAttribute("data-id");
        let frequency = event.target.getAttribute("data-frequency");
        this.sound.playSynth(frequency, id);
    };
    renderKeys = () => {
        let countBlackKeys = 10;
        let countWhiteKeys = 14;
        let keys = [];
        let dataWhiteId = [
            "c3",
            "d3",
            "e3",
            "f3",
            "g3",
            "a3",
            "b3",
            "c4",
            "d4",
            "e4",
            "f4",
            "g4",
            "a4",
            "b4"
        ];
        let dataWhiteFrequency = [
            "130.81",
            "146.83",
            "164.81",
            "174.61",
            "196",
            "220",
            "246.94",
            "261.63",
            "293.66",
            "329.63",
            "349.23",
            "392",
            "440",
            "493.88"
        ];
        let dataBlackId = [
            "cs3",
            "ds3",
            "fs3",
            "gs3",
            "as3",
            "cs4",
            "ds4",
            "fs4",
            "gs4",
            "as4"
        ];
        let dataBlackFrequency = [
            "130.81",
            "155.56",
            "185",
            "207.65",
            "233.08",
            "277.18",
            "311.13",
            "369.99",
            "415.30",
            "466.16"
        ];
        for (let i = 1; i <= countWhiteKeys; i++) {
            keys.push(
                <div
                    className={`synth-white-key synth-white-key--${i}`}
                    data-id={dataWhiteId[i - 1]}
                    data-frequency={dataWhiteFrequency[i - 1]}
                    onClick={this.handleKeyClick}
                    key={(i - 1).toString()}
                />
            );
        }
        for (let i = 1; i <= countBlackKeys; i++) {
            keys.push(
                <div
                    className={`synth-black-key synth-black-key--${i}`}
                    data-id={dataBlackId[i - 1]}
                    data-frequency={dataBlackFrequency[i - 1]}
                    onClick={this.handleKeyClick}
                    key={(i * 22).toString()}
                />
            );
        }
        return keys;
    };
    handleOscillatorBtnClick = event => {};
    handleChangeDetune = detune => {
        this.setState({
            detune: detune
        });
    };
    render() {
        let { detune } = this.state;
        return (
            <div className="synth">
                <Slider
                    value={this.state.detune}
                    orientation="vertical"
                    min={0}
                    max={60}
                    step={1}
                    tooltip={false}
                    onChange={this.handleChangeDetune}
                />
                <div className="oscillator-type oscillator-type--1">
                    <div className="oscillator-type-title">Osc 1</div>
                    <div className="oscillator-type-btn-wrapper">
                        <div
                            className="oscillator-type-btn"
                            data-osc="1"
                            data-type="sine"
                            onClick={this.handleOscillatorBtnClick}
                        >
                            Sine
                        </div>
                        <div
                            className="oscillator-type-btn"
                            data-osc="1"
                            data-type="square"
                        >
                            Square
                        </div>
                        <div
                            className="oscillator-type-btn"
                            data-osc="1"
                            data-type="saw"
                        >
                            Saw
                        </div>
                        <div
                            className="oscillator-type-btn"
                            data-osc="1"
                            data-type="triangle"
                        >
                            Triangle
                        </div>
                    </div>
                </div>
                <div className="oscillator-type oscillator-type--2">
                    <div className="oscillator-type-title">Osc 2</div>
                    <div className="oscillator-type-btn-wrapper">
                        <div
                            className="oscillator-type-btn"
                            data-osc="2"
                            data-type="sine"
                        >
                            Sine
                        </div>
                        <div
                            className="oscillator-type-btn"
                            data-osc="2"
                            data-type="square"
                        >
                            Square
                        </div>
                        <div
                            className="oscillator-type-btn"
                            data-osc="2"
                            data-type="saw"
                        >
                            Saw
                        </div>
                        <div
                            className="oscillator-type-btn"
                            data-osc="2"
                            data-type="triangle"
                        >
                            Triangle
                        </div>
                    </div>
                </div>
                <div className="synth-wrapper">{this.renderKeys()}</div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {};
};
const mapDispatchToProps = dispatch => {
    return {
        /*changeVolume: value => {
            dispatch(PadsActions.changeVolume(value));
        }*/
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Synth);
