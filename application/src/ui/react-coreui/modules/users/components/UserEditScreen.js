import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import {Translation} from 'react-i18next';

import Logger from '../../../../../lib/Logger';
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
