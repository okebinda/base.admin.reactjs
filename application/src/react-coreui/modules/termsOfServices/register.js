import React from 'react';
import i18next from 'i18next';

import Config from '../../../Config';
import Logger from '../../../lib/Logger';
import Events from '../../../lib/EventEmitter';

const TermsOfServiceAddScreen = React.lazy(() => import('./containers/TermsOfServiceAddScreenContainer'));
const TermsOfServiceEditScreen = React.lazy(() => import('./containers/TermsOfServiceEditScreenContainer'));
const TermsOfServicesScreen = React.lazy(() => import('./containers/TermsOfServicesScreenContainer'));

const register = () => {
  Logger.log('debug', `termsOfServices.register()`);

  if (Config.getIn(['MODULE_TOGGLES', 'termsOfServices', 'routes'])) {
    Events.dispatch('ADD_MAIN_ROUTES', 

      // screen name (key): [route type (element), path (prop), exact (prop), component (prop)]
      {
        'TermsOfServiceAddScreen': ['PrivateRoute', '/terms-of-services/add', true, TermsOfServiceAddScreen, i18next.t('route_terms_of_service_add')],
        'TermsOfServiceEditScreen': ['PrivateRoute', '/terms-of-services/edit/:id(\\d+)', true, TermsOfServiceEditScreen, i18next.t('route_terms_of_service_edit')],
        'TermsOfServicesScreen': ['PrivateRoute', '/terms-of-services/:page(\\d+)?', true, TermsOfServicesScreen, i18next.t('route_terms_of_services')],
      }
    );
  }
}

export default register;

Logger.log('silly', `termsOfServices.register() loaded.`);
