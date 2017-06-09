import { ActionsObservable } from 'redux-observable';

export const testEpic = (epic, actions) => {
    const actionArray = Array.isArray(actions) ? actions : [actions];

    const action$ = ActionsObservable.of(...actionArray);

    return epic(action$)
        .toArray()
        .toPromise();
};
