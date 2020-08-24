import {connect} from 'react-redux';
import {List} from 'immutable';

import {
  loadRole,
  updateRole,
  createRole,
  deleteRole,
  roleFormDestroy
} from '../../../../../state/modules/roles/actions';
import {sendMessage} from '../../../../../state/actions';
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
  'priority',
]);

const mapStateToProps = (state, ownProps) => {

  const data = {}, errors = {};
  for (const val of inputs.values()) {
    data[val] = state.entities.getIn(['roles', ownProps.id, val], '');
    if (state.roles.getIn(['form', 'errors', val])) {
      errors[val] = state.roles.getIn(['form', 'errors', val]);
    }
  }

  // change select number values to strings to work with ant design select inputs
  Object.keys(data).forEach(x => {
    if (['status'].includes(x)) {
      data[x] = data[x].toString();
    }
  });

  return {
    isLoading: state.roles.get('areRolesLoading'),
    isSubmitting: state.roles.getIn(['form', 'isSubmitting']),
    success: state.roles.getIn(['form', 'success']),
    created_id: state.roles.getIn(['form', 'created_id']),
    data: data,
    errors: errors,
    createdAt: state.entities.getIn(['roles', ownProps.id, 'created_at'], null),
    updatedAt: state.entities.getIn(['roles', ownProps.id, 'updated_at'], null)
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
    remove: (id, cb) => {
      dispatch(deleteRole(id, cb))
    },
    destroyForm: (formState) => {
      dispatch(roleFormDestroy(formState));
    },
    sendMessage: (level, title, body, expires) => {
      dispatch(sendMessage(level, title, body, expires));
    },
  }
}

const RoleFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleForm);

export default RoleFormContainer;
