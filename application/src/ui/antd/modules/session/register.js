// import React from 'react';
import i18next from 'i18next';

import Config from '../../../../Config';
import Logger from '../../../../lib/Logger';
import Events from '../../../../lib/EventEmitter';

import LoginScreen from './containers/LoginScreenContainer';
// const LoginScreen = React.lazy(() => import('./containers/LoginScreenContainer'));

const register = () => {
  Logger.log('debug', `session.register()`);

  if (Config.getIn(['MODULE_TOGGLES', 'session', 'routes'])) {
    Events.dispatch('ADD_DEFAULT_ROUTES', 

      // screen name (key): [route type (element), path (prop), exact (prop), component (prop)]
      {
        'LoginScreen': ['Route', "/login", false, LoginScreen, i18next.t('login_route')],
      }
    );
  }
}

export default register;

Logger.log('silly', `session.register() loaded.`);
