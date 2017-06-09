import ErrorBlock from 'components/shared/error-block.component';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class GithubSearch extends Component {
    getUser() {
        this.props.getGithubUser(this.textInput.value);
    }

    render() {
        const { error } = this.props;
        return (
            <div>
                <label>Github User: <input ref={(input) => { this.textInput = input; }} /></label>
                <button onClick={this.getUser.bind(this)}>Get User</button>
                { error && <ErrorBlock message={error.message} /> }
            </div>
        );
    }
}

GithubSearch.propTypes = {
    getGithubUser: PropTypes.func.isRequired,
    error: PropTypes.object
};

export default GithubSearch;
