import { Link } from 'react-router-dom';
import React, { Component } from 'react';

class Ping extends Component {
    render() {
        return <div>
            <Link to="/github">github</Link> • <Link to="/ping">ping</Link> • <Link to="/starwars">starwars</Link>
        </div>;
    }
}

export default Ping;
