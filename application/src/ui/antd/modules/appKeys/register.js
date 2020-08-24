import {getI18n} from 'react-i18next';

import Config from '../../../../Config';
import Logger from '../../../../lib/Logger';
import Events from '../../../../lib/EventEmitter';

import AppKeysScreen from './containers/AppKeysScreenContainer';
import AppKeyAddScreen from './containers/AppKeyAddScreenContainer';
import AppKeyEditScreen from './containers/AppKeyEditScreenContainer';

const register = () => {
  Logger.log('debug', `appKeys.register()`);

  if (Config.getIn(['MODULE_TOGGLES', 'appKeys', 'routes'])) {
    Events.dispatch('ADD_MAIN_ROUTES', 
      {
        'AppKeyAddScreen': ['PrivateRoute', '/app-keys/add', true, AppKeyAddScreen, getI18n().t('app_key_route_add')],
        'AppKeyEditScreen': ['PrivateRoute', '/app-keys/edit/:id(\\d+)', true, AppKeyEditScreen, getI18n().t('app_key_route_edit')],
        'AppKeysScreen': ['PrivateRoute', '/app-keys/:page(\\d+)?', true, AppKeysScreen, getI18n().t('app_keys_route_list')],
      }
    );
  }
}

export default register;

Logger.log('silly', `appKeys.register() loaded.`);
