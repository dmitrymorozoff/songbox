import React from "react";
import { BrowserRouter } from "react-router-dom";
import routes from "../../routes/index";
import { Link } from "react-router-dom";
import "./style.css";
export const audioContext = new (window.AudioContext ||
    window.webkitAudioContext)();

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <nav className="navbar">
                        <Link to="/drumpads" className="navbar-link">
                            DrumPads
                        </Link>
                        <Link to="/beattracker" className="navbar-link">
                            BeatTracker
                        </Link>
                        <Link to="/synth" className="navbar-link">
                            Synth
                        </Link>
                        <a className="navbar-link">Keys</a>
                    </nav>
                    <div className="app-content">{routes}</div>
                </div>
            </BrowserRouter>
        );
    }
}
