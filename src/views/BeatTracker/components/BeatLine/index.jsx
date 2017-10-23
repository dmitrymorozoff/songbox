import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sound from "../../../../helpers/sound";
import "./style.css";
import { audioContext } from "../../../App";
import patternOne from "./patterns/";

class BeatLine extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        countCubes: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired
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
    }
    handleClickBeat = event => {
        let dataId = event.target.getAttribute("data-id");
        let activeBeats = this.state.activeBeats;
        activeBeats[dataId] = !activeBeats[dataId];
        this.setState({
            activeBeats: [...activeBeats]
        });
    };
    tracking = status => {
        let countIteration = this.props.countCubes;
        let current = 0;
        let ticker = null;
        let bpm = this.props.beatTracker.bpm;
        let interval = 60 * 1000 / bpm / 2.5;
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
            console.log(interval);
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
        for (let i = 0; i < this.props.countCubes; i++) {
            if (this.state.currentTrackingBeat === i) {
                trackingClass = "tracking";
            }

            if (this.state.activeBeats[i]) {
                activeClass = "active";
            }

            beatline.push(
                <div
                    className={`beatline-beat ${trackingClass} ${activeClass}`}
                    data-id={i}
                    key={i.toString()}
                    onClick={this.handleClickBeat}
                />
            );
            trackingClass = "";
            activeClass = "";
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
            } else {
                console.log(nextProps.patterns.activePattern.id);
                switch (parseInt(nextProps.patterns.activePattern.id, 10)) {
                    case 1:
                        switch (this.props.title) {
                            case "Kick":
                                preset = [...patternOne["Kick"]];
                                this.setState({
                                    activeBeats: [...preset]
                                });
                                break;
                            case "Snare":
                                preset = [...patternOne["Snare"]];
                                this.setState({
                                    activeBeats: [...preset]
                                });
                                break;
                            case "Perc":
                                preset = [...patternOne["Perc"]];
                                this.setState({
                                    activeBeats: [...preset]
                                });
                                break;
                            case "Bleep":
                                preset = [...patternOne["Bleep"]];
                                this.setState({
                                    activeBeats: [...preset]
                                });
                                break;
                            case "HiHat":
                                preset = [...patternOne["HiHat"]];
                                this.setState({
                                    activeBeats: [...preset]
                                });
                                break;
                            case "Conga":
                                preset = [...patternOne["Conga"]];
                                this.setState({
                                    activeBeats: [...preset]
                                });
                                break;
                            case "DigConga":
                                preset = [...patternOne["DigConga"]];
                                this.setState({
                                    activeBeats: [...preset]
                                });
                                break;
                            case "LowConga":
                                preset = [...patternOne["LowConga"]];
                                this.setState({
                                    activeBeats: [...preset]
                                });
                                break;
                            case "Tom":
                                preset = [...patternOne["Tom"]];
                                this.setState({
                                    activeBeats: [...preset]
                                });
                                break;
                            case "Rimshot":
                                preset = [...patternOne["Rimshot"]];
                                this.setState({
                                    activeBeats: [...preset]
                                });
                                break;
                            case "Cymbal":
                                preset = [...patternOne["Cymbal"]];
                                this.setState({
                                    activeBeats: [...preset]
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
                    <div className="beatline-title">{this.props.title}</div>
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
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(BeatLine);
