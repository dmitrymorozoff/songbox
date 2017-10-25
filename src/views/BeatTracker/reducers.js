import { BEAT_TRACKER } from "./actions";

const initialState = {
    trackingStatus: false,
    bpm: 130,
    activeBeats: []
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
        case BEAT_TRACKER.ADD_ACTIVE_BEAT:
        console.log(action);
        //state.activeBeats.filter((item) => item.startsWith(searchText))
            return {
                ...state,
                activeBeats: [...state.activeBeats, action.payload]
            };
        default:
            return state;
    }
}
