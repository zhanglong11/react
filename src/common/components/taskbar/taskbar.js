import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TaskLabel from './taskLabel';

import './style.css';

export default class Taskbar extends Component {
    static displayName = 'Taskbar';

    static propTypes = {
        dialogs: PropTypes.array,
        onTaskMinimize: PropTypes.func.isRequired,
        onTaskNormalize: PropTypes.func.isRequired,
        onTaskClose: PropTypes.func.isRequired,
        showMenu: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    handleShowMenu(id, isMinimized, evt) {
        const funcs = [
            (isMinimized ? 
                {
                    title: '恢复',
                    func: () => this.props.onTaskNormalize(id)
                } :
                {
                    title: '隐藏',
                    func: () => this.props.onTaskMinimize(id)
                }
            ),
            { title: '关闭', func: () => this.props.onTaskClose(id) }
        ];
        const pos = { x: evt.clientX, y: evt.clientY };
        this.props.showMenu({ funcs, pos });
    }
    
    render() {
        return(
            <div
                className="Taskbar"
            >
                {this.props.dialogs.map(d => (
                    <TaskLabel 
                        name={d.title}
                        id={d.id}
                        key={d.id}
                        isMinimized={d.isMinimized}
                        onMimimalize={() => this.props.onTaskMinimize(d.id)}
                        onNormalize={() => this.props.onTaskNormalize(d.id)}
                        onMenu={evt => this.handleShowMenu(d.id, d.isMinimized, evt)}
                    />
                ))}
            </div>
        );
    }
}