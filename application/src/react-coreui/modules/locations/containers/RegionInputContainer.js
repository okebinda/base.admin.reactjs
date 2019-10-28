import {connect} from 'react-redux';

import {loadRegions} from '../../../../state/locations/actions';
import RegionInput from '../components/RegionInput';


const mapStateToProps = (state) => {

  const regionsToProps = [];
  const regionsFromState = state.entities.get('regions');
  if (regionsFromState) {
    for (const regionId in regionsFromState) {
      regionsToProps.push({
        value: regionId,
        country: regionsFromState[regionId].country,
        label: regionsFromState[regionId].name
      });
    }
  }

  const countryIdToCodeMap = {};
  const countriesFromState = state.entities.get('countries');
  if (countriesFromState) {
    for (const countryId in countriesFromState) {
      countryIdToCodeMap[countryId] = countriesFromState[countryId].code_2
    }
  }
  
  return {
    regions: regionsToProps,
    countries: countryIdToCodeMap,
    isLoading: state.locations.get('areRegionsLoading')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadRegions: (countryCode, page=1, limit=100, cb) => {
      dispatch(loadRegions(countryCode, page, limit, cb));
    }
  }
}

const RegionInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionInput);

export default RegionInputContainer
