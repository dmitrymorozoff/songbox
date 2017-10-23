import { PATTERN } from "./actions";

const initialState = {
    activePattern: {
        active: false
    }
};

export default function patternReducer(state = initialState, action) {
    switch (action.type) {
        case PATTERN.ACTIVE:
            return {
                ...state,
                activePattern: action.payload
            };
        default:
            return state;
    }
}
