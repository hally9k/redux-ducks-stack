import createRavenMiddleware from 'redux-raven-middleware';
import {
    SENTRY_DISABLED,
    SENTRY_DSN
} from 'config/sentry';

export default () => {
    if (SENTRY_DISABLED) return () => (next) => (action) => next(action);
    return createRavenMiddleware(SENTRY_DSN);
};
