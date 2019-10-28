import React, {Component} from 'react';
import {Navbar} from 'reactstrap';

import MainMenu from '../../menus/MainMenu';
import Logger from '../../../lib/Logger';

class AppSidebar extends Component {

  render() {
    return (
      <Navbar vertical color="light" light id="sidebar">
        <MainMenu />
      </Navbar>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `AppSidebar.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `AppSidebar.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `AppSidebar.componentWillUnmount()`);
  }
}

export default AppSidebar;

Logger.log('silly', `AppSidebar loaded.`);
