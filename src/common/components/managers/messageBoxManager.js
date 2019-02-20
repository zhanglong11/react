import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Messagebox from '@Container/Messagebox';

let uuid = 0;
const getUUID = () => `messagebox_${uuid++}`;

export default class MessageboxManager extends Component {
    static dispalyName = 'MessageboxManager';
    
    static propTypes = {
        working: PropTypes.arrayOf(PropTypes.string).isRequired,
        idle: PropTypes.arrayOf(PropTypes.string).isRequired,
        requests: PropTypes.arrayOf(PropTypes.shape({
            pos: PropTypes.shape({
                x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            }),
            title: PropTypes.string.isRequired,
            content: PropTypes.node.isRequired,
            closable: PropTypes.bool
        })).isRequired,
        setMessageboxState: PropTypes.func.isRequired,
        generateMessagebox: PropTypes.func.isRequired
    };

    componentDidUpdate () {
        const { requests, idle, setMessageboxState, generateMessagebox } = this.props;
        if (requests.length) {
            const request = requests[0];
            if (idle.length) {
                setMessageboxState(idle[0], request);
            } else {
                generateMessagebox(getUUID(), request);
            }
        }
    }

    render () {
        const { idle, working } = this.props;

        return (
            <>
                {working.concat(idle).map(id => <Messagebox id={id} key={id} />)}
            </>
        );
    }
}