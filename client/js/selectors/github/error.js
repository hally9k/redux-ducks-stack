import { createSelector } from 'reselect';

const getGithubError = (state) => state.github.get('error');

const githubErrorSelector = createSelector(
    [getGithubError],
    (githubError) => {
        return githubError ? githubError.toJS() : null;
    }
);

export default githubErrorSelector;
