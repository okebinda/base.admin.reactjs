import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import {Translation} from 'react-i18next';

import Logger from '../../../../../lib/Logger';
import UserForm from '../containers/UserFormContainer';

class UserAddScreen extends Component {

  render() {
    return (
      <Translation>
        {
          (t) => 
            <div className="animated fadeIn">
              <Row>
                <Col>
                  <UserForm />
                </Col>
              </Row>
            </div>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `UserAddScreen.componentDidMount()`);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  componentDidUpdate() {
    Logger.log('silly', `UserAddScreen.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `UserAddScreen.componentWillUnmount()`);
  }
}

export default UserAddScreen;

Logger.log('silly', `UserAddScreen loaded.`);
