import { connect } from 'react-redux';
import Dialog from '../common/components/dialog/dialog';
import {
    createDialog,
    updateDialogPos,
    updateDialogState
} from '../store/dialog/actions';
import { pick } from 'ramda';

const pickDialogInfo = pick(['id', 'x', 'y', 'title', 'showing', 'dragable', 'isMinimized', 'width', 'height']);

const mapStateToProps = ({ ui }, ownProp) => ({
    ...ownProp,
    ...ui.dialogs[ownProp.id]
});

const mapDispatchToProps = (dispatch, ownProp) => ({
    onDialogCreated: dialogProp => dispatch(createDialog({...pickDialogInfo(dialogProp)})),
    onClose: id => dispatch(updateDialogState(id, {showing: false})),
    onPositionChange: (id, pos) => dispatch(updateDialogPos(id, {...pos})),
    onMinimize: id => dispatch(updateDialogState(id, {isMinimized: true}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
