import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import {Translation} from 'react-i18next';

import Logger from '../../../../../lib/Logger';
import LoginForm from '../containers/LoginFormContainer'

class LoginScreen extends Component {

  render() {
    return (
      <Translation>
        {
          (t) => 
          <div className="app flex-row align-items-center">
            <Container>
              <Row className="justify-content-center">
                <Col md="6">
                  <h1 className="text-center">{t('home_title')}</h1>
                  <br/>
                  <LoginForm location={this.props.location} />
                </Col>
              </Row>
            </Container>
          </div>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `LoginScreen.componentDidMount()`);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  componentDidUpdate() {
    Logger.log('silly', `LoginScreen.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `LoginScreen.componentWillUnmount()`);
  }
}

export default LoginScreen;

Logger.log('silly', `LoginScreen loaded.`);
