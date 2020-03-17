import React from 'react';
import i18next from 'i18next';

import Config from '../../../../Config';
import Logger from '../../../../lib/Logger';
import Events from '../../../../lib/EventEmitter';

const LoginsScreen = React.lazy(() => import('./containers/LoginsScreenContainer'));

const register = () => {
  Logger.log('debug', `logins.register()`);

  if (Config.getIn(['MODULE_TOGGLES', 'logins', 'routes'])) {
    Events.dispatch('ADD_MAIN_ROUTES', 

      // screen name (key): [route type (element), path (prop), exact (prop), component (prop)]
      {
        'LoginsScreen': ['PrivateRoute', '/logins/:page(\\d+)?', true, LoginsScreen, i18next.t('route_logins')],
      }
    );
  }
}

export default register;

Logger.log('silly', `logins.register() loaded.`);
