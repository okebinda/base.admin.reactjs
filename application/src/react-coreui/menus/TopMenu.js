import React, {Component} from 'react';
import {NavLink as RRNavLink} from 'react-router-dom';
import {Translation} from 'react-i18next';
import {Nav, NavItem, NavLink} from 'reactstrap';

import {pathTo} from '../Routes';
import Logger from '../../lib/Logger';
import Config from '../../Config';

class TopMenu extends Component {

  render() {
    return (
      <Translation>
        {
          (t) =>               
            <Nav className="d-md-down-none" navbar>
              <NavItem className="px-3">
                <NavLink
                  to={pathTo('DashboardScreen')}
                  activeClassName="active"
                  tag={RRNavLink}
                >
                  {t('menu_item_dashboard')}
                </NavLink>
              </NavItem>
              {
                Config.getIn(['MODULE_TOGGLES', 'users'])
                  ? <NavItem className="px-3">
                      <NavLink
                        to={pathTo('UsersScreen')}
                        activeClassName="active"
                        tag={RRNavLink}
                      >
                        {t('menu_item_users')}
                      </NavLink>
                    </NavItem>
                  : null
              }
            </Nav>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `TopMenu.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `TopMenu.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `TopMenu.componentWillUnmount()`);
  }
}

export default TopMenu;

Logger.log('silly', `TopMenu loaded.`);
