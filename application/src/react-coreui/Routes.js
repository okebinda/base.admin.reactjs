import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {generatePath} from "react-router";
import {Map} from 'immutable';

import Logger from '../lib/Logger';
import Events from '../lib/EventEmitter';
import PrivateRoute from './elements/containers/PrivateRouteContainer';
import Config from '../Config';
import {lang, defaultLang} from '../lib/Localization';

// layouts
const DefaultLayout = React.lazy(() => import('./layouts/DefaultLayout'));

// public screens
const HomeScreen = React.lazy(() => import('./screens/HomeScreen'));
const LoginScreen = React.lazy(() => import('./modules/session/components/LoginScreen'));


// screen name (key): [route type (element), path (prop), exact (prop), component (prop), name]
let defaultRoutes = Map({

  // home screen exact match should use its own layout
  'HomeScreen': ['Route', "/", true, HomeScreen],

  // login screen has its own layout
  'LoginScreen': ['Route', "/login", false, LoginScreen],

  // all other logged in screens share default layout
  'DefaultLayout': ['PrivateRoute', "/", false, DefaultLayout]
});


// routes that use the default layout
let mainRoutes = Map();

// merge all routes for generating paths
let routes = defaultRoutes.merge(mainRoutes);

Events.subscribe('ADD_MAIN_ROUTES', (data) => {
  mainRoutes = mainRoutes.merge(data);
  routes = defaultRoutes.merge(mainRoutes);
});

// if multiple languages are supported, use a language path prefix
const routePrefix = Config.get('LANGUAGES') ? `/:lang(${Config.get('LANGUAGES').join('|')})?` : '';
Logger.log('debug', `Routes routePrefix: ${routePrefix}`);

export {routes};

// test for existence of route
export function hasRoute(screen){
  Logger.log('debug', `hasRoute(${screen})`);
  if (routes.has(screen)) {
    return true;
  }
}

// generate path to screen
export function pathTo(screen, params=null) {
  Logger.log('debug', `pathTo(${screen}, %j)`, params);
  return defaultLang === lang
    ? generatePath(routes.get(screen)[1], params)
    : '/' + lang + generatePath(routes.get(screen)[1], params);
}

export function routesForBreadcrumb() {
  return mainRoutes.valueSeq().map((x, i) => { return {path: x[1], exact: x[2], name: x[4], component: x[3]}}).toArray();
}

// define app routing
export function DefaultRoutes() {
  Logger.log('debug', `DefaultRoutes()`);
  return (
    <Switch>
      {defaultRoutes.valueSeq().map((x, i) =>
        'PrivateRoute' === x[0]
          ? <PrivateRoute key={i} path={routePrefix + x[1]} exact={x[2]} component={x[3]} />
          : <Route key={i} path={routePrefix + x[1]} exact={x[2]} component={x[3]} />)}
      <Route render={() => (<div> Sorry, this page does not exist. </div>)} />
    </Switch>
  )
}

export function MainRoutes() {
  Logger.log('debug', `MainRoutes()`);
  return (
    <Switch>
      {mainRoutes.valueSeq().map((x, i) =>
        'PrivateRoute' === x[0]
          ? <PrivateRoute key={i} path={routePrefix + x[1]} exact={x[2]} component={x[3]} />
          : <Route key={i} path={routePrefix + x[1]} exact={x[2]} component={x[3]} />)}
      <Route render={() => (<div> Sorry, this page does not exist. </div>)} />
    </Switch>
  )
}

Logger.log('silly', `Routes loaded.`);
