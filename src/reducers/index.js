import { combineReducers } from "redux";
import padsReducer from "../components/Pads/reducers";
import beatTrackerReducer from "../views/BeatTracker/reducers";

export default combineReducers({ padsReducer, beatTrackerReducer });
