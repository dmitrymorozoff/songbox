import React from "react";
import { connect } from "react-redux";
import Sound from "../../helpers/sound";
import "./style.css";
import { audioContext } from "../App";

class Synth extends React.Component {
    constructor(props) {
        super(props);
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
    render() {
        return <div className="synth-wrapper">{this.renderKeys()}</div>;
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
