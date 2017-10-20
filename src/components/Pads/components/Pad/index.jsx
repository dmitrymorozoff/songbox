import React, { Component } from "react";
import PropTypes from "prop-types";
import Sound from "../../../../helpers/sound";
import "./style.css";
import { connect } from "react-redux";
import { PadsActions } from "../../actions";
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

class Pad extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        keyTitle: PropTypes.string.isRequired,
        padsState: PropTypes.object,
        play: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
            volume: 1
        };
        this.sound = new Sound(
            this.props.url,
            audioContext,
            false,
            event => {}
        );
    }
    play = event => {
        this.props.play({ title: this.props.title, url: this.props.title.url });
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.padsState.volume !== this.props.padsState.volume) {
            this.setState({
                volume: this.props.padsState.volume
            });
        }
    }
    checkPlay = () => {
        if (this.props.padsState.playingPad) {
            if (this.props.padsState.playingPad.title === this.props.title) {
                this.sound = new Sound(
                    this.props.url,
                    audioContext,
                    false,
                    event => {}
                );
                this.sound.loadSoundFile();
                this.sound.changeVolume(this.state.volume);
                this.sound.play();
                this.props.play({ title: "", url: "" });
            }
        }
    };
    render() {
        this.checkPlay();
        return (
            <div className="pad-wrapper" onClick={this.play}>
                {`${this.props.title} (${this.props.keyTitle})`}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return { padsState: state.padsReducer };
};
const mapDispatchToProps = dispatch => {
    return {
        play: data => {
            dispatch(PadsActions.play(data));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Pad);
