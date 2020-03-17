import React, {Component} from 'react';
import {Badge} from 'reactstrap';
import {Translation} from 'react-i18next';

import Logger from '../../../../../lib/Logger';

class ApiBadge extends Component {

  labels = {
    1: "login_api_admin",
    2: "login_api_public"
  };

  colors = {
    1: "primary",
    2: "secondary"
  };

  render() {
    return (
      <Translation>
        {
          (t) => <Badge color={this.colors[this.props.value]}>{t(this.labels[this.props.value])}</Badge>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `ApiBadge.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `ApiBadge.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `ApiBadge.componentWillUnmount()`);
  }
}

export default ApiBadge;

Logger.log('silly', `ApiBadge loaded.`);
