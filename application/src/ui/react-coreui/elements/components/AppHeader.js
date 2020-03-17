import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';

import TopMenu from '../../menus/TopMenu';
import Logger from '../../../lib/Logger';

class AppHeader extends Component {

  render() {
    return (
      <Row>
        <Col className="screen-header">
          <TopMenu />
        </Col>
      </Row>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `AppHeader.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `AppHeader.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `AppHeader.componentWillUnmount()`);
  }
}

export default AppHeader;

Logger.log('silly', `AppHeader loaded.`);
