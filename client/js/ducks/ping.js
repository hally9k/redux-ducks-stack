import { Map } from 'immutable';

// Actions
export const PING = 'PING';
export const PONG = 'PONG';

// Reducer
export const INITIAL_STATE = new Map({
    pong: ''
});

export default (state = INITIAL_STATE, action) => {
    if (!action) return state;
    switch (action.type) {
        case PING:
            return state.set('pong', '');
        case PONG:
            return state.set('pong', 'PONG');
        default:
            return state;
    }
};

// Action Creators
export const ping = () => ({ type: PING });

export const pong = () => ({ type: PONG });

// Epics
export const pingEpic = (action$) =>
    action$
        .ofType(PING)
        .delay(1000) // eslint-disable-line
        .mapTo(pong());

export const epics = {
    pingEpic
};
