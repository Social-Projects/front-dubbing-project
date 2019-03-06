import * as actionTypes from "./actionTypes";

// changing isNewFilesLoaded status
export const changeIsNewFilesLoaded = (nextValue: boolean) => {
    return {
        type: actionTypes.CHANGE_IS_NEW_FILES_LOADED,
        payload: {
            nextValue,
        },
    };
};
