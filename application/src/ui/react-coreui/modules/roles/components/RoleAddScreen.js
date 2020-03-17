import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import {Translation} from 'react-i18next';

import Logger from '../../../../../lib/Logger';
import RoleForm from '../containers/RoleFormContainer';

class RoleAddScreen extends Component {

  render() {
    return (
      <Translation>
        {
          (t) => 
            <div className="animated fadeIn">
              <Row>
                <Col>
                  <RoleForm />
                </Col>
              </Row>
            </div>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `RoleAddScreen.componentDidMount()`);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  componentDidUpdate() {
    Logger.log('silly', `RoleAddScreen.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `RoleAddScreen.componentWillUnmount()`);
  }
}

export default RoleAddScreen;

Logger.log('silly', `RoleAddScreen loaded.`);
