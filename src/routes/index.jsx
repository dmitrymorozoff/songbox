import React from "react";
import { Switch, Route } from "react-router-dom";
import DrumPads from "../views/DrumPads/";

export default (
    <Switch>
        <Route path="/" exact component={DrumPads} />
        <Route path="/drumpads" exact component={DrumPads} />
    </Switch>
);
