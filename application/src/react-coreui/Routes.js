import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {generatePath} from "react-router";
import {Map} from 'immutable';

import Logger from '../lib/Logger';
import PrivateRoute from './elements/containers/PrivateRouteContainer';
import Config from '../Config';
import {lang, defaultLang} from '../lib/Localization';

const HomeScreen = React.lazy(() => import('./screens/HomeScreen'));
const LoginScreen = React.lazy(() => import('./screens/LoginScreen'));

const DefaultLayout = React.lazy(() => import('./layouts/DefaultLayout'));
const DashboardScreen = React.lazy(() => import('./screens/DashboardScreen'));
const UserAccountScreen = React.lazy(() => import('./modules/userAccount/containers/UserAccountScreenContainer'));
const UsersScreen = React.lazy(() => import('./modules/users/containers/UsersScreenContainer'));
const UserAddScreen = React.lazy(() => import('./modules/users/containers/UserAddScreenContainer'));
const UserEditScreen = React.lazy(() => import('./modules/users/containers/UserEditScreenContainer'));
const AppKeysScreen = React.lazy(() => import('./modules/appKeys/containers/AppKeysScreenContainer'));
const AppKeyAddScreen = React.lazy(() => import('./modules/appKeys/containers/AppKeyAddScreenContainer'));
const AppKeyEditScreen = React.lazy(() => import('./modules/appKeys/containers/AppKeyEditScreenContainer'));
const TermsOfServiceAddScreen = React.lazy(() => import('./modules/termsOfServices/containers/TermsOfServiceAddScreenContainer'));
const TermsOfServiceEditScreen = React.lazy(() => import('./modules/termsOfServices/containers/TermsOfServiceEditScreenContainer'));
const TermsOfServicesScreen = React.lazy(() => import('./modules/termsOfServices/containers/TermsOfServicesScreenContainer'));


// screen name (key): [route type (element), path (prop), exact (prop), component (prop), name]
let routes = Map({
  'HomeScreen': ['Route', '/', true, HomeScreen, "Home"],
  'LoginScreen': ['Route', '/login', true, LoginScreen,  "Login"],
  // 'DefaultLayout': ['Route', '/', false, DefaultLayout, "Home"],
  'DashboardScreen': ['PrivateRoute', '/dashboard', true, DashboardScreen, "Dashboard"]
});

if (Config.getIn(['MODULE_TOGGLES', 'userAccount'])) {
  routes = routes.merge({
    'UserAccountScreen': ['PrivateRoute', '/user-account', true, UserAccountScreen, "User Settings"],
  });
}

if (Config.getIn(['MODULE_TOGGLES', 'users'])) {
  routes = routes.merge({
    'UserAddScreen': ['PrivateRoute', '/users/add', true, UserAddScreen, "Add User"],
    'UserEditScreen': ['PrivateRoute', '/users/edit/:id(\\d+)', true, UserEditScreen, "Edit User"],
    'UsersScreen': ['PrivateRoute', '/users/:page(\\d+)?', true, UsersScreen, "Users"],
  });
}

if (Config.getIn(['MODULE_TOGGLES', 'appKeys'])) {
  routes = routes.merge({
    'AppKeyAddScreen': ['PrivateRoute', '/app_keys/add', true, AppKeyAddScreen, "Add App Key"],
    'AppKeyEditScreen': ['PrivateRoute', '/app_keys/edit/:id(\\d+)', true, AppKeyEditScreen, "Edit App Key"],
    'AppKeysScreen': ['PrivateRoute', '/app_keys/:page(\\d+)?', true, AppKeysScreen, "App Keys"],
  });
}

if (Config.getIn(['MODULE_TOGGLES', 'termsOfServices'])) {
  routes = routes.merge({
    'TermsOfServiceAddScreen': ['PrivateRoute', '/terms_of_services/add', true, TermsOfServiceAddScreen, "Add Terms of Service"],
    'TermsOfServiceEditScreen': ['PrivateRoute', '/terms_of_services/edit/:id(\\d+)', true, TermsOfServiceEditScreen, "Edit Terms of Service"],
    'TermsOfServicesScreen': ['PrivateRoute', '/terms_of_services/:page(\\d+)?', true, TermsOfServicesScreen, "Terms of Servicea"],
  });
}

// if multiple languages are supported, use a language path prefix
const routePrefix = Config.get('LANGUAGES') ? `/:lang(${Config.get('LANGUAGES').join('|')})?` : '';
Logger.log('debug', `Routes routePrefix: ${routePrefix}`);

// generate path to screen
export function pathTo(screen, params=null) {
  Logger.log('debug', `pathTo(${screen}, %j)`, params);
  return defaultLang === lang
    ? generatePath(routes.get(screen)[1], params)
    : '/' + lang + generatePath(routes.get(screen)[1], params);
}

export function routesForBreadcrumb() {
  return routes.valueSeq().map((x, i) => { return {path: x[1], exact: x[2], name: x[4], component: x[3]}}).toArray();
}

// define app routing
export function PublicRoutes() {
  Logger.log('debug', `PublicRoutes()`);
  return (
    <Switch>
      {routes.valueSeq().map((x, i) =>
        'PrivateRoute' === x[0]
          ? null
          : <Route key={i} path={routePrefix + x[1]} exact={x[2]} component={x[3]} />)}
      <PrivateRoute key='layout' path='/' component={DefaultLayout} />
      <Route render={() => (<div> Sorry, this page does not exist. </div>)} />
    </Switch>
  )
}

export function PrivateRoutes() {
  Logger.log('debug', `PrivateRoutes()`);
  return (
    <Switch>
      {routes.valueSeq().map((x, i) =>
        'PrivateRoute' === x[0]
          ? <PrivateRoute key={i} path={routePrefix + x[1]} exact={x[2]} component={x[3]} />
          : null)}
      <Route render={() => (<div> Sorry, this page does not exist. </div>)} />
    </Switch>
  )
}

Logger.log('silly', `Routes loaded.`);
