import React from 'react';
import i18next from 'i18next';

import Config from '../../../../Config';
import Logger from '../../../../lib/Logger';
import Events from '../../../../lib/EventEmitter';

const AdministratorsScreen = React.lazy(() => import('./containers/AdministratorsScreenContainer'));
const AdministratorAddScreen = React.lazy(() => import('./containers/AdministratorAddScreenContainer'));
const AdministratorEditScreen = React.lazy(() => import('./containers/AdministratorEditScreenContainer'));

const register = () => {
  Logger.log('debug', `administrators.register()`);

  if (Config.getIn(['MODULE_TOGGLES', 'administrators', 'routes'])) {
    Events.dispatch('ADD_MAIN_ROUTES', 

      // screen name (key): [route type (element), path (prop), exact (prop), component (prop)]
      {
        'AdministratorAddScreen': ['PrivateRoute', '/administrators/add', true, AdministratorAddScreen, i18next.t('route_administrator_add')],
        'AdministratorEditScreen': ['PrivateRoute', '/administrators/edit/:id(\\d+)', true, AdministratorEditScreen, i18next.t('route_administrator_edit')],
        'AdministratorsScreen': ['PrivateRoute', '/administrators/:page(\\d+)?', true, AdministratorsScreen, i18next.t('route_administrators')],
      }
    );
  }
}

export default register;

Logger.log('silly', `administrators.register() loaded.`);
