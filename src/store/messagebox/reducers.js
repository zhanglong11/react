import {
    MESSAGEBOX_REQUEST,
    MESSAGEBOX_RESOLVE,
    MESSAGEBOX_APPEARENCE_CHANGE,
    MESSAGEBOX_POS_CHANGE,
    MESSAGEBOX_CONTENT_CHANGE,
    MESSAGEBOX_ADDITION,
    MESSAGEBOX_BASEPROP_CHANGE,
    MESSAGEBOX_TITLE_CHANGE,
    MESSAGEBOX_SIZE_CHANGE,
    MESSAGEBOX_CLOSE_ALL
} from './actions';
import { uniq } from 'ramda';

export const messageboxStateReducer = (state = {working:[], idle:[]}, action) => {
    switch(action.type) {
        case MESSAGEBOX_APPEARENCE_CHANGE: {
            const { id, showing } = action.payload;
            if (showing) {
                return {
                    working: uniq([...state.working, id]),
                    idle: state.idle.filter(s => s != id)
                };
            } else {
                return {
                    working: state.working.filter(s => s != id),
                    idle: uniq([...state.idle, id])
                };
            }
        }
        case MESSAGEBOX_ADDITION: {
            const { id, showing } = action.payload;
            if (showing) {
                return {
                    working: uniq([...state.working, id]),
                    idle: state.idle
                };
            } else {
                return {
                    working: state.working,
                    idle: uniq([...state.idle, id])
                };
            }
        }
        case MESSAGEBOX_CLOSE_ALL: {
            return {
                working: [],
                idle: uniq([...state.idle, ...state.working])
            };
        }
        default:
            return state;
    }
}

export const messageboxReducer = (state = {}, action) => {
    switch(action.type) {
        case MESSAGEBOX_ADDITION: {
            const { id, info: { pos, ...others } } = action.payload;
            return {
                ...state,
                [id]: { ...others, ...pos }
            }
        }
        case MESSAGEBOX_POS_CHANGE: {
            const {id, pos} = action.payload;
            if (!state[id]) {
                return state;
            } else {
                return {
                    ...state,
                    [id]: {
                        ...state[id],
                        ...pos
                    }
                }
            }
        }
        case MESSAGEBOX_SIZE_CHANGE: {
            const {id, size} = action.payload;
            if (!state[id]) {
                return state;
            } else {
                return {
                    ...state,
                    [id]: {
                        ...state[id],
                        ...size
                    }
                }
            }
        }
        case MESSAGEBOX_CONTENT_CHANGE: {
            const {id, content} = action.payload;
            if (!state[id]) {
                return state;
            } else {
                return {
                    ...state,
                    [id]: {
                        ...state[id],
                        content
                    }
                };
            }
        }
        case MESSAGEBOX_TITLE_CHANGE: {
            const { id, title } = action.payload;
            if (!state[id]) {
                return state;
            } else {
                return {
                    ...state,
                    [id]: {
                        ...state[id],
                        title
                    }
                };
            }
        }
        case MESSAGEBOX_BASEPROP_CHANGE: {
            const { id, props } = action.payload;
            if (!state[id]) {
                return state;
            } else {
                return {
                    ...state,
                    [id]: {
                        ...state[id],
                        ...props
                    }
                };
            }
        }
        default:
            return state;
    }
}

export const messageboxRequestsReducer = (state=[], action) => {
    switch(action.type) {
        case MESSAGEBOX_REQUEST: {
            return [...state, action.payload];
        }
        case MESSAGEBOX_RESOLVE: {
            return state.slice(1);
        }
        default:
            return state;
    }
};