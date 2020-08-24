import {connect} from 'react-redux';

import TermsOfServiceEditScreen from '../components/TermsOfServiceEditScreen';

const mapStateToProps = state => {
  return {
    isLoading: state.termsOfServices.get('isLoading'),
    success: state.termsOfServices.getIn(['form', 'success']),
  }
}

const TermsOfServiceEditScreenContainer = connect(
  mapStateToProps
)(TermsOfServiceEditScreen);

export default TermsOfServiceEditScreenContainer;
