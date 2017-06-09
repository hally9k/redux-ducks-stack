import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import github, { epics as githubEpics } from './github';
import ping, { epics as pingEpics } from './ping';
import starwars, { epics as starwarsEpics } from './starwars';

export const epics = combineEpics(
    ...Object.values(pingEpics),
    ...Object.values(starwarsEpics),
    ...Object.values(githubEpics)
);

export const reducers = combineReducers({
    github,
    ping,
    starwars
});
