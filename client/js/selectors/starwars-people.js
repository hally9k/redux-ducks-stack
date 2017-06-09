import { createSelector } from 'reselect';

const getStarWarsPeople = (state) => state.starwars.get('people');

const starWarsPeopleSelector = createSelector(
    [getStarWarsPeople],
    (starWarsPeople) => {
        return starWarsPeople ? starWarsPeople.toJS() : null;
    }
);

export default starWarsPeopleSelector;
