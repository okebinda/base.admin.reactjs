import React from 'react';
import i18next from 'i18next';

import Config from '../../../../Config';
import Logger from '../../../../lib/Logger';
import Events from '../../../../lib/EventEmitter';

const AppKeysScreen = React.lazy(() => import('./containers/AppKeysScreenContainer'));
const AppKeyAddScreen = React.lazy(() => import('./containers/AppKeyAddScreenContainer'));
const AppKeyEditScreen = React.lazy(() => import('./containers/AppKeyEditScreenContainer'));

const register = () => {
  Logger.log('debug', `appKeys.register()`);

  if (Config.getIn(['MODULE_TOGGLES', 'appKeys', 'routes'])) {
    Events.dispatch('ADD_MAIN_ROUTES', 

      // screen name (key): [route type (element), path (prop), exact (prop), component (prop)]
      {
        'AppKeyAddScreen': ['PrivateRoute', '/app-keys/add', true, AppKeyAddScreen, i18next.t('route_app_key_add')],
        'AppKeyEditScreen': ['PrivateRoute', '/app-keys/edit/:id(\\d+)', true, AppKeyEditScreen, i18next.t('route_app_key_edit')],
        'AppKeysScreen': ['PrivateRoute', '/app-keys/:page(\\d+)?', true, AppKeysScreen, i18next.t('route_app_keys')],
      }
    );
  }
}

export default register;

Logger.log('silly', `appKeys.register() loaded.`);
