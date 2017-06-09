import GithubSearch from './github-search.component';
import GithubUser from './github-user.component';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Github extends Component {
    renderUsers() {
        if (!this.props.users) { return <div></div>; }

        return this.props.users.map((user) => {
            return (
                <GithubUser
                    key={user.id}
                    user={user}
                />
            );
        });
    }

    render() {
        return (
            <div>
                <GithubSearch
                    error={this.props.error}
                    getGithubUser={this.props.getGithubUser}
                />
                {this.renderUsers()}
            </div>
        );
    }
}

Github.propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
    users: PropTypes.array,
    error: PropTypes.object,
    getGithubUser: PropTypes.func.isRequired
};

export default Github;
