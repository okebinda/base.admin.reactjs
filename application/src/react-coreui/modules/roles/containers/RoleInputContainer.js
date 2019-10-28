import {connect} from 'react-redux';

import {loadRoles} from '../../../../state/roles/actions';
import RoleInput from '../components/RoleInput';

const mapStateToProps = (state) => {

  const rolesToProps = [];
  const rolesFromState = state.entities.get('roles');
  if (rolesFromState) {
    for (const roleId in rolesFromState) {
      rolesToProps.push({
        value: roleId,
        label: rolesFromState[roleId].name
      });
    }
  }
  
  return {
    roles: rolesToProps,
    isLoading: state.roles.get('areRolesLoading')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: (page=1, limit=100, type=null, cb) => {
      dispatch(loadRoles(page, limit, type, cb));
    }
  }
}

const RoleInputtContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleInput);

export default RoleInputtContainer;
