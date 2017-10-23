const prefix = "PATTERN_";

export const PATTERN = {
    ACTIVE: `${prefix}ACTIVE`
};

export const PatternActions = {
    active(data) {
        return {
            type: PATTERN.ACTIVE,
            payload: data
        };
    }
};
