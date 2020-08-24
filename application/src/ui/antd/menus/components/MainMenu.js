import React from 'react';
import {Link} from 'react-router-dom';
import {Menu} from 'antd';
import {
  DashboardOutlined,
  IdcardOutlined,
  KeyOutlined,
  SafetyOutlined,
  UserOutlined
} from '@ant-design/icons';
import {Translation} from 'react-i18next';

import {pathTo, hasRoute, getRouteFromPath} from '../../Routes';
import Logger from '../../../../lib/Logger';


function MainMenu(props) {

  const topRoutes = [
    {
      'key': 'dashboard',
      'screen': 'DashboardScreen',
      'title': 'dashboard_menu_item',
      'icon': <DashboardOutlined />
    },
  ];

  const publicRoutes = [
    {
      'key': 'user-list',
      'screen': 'UsersScreen',
      'title': 'users_menu_item_list',
      'icon': <UserOutlined />
    },
  ];

  const adminRoutes = [
    {
      'key': 'administrator-list',
      'screen': 'AdministratorsScreen',
      'title': 'administrators_menu_item_list',
      'icon': <UserOutlined />
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

  const currentRoute = getRouteFromPath(props.currentPath);
  const currentMenuItem = currentRoute
    ? topRoutes
        .concat(publicRoutes)
        .concat(adminRoutes)
        .filter(x => x.screen === currentRoute.screen)
    : null;
  const defaultSelectedKey = currentMenuItem && currentMenuItem.length ? currentMenuItem[0].key : null;

  return (
    <Translation>{(t) => 
      <Menu theme="dark" mode="inline" selectedKeys={[defaultSelectedKey]}>

        {topRoutes.map(
          x => hasRoute(x.screen)
            ? <Menu.Item key={x.key}>
                <Link to={pathTo(x.screen)}>
                  {x.icon}
                  <span>{t(x.title)}</span>
                </Link>
              </Menu.Item>
            : null
          )}

        <Menu.ItemGroup key="public-menu" title={t('menu_group_public')}>
          {publicRoutes.map(
            x => hasRoute(x.screen)
              ? <Menu.Item key={x.key}>
                  <Link to={pathTo(x.screen)}>
                    {x.icon}
                    <span>{t(x.title)}</span>
                  </Link>
                </Menu.Item>
              : null
            )}
        </Menu.ItemGroup>

        <Menu.ItemGroup key="admin-menu" title={t('menu_group_admin')}>
          {adminRoutes.map(
            x => hasRoute(x.screen)
              ? <Menu.Item key={x.key}>
                  <Link to={pathTo(x.screen)}>
                    {x.icon}
                    <span>{t(x.title)}</span>
                  </Link>
                </Menu.Item>
              : null
            )}
        </Menu.ItemGroup>

      </Menu>
    }</Translation>
  )
}

export default MainMenu;

Logger.log('silly', `MainMenu loaded.`);
