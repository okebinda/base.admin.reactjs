import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Translation} from 'react-i18next';

import Logger from '../../../lib/Logger';
import {pathTo} from '../../Routes';

class Logo extends Component {

  render() {
    return (
      <Translation>
        {
          (t) => 
            <div className="logo"><Link to={pathTo('HomeScreen')}>{t('app_name')}</Link></div>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `Logo.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `Logo.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `Logo.componentWillUnmount()`);
  }
}

export default Logo;

Logger.log('silly', `Logo loaded.`);
