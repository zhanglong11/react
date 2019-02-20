import { connect } from 'react-redux';
import {
    setModule
} from '../store/state/moduleActions';
import {
    updateDialogState
} from '../store/dialog/actions';
import {
    requestMenu
} from '../store/menu/actions';
import SideBar from '../common/components/sideBar/sideBar';

const mapStateToProps = (state, ownProp) => ({
    ...ownProp,
    modules: state.modules,
    blocks: state.moduleMap[state.currentModule],
    currentModule: state.currentModule,
    activedFuncs: state.ui.activedDialogs
});

const mapDispatchToProps = (dispatch, ownProp) => ({
    onModuleChange: val => dispatch(setModule(val)),
    onBlockClick: val => dispatch(updateDialogState(val, { showing: true, isMinimized: false })),
    showMenu: state => dispatch(requestMenu(state.funcs, state.pos, state.isExclusive || true))
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);