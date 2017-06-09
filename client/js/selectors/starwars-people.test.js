import { fetchPeopleSuccess } from 'ducks/starwars';
import { reducers as rootReducer } from 'ducks';
import selectStarwarsPeople from 'selectors/starwars-people';

const starwarsPeople = [
    {
        'name': 'Luke Skywalker',
        'height': '172',
        'mass': '77',
        'hair_color': 'blond',
        'skin_color': 'fair',
        'eye_color': 'blue',
        'birth_year': '19BBY',
        'gender': 'male'
    },
    {
        'name': 'C-3PO',
        'height': '167',
        'mass': '75',
        'hair_color': 'n/a',
        'skin_color': 'gold',
        'eye_color': 'yellow',
        'birth_year': '112BBY',
        'gender': 'n/a'
    }
];

const state = rootReducer(undefined, fetchPeopleSuccess(starwarsPeople));

describe('selectors', () => {
    describe('Starwars people', () => {
        it('should return starwars people', () => {
            expect(selectStarwarsPeople(state)).toEqual(starwarsPeople);
        });
        it('should not recompute if unchanged', () => {
            expect(selectStarwarsPeople.recomputations()).toBe(1);
            expect(selectStarwarsPeople(state)).toEqual(starwarsPeople);
            expect(selectStarwarsPeople.recomputations()).toBe(1);
        });
        it('should return null when there are no people', () => {
            const state = rootReducer();
            expect(selectStarwarsPeople(state)).toBe(null);
        });
    });
});
