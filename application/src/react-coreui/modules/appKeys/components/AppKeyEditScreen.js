import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import {Translation} from 'react-i18next';

import Logger from '../../../../lib/Logger';
import AppKeyForm from '../containers/AppKeyFormContainer';

class AppKeyEditScreen extends Component {

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
                  <AppKeyForm id={this.props.match.params.id} />
                </Col>
              </Row>
            </div>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `AppKeyEditScreen.componentDidMount()`);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  componentDidUpdate() {
    Logger.log('silly', `AppKeyEditScreen.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `AppKeyEditScreen.componentWillUnmount()`);
  }
}

export default AppKeyEditScreen;

Logger.log('silly', `AppKeyEditScreen loaded.`);
