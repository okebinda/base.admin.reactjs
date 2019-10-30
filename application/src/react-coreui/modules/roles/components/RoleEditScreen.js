import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import {Translation} from 'react-i18next';

import Logger from '../../../../lib/Logger';
import RoleForm from '../containers/RoleFormContainer';

class RoleEditScreen extends Component {

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
                  <RoleForm id={this.props.match.params.id} />
                </Col>
              </Row>
            </div>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `RoleEditScreen.componentDidMount()`);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  componentDidUpdate() {
    Logger.log('silly', `RoleEditScreen.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `RoleEditScreen.componentWillUnmount()`);
  }
}

export default RoleEditScreen;

Logger.log('silly', `RoleEditScreen loaded.`);
