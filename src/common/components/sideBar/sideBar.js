import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropDown from '../dropDown/dropDown';

import './style.css';

const SidebarBlock = props => {
    return (
        <div
            className={"SideBar-Block" + (props.isActive ? ' isActive' : '')}
            onClick={() => { props.onClick(props.funcKey) }}
            onContextMenu={evt => { evt.preventDefault(); props.onMenu(evt, props.funcKey)} }
        >
            <div
                className="SideBar-Block-Icon"
            ></div>
            <div
                className="SideBar-Block-Title"
            >
                <span
                    className="SideBar-Block-Text"
                >{props.name}</span>
            </div>
        </div>
    )
};

export default class SideBar extends Component {
    static displayName = 'Sidebar';

    static propTypes = {
        modules: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        })).isRequired,
        blocks: PropTypes.arrayOf(PropTypes.shape(
            {
                name: PropTypes.string.isRequired,
                key: PropTypes.string.isRequired,
                icon: PropTypes.string
            }
        )).isRequired,
        onBlockClick: PropTypes.func.isRequired,
        onModuleChange: PropTypes.func.isRequired,
        currentModule: PropTypes.string,
        activedFuncs: PropTypes.arrayOf(PropTypes.string),
        showMenu: PropTypes.func.isRequired
    };

    handleContextMenu (evt, key) {
        const { clientX, clientY } = evt;
        this.props.showMenu({
            pos: { x: clientX, y: clientY },
            funcs: [
                { title: '测试', func: () => alert(`test_${key}`) }
            ]
        })
    }

    render () {
        return (
            <div
                className="SideBar"
            >
                <div
                    className="SideBar-BlockContainer"
                >
                    {this.props.blocks.map(b => <SidebarBlock 
                        name={b.name}
                        funcKey={b.key}
                        key={b.key}
                        icon={b.icon}
                        onClick={key => this.props.onBlockClick(key)}
                        onMenu={(evt, key) => this.handleContextMenu(evt, key)}
                        isActive={this.props.activedFuncs.indexOf(b.key) > -1}
                    />)}
                </div>
                <div
                    className="SideBar-DropDownContainer"
                >
                    <DropDown 
                        options={this.props.modules}
                        value={this.props.currentModule}
                        onChange={value => this.props.onModuleChange(value)}
                    />
                </div>
            </div>
        );
    }
}