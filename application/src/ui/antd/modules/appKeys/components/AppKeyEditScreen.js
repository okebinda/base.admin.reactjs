import React, {Component} from 'react';
import {Translation} from 'react-i18next';

import AppKeyForm from '../containers/AppKeyFormContainer';
import DocumentHead from '../../../elements/components/DocumentHead';
import Logger from '../../../../../lib/Logger';

class AppKeyEditScreen extends Component {

  scrollToTop = () => {
    Logger.log('debug', `AppKeyEditScreen.scrollToTop()`);
    if (typeof window !== 'undefined') {
      setTimeout(() => window.scrollTo(0, 0), 100);
    }
  }

  render() {
    return (
      <Translation>{(t) => 
        <div>
          <DocumentHead title={t('app_key_route_edit')} />
          <AppKeyForm id={this.props.match.params.id} />
        </div>
      }</Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    this.scrollToTop();
  }
}

export default AppKeyEditScreen;

Logger.log('silly', `AppKeyEditScreen loaded.`);
