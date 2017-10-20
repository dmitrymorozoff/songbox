const prefix = "PADS_";

export const PADS = {
    PLAY: `${prefix}PLAY`,
    CHANGE_VOLUME: `${prefix}CHANGE_VOLUME`
};

export const PadsActions = {
    play(data) {
        return {
            type: PADS.PLAY,
            payload: data
        };
    },
    changeVolume(value) {
        return {
            type: PADS.CHANGE_VOLUME,
            payload: value
        };
    }
};
