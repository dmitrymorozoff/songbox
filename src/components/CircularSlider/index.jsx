import React, { Component } from "react";
import "./style.css";

export default class CircularSlider extends Component {
    constructor(props) {
        super(props);
        this.state = { isMoving: false };
    }
    componentDidMount() {
        this.x = 0;
        this.y = 0;
        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);
    }
    componentWillUnmount() {
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp);
    }
    handleMouseUp = () => {
        this.setState({ isMoving: false });
    };
    handleMouseDown = event => {
        event.preventDefault();
        const {
            left,
            top,
            width,
            height
        } = this.cslider.getBoundingClientRect();
        this.x = event.pageX - (left + width / 2);
        this.y = top + height / 2 - event.pageY;
        this.setState({ isMoving: true });
    };
    handleMouseMove = event => {
        if (this.state.isMoving) {
            const {
                left,
                top,
                width,
                height
            } = this.cslider.getBoundingClientRect();
            const x = event.pageX - (left + width / 2);
            const y = top + height / 2 - event.pageY;
            const dx = (x - this.x) / 100;
            const dy = (y - this.y) / 100;
            this.x = x;
            this.y = y;
            if (this.props.onChange) {
                let xValue = this.props.value + dx;
                let yValue = this.props.value + dy;
                if (xValue < 0) {
                    xValue = 0;
                }
                if (xValue > 1) {
                    xValue = 1;
                }
                if (yValue < 0) {
                    yValue = 0;
                }
                if (yValue > 1) {
                    yValue = 1;
                }
                this.props.onChange(xValue, yValue);
            }
        }
    };
    render() {
        const {
            radius,
            border,
            value,
            circleStroke,
            barStroke,
            fontSize
        } = this.props;
        const p = 2 * Math.PI * (radius - border / 2);
        const strokeWidth = border;
        const strokeDashoffset = p * (1 - value);
        const strokeDasharray = p;
        return (
            <svg
                className="circular-slider"
                ref={cslider => (this.cslider = cslider)}
                viewBox={`0 0 ${radius * 2} ${radius * 2}`}
                onMouseDown={this.handleMouseDown}
            >
                <circle
                    className="circular-slider-circle"
                    style={{ strokeWidth }}
                    stroke={circleStroke}
                    r={radius - border / 2}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    className="circular-slider-bar"
                    style={{
                        strokeWidth,
                        strokeDashoffset,
                        strokeDasharray
                    }}
                    stroke={barStroke}
                    r={radius - border / 2}
                    cx={radius}
                    cy={radius}
                />
                <text
                    textAnchor="middle"
                    fontSize={fontSize}
                    fontWeight="bold"
                    x={radius}
                    y={radius + fontSize / 4}
                    transform={`rotate(90,${radius},${radius})`}
                    fill="#e5e5e9"
                >
                    {value}
                </text>
            </svg>
        );
    }
}
