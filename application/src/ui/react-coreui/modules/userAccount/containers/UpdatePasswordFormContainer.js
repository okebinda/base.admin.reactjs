import {connect} from 'react-redux';
import {List} from 'immutable';

import {updatePassword, passwordFormDestroy} from '../../../../../state/userAccount/actions';
import {sendMessage} from '../../../../../state/actions';
import UpdatePasswordForm from '../components/UpdatePasswordForm';

const inputs = List([
  'previous_password',
  'password1',
  'password2'
]);

const mapStateToProps = (state) => {

  const data = {}, errors = {};
  for (const val of inputs.values()) {
    data[val] = '';
    if (state.userAccount.getIn(['passwordForm', 'errors', val])) {
      errors[val] = state.userAccount.getIn(['passwordForm', 'errors', val]);
    }
  }
  
  return {
    isLoading: state.userAccount.get('isPasswordLoading'),
    success: state.userAccount.getIn(['passwordForm', 'success']),
    data: data,
    errors: errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: (data, cb) => {
      dispatch(updatePassword(data, cb));
    },
    destroyForm: (formState) => {
      dispatch(passwordFormDestroy(formState));
    },
    sendMessage: (level, title, body, expires) => {
      dispatch(sendMessage(level, title, body, expires));
    }
  }
}

const UpdatePasswordFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePasswordForm);

export default UpdatePasswordFormContainer
