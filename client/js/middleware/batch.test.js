import batchMiddleware from './batch';

const next = jest.fn();
const dispatch = jest.fn();

describe('Middleware', () => {
    describe('batchMiddleware', () => {
        it('should call next on a single action', () => {
            const action = { type: 'MY_ACTION' };
            batchMiddleware({ })(next)(action);
            expect(next).toHaveBeenCalledWith(action);
        });
        it('should call next on each actions in a given array of actions', () => {
            const action1 = { type: 'MY_FIRST_ACTION' };
            const action2 = { type: 'MY_SECOND_ACTION' };
            const actions = [
                action1,
                action2
            ];
            batchMiddleware({ dispatch })(next)(actions);
            expect(dispatch).toHaveBeenCalledWith(action1);
            expect(dispatch).toHaveBeenCalledWith(action2);
        });
    });
});
