import {
    CREATE_DIALOG,
    UPDATE_DIALOG_POS,
    UPDATE_DIALOG_STATE,
} from './actions';

export const dialogReducer = (state = {}, action) => {
    switch(action.type) {
        case CREATE_DIALOG: {
            const { id } = action.payload;
            return {
                ...state,
                [id]: { ...action.payload }
            };
        }
        case UPDATE_DIALOG_STATE:
        case UPDATE_DIALOG_POS: {
            const { id } = action.payload;
            return {
                ...state,
                [id]: { ...state[id], ...action.payload }
            };
        }
        default:
            return state;
    }
};

export const dialogStateReducer = (state = [], action) => {
    switch(action.type) {
        case UPDATE_DIALOG_STATE: {
            const { id, showing, isMinimized } = action.payload;
            if (showing) {
                if (state.indexOf(id) == -1) {
                    return state.concat([id]);
                }

                return state;
            } else if (showing == false) {
                return state.filter(s => s != id);
            }

            return state;
        }
        case CREATE_DIALOG: {
            const { id, showing } = action.payload;
            if (showing) {
                return state.concat([id]);
            }

            return state;
        }
        default:
            return state
    }
};