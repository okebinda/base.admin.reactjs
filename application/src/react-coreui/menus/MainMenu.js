import React, {Component} from 'react';
import {AppSidebarNav} from '@coreui/react';
import i18next from 'i18next';

import {pathTo, hasRoute} from '../Routes';
import Logger from '../../lib/Logger';

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
      url: '/terms_of_services',
      icon: 'icon-info',
      children: [
        {
          name: 'List',
          url: '/terms_of_services',
          icon: 'icon-list',
        },
        {
          name: 'Add New',
          url: '/terms_of_services/add',
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
