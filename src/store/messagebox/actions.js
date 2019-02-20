export const MESSAGEBOX_REQUEST = 'MESSAGEBOX_REQUEST';
export const requestMessagebox = ({ title, pos, content, width, height, pinWith, dragable=false,closable=true, isExclusive=true }) => dispatch => dispatch({
    type: MESSAGEBOX_REQUEST,
    payload: {
        title,
        pos,
        content,
        closable,
        pinWith,
        isExclusive,
        height,
        width,
        dragable
    }
});

export const MESSAGEBOX_RESOLVE = 'MESSAGEBOX_RESOLVE';
export const resolveMessagebox = id => dispatch => dispatch({
    type: MESSAGEBOX_RESOLVE,
    payload: id
});

export const MESSAGEBOX_ADDITION = 'MESSAGEBOX_ADDITION';
export const addMessagebox = (id, info) => dispatch => dispatch({
    type: MESSAGEBOX_ADDITION,
    payload: {
        id,
        info: { ...info }
    }
});

export const MESSAGEBOX_APPEARENCE_CHANGE = 'MESSAGEBOX_APPEARENCE';
export const showMessagebox = id => dispatch => dispatch({
    type: MESSAGEBOX_APPEARENCE_CHANGE,
    payload: {
        id,
        showing: true
    }
});
export const hideMessagebox = id => dispatch => dispatch({
    type: MESSAGEBOX_APPEARENCE_CHANGE,
    payload: {
        id,
        showing: false
    }
});

export const MESSAGEBOX_TITLE_CHANGE = 'MESSAGE_TITLE_CHANGE';
export const changeMessageboxTitle = (id, title) => dispatch => dispatch({
    type: MESSAGEBOX_TITLE_CHANGE,
    payload: {
        id, title
    }
});

export const MESSAGEBOX_BASEPROP_CHANGE = 'MESSAGEBOX_BASEPROP_CHANGE';
export const changeMessageboxBaseProp = (id, props) => dispatch => dispatch({
    type: MESSAGEBOX_BASEPROP_CHANGE,
    payload: { 
        id, props 
    }
});

export const MESSAGEBOX_CLOSE_ALL = 'MESSAGEBOX_CLOSE_ALL';
export const closeAllMessagebox = () => dispatch => dispatch({
    type: MESSAGEBOX_CLOSE_ALL
});


export const MESSAGEBOX_POS_CHANGE = 'MESSAGE_POS_CHANGE';
export const updateMessageboxPos = (id, pos) => dispatch => dispatch({
    type: MESSAGEBOX_POS_CHANGE,
    payload: {
        id,
        pos
    }
});

export const MESSAGEBOX_SIZE_CHANGE = 'MESSAGE_SIZE_CHANGE';
export const changeMessageboxSize = (id, size) => dispatch => dispatch({
    type: MESSAGEBOX_SIZE_CHANGE,
    payload: {
        id,
        size: { ...size }
    }
});

export const MESSAGEBOX_CONTENT_CHANGE = 'MESSAGE_CONTENT_CHANGE';
export const changeMessageboxContent = (id, content) => dispatch => dispatch({
    type: MESSAGEBOX_CONTENT_CHANGE,
    payload: {
        id,
        content
    }
});