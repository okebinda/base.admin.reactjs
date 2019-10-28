import React, {Component} from 'react';
import {Translation} from 'react-i18next';

import Logger from '../../../lib/Logger';

class Loading extends Component {

  render() {
    return (
      <Translation>
        {
          (t) => <div className="animated fadeIn pt-1 text-center">{t('feedback_loading')}</div>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `Loading.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `Loading.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `Loading.componentWillUnmount()`);
  }
}

export default Loading;

Logger.log('silly', `Loading loaded.`);
