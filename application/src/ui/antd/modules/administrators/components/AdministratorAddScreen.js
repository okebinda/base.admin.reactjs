import React, {Component} from 'react';
import {Translation} from 'react-i18next';

import AdministratorForm from '../containers/AdministratorFormContainer';
import DocumentHead from '../../../elements/components/DocumentHead';
import Logger from '../../../../../lib/Logger';

class AdministratorAddScreen extends Component {

  scrollToTop = () => {
    Logger.log('debug', `AdministratorAddScreen.scrollToTop()`);
    if (typeof window !== 'undefined') {
      setTimeout(() => window.scrollTo(0, 0), 100);
    }
  }

  render() {
    return (
      <Translation>{(t) => 
        <div>
          <DocumentHead title={t('administrators_route_add')} />
          <AdministratorForm />
        </div>
      }</Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    this.scrollToTop();
  }
}

export default AdministratorAddScreen;

Logger.log('silly', `AdministratorAddScreen loaded.`);
