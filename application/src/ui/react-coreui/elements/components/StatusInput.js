import React, {Component} from 'react';
import {FormGroup, FormFeedback, Input, Label,} from 'reactstrap';
import {Translation} from 'react-i18next';

import Logger from '../../../../lib/Logger';

class StatusInput extends Component {

  statuses = {
    1: "status_enabled",
    2: "status_disabled",
    3: "status_archived",
    4: "status_deleted",
    5: "status_pending"
  };

  render() {
    return (
      <Translation>
        {
          (t) => 
            <FormGroup>
              <Label for={this.props.field + "Input"}>{t('form_input_status')}</Label>
              <Input 
                type="select"
                value={this.props.value}
                invalid={this.props.feedback ? true : false}
                onChange={(e) => this.props.onInputChange(this.props.field, e.target.value)}
                id={this.props.field + "Input"}
              >
                {Object.keys(this.statuses).map((key, index) =>
                  <option key={key} value={key}>{t(this.statuses[key])}</option>
                )}
              </Input>
              <FormFeedback>{this.props.feedback}</FormFeedback>
            </FormGroup>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `StatusInput.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `StatusInput.componentDidUpdate()`);
    if (!this.props.value) {
      this.props.onInputChange(this.props.field, 1);
    }
  }

  componentWillUnmount() {
    Logger.log('silly', `StatusInput.componentWillUnmount()`);
  }
}

export default StatusInput;

Logger.log('silly', `StatusInput loaded.`);
