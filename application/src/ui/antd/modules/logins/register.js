import {getI18n} from 'react-i18next';

import Config from '../../../../Config';
import Logger from '../../../../lib/Logger';
import Events from '../../../../lib/EventEmitter';

import LoginsScreen from './containers/LoginsScreenContainer';

const register = () => {
  Logger.log('debug', `userAccount.register()`);

  if (Config.getIn(['MODULE_TOGGLES', 'logins', 'routes'])) {
    Events.dispatch('ADD_MAIN_ROUTES', 
      {
        'LoginsScreen': ['PrivateRoute', '/logins/:page(\\d+)?', true, LoginsScreen, getI18n().t('logins_route_list')],
      }
    );
  }
}

export default register;

Logger.log('silly', `userAccount.register() loaded.`);
