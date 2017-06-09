import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import deepFreeze from 'deepfreeze';
import { testEpic } from 'tests/helpers';
import githubReducer, {
    epics,
    GET_GITHUB_USER,
    GET_GITHUB_USER_FAILURE,
    GET_GITHUB_USER_SUCCESS,
    getGithubUser,
    getGithubUserFailure,
    getGithubUserSuccess,
    INITIAL_STATE as initialState,
} from 'ducks/github';

const { githubEpic } = epics;

const INITIAL_STATE = deepFreeze(initialState);

// Action creators
describe('getGithubUser() actions', () => {
    it('should create an action with the given userId as the payload.', () => {
        const userId = 'pixel-fusion';
        const expectedAction = {
            type: GET_GITHUB_USER,
            payload: userId
        };
        expect(getGithubUser('pixel-fusion')).toEqual(expectedAction);
    });
});

describe('getGithubUserSuccess() actions', () => {
    it('should create an action.', () => {
        const expectedAction = {
            type: GET_GITHUB_USER_SUCCESS
        };
        expect(getGithubUserSuccess()).toEqual(expectedAction);
    });
});

describe('getGithubUserFailure() actions', () => {
    it('should create an action.', () => {
        const expectedAction = {
            type: GET_GITHUB_USER_FAILURE
        };
        expect(getGithubUserFailure()).toEqual(expectedAction);
    });
});


// Reducers
describe('Github reducer default', () => {
    it('should return the existing state when given an action that isnt handled by this reducer', () => {
        const action = {
            type: null
        };
        const newState = githubReducer(undefined, action);
        expect(newState).toBe(INITIAL_STATE);
    });
    it('should return the existing state when given an action with a falsey value', () => {
        const newState = githubReducer();
        expect(newState).toBe(INITIAL_STATE);
    });
});

describe('Github reducer getGithubUserSuccess', () => {
    it('should set the given user in the app state', () => {
        const avatar = 'https://avatars3.githubusercontent.com/u/425?v=3';
        const username = 'james';
        const id = 425;

        const action = {
            type: GET_GITHUB_USER_SUCCESS,
            payload: { username, avatar, id }
        };
        const newState = githubReducer(INITIAL_STATE, action);
        expect(newState.get('avatar').toJS()).toEqual({ 425: avatar });
        expect(newState.get('username').toJS()).toEqual({ 425: username });
        expect(newState.get('error')).toBeNull();
    });
});

describe('Github reducer getGithubUserFailure', () => {
    it('should set the error in the app state', () => {
        const error = {
            message: 'ajax error 404'
        };
        const action = {
            type: GET_GITHUB_USER_FAILURE,
            payload: error
        };
        const newState = githubReducer(INITIAL_STATE, action);
        expect(newState.get('error').toJS()).toEqual(error);
    });
});

// Epics
describe('Github epics', () => {
    it('should return the next action in the stream', () => {
        const response = {
            id: '12313',
            login: 'hally9k',
            avatar_url: 'https://google.com/image.jpg' // eslint-disable-line camelcase
        };
        fetch.mockResponseOnce(JSON.stringify(response));

        return expect(
            testEpic(
                githubEpic,
                getGithubUser('hally9k')
            )
        ).resolves
        .toEqual([getGithubUserSuccess({
            avatar: response.avatar_url,
            username: response.login,
            id: response.id
        })]);
    });

    it('should return the error action', () => {
        fetch.mockRejectOnce();

        return expect(
            testEpic(
                githubEpic,
                getGithubUser('hally9k')
            )
        ).resolves
        .toEqual([getGithubUserFailure()]);
    });
});

/*
/
/ This is an example of testing epics by mocking out the store and registering
/ the epic we want to test with the redix-observable middleware.
/
*/
describe('Github epic integration', () => {
    it('should dispatch the initial action and then the deferred action', () => {
        const response = {
            id: '12313',
            login: 'hally9k',
            avatar_url: 'https://google.com/image.jpg' // eslint-disable-line camelcase
        };
        fetch.mockResponseOnce(JSON.stringify(response));

        const epicMiddleware = createEpicMiddleware(githubEpic);
        const store = configureMockStore([epicMiddleware])();
        store.dispatch(getGithubUser('hally9k'));

        process.nextTick(() => {
            const actions = store.getActions();
            expect(actions).toEqual([
                getGithubUser('hally9k'),
                getGithubUserSuccess({
                    avatar: response.avatar_url,
                    username: response.login,
                    id: response.id
                })
            ]);
        });
    });

    it('should dispatch the initial action and then the deferred action when fetch rejects', () => {
        fetch.mockRejectOnce();

        const epicMiddleware = createEpicMiddleware(githubEpic);
        const store = configureMockStore([epicMiddleware])();
        store.dispatch(getGithubUser('hally9k'));

        process.nextTick(() => {
            const actions = store.getActions();
            expect(actions).toEqual([
                getGithubUser('hally9k'),
                getGithubUserFailure()
            ]);
        });
    });
});
