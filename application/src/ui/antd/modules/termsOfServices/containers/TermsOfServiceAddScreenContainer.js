import {connect} from 'react-redux';

import TermsOfServiceAddScreen from '../components/TermsOfServiceAddScreen';

const mapStateToProps = state => {
  return {
    isLoading: state.termsOfServices.get('isLoading'),
    success: state.termsOfServices.getIn(['form', 'success']),
  }
}

const TermsOfServiceAddScreenContainer = connect(
  mapStateToProps
)(TermsOfServiceAddScreen);

export default TermsOfServiceAddScreenContainer;
