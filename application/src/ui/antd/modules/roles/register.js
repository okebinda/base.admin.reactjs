import {getI18n} from 'react-i18next';

import Config from '../../../../Config';
import Logger from '../../../../lib/Logger';
import Events from '../../../../lib/EventEmitter';

import RolesScreen from './containers/RolesScreenContainer';
import RoleAddScreen from './containers/RoleAddScreenContainer';
import RoleEditScreen from './containers/RoleEditScreenContainer';

const register = () => {
  Logger.log('debug', `roles.register()`);

  if (Config.getIn(['MODULE_TOGGLES', 'roles', 'routes'])) {
    Events.dispatch('ADD_MAIN_ROUTES', 
      {
        'RoleAddScreen': ['PrivateRoute', '/roles/add', true, RoleAddScreen, getI18n().t('roles_route_add')],
        'RoleEditScreen': ['PrivateRoute', '/roles/edit/:id(\\d+)', true, RoleEditScreen, getI18n().t('roles_route_edit')],
        'RolesScreen': ['PrivateRoute', '/roles/:page(\\d+)?', true, RolesScreen, getI18n().t('roles_route_list')],
      }
    );
  }
}

export default register;

Logger.log('silly', `roles.register() loaded.`);
