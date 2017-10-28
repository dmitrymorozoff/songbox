import React, { Component } from "react";
import BeatLine from "./components/BeatLine";
import {
    ReactRadioButtonsGroup,
    ReactRadioButton
} from "react-radio-buttons-group";
// import bass from "../../sounds/basses.wav";
// import kick from "../../sounds/Bass_Hit.wav";
// import clap from "../../sounds/hand_clap.wav";
// import snare from "../../sounds/snare_drum.wav";
// import cowbell from "../../sounds/cowbell.wav";
// import hhopen from "../../sounds//Hi_Hat_Short.wav";
// import hhclosed from "../../sounds/Hi_Hat_Closed.wav";
// import tomhi from "../../sounds/Tom_Hi.wav";
// import tomlow from "../../sounds/Tom_Low.wav";
// import tommid from "../../sounds/Tom_Mid.wav";
// import cymbal from "../../sounds/cymbal.wav";
// import tambourine from "../../sounds/Tambourine.wav";
// import rimshot from "../../sounds/Rimshot.wav";
import noise from "../../sounds/Wav/Miscellaneous/Digital Noise 05.wav";
import kick from "../../sounds/Wav/Kick Drums/EDM Kick 01.wav";
import snare from "../../sounds/Wav/Snare Drums/Synthetic Snare 08.wav";
import perc from "../../sounds/Wav/Percussion/Synthetic Percussion 18.wav";
import bleep from "../../sounds/Wav/Miscellaneous/Digital Bleep 06.wav";
import hh from "../../sounds/Wav/Cymbals/808 Closed HiHat 01.wav";
import conga from "../../sounds/Wav/Congas/Digital Conga 03.wav";
import digconga from "../../sounds/Wav/Congas/Digital Conga 11.wav";
import lowconga from "../../sounds/Wav/Congas/808 Low Conga 14.wav";
import claves from "../../sounds/Wav/Percussion/Digital Claves 03.wav";
import tom from "../../sounds/Wav/TomToms/Digital Tom 04.wav";
import digerror from "../../sounds/Wav/Miscellaneous/Digital Error 18.wav";
import rimshot from "../../sounds/Wav/Miscellaneous/909 Rimshot 07.wav";
import cymbal from "../../sounds/Wav/Cymbals/Synthetic Cymbal 25.wav";
import { BeatTrackerActions } from "./actions";
import Metronome from "../../components/Metronome";
import { connect } from "react-redux";
import Patterns from "../../components/Patterns/";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./style.css";

class BeatTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trackingStatus: false,
            bpm: 130,
            countCubes: 16
        };
    }
    renderBeatLine = () => {
        const titleLine = [
            { title: "Noise", url: noise },
            { title: "Kick", url: kick },
            { title: "Snare", url: snare },
            { title: "Perc", url: perc },
            { title: "Bleep", url: bleep },
            { title: "HiHat", url: hh },
            { title: "Conga", url: conga },
            { title: "DigConga", url: digconga },
            { title: "LowConga", url: lowconga },
            { title: "Claves", url: claves },
            { title: "Tom", url: tom },
            { title: "DigError", url: digerror },
            { title: "Rimshot", url: rimshot },
            { title: "Cymbal", url: cymbal }
        ];
        return titleLine.map((item, index) => {
            return (
                <BeatLine
                    title={item.title}
                    key={index.toString()}
                    url={item.url}
                    countCubes={this.state.countCubes}
                />
            );
        });
    };
    handleStartClick = () => {
        let status = this.state.trackingStatus;
        this.setState({
            trackingStatus: !this.state.trackingStatus
        });
        this.props.toggleTracking(!status);
    };
    handleChangeBPM = bpm => {
        this.setState({
            bpm: bpm
        });
        this.props.changeBPM(bpm);
    };
    handleChangeBeatType = value => {
        switch (value) {
            case "4/4":
                this.setState({
                    countCubes: 16
                });
                break;
            case "8/8":
                this.setState({
                    countCubes: 32
                });
                break;
            default:
                this.setState({
                    countCubes: 16
                });
                break;
        }
    };
    render() {
        let { bpm } = this.state;
        return (
            <div className="beat-tracker-wrapper">
                <div className="beat-tracker-controls">
                    <ReactRadioButtonsGroup
                        group="beat-type"
                        onChange={this.handleChangeBeatType}
                    >
                        <ReactRadioButton value="4/4">4/4</ReactRadioButton>
                        <ReactRadioButton value="8/8">8/8</ReactRadioButton>
                    </ReactRadioButtonsGroup>
                    <div className="beat-tracker-control">
                        <button onClick={this.handleStartClick}>Start</button>
                    </div>
                </div>
                <div className="sequencer">
                    <div className="beat-line-wrapper">
                        {this.renderBeatLine()}
                    </div>
                    <div className="sequencer-settings">
                        <Patterns />
                        <div className="sequencer-equalizer">
                            <Slider
                                value={this.state.bpm}
                                vertical={true}
                                min={130}
                                max={200}
                                step={1}
                                onChange={this.handleChangeBPM}
                            />
                            <Slider
                                value={this.state.bpm}
                                vertical={true}
                                min={130}
                                max={200}
                                step={1}
                                onChange={this.handleChangeBPM}
                            />
                            <Slider
                                value={this.state.bpm}
                                vertical={true}
                                min={130}
                                max={200}
                                step={1}
                                onChange={this.handleChangeBPM}
                            />
                            <Slider
                                value={this.state.bpm}
                                vertical={true}
                                min={130}
                                max={200}
                                step={1}
                                onChange={this.handleChangeBPM}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return { beatTracker: state.beatTrackerReducer };
};
const mapDispatchToProps = dispatch => {
    return {
        toggleTracking: flag => {
            dispatch(BeatTrackerActions.toggleTracking(flag));
        },
        changeBPM: value => {
            dispatch(BeatTrackerActions.changeBPM(value));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(BeatTracker);
