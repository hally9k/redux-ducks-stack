import 'rxjs';

// Mock fetch api
global.fetch = require('jest-fetch-mock');

// TODO: This suppresses noisy warnings in the test output.
// temporary solution while enzyme and chums get up to speed on React 15.5.
console.error = jest.genMockFn(); // eslint-disable-line no-console
