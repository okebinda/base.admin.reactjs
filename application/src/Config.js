import {Map} from 'immutable';

const Config = Map({
  ENVIRONMENT: process.env.NODE_ENV, // production, development, test
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  API_APP_KEY: process.env.REACT_APP_API_APP_KEY,
  LOG_LEVEL: process.env.REACT_APP_LOG_LEVEL, // error, warn, info, verbose, debug, silly

  LANGUAGES: ['en', 'es'], // list of supported languages in two-letter format, default is first
  SESSION_TIMEOUT_COUNTDOWN: 60, // number of seconds to warn user before logging user out automatically
  AUTO_LOGOUT_COUNTDOWN: 15, // number of seconds to automatically log a user out if they requested log out but didn't confirm

  DEFAULT_LOGIN_SCREEN: 'LoginScreen', // routing key for default login screen
  DEFAULT_LOGIN_REDIRECT: 'DashboardScreen', // routing key for screen to redirect user to after successful authentication

  DEFAULT_AUTH_STORAGE: 'session', // session, local
  DEFAULT_LIST_LENGTH: 10,
  DEFAULT_MESSAGE_TIMEOUT: 5, // number of seconds to show status messages - such as success/failure to update a record
  DEFAULT_DATE_FORMAT: 'MM/DD/YYYY',
  DEFAULT_DATETIME_FORMAT: 'MM/DD/YYYY HH:mm:ss',

  API_DATETIME_FORMAT: 'YYYY-MM-DDTHH:mm:ssZZ',
  UI_COLLAPSE_SIDEBAR_WIDTH: 1024, // screen width at which sidebar collapses automatically
  
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
