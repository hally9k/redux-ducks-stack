import batchMiddleware from 'middleware/batch';
import { createEpicMiddleware } from 'redux-observable';
import createRavenMiddleware from 'middleware/raven';
import loggerMiddleware from 'middleware/logger';
import { applyMiddleware, compose, createStore } from 'redux';
import { epics, reducers } from 'ducks';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle

const epicMiddleware = createEpicMiddleware(epics);
const ravenMiddleware = createRavenMiddleware();

const enhancer = composeEnhancers(
    applyMiddleware(
        batchMiddleware,
        ravenMiddleware,
        epicMiddleware,
        loggerMiddleware
    )
);

let store;

export function configureStore() {
    store = createStore(reducers, enhancer);
    return store;
}

export { store };

// Hot Module Replacement
if (module.hot) {
    module.hot.accept('ducks', () => {
        const rootEpic = require('ducks').epics;
        epicMiddleware.replaceEpic(rootEpic); // Swap out epic middleware
        const rootReducer = require('ducks').reducers;
        store.replaceReducer(rootReducer);
    });
}
