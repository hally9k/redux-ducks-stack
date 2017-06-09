import { connect } from 'react-redux';
import { getGithubUser } from 'ducks/github';
import Github from './github.component';
import githubSelector from 'selectors/github';

function mapStateToProps(state) {
    return {
        users: githubSelector.user(state),
        error: githubSelector.error(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getGithubUser: (reply) => {
            dispatch(getGithubUser(reply));
        }
    };
}

const VisibleRoot = connect(
  mapStateToProps,
  mapDispatchToProps
)(Github);

export default VisibleRoot;
