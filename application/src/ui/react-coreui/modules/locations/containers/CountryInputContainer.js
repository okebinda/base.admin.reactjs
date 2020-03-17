import {connect} from 'react-redux';

import {loadCountries, loadRegions} from '../../../../state/locations/actions';
import CountryInput from '../components/CountryInput';

const mapStateToProps = (state) => {

  const countriesToProps = [], countryIdToCodeMap = {};
  const countriesFromState = state.entities.get('countries');
  if (countriesFromState) {
    for (const countryId in countriesFromState) {
      countriesToProps.push({
        value: countryId,
        code: countriesFromState[countryId].code_2,
        label: countriesFromState[countryId].name
      });
      countryIdToCodeMap[countryId] = countriesFromState[countryId].code_2
    }
  }
  
  return {
    countries: countriesToProps,
    countryIdToCodeMap: countryIdToCodeMap,
    isLoading: state.locations.get('areCountriesLoading')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCountries: (page=1, limit=250, cb) => {
      dispatch(loadCountries(page, limit, cb));
    },
    loadRegions: (countryCode, page=1, limit=100, cb) => {
      dispatch(loadRegions(countryCode, page, limit, cb));
    }
  }
}

const CountryInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryInput);

export default CountryInputContainer;
