import React from "react";
import Pads from "../../components/Pads";
import { connect } from "react-redux";
import { PadsActions } from "../../components/Pads/actions";
import "rc-slider/assets/index.css";
import "./style.css";
import Patterns from "../../components/Patterns";
import Slider from "rc-slider";

class DrumPads extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            volume: 1
        };
    }
    onChangeVolume = value => {
        let val = +value.toFixed(1);
        this.setState({
            volume: val
        });
        this.props.changeVolume(val);
    };
    render() {
        let { volume } = this.state;
        return (
            <div className="drumpads">
                <div className="drumpads-wrapper">
                    <Patterns />
                    <Pads />
                    <div className="equalizer">
                        <Slider
                            value={this.state.volume}
                            vertical={true}
                            min={0}
                            max={1}
                            step={0.1}
                            onChange={this.onChangeVolume}
                        />{" "}
                        <Slider
                            value={this.state.volume}
                            vertical={true}
                            min={0}
                            max={1}
                            step={0.1}
                            onChange={this.onChangeVolume}
                        />{" "}
                        <Slider
                            value={this.state.volume}
                            vertical={true}
                            min={0}
                            max={1}
                            step={0.1}
                            onChange={this.onChangeVolume}
                        />{" "}
                        <Slider
                            value={this.state.volume}
                            vertical={true}
                            min={0}
                            max={1}
                            step={0.1}
                            onChange={this.onChangeVolume}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {};
};
const mapDispatchToProps = dispatch => {
    return {
        changeVolume: value => {
            dispatch(PadsActions.changeVolume(value));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DrumPads);
