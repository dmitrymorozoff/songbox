import React from "react";
import { connect } from "react-redux";
import { PatternActions } from "./actions";
import "./style.css";

class Patterns extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        };
    }
    onChangeVolume = event => {
        this.props.changeVolume(event.target.value);
    };
    handleItemClick = event => {
        let id = event.target.getAttribute("data-id");
        let isActive = this.state.isActive;
        this.setState({
            isActive: !this.state.isActive
        });
        this.props.active({ id, active: !isActive });
    };
    render() {
        return (
            <div className="patterns-wrapper">
                <div
                    className="pattern-item"
                    data-id="1"
                    onClick={this.handleItemClick}
                >
                    1
                </div>
                <div className="pattern-item" data-id="2">
                    2
                </div>
                <div className="pattern-item" data-id="3">
                    3
                </div>
                <div className="pattern-item" data-id="4">
                    4
                </div>
                <div className="pattern-item" data-id="5">
                    5
                </div>
                <div className="pattern-item" data-id="6">
                    6
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
        active: id => {
            dispatch(PatternActions.active(id));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Patterns);
