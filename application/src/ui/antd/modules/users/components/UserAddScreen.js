import React, {Component} from 'react';
import {Translation} from 'react-i18next';

import UserForm from '../containers/UserFormContainer';
import DocumentHead from '../../../elements/components/DocumentHead';
import Logger from '../../../../../lib/Logger';

class UserAddScreen extends Component {

  scrollToTop = () => {
    Logger.log('debug', `UserAddScreen.scrollToTop()`);
    if (typeof window !== 'undefined') {
      setTimeout(() => window.scrollTo(0, 0), 100);
    }
  }

  render() {
    return (
      <Translation>{(t) => 
        <div>
          <DocumentHead title={t('users_route_add')} />
          <UserForm />
        </div>
      }</Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    this.scrollToTop();
  }
}

export default UserAddScreen;

Logger.log('silly', `UserAddScreen loaded.`);
