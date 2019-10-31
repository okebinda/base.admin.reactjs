import {connect} from 'react-redux';
import {List} from 'immutable';

import {
  loadUser,
  updateUser,
  createUser,
  deleteUser,
  userFormDestroy
} from '../../../../state/users/actions';
import {sendMessage} from '../../../../state/actions';
import UserForm from '../components/UserForm';

const inputs = List([
  'username',
  'email',
  'roles',
  'is_verified',
  'first_name',
  'last_name',
  'joined_at',
  'password',
  'status'
]);

const mapStateToProps = (state, ownProps) => {

  const data = {}, errors = {};
  for (const val of inputs.values()) {
    data[val] = state.entities.getIn(['users', ownProps.id, val], '');
    if (state.users.getIn(['form', 'errors', val])) {
      errors[val] = state.users.getIn(['form', 'errors', val]);
    }
    if (state.users.getIn(['form', 'errors', 'profile', val])) {
      errors[val] = state.users.getIn(['form', 'errors', 'profile', val]);
    }
  }

  return {
    isLoading: state.users.get('isLoading'),
    isSubmitting: state.users.getIn(['form', 'isSubmitting']),
    success: state.users.getIn(['form', 'success']),
    created_id: state.users.getIn(['form', 'created_id']),
    data: data,
    errors: errors,
    created_at: state.entities.getIn(['users', ownProps.id, 'created_at'], null),
    updated_at: state.entities.getIn(['users', ownProps.id, 'updated_at'], null)
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
    delete: (id, cb) => {
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

export default UserFormContainer
