import { pong } from 'ducks/ping';
import { reducers as rootReducer } from 'ducks';
import selectPong from 'selectors/pong';

describe('selectors', () => {
    describe('pong', () => {
        it('should return pong string', () => {
            const state = rootReducer(undefined, pong());
            expect(selectPong(state)).toEqual('PONG');
        });
    });
});
