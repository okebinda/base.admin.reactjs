import React, {Component} from 'react';
import {Translation} from 'react-i18next';

import UserForm from '../containers/UserFormContainer';
import DocumentHead from '../../../elements/components/DocumentHead';
import Logger from '../../../../../lib/Logger';

class UserEditScreen extends Component {

  scrollToTop = () => {
    Logger.log('debug', `UserEditScreen.scrollToTop()`);
    if (typeof window !== 'undefined') {
      setTimeout(() => window.scrollTo(0, 0), 100);
    }
  }

  render() {
    return (
      <Translation>{(t) => 
        <div>
          <DocumentHead title={t('users_route_edit')} />
          <UserForm id={this.props.match.params.id} />
        </div>
      }</Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    this.scrollToTop();
  }
}

export default UserEditScreen;

Logger.log('silly', `UserEditScreen loaded.`);
