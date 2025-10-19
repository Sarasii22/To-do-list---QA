import '@testing-library/jest-dom';

// Polyfills for TextEncoder (fixes router error)
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;