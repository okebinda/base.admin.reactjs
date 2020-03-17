import React, {Component} from 'react';
import {Badge} from 'reactstrap';
import {Translation} from 'react-i18next';

import Logger from '../../../../lib/Logger';

class StatusBadge extends Component {

  labels = {
    1: "status_enabled",
    2: "status_disabled",
    3: "status_archived",
    4: "status_deleted",
    5: "status_pending"
  };

  colors = {
    1: "success",
    2: "secondary",
    3: "warning",
    4: "danger",
    5: "info"
  };

  render() {
    return (
      <Translation>
        {
          (t) => <Badge color={this.colors[this.props.status]}>{t(this.labels[this.props.status])}</Badge>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `StatusBadge.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `StatusBadge.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `StatusBadge.componentWillUnmount()`);
  }
}

export default StatusBadge;

Logger.log('silly', `StatusBadge loaded.`);
