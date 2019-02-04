import { 
    POPUP_CONFIRMATION_DIALOG_IS_SHOW, 
    POPUP_CONFIRMATION_DIALOG_IS_NOT_SHOW 
} from '../actions/PopupConfirmationDialog/actionTypes';

interface IActionType {
    type: string;
    payload?: any;
}

interface IStateType {
    modal: boolean
}

const initilState = {
    modal: false
};

const reducer = (state: IStateType = initilState, action: IActionType) => {
    switch(action.type) {
        case POPUP_CONFIRMATION_DIALOG_IS_SHOW: 
            return {
                ...state,
                modal: true
            }
        case POPUP_CONFIRMATION_DIALOG_IS_NOT_SHOW:
            return {
                ...state,
                modal: false
            }
        default: 
            return state
    }
}

export default reducer;