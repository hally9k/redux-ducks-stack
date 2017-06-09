require('dotenv').config()

const { SENTRY_DSN, SENTRY_DISABLED } = process.env;

// Config for the `front-end-scripts` package
module.exports = {
    entry: {
    },
    env: {
        SENTRY_DSN: JSON.stringify(SENTRY_DSN),
        SENTRY_DISABLED: JSON.stringify(SENTRY_DISABLED)
    }
};
