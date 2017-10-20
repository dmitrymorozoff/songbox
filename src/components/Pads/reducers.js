import { PADS } from "./actions";

const initialState = {
    pads: [],
    volume: 1
};

export default function padsReducer(state = initialState, action) {
    switch (action.type) {
        case PADS.PLAY:
            return {
                ...state,
                playingPad: action.payload
            };
        case PADS.CHANGE_VOLUME:
            console.log(action.payload);
            return {
                ...state,
                volume: action.payload
            };
        default:
            return state;
    }
}
