import { connect } from 'react-redux';
import MenuManager from '@Common/components/managers/menuManager';
import {
    showMenu,
    setMenuFunction,
    setMenuPos,
    resolveMenu,
    closeAll
} from '@Store/menu/actions';

const mapStateToProps = ({ui}, ownProps) => ({
    ...ownProps,
    requests: ui.menuRequests,
    ...ui.menuStatus
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setMenuState: (id, { funcs, pos, showing, isExclusive }) => {
        if (isExclusive) {
            dispatch(closeAll());
        }
        dispatch(resolveMenu(id));
        dispatch(setMenuFunction(id, funcs));
        if (showing) {
            dispatch(showMenu(id));
        }
        setTimeout(() => dispatch(setMenuPos(id, pos)));
    },
    generateMenu: (id, { funcs, pos, showing, isExclusive }) => {
        if (isExclusive) {
            dispatch(closeAll());
        }
        dispatch(resolveMenu(id));
        dispatch(setMenuFunction(id, funcs));
        if (showing) {
            dispatch(showMenu(id));
        }
        setTimeout(() => dispatch(setMenuPos(id, pos)));
        
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuManager);