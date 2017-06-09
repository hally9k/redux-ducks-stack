import deepFreeze from 'deepfreeze';
import { testEpic } from 'tests/helpers';
import pingReducers, {
    epics,
    INITIAL_STATE as initialState,
    ping,
    PING,
    pong,
    PONG
} from 'ducks/ping';

const { pingEpic } = epics;

const INITIAL_STATE = deepFreeze(initialState);

// Actions
describe('ping actions', () => {
    it('should create a ping action', () => {
        const expectedAction = {
            type: PING
        };
        expect(ping()).toEqual(expectedAction);
    });
});

describe('pong actions', () => {
    it('should create a pong action', () => {
        const expectedAction = {
            type: PONG
        };
        expect(pong()).toEqual(expectedAction);
    });
});

// Reducers
describe('Ping reducer default', () => {
    it('should return the existing state when given an action that isnt handled by this reducer', () => {
        const action = {
            type: null
        };
        const newState = pingReducers(undefined, action);
        expect(newState).toBe(INITIAL_STATE);
    });
});

describe('Ping reducer pong', () => {
    it('should set the pong property in the ping app state to "PONG"', () => {
        const action = pong();
        const newState = pingReducers(INITIAL_STATE, action);
        expect(newState.get('pong')).toBe('PONG');
    });
});

// Epics
describe('Epics: Ping', () => {
    it('should return the next action in the stream', () => {
        return expect(
            testEpic(
                pingEpic,
                ping()
            )
        ).resolves
        .toEqual([pong()]);
    });
});
