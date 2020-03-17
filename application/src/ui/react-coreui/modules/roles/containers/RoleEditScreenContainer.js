import {connect} from 'react-redux';

import RoleEditScreen from '../components/RoleEditScreen'

const mapStateToProps = state => {
  return {
    isLoading: state.roles.get('areRolesLoading'),
    success: state.roles.getIn(['form', 'success']),
  }
}

const RoleEditScreenContainer = connect(
  mapStateToProps
)(RoleEditScreen)

export default RoleEditScreenContainer
