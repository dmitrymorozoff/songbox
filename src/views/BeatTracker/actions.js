const prefix = "BEAT_TRACKER_";

export const BEAT_TRACKER = {
    TOGGLE_TRACKING: `${prefix}START_TRACKING`,
    CHANGE_BPM: `${prefix}CHANGE_BPM`
};

export const BeatTrackerActions = {
    toggleTracking(flag) {
        return {
            type: BEAT_TRACKER.TOGGLE_TRACKING,
            payload: flag
        };
    },
    changeBPM(value) {
        return {
            type: BEAT_TRACKER.CHANGE_BPM,
            payload: value
        };
    }
};
