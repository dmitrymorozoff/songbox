import React from "react";
import Pads from "../../components/Pads";
import { connect } from "react-redux";
import { PadsActions } from "../../components/Pads/actions";
import "./style.css";

class DrumPads extends React.Component {
    onChangeVolume = event => {
        console.log(event.target.value);
        this.props.changeVolume(event.target.value);
    };
    render() {
        return (
            <div>
                <input
                    className="pads-volume-range"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    onChange={this.onChangeVolume}
                />
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
