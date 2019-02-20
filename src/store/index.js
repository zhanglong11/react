import { combineReducers } from 'redux';
import {
    dialogReducer,
    dialogStateReducer
} from './dialog/reducers';
import {
    menuStatusReducer,
    menuFunctionReducer,
    menuPosReducer,
    menuRequestReducer
} from './menu/reducers';
import {
    currentModuleReducer
} from './state/moduleReducers';
import {
    messageboxReducer,
    messageboxStateReducer,
    messageboxRequestsReducer
} from './messagebox/reducers';

const uiReducer =  combineReducers({
    dialogs: dialogReducer,
    messageboxes: messageboxReducer,
    activedDialogs: dialogStateReducer,
    messageboxStatus: messageboxStateReducer,
    menuStatus: menuStatusReducer,
    menuFuncs: menuFunctionReducer,
    menuPos: menuPosReducer,
    menuRequests: menuRequestReducer,
    messageboxRequests: messageboxRequestsReducer
});

export default combineReducers({
    ui: uiReducer,
    currentModule: currentModuleReducer,
    modules: (state=[]) => state,
    moduleMap: (state={}) => state
});