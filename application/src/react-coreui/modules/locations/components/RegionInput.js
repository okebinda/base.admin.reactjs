import React, {Component} from 'react';
import {Translation} from 'react-i18next';
import {FormGroup, FormFeedback, Input, Label,} from 'reactstrap';

import Logger from '../../../../lib/Logger';

class RegionInput extends Component {

  render() {

    const regions = this.props.country_id
      ? this.props.regions
        .filter(x => x.country === this.props.countries[this.props.country_id])
      : null;

    return (
      <Translation>
        {
          (t) => 
            <FormGroup>
              <Label for={this.props.field + "Input"}>{t('locations_input_region_title')}</Label>
              <Input 
                type="select"
                value={this.props.value}
                disabled={regions && regions.length > 0 ? false : true}
                invalid={this.props.feedback ? true : false}
                onChange={(e) => this.props.onInputChange(this.props.field, e.target.value)}
                id={this.props.field + "Input"}
              >
                <option value="">{this.props.isLoading 
                  ? t('form_input_options_loading') 
                  : (regions && regions.length > 0 
                    ? t('form_input_options_choose') 
                    : t('form_input_options_none')) }</option>
                {regions
                  ? regions.map(i => <option key={i.value} value={i.value}>{i.label}</option>)
                  : null}
              </Input>
              <FormFeedback>{this.props.feedback}</FormFeedback>
            </FormGroup>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `RegionInput.componentDidMount()`);
  }

  componentDidUpdate(prevProps) {
    Logger.log('silly', `RegionInput.componentDidUpdate()`);
    if (this.props.country_id && this.props.country_id !== prevProps.country_id) {
      this.props.loadRegions('US');
    }
  }

  componentWillUnmount() {
    Logger.log('silly', `RegionInput.componentWillUnmount()`);
  }
}

export default RegionInput;

Logger.log('silly', `RegionInput loaded.`);
