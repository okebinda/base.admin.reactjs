import React, {Component} from 'react';
import {Badge} from 'reactstrap';
import {Translation} from 'react-i18next';

import Logger from '../../../lib/Logger';

class BooleanBadge extends Component {

  labels = {
    1: "boolean_true",
    2: "boolean_false"
  };

  colors = {
    1: "success",
    2: "danger"
  };

  icons = {
    1: "icons icon-check",
    2: "icons icon-close"
  };

  convert = (b) => {
    return b ? 1 : 2;
  }

  render() {
    return (
      <Translation>
        {
          (t) => 
            <Badge color={this.colors[this.convert(this.props.value)]}>
              <i className={this.icons[this.convert(this.props.value)]}></i>{' '}
              {t(this.labels[this.convert(this.props.value)])}
            </Badge>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `BooleanBadge.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `BooleanBadge.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `BooleanBadge.componentWillUnmount()`);
  }
}

export default BooleanBadge;

Logger.log('silly', `BooleanBadge loaded.`);
