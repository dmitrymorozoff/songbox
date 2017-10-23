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
import bass from "../../sounds/trap/TM-88 808s [Big Choppa].wav";
import kick from "../../sounds/trap/Punch Kick.wav";
import poppin_snare from "../../sounds/trap/Poppin Snare .wav";
import preach_snare from "../../sounds/trap/TM-88 Snare & Clap 1.wav";
import perc from "../../sounds/trap//TM-88 Percs [Perc 1].wav";
import shake from "../../sounds/trap/Subtle Shake.wav";
import hhopen from "../../sounds/trap/TM-88 Hats [Open Hat 2].wav";
import hhclosed from "../../sounds/trap/Crack Hat.wav";
import bongo from "../../sounds/trap/TM-88 Percs [Bongo 2].wav";
import took from "../../sounds/trap/Took.wav";
import tommid from "../../sounds/Tom_Mid.wav";
import crash from "../../sounds/trap/BOOMIN CRASH DELAY.wav";
import tambourine from "../../sounds/Tambourine.wav";
import rimshot from "../../sounds/Rimshot.wav";
import roll from "../../sounds/trap/Carmack Bass Roll.wav";
import { BeatTrackerActions } from "./actions";
import Metronome from "../../components/Metronome";
import { connect } from "react-redux";

class BeatTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trackingStatus: false
        };
    }
    renderBeatLine = () => {
        const titleLine = [
            { title: "Bass", url: bass },
            { title: "Kick", url: kick },
            { title: "Pop Snare", url: poppin_snare },
            { title: "Prea Snare", url: preach_snare },
            { title: "Perc", url: perc },
            { title: "Shake", url: shake },
            { title: "Hhopen", url: hhopen },
            { title: "Hhclosed", url: hhclosed },
            { title: "bongo", url: bongo },
            { title: "took", url: took },
            { title: "TomMid", url: tommid },
            { title: "Crash", url: crash },
            { title: "Tambourine", url: tambourine },
            { title: "Rimshot", url: rimshot },
            { title: "Roll", url: roll }
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
                <button onClick={this.handleStartClick}>Start</button>
                <input
                    type="range"
                    min="60"
                    max="200"
                    step="1"
                    onChange={this.handleChangeBPM}
                />
                <div className="bpm">{this.props.beatTracker.bpm}</div>
                <Metronome />
                {this.renderBeatLine()}
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
