import {connect} from 'react-redux';
import {List} from 'immutable';
import moment from 'moment';

import {
  loadUser,
  updateUser,
  createUser,
  deleteUser,
  userFormDestroy
} from '../../../../../state/modules/users/actions';
import {sendMessage} from '../../../../../state/actions';
import UserForm from '../components/UserForm';
import Config from '../../../../../Config';

const inputs = List([
  'username',
  'email',
  'roles',
  'is_verified',
  'password',
  'status',
  'first_name',
  'last_name',
  'joined_at',
]);

const mapStateToProps = (state, ownProps) => {

  const data = {}, errors = {};
  for (const val of inputs.values()) {
    data[val] = state.entities.getIn(['users', ownProps.id, val], '');
    if (state.users.getIn(['form', 'errors', val])) {
      errors[val] = state.users.getIn(['form', 'errors', val]);
    }
  }

  // change select number values to strings to work with ant design select inputs
  Object.keys(data).forEach(x => {
    if (['status'].includes(x)) {
      data[x] = data[x].toString();
    }
  });

  data['joined_at'] = data['joined_at']
    ? moment(data['joined_at'], Config.get('API_DATETIME_FORMAT'))
    : moment();

  data['password_changed_at'] = data['password_changed_at']
    ? moment(data['password_changed_at'], Config.get('API_DATETIME_FORMAT'))
    : moment();

  return {
    isLoading: state.users.get('isLoading'),
    isSubmitting: state.users.getIn(['form', 'isSubmitting']),
    success: state.users.getIn(['form', 'success']),
    created_id: state.users.getIn(['form', 'created_id']),
    data: data,
    errors: errors,
    createdAt: state.entities.getIn(['users', ownProps.id, 'created_at'], null),
    updatedAt: state.entities.getIn(['users', ownProps.id, 'updated_at'], null),
    passwordChangedAt: state.entities.getIn(['users', ownProps.id, 'password_changed_at'], null),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: (id, cb) => {
      dispatch(loadUser(id, cb));
    },
    update: (id, data, cb) => {
      dispatch(updateUser(id, data, cb));
    },
    create: (data, cb) => {
      dispatch(createUser(data, cb));
    },
    remove: (id, cb) => {
      dispatch(deleteUser(id, cb))
    },
    destroyForm: (formState) => {
      dispatch(userFormDestroy(formState));
    },
    sendMessage: (level, title, body, expires) => {
      dispatch(sendMessage(level, title, body, expires));
    }
  }
}

const UserFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);

export default UserFormContainer;
