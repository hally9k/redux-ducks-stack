import { List, Map } from 'immutable';

// Actions
export const FETCH_PEOPLE = 'front-end-stack/starwars/FETCH_PEOPLE';
export const FETCH_PEOPLE_FAILURE =
    'front-end-stack/starwars/FETCH_PEOPLE_FAILURE';
export const FETCH_PEOPLE_SUCCESS =
    'front-end-stack/starwars/FETCH_PEOPLE_SUCCESS';

// Reducer
export const INITIAL_STATE = new Map({
    people: null,
    error: null
});

export default (state = INITIAL_STATE, action) => {
    if (!action) return state;
    switch (action.type) {
        case FETCH_PEOPLE_SUCCESS:
            return state
                .set('people', new List(action.payload))
                .set('error', null);
        case FETCH_PEOPLE_FAILURE:
            return state
                .set('error', new Map(action.payload))
                .set('people', null);
        default:
            return state;
    }
};

// Action Creators
export const fetchPeople = () => ({ type: FETCH_PEOPLE });

export const fetchPeopleFailure = (error) => ({
    type: FETCH_PEOPLE_FAILURE,
    payload: error
});

export const fetchPeopleSuccess = (people) => ({
    type: FETCH_PEOPLE_SUCCESS,
    payload: people
});

// Epics
const starwarsEpic = (action$) =>
    action$.ofType(FETCH_PEOPLE).mergeMap(() =>
        fetch('https://swapi.co/api/people/')
            .then((response) => response.json())
            .then((response) => fetchPeopleSuccess(response.results))
            .catch((error) => fetchPeopleFailure(error))
    );

export const epics = {
    starwarsEpic
};
