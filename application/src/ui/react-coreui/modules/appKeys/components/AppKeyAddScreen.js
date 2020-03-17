import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import {Translation} from 'react-i18next';

import Logger from '../../../../../lib/Logger';
import AppKeyForm from '../containers/AppKeyFormContainer';

class AppKeyAddScreen extends Component {

  render() {
    return (
      <Translation>
        {
          (t) => 
            <div className="animated fadeIn">
              <Row>
                <Col>
                  <AppKeyForm />
                </Col>
              </Row>
            </div>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `AppKeyAddScreen.componentDidMount()`);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  componentDidUpdate() {
    Logger.log('silly', `AppKeyAddScreen.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `AppKeyAddScreen.componentWillUnmount()`);
  }
}

export default AppKeyAddScreen;

Logger.log('silly', `AppKeyAddScreen loaded.`);
