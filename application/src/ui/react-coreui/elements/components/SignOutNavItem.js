import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {NavItem, NavLink} from 'reactstrap';

import Logger from '../../../lib/Logger';

class SignOutNavItem extends Component {

  onClickHandler = () => {
    Logger.log('debug', `SignOutNavItem.onClickHandler()`);
    this.props.destroySession(() => this.props.history.push('/'))
  }

  render() {
    return (
      <NavItem>
        <NavLink onClick={this.onClickHandler}>
          {this.props.text}
        </NavLink>
      </NavItem>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `SignOutNavItem.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `SignOutNavItem.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `SignOutNavItem.componentWillUnmount()`);
  }
}

export default withRouter(SignOutNavItem);

Logger.log('silly', `SignOutNavItem loaded.`);
