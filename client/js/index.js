/* eslint-disable sort-imports */
import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';
import { configureStore } from './store';
import { ConnectedRouter } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
import Routes from './routes';
import './rxjs';
import 'sass/index'; // Import CSS


const store =
    module.hot &&
    module.hot.data &&
    module.hot.data.store ?
    module.hot.data.store
    : configureStore();
const history = createBrowserHistory();


/*
    Ensure polyfills only load on older browsers
 */
// Covers all IE versions and Safari < 11
const browserSupportsAllFeatures = window.Promise && window.fetch;

if (browserSupportsAllFeatures) {
    initialise();
} else {
    // See 'Code Splitting' documentation for Webpack (https://webpack.js.org/guides/code-splitting-require/#dependencies)
    require.ensure([], function() {
        require('./polyfills.js');
        initialise();
    });
}
/*
    Main function
 */
function initialise() {
    return render((
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    {Routes}
                </ConnectedRouter>
            </Provider>
        </AppContainer>
    ), document.getElementById('root'));
}

if (module.hot) {
    module.hot.accept();

    module.hot.dispose((data) => {
        data.store = store;
    });
}
