import {connect} from 'react-redux';

import RoleAddScreen from '../components/RoleAddScreen';

const mapStateToProps = state => {
  return {
    areRolesLoading: state.roles.get('areRolesLoading'),
    success: state.roles.getIn(['form', 'success']),
  }
}

const RoleAddScreenContainer = connect(
  mapStateToProps
)(RoleAddScreen);

export default RoleAddScreenContainer;
