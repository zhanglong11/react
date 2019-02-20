import { connect } from 'react-redux';
import Messagebox from '@Common/components/messagebox/messagebox';
import {
    hideMessagebox,
    updateMessageboxPos
} from '@Store/messagebox/actions';

const mapStateToProps = ({ui}, ownProps) => ({
    ...ownProps,
    ...ui.messageboxes[ownProps.id],
    showing: ui.messageboxStatus.working.indexOf(ownProps.id) > -1
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onPositionChange: pos => dispatch(updateMessageboxPos(ownProps.id, pos)),
    onClose: () => dispatch(hideMessagebox(ownProps.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Messagebox);