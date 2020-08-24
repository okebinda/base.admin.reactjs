import React, {Component} from 'react';
import {Translation} from 'react-i18next';

import TermsOfServiceForm from '../containers/TermsOfServiceFormContainer';
import DocumentHead from '../../../elements/components/DocumentHead';
import Logger from '../../../../../lib/Logger';

class TermsOfServiceEditScreen extends Component {

  scrollToTop = () => {
    Logger.log('debug', `TermsOfServiceEditScreen.scrollToTop()`);
    if (typeof window !== 'undefined') {
      setTimeout(() => window.scrollTo(0, 0), 100);
    }
  }

  render() {
    return (
      <Translation>{(t) => 
        <div>
          <DocumentHead title={t('terms_of_services_route_edit')} />
          <TermsOfServiceForm id={this.props.match.params.id} />
        </div>
      }</Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    this.scrollToTop();
  }
}

export default TermsOfServiceEditScreen;

Logger.log('silly', `TermsOfServiceEditScreen loaded.`);
