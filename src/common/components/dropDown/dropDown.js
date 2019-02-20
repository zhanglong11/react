import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getBox } from '../../../util/lazyBox';
import './style.css';

const DropDownOption = props => (
    <div
        className={"Dropdown-Option" + (props.selected ? ' selected' : '')}
        onClick={() => props.onClick(props.value)}
    >{props.title}</div>
);

const DropDownOptionPanel = props => (
    <div
        className="Dropdown-OptionPanel"
        style={{
            display: props.showing ? 'block' : 'none',
            left: props.x,
            top: props.y,
            width: props.width
        }}
    >
        {props.options.map(o => <DropDownOption 
            title={o.title}
            value={o.value}
            key={o.value}
            selected={props.value === o.value}
            onClick={value => props.onSelect(value)}
        />)}
    </div>
)

export default class Dropdown extends Component {
    static displayName = 'Dropdown';

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
        }))
    };

    constructor (props) {
        super(props);
        this.panelContainer = getBox('menu');
        this.selectorEl = React.createRef();
    }

    state = {
        showingPanel: false,
        panelX: 0,
        panelY: 0,
        panelWidth: 100,
    };

    handleSelect (value) {
        if (value !== this.props.value) {
            this.props.onChange(value);
        }

        this.setState({ showingPanel: false });
    }

    handleClickSelector (evt) {
        evt.stopPropagation();
        const {x, y, height} = this.selectorEl.current.getBoundingClientRect();
        this.setState({
            panelX: x,
            panelY: y + height + 2,
            showingPanel: true
        });

        const attachEvent = () => {
            this.setState({
                showingPanel: false
            });
            window.removeEventListener('click', attachEvent);
        }

        window.addEventListener('click', attachEvent);
    }

    componentWillMount () {
        document.body.appendChild(this.panelContainer);
    }

    componentDidMount () {
        const { width } = window.getComputedStyle(this.selectorEl.current);
        this.setState({ panelWidth: width });
        
    }

    componentDidUpdate () {
        ReactDOM.render(<DropDownOptionPanel 
            showing={this.state.showingPanel}
            value={this.props.value}
            onSelect={val => this.handleSelect(val)}
            x={this.state.panelX}
            y={this.state.panelY}
            width={this.state.panelWidth}
            options={this.props.options}
        />, this.panelContainer);
    }

    render () {

        return (
            <div
                className="Dropdown"
                onClick={evt => this.handleClickSelector(evt)}
                ref={this.selectorEl}
            >
                {this.props.options.filter(o => o.value == this.props.value)[0].title}
            </div>
        )
    }
}