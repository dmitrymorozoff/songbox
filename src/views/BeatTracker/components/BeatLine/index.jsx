import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sound from "../../../../helpers/sound";
import "./style.css";
import { audioContext } from "../../../App";
import { BeatTrackerActions } from "../../actions";
import patternOne from "./patterns/";

class BeatLine extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        countCubes: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        addActiveBeat: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
            activeBeats: [],
            currentTrackingBeat: -1,
            tickerId: null
        };
        this.sound = new Sound(
            this.props.url,
            audioContext,
            false,
            event => {}
        );
    }
    componentWillMount() {
        let initialArray = [];
        for (let i = 0; i < this.props.countCubes; i++) {
            initialArray.push(false);
        }
        this.setState({
            activeBeats: [...this.state.activeBeats, ...initialArray]
        });
        this.props.addActiveBeat({
            type: this.props.title,
            beats: [...this.state.activeBeats, ...initialArray]
        });
    }
    handleClickBeat = event => {
        let dataId = event.target.getAttribute("data-id");
        let activeBeats = this.state.activeBeats;
        activeBeats[dataId] = !activeBeats[dataId];
        this.setState({
            activeBeats: [...activeBeats]
        });
        this.props.addActiveBeat({
            type: this.props.title,
            beats: [...activeBeats]
        });
    };
    tracking = status => {
        let countIteration = this.props.countCubes;
        let current = 0;
        let ticker = null;
        let bpm = this.props.beatTracker.bpm;
        let interval = 60 * 1000 / bpm / 3;
        const tracker = () => {
            if (current === countIteration) {
                current = 0;
            }
            this.setState({
                currentTrackingBeat: current
            });
            if (this.state.activeBeats[current]) {
                this.sound.loadSoundFile();
                this.sound.play();
            }
            current++;
        };

        if (status) {
            tracker();
            ticker = setInterval(tracker, interval);
            this.setState({
                tickerId: ticker
            });
        } else {
            clearInterval(this.state.tickerId);
            this.setState({
                tickerId: null
            });
        }
    };
    renderBeatLine = () => {
        let beatline = [];
        let trackingClass = "";
        let activeClass = "";
        let preset = null;
        let flag = false;
        let divideClass = "";
        for (let i = 0; i < this.props.countCubes; i++) {
            if (this.state.currentTrackingBeat === i) {
                trackingClass = "tracking";
            }
            if (this.state.activeBeats[i]) {
                activeClass = "active";
            }
            if (i === 0 || i % 4 === 0) {
                divideClass = "divide";
            }
            beatline.push(
                <div
                    className={`beatline-beat ${trackingClass} ${activeClass} ${divideClass} ${this.props.title.toLowerCase()}`}
                    data-id={i}
                    key={i.toString()}
                    onClick={this.handleClickBeat}
                />
            );
            trackingClass = "";
            activeClass = "";
            divideClass = "";
        }
        return beatline;
    };
    componentWillReceiveProps(nextProps) {
        if (
            nextProps.beatTracker.trackingStatus !==
            this.props.beatTracker.trackingStatus
        ) {
            this.tracking(nextProps.beatTracker.trackingStatus);
        }
        if (nextProps.beatTracker.bpm !== this.props.beatTracker.bpm) {
            clearInterval(this.state.tickerId);
            this.tracking(nextProps.beatTracker.trackingStatus);
        }
        if (
            nextProps.patterns.activePattern.active !==
            this.props.patterns.activePattern.active
        ) {
            let preset = null;
            if (!nextProps.patterns.activePattern.active) {
                preset = [];
                this.setState({
                    activeBeats: [...preset]
                });
                this.props.addActiveBeat({
                    type: this.props.title,
                    beats: [...preset]
                });
            } else {
                switch (parseInt(nextProps.patterns.activePattern.id, 10)) {
                    case 1:
                        switch (this.props.title) {
                            case "Kick":
                                preset = [...patternOne["Kick"]];
                                this.setState({
                                    activeBeats: [...preset]
                                });
                                this.props.addActiveBeat({
                                    type: this.props.title,
                                    beats: [...preset]
                                });
                                break;
                            case "Snare":
                                preset = [...patternOne["Snare"]];
                                this.setState({
                                    activeBeats: [...preset]
                                });
                                this.props.addActiveBeat({
                                    type: this.props.title,
                                    beats: [...preset]
                                });
                                break;
                            case "Perc":
                                preset = [...patternOne["Perc"]];
                                this.setState({
                                    activeBeats: [...preset]
                                });
                                this.props.addActiveBeat({
                                    type: this.props.title,
                                    beats: [...preset]
                                });
                                break;
                            case "Bleep":
                                preset = [...patternOne["Bleep"]];
                                this.setState({
                                    activeBeats: [...preset]
                                });
                                this.props.addActiveBeat({
                                    type: this.props.title,
                                    beats: [...preset]
                                });
                                break;
                            case "HiHat":
                                preset = [...patternOne["HiHat"]];
                                this.setState({
                                    activeBeats: [...preset]
                                });
                                this.props.addActiveBeat({
                                    type: this.props.title,
                                    beats: [...preset]
                                });
                                break;
                            case "Conga":
                                preset = [...patternOne["Conga"]];
                                this.setState({
                                    activeBeats: [...preset]
                                });
                                this.props.addActiveBeat({
                                    type: this.props.title,
                                    beats: [...preset]
                                });
                                break;
                            case "DigConga":
                                preset = [...patternOne["DigConga"]];
                                this.setState({
                                    activeBeats: [...preset]
                                });
                                this.props.addActiveBeat({
                                    type: this.props.title,
                                    beats: [...preset]
                                });
                                break;
                            case "LowConga":
                                preset = [...patternOne["LowConga"]];
                                this.setState({
                                    activeBeats: [...preset]
                                });
                                this.props.addActiveBeat({
                                    type: this.props.title,
                                    beats: [...preset]
                                });
                                break;
                            case "Tom":
                                preset = [...patternOne["Tom"]];
                                this.setState({
                                    activeBeats: [...preset]
                                });
                                this.props.addActiveBeat({
                                    type: this.props.title,
                                    beats: [...preset]
                                });
                                break;
                            case "Rimshot":
                                preset = [...patternOne["Rimshot"]];
                                this.setState({
                                    activeBeats: [...preset]
                                });
                                this.props.addActiveBeat({
                                    type: this.props.title,
                                    beats: [...preset]
                                });
                                break;
                            case "Cymbal":
                                preset = [...patternOne["Cymbal"]];
                                this.setState({
                                    activeBeats: [...preset]
                                });
                                this.props.addActiveBeat({
                                    type: this.props.title,
                                    beats: [...preset]
                                });
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }
    render() {
        return (
            <div className="beat-line-wrapper">
                <div className="beatline-wrapper">
                    <div className={`beatline-title ${this.props.title.toLowerCase()}`}>{this.props.title}</div>
                    <div className="beatline">{this.renderBeatLine()}</div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        beatTracker: state.beatTrackerReducer,
        patterns: state.patternReducer
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addActiveBeat: beatsArray => {
            dispatch(BeatTrackerActions.addActiveBeat(beatsArray));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(BeatLine);
