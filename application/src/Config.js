import {Map} from 'immutable';

const Config = Map({
  ENVIRONMENT: process.env.NODE_ENV, // production, development, test
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  API_APP_KEY: process.env.REACT_APP_API_APP_KEY,
  LOG_LEVEL: process.env.REACT_APP_LOG_LEVEL, // error, warn, info, verbose, debug, silly
  AUTH_STORAGE: 'session', // session, local
  LANGUAGES: ['en', 'es'], // list of supported languages in two-letter format, default is first
  DEFAULT_LIST_LENGTH: 10,
  MODULE_TOGGLES: Map({
    'userAccount': true,
    'users': true,
    'appKeys': true,
    'termsOfServices': true
  })
});

export default Config;
