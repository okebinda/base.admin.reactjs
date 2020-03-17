import React, {Component} from 'react';
import {AppSidebarNav} from '@coreui/react';
import i18next from 'i18next';

import {pathTo, hasRoute} from '../Routes';
import Logger from '../../../lib/Logger';

const navigation = {
  items: [
    {
      name: i18next.t('menu_item_dashboard'),
      url: pathTo('DashboardScreen'),
      icon: 'icon-speedometer',
      // badge: {
      //   variant: 'info',
      //   text: 'NEW',
      // },
    },
    {
      title: true,
      name: 'Public',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}      // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
  ],
};

if (hasRoute('UsersScreen')) {
  navigation.items.push(
    {
      name: i18next.t('menu_item_users'),
      url: pathTo('UsersScreen'),
      icon: 'icon-people',
      children: [
        {
          name: i18next.t('menu_item_list'),
          url: pathTo('UsersScreen'),
          icon: 'icon-list',
        },
        {
          name: i18next.t('menu_item_create'),
          url: pathTo('UserAddScreen'),
          icon: 'icon-plus',
        }
      ]
    }
  );
}

if (hasRoute('TermsOfServicesScreen')) {
  navigation.items.push(
    {
      name: 'Terms of Services',
      url: pathTo('TermsOfServicesScreen'),
      icon: 'icon-doc',
      children: [
        {
          name: 'List',
          url: pathTo('TermsOfServicesScreen'),
          icon: 'icon-list',
        },
        {
          name: 'Add New',
          url: pathTo('TermsOfServiceAddScreen'),
          icon: 'icon-plus',
        }
      ]
    }
  );
}

navigation.items.push(
  {
    title: true,
    name: 'Admin',
    wrapper: {
      element: '',
      attributes: {}
    },
    class: ''
  }
);

if (hasRoute('AdministratorsScreen')) {
  navigation.items.push(
    {
      name: i18next.t('menu_item_administrators'),
      url: pathTo('AdministratorsScreen'),
      icon: 'icon-people',
      children: [
        {
          name: i18next.t('menu_item_list'),
          url: pathTo('AdministratorsScreen'),
          icon: 'icon-list',
        },
        {
          name: i18next.t('menu_item_create'),
          url: pathTo('AdministratorAddScreen'),
          icon: 'icon-plus',
        }
      ]
    }
  );
}

if (hasRoute('RolesScreen')) {
  navigation.items.push(
    {
      name: i18next.t('menu_item_roles'),
      url: pathTo('RolesScreen'),
      icon: 'icon-shield',
      children: [
        {
          name: i18next.t('menu_item_list'),
          url: pathTo('RolesScreen'),
          icon: 'icon-list',
        },
        {
          name: i18next.t('menu_item_create'),
          url: pathTo('RoleAddScreen'),
          icon: 'icon-plus',
        }
      ]
    }
  );
}

if (hasRoute('AppKeysScreen')) {
  navigation.items.push(
    {
      name: i18next.t('menu_item_app_keys'),
      url: pathTo('AppKeysScreen'),
      icon: 'icon-key',
      children: [
        {
          name: i18next.t('menu_item_list'),
          url: pathTo('AppKeysScreen'),
          icon: 'icon-list',
        },
        {
          name: i18next.t('menu_item_create'),
          url: pathTo('AppKeyAddScreen'),
          icon: 'icon-plus',
        }
      ]
    }
  );
}

if (hasRoute('LoginsScreen')) {
  navigation.items.push(
    {
      name: i18next.t('menu_item_logins'),
      url: pathTo('LoginsScreen'),
      icon: 'icon-lock'
    }
  );
}

class MainMenu extends Component {

  render() {
    return (
      <AppSidebarNav navConfig={navigation} {...this.props} />
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `MainMenu.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `MainMenu.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `MainMenu.componentWillUnmount()`);
  }
}

export default MainMenu;

Logger.log('silly', `MainMenu loaded.`);
