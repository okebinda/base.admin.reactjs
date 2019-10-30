import React from 'react';
import i18next from 'i18next';

import Config from '../../../Config';
import Logger from '../../../lib/Logger';
import Events from '../../../lib/EventEmitter';

const RolesScreen = React.lazy(() => import('./containers/RolesScreenContainer'));
const RoleAddScreen = React.lazy(() => import('./containers/RoleAddScreenContainer'));
const RoleEditScreen = React.lazy(() => import('./containers/RoleEditScreenContainer'));

const register = () => {
  Logger.log('debug', `roles.register()`);

  if (Config.getIn(['MODULE_TOGGLES', 'roles', 'routes'])) {
    Events.dispatch('ADD_MAIN_ROUTES', 

      // screen name (key): [route type (element), path (prop), exact (prop), component (prop)]
      {
        'RoleAddScreen': ['PrivateRoute', '/roles/add', true, RoleAddScreen, i18next.t('route_role_add')],
        'RoleEditScreen': ['PrivateRoute', '/roles/edit/:id(\\d+)', true, RoleEditScreen, i18next.t('route_role_edit')],
        'RolesScreen': ['PrivateRoute', '/roles/:page(\\d+)?', true, RolesScreen, i18next.t('route_roles')],
      }
    );
  }
}

export default register;

Logger.log('silly', `roles.register() loaded.`);
