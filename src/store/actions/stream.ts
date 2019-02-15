import * as actionTypes from './actionTypes'
import apiManager from '../../util/apiManager';

// Save performance Id in central Store
export const savePerformanceId = (id: number) => {
    return {
        type: actionTypes.SAVE_PERFORMANCE_ID,
        payload: {
            id: id
        }
    }
};

// Load Speeches and store them in central store
const storeSpeeches = (data: any) => {
    return {
        type: actionTypes.LOAD_SPEECHES,
        payload: {
            speeches: data
        }
    };
};

export const loadSpeeches = (id: number) => {
    return async (dispatch: any) => {
        const apiManage = new apiManager();

        const resp = await apiManage.getSpeechInfo(id);
        const data = await resp.json();

        dispatch(storeSpeeches(data));
    };
};

// Save new current speech id in central store
export const saveCurrentSpeechId = (id: number) => {
    return {
        type: actionTypes.SAVE_CURRENT_SPEECH_ID,
        payload: {
            currentSpeechId: id
        }
    };
};

// Change streaming status to the opposite previous
export const changeStreamingStatus = (status: boolean) => {
    return {
        type: actionTypes.CHANGE_STREAMING_STATUS,
        payload: {
            isPlaying: status
        }
    }
};

// Change stream state to initial
export const changeStreamStateToInitial = () => {
    return {
        type: actionTypes.CHANGE_STREAM_STATE_TO_INITIAL
    };
};

// Change current playback time
export const changeCurrentPlaybackTime = (currentPlaybackTime: number) => {
    return {
        type: actionTypes.CHANGE_CURRENT_PLAYBACK_TIME,
        payload: {
            currentPlaybackTime: currentPlaybackTime
        }
    };
};

// Change connecting status
export const changeConnectingStatus = (status: boolean) => {
    return {
        type: actionTypes.CHANGE_CONNECTING_STATUS,
        payload: {
            status: status
        }
    };
};