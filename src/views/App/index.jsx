import React from "react";
import { BrowserRouter } from "react-router-dom";
import routes from "../../routes/index";
export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <div className="app-content">{routes}</div>
                </div>
            </BrowserRouter>
        );
    }
}
