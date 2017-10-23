import React from "react";
import { BrowserRouter } from "react-router-dom";
import routes from "../../routes/index";
import { Link } from "react-router-dom";
export const audioContext = new (window.AudioContext ||
    window.webkitAudioContext)();
export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <div>
                        <Link to="/drumpads">DrumPads</Link>
                        <Link to="/beattracker">BeatTracker</Link>
                        <Link to="/synth">Synth</Link>
                        <a>Keys</a>
                    </div>
                    <div className="app-content">{routes}</div>
                </div>
            </BrowserRouter>
        );
    }
}
