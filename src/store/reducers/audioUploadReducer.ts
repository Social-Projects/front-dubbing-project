import * as actionTypes from "../actions/actionTypes";

interface IStateType {
    isNewFilesLoaded: boolean;
}

interface IActionType {
    type: string;
    payload: any;
}

const initialState: IStateType = {
    isNewFilesLoaded: false,
};

const audioUploadReducer = (state: IStateType = initialState, action: IActionType) => {
    const updatedState = {
        ...state,
    };

    switch (action.type) {
        case actionTypes.CHANGE_IS_NEW_FILES_LOADED:
            updatedState.isNewFilesLoaded = action.payload.nextValue;
            break;
    }

    return updatedState;
};

export default audioUploadReducer;
