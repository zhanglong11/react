import { connect } from 'react-redux';
import MessageboxManager from '@Common/components/managers/messageboxManager';
import {
    addMessagebox,
    closeAllMessagebox,
    showMessagebox,
    resolveMessagebox,
    changeMessageboxTitle,
    updateMessageboxPos,
    changeMessageboxContent,
    changeMessageboxSize,
    changeMessageboxBaseProp
} from '@Store/messagebox/actions';

import { pick } from 'ramda';

const pickBaseProp = pick(['pinWith', 'closable', 'dragable']);
const pickMessageboxStates = pick(['width', 'height', 'pos', 'closable', 'showing']);

const mapStateToProps = ({ui}, ownProps) => ({
    ...ownProps,
    working: ui.messageboxStatus.working,
    idle: ui.messageboxStatus.idle,
    requests: ui.messageboxRequests
});

const doActions = (dispatch, id, state) => {
    
    if (state.isExclusive) {
        dispatch(closeAllMessagebox());
    }
    if (state.showing != false) {
        dispatch(showMessagebox(id));
    }
    dispatch(resolveMessagebox(id));
    dispatch(changeMessageboxSize(id, { height: state.height, width: state.width }));
    dispatch(changeMessageboxTitle(id, state.title));
    dispatch(changeMessageboxContent(id, state.content));
    dispatch(changeMessageboxBaseProp(id, pickBaseProp(state)));

    setTimeout(() => dispatch(updateMessageboxPos(id, state.pos)));
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    setMessageboxState: (id, state) => {
        doActions(dispatch, id, state);     
    },
    generateMessagebox: (id, state) => {
        dispatch(addMessagebox(id, pickMessageboxStates(state)));
        doActions(dispatch, id, state);     
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageboxManager);