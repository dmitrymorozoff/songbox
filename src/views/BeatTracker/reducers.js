import { BEAT_TRACKER } from "./actions";

const initialState = {
    trackingStatus: false,
    bpm: 130
};

export default function beatTrackerReducer(state = initialState, action) {
    switch (action.type) {
        case BEAT_TRACKER.TOGGLE_TRACKING:
            return {
                ...state,
                trackingStatus: action.payload
            };
        case BEAT_TRACKER.CHANGE_BPM:
            return {
                ...state,
                bpm: action.payload
            };
        default:
            return state;
    }
}
