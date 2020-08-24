import {getI18n} from 'react-i18next';

import Config from '../../../../Config';
import Logger from '../../../../lib/Logger';
import Events from '../../../../lib/EventEmitter';

import TermsOfServicesScreen from './containers/TermsOfServicesScreenContainer';
import TermsOfServiceAddScreen from './containers/TermsOfServiceAddScreenContainer';
import TermsOfServiceEditScreen from './containers/TermsOfServiceEditScreenContainer';

const register = () => {
  Logger.log('debug', `termsOfServices.register()`);

  if (Config.getIn(['MODULE_TOGGLES', 'termsOfServices', 'routes'])) {
    Events.dispatch('ADD_MAIN_ROUTES', 
      {
        'TermsOfServiceAddScreen': ['PrivateRoute', '/tos/add', true, TermsOfServiceAddScreen, getI18n().t('terms_of_services_route_add')],
        'TermsOfServiceEditScreen': ['PrivateRoute', '/tos/edit/:id(\\d+)', true, TermsOfServiceEditScreen, getI18n().t('terms_of_services_route_edit')],
        'TermsOfServicesScreen': ['PrivateRoute', '/tos/:page(\\d+)?', true, TermsOfServicesScreen, getI18n().t('terms_of_services_route_list')],
      }
    );
  }
}

export default register;

Logger.log('silly', `termsOfServices.register() loaded.`);
