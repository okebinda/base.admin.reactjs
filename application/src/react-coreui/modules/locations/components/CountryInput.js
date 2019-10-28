import React, {Component} from 'react';
import {Translation} from 'react-i18next';
import {FormGroup, FormFeedback, Input, Label,} from 'reactstrap';

import Logger from '../../../../lib/Logger';

class CountryInput extends Component {

  render() {
    return (
      <Translation>
        {
          (t) => 
            <FormGroup>
              <Label for={this.props.field + "Input"}>{t('locations_input_country_title')}</Label>
              <Input 
                type="select"
                value={this.props.value}
                invalid={this.props.feedback ? true : false}
                onChange={(e) => {
                  this.props.onInputChange(this.props.field, e.target.value);
                  this.props.onInputChange(this.props.region_field, '');
                  this.props.loadRegions(this.props.countryIdToCodeMap[e.target.value]);
                }}
                id={this.props.field + "Input"}
              >
                <option value="">{this.props.isLoading
                  ? t('form_input_options_loading') 
                  : t('form_input_options_choose') }</option>
                {this.props.countries.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
              </Input>
              <FormFeedback>{this.props.feedback}</FormFeedback>
            </FormGroup>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `CountryInput.componentDidMount()`);
    if (!this.props.countries.length) {
      this.props.loadCountries();
    }
  }

  componentDidUpdate() {
    Logger.log('silly', `CountryInput.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `CountryInput.componentWillUnmount()`);
  }
}

export default CountryInput;

Logger.log('silly', `CountryInput loaded.`);
