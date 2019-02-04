import * as actionTypes from './actionTypes';

export const modalShow = () => {
    return {
        type: actionTypes.POPUP_CONFIRMATION_DIALOG_IS_SHOW
    }
};

export const modalHide = () => {
    return {
        type: actionTypes.POPUP_CONFIRMATION_DIALOG_IS_NOT_SHOW
    }
};
