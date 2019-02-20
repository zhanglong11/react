import { connect } from 'react-redux';
import Taskbar from '../common/components/taskbar/taskbar';
import {
    updateDialogState
} from '../store/dialog/actions';
import {
    requestMenu
} from '../store/menu/actions';

const mapStateToProps = ({ui}, ownProp) => ({
    dialogs: ui.activedDialogs.map(id => ui.dialogs[id])
});

const mapDispatchToProps = (dispatch, ownProp) => ({
    onTaskMinimize: id => dispatch(updateDialogState(id, { isMinimized: true })),
    onTaskNormalize: id => dispatch(updateDialogState(id, { isMinimized: false })),
    onTaskClose: id => dispatch(updateDialogState(id, { showing: false })),
    showMenu: state => dispatch(requestMenu(state.funcs, state.pos, true))
});

export default connect(mapStateToProps, mapDispatchToProps)(Taskbar);