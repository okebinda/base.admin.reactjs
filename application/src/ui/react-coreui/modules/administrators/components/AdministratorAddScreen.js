import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import {Translation} from 'react-i18next';

import Logger from '../../../../../lib/Logger';
import AdministratorForm from '../containers/AdministratorFormContainer';

class AdministratorAddScreen extends Component {

  render() {
    return (
      <Translation>
        {
          (t) => 
            <div className="animated fadeIn">
              <Row>
                <Col>
                  <AdministratorForm />
                </Col>
              </Row>
            </div>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `AdministratorAddScreen.componentDidMount()`);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  componentDidUpdate() {
    Logger.log('silly', `AdministratorAddScreen.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `AdministratorAddScreen.componentWillUnmount()`);
  }
}

export default AdministratorAddScreen;

Logger.log('silly', `AdministratorAddScreen loaded.`);
