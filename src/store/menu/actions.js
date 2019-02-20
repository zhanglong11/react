export const MENU_APPEARENCE = 'MENU_APPEARENCE';
export const showMenu = id => dispatch => dispatch({
    type: MENU_APPEARENCE,
    payload: { id, showing: true}
});
export const hideMenu = id => dispatch => dispatch({
    type: MENU_APPEARENCE,
    payload: { id, showing: false}
});

export const MENU_FUNCTION_SET  = 'MENU_FUNCTION_SET';
export const setMenuFunction = (id, funcs) => dispatch => dispatch({
    type: MENU_FUNCTION_SET,
    payload: {
        id,
        funcs: [...funcs]
    }
});

export const MENU_POS_UPDATE = 'MENU_POS_UPDATE';
export const setMenuPos = (id, pos) => dispatch => dispatch({
    type: MENU_POS_UPDATE,
    payload: {
        id,pos
    }
});

export const MENU_REQUEST = 'MENU_REQUEST';
export const requestMenu = (funcs, pos, isExclusive=false) => dispatch => dispatch({
    type: MENU_REQUEST,
    payload: {
        pos: {...pos},
        funcs: [...funcs],
        isExclusive
    }
});

export const MENU_RESOLVE = 'MENU_RESOLVE';
export const resolveMenu = id => dispatch => dispatch({
    type: MENU_RESOLVE,
    payload: { id }
});

export const MENU_CLOSE_ALL = 'MENU_CLOSE_ALL';
export const closeAll = () => dispatch => dispatch({
    type: MENU_CLOSE_ALL
});
