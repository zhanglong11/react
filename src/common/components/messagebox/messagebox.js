import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Proptypes from 'prop-types';

import { getBox } from '@Util/lazyBox';

import './style.css';

export default class Messagebox extends Component {
    static displayName = 'Messagebox';

    static propTypes = {
        id: Proptypes.string.isRequired,
        showing: Proptypes.bool.isRequired,
        title: Proptypes.string.isRequired,
        content: Proptypes.oneOfType([Proptypes.node, Proptypes.string]),
        onClose: Proptypes.func.isRequired,
        closable: Proptypes.bool,
        onPositionChange: Proptypes.func.isRequired,
        dragable: Proptypes.bool,
        x: Proptypes.oneOfType([Proptypes.number, Proptypes.string]).isRequired,
        y: Proptypes.oneOfType([Proptypes.number, Proptypes.string]).isRequired,
        height: Proptypes.oneOfType([Proptypes.number, Proptypes.string]).isRequired,
        width: Proptypes.oneOfType([Proptypes.number, Proptypes.string]).isRequired,
        pinWith: Proptypes.string
    };

    static defaultProps = {
        closable: true
    };

    containerEl = getBox('dialog');
    boxEl = React.createRef();

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
        this.props.onPositionChange({ x: curX, y: curY });
    }

    handleMouseUp = evt => {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    computeBoxPos (x, y) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        if (!this.boxEl.current) 
            return { posX: x, posY: y };


        const { width, height } = this.boxEl.current.getBoundingClientRect();
        let posX = x + 4;
        let posY = y + 4;
        if (posX + parseFloat(width) > windowWidth) {
            posX = x - width - 4;
        }
        if (posY + parseFloat(height) > windowHeight) {
            posY = y - height - 4;
        }
        return { posX, posY };
    }

    componentDidMount () {
        if (this.props.showing) {
            setTimeout(() => {
                const { posX, posY } = this.computeBoxPos(this.props.x, this.props.y);
                this.boxEl.current.style.left = posX + 'px';
                this.boxEl.current.style.top = posY + 'px';
                this.boxEl.current.style.opacity = 1;
            });        
        }
    }

    componentDidUpdate (prevProps) {
        if (prevProps.showing != this.props.showing) {
            if (this.props.showing) {
                setTimeout(() => {
                    this.boxEl.current.style.opacity = 1;
                });        
            } else {
                this.boxEl.current.style.opacity = 0;
            }
        }
    }

    render () {
        const { posX, posY } = this.computeBoxPos(this.props.x, this.props.y);
        return ReactDOM.createPortal(
            <div
                className="Messagebox"
                ref={this.boxEl}
                style={{
                    display: this.props.showing ? '' : 'none',
                    width: this.props.width,
                    height: this.props.height,
                    left: posX,
                    top: posY,
                    opacity: 0
                }}
            >
                <div
                    className={ "Messagebox-Title" + (this.props.dragable ? ' dragable' : '')}
                    onMouseDown={this.handleMouseDown}
                >
                    <div
                        className="Messagebox-Title-Text"
                    >{this.props.title}</div>
                    <div
                        className="Messagebox-Title-BtnContainer"
                    >
                        <span
                            className="Messagebox-Title-Btn"
                            style={{
                                display: this.props.closable ? '' : 'none'
                            }}
                            onClick={() => this.props.onClose()}
                        >X</span>
                    </div>
                </div>
                <div
                    className="Messagebox-Content"
                >{this.props.content}</div>
            </div>,
            this.containerEl
        );
    }
}