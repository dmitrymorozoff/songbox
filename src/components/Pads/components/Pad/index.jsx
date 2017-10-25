import React, { Component } from "react";
import PropTypes from "prop-types";
import Sound from "../../../../helpers/sound";
import "./style.css";
import { connect } from "react-redux";
import { PadsActions } from "../../actions";
import { audioContext } from "../../../../views/App";

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
            volume: 1,
            isActive: false
        };
        this.sound = new Sound(
            this.props.url,
            audioContext,
            false,
            event => {}
        );
    }
    handlePlay = event => {
        this.props.play({ title: this.props.title, url: this.props.url });
    };
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.padsState.volume !== this.props.padsState.volume) {
            this.setState({
                volume: this.props.padsState.volume
            });
        }
        if(nextProps.padsState.playingPad) {
            if (nextProps.padsState.playingPad.title === this.props.title) {
                this.sound = new Sound(
                    this.props.url,
                    audioContext,
                    false,
                    event => {}
                );
                this.sound.loadSoundFile();
                this.sound.changeVolume(this.state.volume);
                this.sound.play();
            }
        }

    }
    handleMouseDown = () => {
        this.setState({
            isActive: true
        });
    };
    handleMouseUp = () => {
        this.setState({
            isActive: false
        });
    };
    render() {
        return (
            <div
                className={
                    this.state.isActive ? "pad-wrapper active" : "pad-wrapper"
                }
                onClick={this.handlePlay}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
            >
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
