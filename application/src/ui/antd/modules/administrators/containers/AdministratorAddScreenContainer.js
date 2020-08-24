import {connect} from 'react-redux';

import AdministratorAddScreen from '../components/AdministratorAddScreen';

const mapStateToProps = state => {
  return {
    isLoading: state.administrators.get('isLoading'),
    success: state.administrators.getIn(['form', 'success']),
  }
}

const AdministratorAddScreenContainer = connect(
  mapStateToProps
)(AdministratorAddScreen);

export default AdministratorAddScreenContainer;
