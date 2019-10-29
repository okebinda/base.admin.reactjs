import React, {Component, Suspense} from 'react';
import {Provider} from 'react-redux'

import Config from '../Config';
import store from '../state/store';
import {DefaultRoutes} from './Routes';
import Logger from '../lib/Logger';
import Loading from './elements/components/Loading';
import SessionTimeoutModal from './modals/containers/SessionTimeoutModalContainer';

import './App.scss';

// register modules
Config.get('MODULE_TOGGLES').keySeq().forEach(k => {
  if (Config.getIn(['MODULE_TOGGLES', k, 'enabled'])) {
    try {
      let register = require(`./modules/${k}/register.js`).default;
      register();
    } catch(ex) {}
  }
});

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Suspense fallback={<Loading/>}>
            <DefaultRoutes />
            <SessionTimeoutModal />
          </Suspense>
        </div>
      </Provider>
    );
  }
}

export default App;

Logger.log('silly', `App loaded.`);
