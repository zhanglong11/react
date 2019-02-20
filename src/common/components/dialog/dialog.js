import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Proptypes from 'prop-types';
import { getBox } from '../../../util/lazyBox';
import './style.css';


export default class Dialog extends Component {
    static displayName = 'Dialog';

    static propTypes = {
        id: Proptypes.string,
        showing: Proptypes.bool.isRequired,
        isMinimized: Proptypes.bool,
        title: Proptypes.string.isRequired,
        footer: Proptypes.node,
        dragable: Proptypes.bool,
        x: Proptypes.number.isRequired,
        y: Proptypes.number.isRequired,
        width: Proptypes.number.isRequired,
        height: Proptypes.number.isRequired,
        onDialogCreated: Proptypes.func.isRequired,
        onClose: Proptypes.func.isRequired,
        onMinimize: Proptypes.func.isRequired,
        onPositionChange: Proptypes.func.isRequired,
        minimizable: Proptypes.bool,
        modal: Proptypes.bool
    };

    static defaultProps = {
        showing: true,
        x: 0,
        y: 0,
        width: 300,
        height: 300,
        isMinimized: false,
        minimizable: true,
        modal: false,
        dragable: true
    };

    constructor(props) {
        super(props);
        this._dialogContainer = getBox('dialog');
        this.props.onDialogCreated({...props});
    }


    componentDidMount() {
        document.body.appendChild(this._dialogContainer);
        
    }

    handleMouseDown = evt => {
        if (!this.props.dragable) {
            return;
        }

        this.lastX = this.props.x;
        this.lastY = this.props.y;
        this.mouseLastX = evt.pageX;
        this.mouseLastY = evt.pageY;

        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    handleMouseMove = evt => {
        evt.preventDefault();
        const mouseNowX = evt.pageX;
        const mouseNowY = evt.pageY;
        const diffX = mouseNowX - this.mouseLastX;
        const diffY = mouseNowY - this.mouseLastY;
        const curX = this.lastX + diffX;
        const curY = this.lastY + diffY;
        this.lastX = curX;
        this.lastY = curY;
        this.mouseLastX = mouseNowX;
        this.mouseLastY = mouseNowY;
        this.props.onPositionChange(this.props.id, { x: curX, y: curY });
    }

    handleMouseUp = evt => {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    render() {
        const dialog = (
            <div
                className="Dialog"
                style={{
                    display: (this.props.showing && !this.props.isMinimized) ? 'flex' : 'none',
                    width: this.props.width,
                    height: this.props.height,
                    left: this.props.x,
                    top: this.props.y
                }}
            >
                <div
                    className={"Dialog-Title" + (this.props.dragable ? ' dragable' : '')}
                    onMouseDown={this.handleMouseDown}
                >
                    <span
                        className="Dialog-Title-Text"
                    >{this.props.title}</span>
                    <div
                        className="Dialog-Title-BtnContainer"
                    >
                        <span
                            className="Dialog-Title-Btn minimize"
                            onClick={() => this.props.onMinimize(this.props.id)}
                        >▼</span>
                        <span
                            className="Dialog-Title-Btn close"
                            onClick={() => this.props.onClose(this.props.id)}
                        >X</span>
                    </div>
                </div>
                <div
                    className="Dialog-Content"
                >{this.props.children}</div>
                <div
                    className="Dialog-Footer"
                    style={{
                        display: this.props.footer ? 'block' : 'none'
                    }}
                >
                    {this.props.footer ? this.props.footer : ''}
                </div>
            </div>
        );

        return ReactDOM.createPortal(dialog, this._dialogContainer);
    }
}