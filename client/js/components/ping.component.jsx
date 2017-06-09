import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ping extends Component {

    render() {
        return (
            <div>
                <h1>{ this.props.pong }</h1>
                <button onClick={this.props.ping}>ping</button>
            </div>
        );
    }
}

Ping.propTypes = {
    ping: PropTypes.func.isRequired,
    pong: PropTypes.string
};

export default Ping;
