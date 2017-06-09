import PropTypes from 'prop-types';
import React, { Component } from 'react';

class GithubUser extends Component {
    render() {
        const { user } = this.props;

        return (
            <div className="github-user">
                <img src={user.avatar} />
                <h2>{user.username}</h2>
                <h4>ID: {user.id}</h4>
            </div>
        );
    }
}

GithubUser.propTypes = {
    user: PropTypes.object.isRequired
};

export default GithubUser;
