export const CREATE_DIALOG = 'CREATE_DIALOG';
export const UPDATE_DIALOG_POS = 'UPDATE_DIALOG_POS';
export const UPDATE_DIALOG_STATE = 'UPDATE_DIALOG_STATE';

export const createDialog = info => dispatch => dispatch({
    type: CREATE_DIALOG,
    payload: { ...info }
});

export const updateDialogPos = (id, pos) => dispatch => dispatch({
    type: UPDATE_DIALOG_POS,
    payload: { id, ...pos }
});

export const updateDialogState = (id, state) => dispatch => dispatch({
    type: UPDATE_DIALOG_STATE,
    payload: { id, ...state }
});
