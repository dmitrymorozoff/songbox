import React, { Component } from "react";
import BeatLine from "./components/BeatLine";
import bass from "../../sounds/Bass_Hit.wav";
import clap from "../../sounds/hand_clap.wav";
import snare from "../../sounds/snare_drum.wav";
import cowbell from "../../sounds/cowbell.wav";
import hhopen from "../../sounds//Hi_Hat_Short.wav";
import hhclosed from "../../sounds/Hi_Hat_Closed.wav";
import tomhi from "../../sounds/Tom_Hi.wav";
import tomlow from "../../sounds/Tom_Low.wav";
import tommid from "../../sounds/Tom_Mid.wav";
import cymbal from "../../sounds/cymbal.wav";
import tambourine from "../../sounds/Tambourine.wav";
import rimshot from "../../sounds/Rimshot.wav";
import { BeatTrackerActions } from "./actions";
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
            { title: "Bass", url: bass },
            { title: "Clap", url: clap },
            { title: "Snare", url: snare },
            { title: "CowBell", url: cowbell },
            { title: "Hhopen", url: hhopen },
            { title: "Hhclosed", url: hhclosed },
            { title: "TomHi", url: tomhi },
            { title: "TomLow", url: tomlow },
            { title: "TomMid", url: tommid },
            { title: "Cymbal", url: cymbal },
            { title: "Tambourine", url: tambourine },
            { title: "Rimshot", url: rimshot }
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
                        min="60"
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
    return {};
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
