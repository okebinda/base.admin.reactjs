import {Map} from 'immutable';

const Config = Map({
  ENVIRONMENT: process.env.NODE_ENV, // production, development, test
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  API_APP_KEY: process.env.REACT_APP_API_APP_KEY,
  LOG_LEVEL: process.env.REACT_APP_LOG_LEVEL, // error, warn, info, verbose, debug, silly

  AUTH_STORAGE: 'session', // session, local
  LANGUAGES: ['en', 'es'], // list of supported languages in two-letter format, default is first
  SESSION_TIMEOUT_COUNTDOWN: 60, // number of seconds to warn user before logging user out automatically

  DEFAULT_LIST_LENGTH: 10,
  DEFAULT_LOGIN_REDIRECT: 'DashboardScreen', // routing key for screen to redirect user to after successful authentication
  DEFAULT_MESSAGE_TIMEOUT: 6, // number of seconds to show status messages - such as success/failure to update a record
  DEFAULT_DATE_FORMAT: 'mm/dd/yyyy',
  DEFAULT_DATETIME_FORMAT: 'mm/dd/yyyy HH:mm:ss Z',
  
  MODULE_TOGGLES: Map({
    'session': {'enabled': true, 'routes': true},
    'dashboard': {'enabled': true, 'routes': true},
    'userAccount': {'enabled': true, 'routes': true},
    'users': {'enabled': true, 'routes': true},
    'administrators': {'enabled': true, 'routes': true},
    'roles': {'enabled': true, 'routes': true},
    'appKeys': {'enabled': true, 'routes': true},
    'termsOfServices': {'enabled': true, 'routes': true},
    'logins': {'enabled': true, 'routes': true}
  })
});

export default Config;
