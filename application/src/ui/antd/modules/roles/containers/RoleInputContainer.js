import {connect} from 'react-redux';

import {loadRoles} from '../../../../../state/modules/roles/actions';
import RoleInput from '../components/RoleInput';

const mapStateToProps = (state, ownProps) => {

  const rolesToProps = [];
  const rolesFromState = state.entities.get('roles');
  if (rolesFromState) {
    for (const roleId in rolesFromState) {
      if (('user' === ownProps.type && !rolesFromState[roleId].is_admin_role)
          || ('admin' === ownProps.type && rolesFromState[roleId].is_admin_role))
      {
        rolesToProps.push({
          value: parseInt(roleId),
          label: rolesFromState[roleId].name
        });
      }
    }
  }
  
  return {
    roles: rolesToProps,
    isLoading: state.roles.get('areRolesLoading'),
    isSubmitting: state.roles.getIn(['form', 'isSubmitting']),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: (page=1, limit=100, type=null, cb) => {
      dispatch(loadRoles(page, limit, type, cb));
    }
  }
}

const RoleInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleInput);

export default RoleInputContainer;
