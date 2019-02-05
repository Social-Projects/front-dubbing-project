import * as actionTypes from '../actions/actionTypes';

interface ActionType {
    type: string,
    payload: any
};

interface StateType {
    performanceId: number,
    speeches?: {
        id: number,
        text: string,
        duration: number
    }[],
    isPlaying: boolean,
    currentSpeechId: number,
    currentSpeechIndex: number,
    currentPlaybackTime: number
};

const initialState = {
    performanceId: -1,
    speeches: undefined,
    isPlaying: false,
    currentSpeechId: -1,
    currentSpeechIndex: -1,
    currentPlaybackTime: 0
};

const reducer = (state: StateType = initialState, action: ActionType) => {
    let updatedState = {
        ...state
    };

    switch(action.type) {
        case actionTypes.SAVE_PERFORMANCE_ID:
            updatedState.performanceId = action.payload.id;
            break;
        case actionTypes.LOAD_SPEECHES:
            updatedState.speeches = action.payload.speeches;
            updatedState.currentSpeechId = action.payload.speeches[0].id;
            updatedState.currentSpeechIndex = 0;
            break;
        case actionTypes.SAVE_CURRENT_SPEECH_ID:
            updatedState.currentSpeechId = action.payload.currentSpeechId;
            updatedState.currentSpeechIndex = state.speeches !== undefined ?
                                                 state.speeches.findIndex(speech => speech.id === action.payload.currentSpeechId) : -1;
            break;
        case actionTypes.CHANGE_STREAMING_STATUS:
            updatedState.isPlaying = action.payload.isPlaying;
            break;
        case actionTypes.CHANGE_CURRENT_PLAYBACK_TIME:
            updatedState.currentPlaybackTime = action.payload.currentPlaybackTime;
            break;
        case actionTypes.CHANGE_STREAM_STATE_TO_INITIAL:
            updatedState = initialState;
            break;
        default:
            break;
    }

    return updatedState;
};

export default reducer;