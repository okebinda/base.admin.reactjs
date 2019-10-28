import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {DropdownItem} from 'reactstrap';

import Logger from '../../../lib/Logger';

class SignOutDropdownItem extends Component {

  onClickHandler = () => {
    Logger.log('debug', `SignOutDropdownItem.onClickHandler()`);
    this.props.destroySession(() => this.props.history.push('/'))
  }

  render() {
    return (
      <DropdownItem onClick={this.onClickHandler}>
        <i className="fa fa-lock"></i> {this.props.text}
      </DropdownItem>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `SignOutDropdownItem.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `SignOutDropdownItem.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `SignOutDropdownItem.componentWillUnmount()`);
  }
}

export default withRouter(SignOutDropdownItem);

Logger.log('silly', `SignOutDropdownItem loaded.`);
