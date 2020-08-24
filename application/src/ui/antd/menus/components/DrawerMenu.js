import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Menu} from 'antd';
import {
  CrownOutlined,
  DashboardOutlined,
  IdcardOutlined,
  InfoCircleOutlined,
  KeyOutlined,
  LogoutOutlined,
  SafetyOutlined,
  UserOutlined
} from '@ant-design/icons';
import {Translation} from 'react-i18next';

import Config from '../../../../Config';
import {pathTo, hasRoute} from '../../Routes';
import Logger from '../../../../lib/Logger';


function DrawerMenu(props) {

  const routes = [
    {
      'key': 'dashboard',
      'screen': 'DashboardScreen',
      'title': 'dashboard_menu_item',
      'icon': <DashboardOutlined />
    },
    {
      'key': 'user-list',
      'screen': 'UsersScreen',
      'title': 'users_menu_item_list',
      'icon': <UserOutlined />
    },
    {
      'key': 'tos-list',
      'screen': 'TermsOfServicesScreen',
      'title': 'terms_of_services_menu_item_list',
      'icon': <InfoCircleOutlined />
    },
    {
      'key': 'administrator-list',
      'screen': 'AdministratorsScreen',
      'title': 'administrators_menu_item_list',
      'icon': <CrownOutlined />
    },
    {
      'key': 'role-list',
      'screen': 'RolesScreen',
      'title': 'roles_menu_item_list',
      'icon': <SafetyOutlined />
    },
    {
      'key': 'app-key-list',
      'screen': 'AppKeysScreen',
      'title': 'app_keys_menu_item_list',
      'icon': <KeyOutlined />
    },
    {
      'key': 'login-list',
      'screen': 'LoginsScreen',
      'title': 'logins_menu_item_list',
      'icon': <IdcardOutlined />
    },
  ];

  const userRoutes = [
    {
      'key': 'user-account',
      'screen': 'UserAccountScreen',
      'title': 'user_account_menu_item',
      'icon': <UserOutlined />
    }
  ];

  const logout = () => {
    Logger.log('debug', `DrawerMenu.logout()`);
    props.destroySession(() => props.history.push(pathTo(Config.get('DEFAULT_LOGIN_SCREEN'))));
  }

  return (
    <Translation>{(t) => 
      <Menu theme="light" mode="inline" selectedKeys={null} inlineIndent={0}>
        
        {routes.map(
          x => hasRoute(x.screen)
            ? <Menu.Item key={x.key}>
                <Link to={pathTo(x.screen)} onClick={props.toggleDrawer}>
                  {x.icon}
                  <span>{t(x.title)}</span>
                </Link>
              </Menu.Item>
            : null
          )}

        <Menu.Divider />

        {userRoutes.map(
          x => hasRoute(x.screen)
            ? <Menu.Item key={x.key}>
                <Link to={pathTo(x.screen)} onClick={props.toggleDrawer}>
                  {x.icon}
                  <span>{t(x.title)}</span>
                </Link>
              </Menu.Item>
            : null
          )}

        <Menu.Divider />

        <Menu.Item key="logout" onClick={logout}>
          <LogoutOutlined />
          {t('session_menu_item_signout')}
        </Menu.Item>

      </Menu>
    }</Translation>
  )
}

export default withRouter(DrawerMenu);

Logger.log('silly', `DrawerMenu loaded.`);
