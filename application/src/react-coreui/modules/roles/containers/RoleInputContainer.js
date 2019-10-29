import {connect} from 'react-redux';

import {loadRoles} from '../../../../state/roles/actions';
import RoleInput from '../components/RoleInput';

const mapStateToProps = (state, ownProps) => {

  console.log("TESTING", ownProps);

  const rolesToProps = [];
  const rolesFromState = state.entities.get('roles');
  if (rolesFromState) {
    for (const roleId in rolesFromState) {
      if (('user' === ownProps.type && !rolesFromState[roleId].is_admin_role)
          || ('admin' === ownProps.type && rolesFromState[roleId].is_admin_role))
      {
        rolesToProps.push({
          value: roleId,
          label: rolesFromState[roleId].name
        });
      }
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
