// import React from 'react';
import i18next from 'i18next';

import Config from '../../../../Config';
import Logger from '../../../../lib/Logger';
import Events from '../../../../lib/EventEmitter';

// const UserAccountScreen = React.lazy(() => import('./containers/UserAccountScreenContainer'));
import UserAccountScreen from './containers/UserAccountScreenContainer';

const register = () => {
  Logger.log('debug', `userAccount.register()`);

  if (Config.getIn(['MODULE_TOGGLES', 'userAccount', 'routes'])) {
    Events.dispatch('ADD_MAIN_ROUTES', 

      // screen name (key): [route type (element), path (prop), exact (prop), component (prop)]
      {
        'UserAccountScreen': ['PrivateRoute', '/user-account', true, UserAccountScreen, i18next.t('user_account_route')],
      }
    );
  }
}

export default register;

Logger.log('silly', `userAccount.register() loaded.`);
