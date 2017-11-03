import React from "react";
import "./style.css";
import { connect } from "react-redux";
import Sound from "../../helpers/sound";
import PropTypes from "prop-types";
import metronome from "../../sounds/metronome/CLK_LOGIC1.wav";
import { audioContext } from "../../views/App";

class Metronome extends React.Component {
    static propTypes = {
        beatTracker: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            tickerId: null,
            isPlay: false
        };
        this.sound = new Sound(metronome, audioContext, false, event => {});
    }
    start = () => {
        let ticker = 0;
        let bpm = this.props.beatTracker.bpm;
        let interval = 60 * 1000 / bpm / 3;
        const metronome = () => {
            this.sound.loadSoundFile();
            this.sound.play();
        };
        metronome();
        ticker = setInterval(metronome, interval);
        this.setState({
            tickerId: ticker
        });
    };
    handleStartClick = () => {
        this.setState({
            isPlay: !this.state.isPlay
        });
        if (this.state.isPlay) {
            this.start();
        } else {
            clearInterval(this.state.tickerId);
            this.setState({
                tickerId: null
            });
        }
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.beatTracker.bpm !== this.props.beatTracker.bpm) {
            if (this.state.isPlay) {
                clearInterval(this.state.tickerId);
                this.start();
            }
        }
    }
    render() {
        return (
            <div className="metronome-wrapper">
                <button onClick={this.handleStartClick}>Start</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(Metronome);
