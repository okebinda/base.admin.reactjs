import {connect} from 'react-redux';

import TermsOfServicesScreen from '../components/TermsOfServicesScreen';

const mapStateToProps = state => {
  return {
    total: state.termsOfServices.get('total'),
    isLoading: state.termsOfServices.get('isLoading')
  }
}

const TermsOfServicesScreenContainer = connect(
  mapStateToProps
)(TermsOfServicesScreen);

export default TermsOfServicesScreenContainer;
