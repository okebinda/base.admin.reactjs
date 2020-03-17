import React from 'react';
import i18next from 'i18next';

import Config from '../../../../Config';
import Logger from '../../../../lib/Logger';
import Events from '../../../../lib/EventEmitter';

const UsersScreen = React.lazy(() => import('./containers/UsersScreenContainer'));
const UserAddScreen = React.lazy(() => import('./containers/UserAddScreenContainer'));
const UserEditScreen = React.lazy(() => import('./containers/UserEditScreenContainer'));

const register = () => {
  Logger.log('debug', `users.register()`);

  if (Config.getIn(['MODULE_TOGGLES', 'users', 'routes'])) {
    Events.dispatch('ADD_MAIN_ROUTES', 

      // screen name (key): [route type (element), path (prop), exact (prop), component (prop)]
      {
        'UserAddScreen': ['PrivateRoute', '/users/add', true, UserAddScreen, i18next.t('route_user_add')],
        'UserEditScreen': ['PrivateRoute', '/users/edit/:id(\\d+)', true, UserEditScreen, i18next.t('route_user_edit')],
        'UsersScreen': ['PrivateRoute', '/users/:page(\\d+)?', true, UsersScreen, i18next.t('route_users')],
      }
    );
  }
}

export default register;

Logger.log('silly', `users.register() loaded.`);
