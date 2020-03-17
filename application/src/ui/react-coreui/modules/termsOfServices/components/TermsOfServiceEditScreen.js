import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import {Translation} from 'react-i18next';

import Logger from '../../../../../lib/Logger';
import TermsOfServiceForm from '../containers/TermsOfServiceFormContainer';

class TermsOfServiceEditScreen extends Component {

  static defaultProps = {
    isLoading: true
  }

  render() {
    return (
      <Translation>
        {
          (t) => 
            <div className="animated fadeIn">
              <Row>
                <Col>
                  <TermsOfServiceForm id={this.props.match.params.id} />
                </Col>
              </Row>
            </div>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `TermsOfServiceEditScreen.componentDidMount()`);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  componentDidUpdate() {
    Logger.log('silly', `TermsOfServiceEditScreen.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `TermsOfServiceEditScreen.componentWillUnmount()`);
  }
}

export default TermsOfServiceEditScreen;

Logger.log('silly', `TermsOfServiceEditScreen loaded.`);