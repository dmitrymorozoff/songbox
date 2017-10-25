import React from "react";
import Pads from "../../components/Pads";
import { connect } from "react-redux";
import { PadsActions } from "../../components/Pads/actions";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import "./style.css";
import CircularSlider from "../../components/CircularSlider";

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
            <div className="drumpads-wrapper">
                <CircularSlider
                    radius={100}
                    border={10}
                    fontSize={40}
                    circleStroke={"rgb(35, 40, 65)"}
                    barStroke={"#3260fc"}
                    value={this.state.volume}
                    onChange={this.onChangeVolume}
                />
                {/* <Slider
                    value={this.state.volume}
                    orientation="vertical"
                    min={0}
                    max={1}
                    step={0.1}
                    tooltip={false}
                    onChange={this.onChangeVolume}
                /> */}
                <Pads />
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
