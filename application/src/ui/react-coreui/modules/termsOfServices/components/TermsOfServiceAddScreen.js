import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import {Translation} from 'react-i18next';

import Logger from '../../../../../lib/Logger';
import TermsOfServiceForm from '../containers/TermsOfServiceFormContainer';

class TermsOfServiceAddScreen extends Component {

  render() {
    return (
      <Translation>
        {
          (t) => 
            <div className="animated fadeIn">
              <Row>
                <Col>
                  <TermsOfServiceForm />
                </Col>
              </Row>
            </div>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `TermsOfServiceAddScreen.componentDidMount()`);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  componentDidUpdate() {
    Logger.log('silly', `TermsOfServiceAddScreen.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `TermsOfServiceAddScreen.componentWillUnmount()`);
  }
}

export default TermsOfServiceAddScreen;

Logger.log('silly', `TermsOfServiceAddScreen loaded.`);
