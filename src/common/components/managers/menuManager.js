import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from '@Container/menu';

let uuid = 0;
const getUUID = () => `menu_${uuid++}`;

export default class MenuManager extends Component {
    static displayName = 'MenuManager';

    static propTypes = {
       idle: PropTypes.arrayOf(PropTypes.string).isRequired,
       working: PropTypes.arrayOf(PropTypes.string).isRequired,
       requests: PropTypes.arrayOf(PropTypes.shape({
            pos: PropTypes.shape({

            }),
            funcs: PropTypes.arrayOf(PropTypes.shape({
                title: PropTypes.string.isRequired,
                func: PropTypes.func.isRequired
            })).isRequired
       })),
       setMenuState: PropTypes.func.isRequired,
       generateMenu: PropTypes.func.isRequired
    };

    componentDidUpdate () {
        const { requests=[], idle, setMenuState, generateMenu } = this.props;
        if (requests.length) {
            const request = requests[0];
            if (idle.length) {
                const menuId = idle[0];
                setMenuState(menuId, { ...request, showing: true });
            } else {
                generateMenu(getUUID(), { ...request, showing: true });
            }
        }
    }

    render () {
        const { idle, working } =  this.props;
        return (
            <>
                {
                    working.concat(idle).map(m => <Menu id={m} key={m} />)
                }
            </>
        );
    }
}