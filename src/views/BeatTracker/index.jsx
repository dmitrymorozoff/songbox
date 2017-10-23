import React, { Component } from "react";
import BeatLine from "./components/BeatLine";
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
import "./style.css";

class BeatTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trackingStatus: false
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
                    countCubes={16}
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
    handleChangeBPM = event => {
        this.props.changeBPM(event.target.value);
    };
    render() {
        return (
            <div className="beat-tracker-wrapper">
                <div className="beat-tracker-control">
                    <button onClick={this.handleStartClick}>Start</button>
                    <input
                        type="range"
                        min="100"
                        max="200"
                        step="1"
                        onChange={this.handleChangeBPM}
                    />
                </div>
                <div className="beat-line-wrapper">{this.renderBeatLine()}</div>
                <Patterns />
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
