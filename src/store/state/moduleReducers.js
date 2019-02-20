import {
    SET_MODULE
} from './moduleActions';

export const currentModuleReducer = (state = '', action) => {
    switch (action.type) {
        case SET_MODULE: {
            return action.payload;
        }
        default:
            return state;
    }
}