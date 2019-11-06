import React, {Component} from 'react';
import {Translation} from 'react-i18next';
import {CustomInput, FormGroup, FormFeedback, Label,} from 'reactstrap';

import Logger from '../../../../lib/Logger';

class RoleInput extends Component {

  onChange = (e) => {
    const value = parseInt(e.target.value);
    const newValues = this.props.values ? this.props.values.slice(0) : [];
    if (this.props.values ? this.props.values.includes(parseInt(value)) : false) {
      var index = newValues.indexOf(parseInt(value));
      if (index !== -1) newValues.splice(index, 1);
    } else {
      newValues.push(parseInt(value))
    }
    this.props.onInputChange(this.props.field, newValues);
  }

  render() {
    return (
      <Translation>
        {
          (t) => 
            <FormGroup>
              <Label for={this.props.field + "Input"}>{t('roles_input_role_title')}</Label>
              <div>
                {this.props.isLoading ? t('feedback_loading') : null}
                {this.props.roles.map(i => 
                  <CustomInput
                    type="checkbox"
                    key={i.value}
                    name={this.props.field + "[]"}
                    id={this.props.field + "_" + i.value}
                    value={i.value}
                    label={i.label}
                    invalid={this.props.feedback ? true : false}
                    checked={this.props.values ? this.props.values.includes(parseInt(i.value)) : false}
                    onChange={this.onChange}
                  />)}
              </div>
              <FormFeedback>{this.props.feedback}</FormFeedback>
            </FormGroup>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `RoleInput.componentDidMount()`);
    if (!this.props.roles.length) {
      this.props.load(1, 100, this.props.type);
    }
  }

  componentDidUpdate() {
    Logger.log('silly', `RoleInput.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `RoleInput.componentWillUnmount()`);
  }
}

export default RoleInput;

Logger.log('silly', `RoleInput loaded.`);
