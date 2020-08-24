import {getI18n} from 'react-i18next';

import Config from '../../../../Config';
import Logger from '../../../../lib/Logger';
import Events from '../../../../lib/EventEmitter';

import AdministratorsScreen from './containers/AdministratorsScreenContainer';
import AdministratorAddScreen from './containers/AdministratorAddScreenContainer';
import AdministratorEditScreen from './containers/AdministratorEditScreenContainer';

const register = () => {
  Logger.log('debug', `administrators.register()`);

  if (Config.getIn(['MODULE_TOGGLES', 'administrators', 'routes'])) {
    Events.dispatch('ADD_MAIN_ROUTES', 
      {
        'AdministratorAddScreen': ['PrivateRoute', '/administrators/add', true, AdministratorAddScreen, getI18n().t('administrators_route_add')],
        'AdministratorEditScreen': ['PrivateRoute', '/administrators/edit/:id(\\d+)', true, AdministratorEditScreen, getI18n().t('administrators_route_edit')],
        'AdministratorsScreen': ['PrivateRoute', '/administrators/:page(\\d+)?', true, AdministratorsScreen, getI18n().t('administrators_route_list')],
      }
    );
  }
}

export default register;

Logger.log('silly', `administrators.register() loaded.`);
