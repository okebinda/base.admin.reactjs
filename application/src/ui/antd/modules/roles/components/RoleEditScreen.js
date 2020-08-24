import React, {Component} from 'react';
import {Translation} from 'react-i18next';

import RoleForm from '../containers/RoleFormContainer';
import DocumentHead from '../../../elements/components/DocumentHead';
import Logger from '../../../../../lib/Logger';

class RoleEditScreen extends Component {

  scrollToTop = () => {
    Logger.log('debug', `RoleEditScreen.scrollToTop()`);
    if (typeof window !== 'undefined') {
      setTimeout(() => window.scrollTo(0, 0), 100);
    }
  }

  render() {
    return (
      <Translation>{(t) => 
        <div>
          <DocumentHead title={t('roles_route_edit')} />
          <RoleForm id={this.props.match.params.id} />
        </div>
      }</Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    this.scrollToTop();
  }
}

export default RoleEditScreen;

Logger.log('silly', `RoleEditScreen loaded.`);
