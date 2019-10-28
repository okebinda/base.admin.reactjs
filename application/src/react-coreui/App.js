import React, {Component, Suspense} from 'react';
import {Provider} from 'react-redux'

import store from '../state/store';
import {PublicRoutes} from './Routes';
import Logger from '../lib/Logger';
import Loading from './elements/components/Loading';
import SessionTimeoutModal from './modals/containers/SessionTimeoutModalContainer';

import './App.scss';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Suspense fallback={<Loading/>}>
            <PublicRoutes />
            <SessionTimeoutModal />
          </Suspense>
        </div>
      </Provider>
    );
  }
}

export default App;

Logger.log('silly', `App loaded.`);
