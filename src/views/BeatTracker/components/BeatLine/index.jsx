import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sound from "../../../../helpers/sound";
import "./style.css";
import { audioContext } from "../../../App";

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
        let interval = 60 / bpm * 1000 / 4;
        if (status) {
            const start = () => {
                ticker = setInterval(() => {
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
                }, interval);
                this.setState({
                    tickerId: ticker
                });
            };
            start();
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
    }
    render() {
        return (
            <div className="beat-tracker-wrapper">
                <div className="beatline-wrapper">
                    <div className="beatline-title">{this.props.title}</div>
                    <div className="beatline">{this.renderBeatLine()}</div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return { beatTracker: state.beatTrackerReducer };
};
const mapDispatchToProps = dispatch => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(BeatLine);
