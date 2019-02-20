import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TaskLabel extends Component {
    static displayName = 'TaskLabel';

    static propTypes = {
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        isMinimized: PropTypes.bool.isRequired,
        onNormalize: PropTypes.func.isRequired,
        onMimimalize: PropTypes.func.isRequired,
        onMenu: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    handleClick() {
        if (this.props.isMinimized) {
            this.props.onNormalize();
        } else {
            this.props.onMimimalize();
        }
    }

    render() {
        return(
            <div
                className={"Taskbar-TaskLabel" + (this.props.isMinimized ? ' minimized' : '')}
                title={this.props.name}
                onClick={() => this.handleClick()}
                onContextMenu={evt => {
                    evt.preventDefault();
                    this.props.onMenu(evt);
                }}
            >
                <span
                    className="Taskbar-TaskLable-Status"
                ></span>
                <div
                    className="Taskbar-TaskLabel-Text"
                >{this.props.name}</div>
            </div>
        )
    }
}