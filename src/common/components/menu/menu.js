import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getBox } from '@Util/lazyBox';
import './style.css';

class Menu extends Component {
    static displayName = 'Menu';

    static propTypes = {
        showing: PropTypes.bool.isRequired,
        x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        menus: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            func: PropTypes.func.isRequired
        }).isRequired).isRequired,
        exclusive: PropTypes.bool
    };

    constructor (props) {
        super(props);
        this.container = getBox('menu');
        this.menuEl = React.createRef();
    }

    computeMenuPos (x, y) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        if (!this.menuEl.current) 
            return { posX: 0, posY: 0 };


        const { width, height } = this.menuEl.current.getBoundingClientRect();
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

    attachEvent () {
        const attach = () => {
            this.props.onMenuClose(this.props.id);
            window.removeEventListener('click', attach);
        };
        window.addEventListener('click', attach);
    }

    componentDidUpdate (prevProps) {
        if (prevProps.showing != this.props.showing) {
            if (this.props.showing) {
                this.attachEvent();    
                setTimeout(() => {
                    this.menuEl.current.style.opacity = 1;
                });        
            } else {
                this.menuEl.current.style.opacity = 0;
            }
        }
    }

    componentDidMount () {
        this.attachEvent();            
        setTimeout(() => {
            this.menuEl.current.style.opacity = 1;
        });
    }

    render () {
        const { posX, posY } = this.computeMenuPos(this.props.x, this.props.y);
        return ReactDOM.createPortal(
            <div
                className="Menu"
                style={{
                    display: this.props.showing ? 'block' : 'none',
                    left: posX,
                    top: posY,
                    opacity: 0
                }}
                ref={this.menuEl}
            >
                {
                    this.props.menus.map((m, idx) => <div
                        className="Menu-Selection"
                        key={idx}
                        onClick={() => m.func()}
                    >{m.title}</div>)
                }
            </div>,
            this.container
        );
    }
}

export default Menu;