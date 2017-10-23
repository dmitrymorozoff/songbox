import React from "react";
import { connect } from "react-redux";
import "./style.css";

class Patterns extends React.Component {
    onChangeVolume = event => {
        this.props.changeVolume(event.target.value);
    };
    render() {
        return (
            <div className="patterns-wrapper">
                <div className="pattern-item">1</div>
                <div className="pattern-item">2</div>
                <div className="pattern-item">3</div>
                <div className="pattern-item">4</div>
                <div className="pattern-item">5</div>
                <div className="pattern-item">6</div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {};
};
const mapDispatchToProps = dispatch => {
    return {
        /*changeVolume: value => {
            dispatch(PadsActions.changeVolume(value));
        }*/
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Patterns);
