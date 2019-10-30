import {connect} from 'react-redux';
import {List} from 'immutable';

import {loadRole, updateRole, createRole, roleFormDestroy} from '../../../../state/roles/actions';
import RoleForm from '../components/RoleForm';

const inputs = List([
  'name',
  'login_lockout_policy',
  'login_max_attempts',
  'login_timeframe',
  'login_ban_time',
  'login_ban_by_ip',
  'password_policy',
  'password_reuse_history',
  'password_reset_days',
  'is_admin_role',
  'priority'
]);

const mapStateToProps = (state, ownProps) => {

  const data = {}, errors = {};
  for (const val of inputs.values()) {
    data[val] = state.entities.getIn(['roles', ownProps.id, val], '');
    if (state.roles.getIn(['form', 'errors', val])) {
      errors[val] = state.roles.getIn(['form', 'errors', val]);
    }
  }

  return {
    isLoading: state.roles.get('areRolesLoading'),
    isSubmitting: state.roles.getIn(['form', 'isSubmitting']),
    success: state.roles.getIn(['form', 'success']),
    created_id: state.roles.getIn(['form', 'created_id']),
    data: data,
    errors: errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: (id, cb) => {
      dispatch(loadRole(id, cb));
    },
    update: (id, data, cb) => {
      dispatch(updateRole(id, data, cb));
    },
    create: (data, cb) => {
      dispatch(createRole(data, cb));
    },
    destroyForm: (formState) => {
      dispatch(roleFormDestroy(formState));
    }
  }
}

const RoleFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleForm);

export default RoleFormContainer
