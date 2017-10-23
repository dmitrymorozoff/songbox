import { combineReducers } from "redux";
import padsReducer from "../components/Pads/reducers";
import beatTrackerReducer from "../views/BeatTracker/reducers";
import patternReducer from "../components/Patterns/reducers";

export default combineReducers({
    padsReducer,
    beatTrackerReducer,
    patternReducer
});
