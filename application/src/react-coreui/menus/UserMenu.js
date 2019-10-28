import React, {Component} from 'react';
import {Translation} from 'react-i18next';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
} from 'reactstrap';
import {AppHeaderDropdown} from '@coreui/react';

import SignOutDropdownItem from '../elements/containers/SignOutDropdownItemContainer';
import {pathTo} from '../Routes';
import Logger from '../../lib/Logger';

class UserMenu extends Component {

  render() {
    return (
      <Translation>
        {
          (t) =>               
            <Nav className="ml-auto" navbar>
              <AppHeaderDropdown direction="down">
                <DropdownToggle nav>
                  <i className="fa fa-user-circle fa-2x mt-4"></i>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
                  <DropdownItem onClick={e => this.props.linkTo(e, pathTo('UserAccountScreen'))}><i className="fa fa-user"></i> Account Settings</DropdownItem>
                  <DropdownItem divider />
                  <SignOutDropdownItem text={t('menu_item_signout')} />
                </DropdownMenu>
              </AppHeaderDropdown>
            </Nav>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `UserMenu.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `UserMenu.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `UserMenu.componentWillUnmount()`);
  }
}

export default UserMenu;

Logger.log('silly', `UserMenu loaded.`);
