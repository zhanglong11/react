import {
    MENU_APPEARENCE,
    MENU_FUNCTION_SET,
    MENU_POS_UPDATE,
    MENU_REQUEST,
    MENU_RESOLVE,
    MENU_CLOSE_ALL
} from './actions';
import { uniq } from 'ramda';

export const menuStatusReducer = (state = {idle:[], working:[]}, action) => {
    switch(action.type) {
        case MENU_APPEARENCE: {
            const { id, showing } = action.payload;
            if (showing) {
                return {
                    working: uniq([...state.working, id]),
                    idle: state.idle.filter(s => s != id)
                };
            } else if (showing == false) {
                return {
                    working: state.working.filter(s => s != id),
                    idle: uniq([...state.idle, id])
                };
            }

            return state;
        }
        case MENU_RESOLVE: {
            const { id } = action.payload;
            return {
                working: state.working,
                idle: state.idle.indexOf(id) > -1 ? state.idle : uniq([...state.idle, id])
            };
        }
        case MENU_CLOSE_ALL: {
            return {
                working: [],
                idle: uniq([...state.idle, ...state.working])
            };
        }
        default: {
            return state;
        }
    }
};

export const menuFunctionReducer = (state = {}, action) => {
    switch(action.type) {
        case MENU_FUNCTION_SET: {
            const { id, funcs } = action.payload;
            return {
                ...state,
                [id]: [...funcs]
            }
        }
        default: {
            return state;
        }
    }
};

export const menuPosReducer = (state={}, action) => {
    switch(action.type) {
        case MENU_POS_UPDATE: {
            const {id, pos} = action.payload;
            return {
                ...state,
                [id]: {...pos}
            };
        }
        default: {
            return state;
        }
    }
};

export const menuRequestReducer = (state=[], action) => {
    switch(action.type) {
        case MENU_REQUEST: {
            return [...state, action.payload];
        }
        case MENU_RESOLVE: {
            return state.slice(1);
        }
        default: {
            return state;
        }
    }
};