import React from "react";
import { Switch, Route } from "react-router-dom";
import DrumPads from "../views/DrumPads/";
import BeatTracker from "../views/BeatTracker/";

export default (
    <Switch>
        <Route path="/" exact component={DrumPads} />
        <Route path="/drumpads" exact component={DrumPads} />
        <Route path="/beattracker" exact component={BeatTracker} />
    </Switch>
);
