import React, {Component} from 'react';
import {Alert, Row, Col} from 'reactstrap';
import {Translation} from 'react-i18next';

import Logger from '../../../../lib/Logger';
import UserForm from '../containers/UserFormContainer';

class UserEditScreen extends Component {

  static defaultProps = {
    isLoading: true
  }

  render() {
    return (
      <Translation>
        {
          (t) => 
            <div className="animated fadeIn">

              <Row className="title-bar">
                <Col md="4">
                  <h1>{t('user_edit_title')}: {this.props.match.params.id}</h1>
                  {this.props.isLoading ? <span className="event-feedback">{t('feedback_loading')}</span> : ''}
                </Col>
                <Col md="8">
                  <div className="flash-message row">
                    <div className="col-sm-auto">
                      {true === this.props.success
                        ? <Alert color="success">{t('feedback_form_success')}</Alert>
                        : ''
                      }
                      {false === this.props.success
                        ? <Alert color="danger">{t('feedback_form_error')}</Alert>
                        : ''
                      }
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <UserForm id={this.props.match.params.id} />
                </Col>
              </Row>

            </div>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `UserEditScreen.componentDidMount()`);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  componentDidUpdate() {
    Logger.log('silly', `UserEditScreen.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `UserEditScreen.componentWillUnmount()`);
  }
}

export default UserEditScreen;

Logger.log('silly', `UserEditScreen loaded.`);
