import {connect} from 'react-redux';

import AdministratorEditScreen from '../components/AdministratorEditScreen'

const mapStateToProps = state => {
  return {
    isLoading: state.administrators.get('isLoading'),
    success: state.administrators.getIn(['form', 'success']),
  }
}

const AdministratorEditScreenContainer = connect(
  mapStateToProps
)(AdministratorEditScreen)

export default AdministratorEditScreenContainer
