import {getI18n} from 'react-i18next';

import Config from '../../../../Config';
import Logger from '../../../../lib/Logger';
import Events from '../../../../lib/EventEmitter';

import UsersScreen from './containers/UsersScreenContainer';
import UserAddScreen from './containers/UserAddScreenContainer';
import UserEditScreen from './containers/UserEditScreenContainer';

const register = () => {
  Logger.log('debug', `users.register()`);

  if (Config.getIn(['MODULE_TOGGLES', 'users', 'routes'])) {
    Events.dispatch('ADD_MAIN_ROUTES', 
      {
        'UserAddScreen': ['PrivateRoute', '/users/add', true, UserAddScreen, getI18n().t('users_route_add')],
        'UserEditScreen': ['PrivateRoute', '/users/edit/:id(\\d+)', true, UserEditScreen, getI18n().t('users_route_edit')],
        'UsersScreen': ['PrivateRoute', '/users/:page(\\d+)?', true, UsersScreen, getI18n().t('users_route_list')],
      }
    );
  }
}

export default register;

Logger.log('silly', `users.register() loaded.`);
