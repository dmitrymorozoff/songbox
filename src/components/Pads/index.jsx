import React from "react";
import Pad from "./components/Pad";
import "./style.css";
import { connect } from "react-redux";
import bass from "../../sounds/bass_drum.wav";
import snare from "../../sounds/snare_drum.wav";
import closeHiHat from "../../sounds/cl_hi_hat.wav";
import cymbal from "../../sounds/cymbal.wav";
import PropTypes from "prop-types";
import openHiHat from "../../sounds/o_hi_hat.wav";
import cowbell from "../../sounds/cowbell.wav";
import clap from "../../sounds/hand_clap.wav";
import rimshot from "../../sounds/rim_shot.wav";
import tom from "../../sounds/hi_tom.wav";
import { PadsActions } from "./actions";

class Pads extends React.Component {
    static propTypes = {
        play: PropTypes.func,
        pads: PropTypes.object
    };
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        document.addEventListener("keydown", this.onKeyPressed.bind(this));
    }
    onKeyPressed = event => {
        const key = event.key;
        let title = "";
        switch (key.toUpperCase()) {
            case "K":
                title = "Kick";
                this.props.play({ title, key });
                break;
            case "S":
                title = "Snare";
                this.props.play({ title, key });
                break;
            case "R":
                title = "Rimshot";
                this.props.play({ title, key });
                break;
            case "O":
                title = "Hhopen";
                this.props.play({ title, key });
                break;
            case "C":
                title = "Clap";
                this.props.play({ title, key });
                break;
            case "H":
                title = "HHClosed";
                this.props.play({ title, key });
                break;
            case "G":
                title = "Cowbell";
                this.props.play({ title, key });
                break;
            case "T":
                title = "Tom";
                this.props.play({ title, key });
                break;
            case "F":
                title = "Cymbal";
                this.props.play({ title, key });
                break;
            default:
                break;
        }
    };
    renderPads = () => {
        const sounds = [
            {
                title: "Kick",
                url: bass,
                key: "K"
            },
            {
                title: "Snare",
                url: snare,
                key: "S"
            },
            {
                title: "Rimshot",
                url: rimshot,
                key: "R"
            },
            {
                title: "Hhopen",
                url: openHiHat,
                key: "O"
            },
            {
                title: "Clap",
                url: clap,
                key: "C"
            },
            {
                title: "HHClosed",
                url: closeHiHat,
                key: "H"
            },
            {
                title: "Cowbell",
                url: cowbell,
                key: "G"
            },
            {
                title: "Tom",
                url: tom,
                key: "T"
            },
            {
                title: "Cymbal",
                url: cymbal,
                key: "F"
            }
        ];
        return sounds.map((item, index) => {
            return (
                <Pad
                    title={item.title}
                    url={item.url}
                    keyTitle={item.key}
                    key={index.toString()}
                />
            );
        });
    };
    render() {
        return <div className="pads-wrapper">{this.renderPads()}</div>;
    }
}
const mapStateToProps = state => {
    return { pads: state.padsReducer.pads };
};

const mapDispatchToProps = dispatch => {
    return {
        play: data => {
            dispatch(PadsActions.play(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pads);