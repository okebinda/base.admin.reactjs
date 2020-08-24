import React, {Component} from 'react';
import {Translation} from 'react-i18next';

import TermsOfServiceForm from '../containers/TermsOfServiceFormContainer';
import DocumentHead from '../../../elements/components/DocumentHead';
import Logger from '../../../../../lib/Logger';

class TermsOfServiceAddScreen extends Component {

  scrollToTop = () => {
    Logger.log('debug', `TermsOfServiceAddScreen.scrollToTop()`);
    if (typeof window !== 'undefined') {
      setTimeout(() => window.scrollTo(0, 0), 100);
    }
  }

  render() {
    return (
      <Translation>{(t) => 
        <div>
          <DocumentHead title={t('terms_of_services_route_add')} />
          <TermsOfServiceForm />
        </div>
      }</Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    this.scrollToTop();
  }
}

export default TermsOfServiceAddScreen;

Logger.log('silly', `TermsOfServiceAddScreen loaded.`);
