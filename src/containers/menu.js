import { connect } from 'react-redux';
import Menu from '@Common/components/menu/menu';
import {
    hideMenu
} from '@Store/menu/actions';

const mapStateToProps = ({ui}, ownProps) => ({
    ...ownProps,
    showing: ui.menuStatus.working.indexOf(ownProps.id) > -1,
    menus: ui.menuFuncs[ownProps.id],
    x: ui.menuPos[ownProps.id] ? ui.menuPos[ownProps.id].x : 0,
    y: ui.menuPos[ownProps.id] ? ui.menuPos[ownProps.id].y : 0,
});

const mapDispatchtoProps = (dispatch, ownProps) => ({
    onMenuClose: () => dispatch(hideMenu(ownProps.id))
});

export default connect(mapStateToProps, mapDispatchtoProps)(Menu);