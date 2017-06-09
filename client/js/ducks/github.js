import { Map } from 'immutable';

// Actions
export const GET_GITHUB_USER = 'front-end-stack/root/GET_GITHUB_USER';
export const GET_GITHUB_USER_FAILURE =
    'front-end-stack/root/GET_GITHUB_USER_FAILURE';
export const GET_GITHUB_USER_SUCCESS =
    'front-end-stack/root/GET_GITHUB_USER_SUCCESS';

// Reducer
export const INITIAL_STATE = new Map({
    avatar: Map(),
    username: Map(),
    error: null
});

export default (state = INITIAL_STATE, action) => {
    if (!action) return state;
    switch (action.type) {
        case GET_GITHUB_USER_SUCCESS: {
            const { avatar, username, id } = action.payload;
            return state
                .setIn(['username', id], username)
                .setIn(['avatar', id], avatar)
                .set('error', null);
        }
        case GET_GITHUB_USER_FAILURE:
            return state
                .set('error', new Map(action.payload))
                .set('avatar', new Map())
                .set('username', new Map());
        default:
            return state;
    }
};

// Action Creators
export const getGithubUser = (userId) => ({
    type: GET_GITHUB_USER,
    payload: userId
});

export const getGithubUserSuccess = (response) => ({
    type: GET_GITHUB_USER_SUCCESS,
    payload: response
});

export const getGithubUserFailure = (error) => ({
    type: GET_GITHUB_USER_FAILURE,
    payload: error
});

// Epics
const githubEpic = (action$) =>
    action$.ofType(GET_GITHUB_USER).mergeMap((action) =>
        fetch(`https://api.github.com/users/${action.payload}`)
            .then((response) => response.json())
            .then((response) => getGithubUserSuccess({
                avatar: response.avatar_url,
                username: response.login,
                id: response.id
            }))
            .catch((error) => getGithubUserFailure(error))
    );

export const epics = {
    githubEpic
};
