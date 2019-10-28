import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import {Translation} from 'react-i18next';

import Logger from '../../../../lib/Logger';
import UserAccountForm from '../containers/UserAccountFormContainer';
import UpdatePasswordForm from '../containers/UpdatePasswordFormContainer';

class UserAccountScreen extends Component {

  scrollToTop = () => {
    Logger.log('debug', `UserAccountScreen.scrollToTop()`);
    if (typeof window !== 'undefined') {
      setTimeout(() => window.scrollTo(0, 0), 100);
    }
  }

  render() {
    return (
      <Translation>
        {
          (t) => 
            <div className="animated fadeIn">

              <Row className="title-bar">
                <Col>
                  <h1>{t('user_account_title')}</h1>
                  {this.props.isLoading ? <span className="event-feedback">{t('feedback_loading')}</span> : ''}
                  <br />
                  <br />
                </Col>
              </Row>

              <Row>
                <Col sm="12" md="6">
                  <UserAccountForm />
                </Col>
                <Col sm="12" md="6">
                  <UpdatePasswordForm />
                </Col>
              </Row>

            </div>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `UserAccountScreen.componentDidMount()`);
    this.scrollToTop();
  }

  componentDidUpdate() {
    Logger.log('silly', `UserAccountScreen.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `UserAccountScreen.componentWillUnmount()`);
  }
}

export default UserAccountScreen;

Logger.log('silly', `UserAccountScreen loaded.`);
