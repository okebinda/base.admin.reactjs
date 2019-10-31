import {connect} from 'react-redux';
import {List} from 'immutable';

import {
  loadAdministrator,
  updateAdministrator,
  createAdministrator,
  deleteAdministrator,
  administratorFormDestroy
} from '../../../../state/administrators/actions';
import {sendMessage} from '../../../../state/actions';
import AdministratorForm from '../components/AdministratorForm';

const inputs = List([
  'username',
  'email',
  'first_name',
  'last_name',
  'roles',
  'joined_at',
  'password',
  'status'
]);

const mapStateToProps = (state, ownProps) => {

  const data = {}, errors = {};
  for (const val of inputs.values()) {
    data[val] = state.entities.getIn(['administrators', ownProps.id, val], '');
    if (state.administrators.getIn(['form', 'errors', val])) {
      errors[val] = state.administrators.getIn(['form', 'errors', val]);
    }
  }

  return {
    isLoading: state.administrators.get('isLoading'),
    isSubmitting: state.administrators.getIn(['form', 'isSubmitting']),
    success: state.administrators.getIn(['form', 'success']),
    created_id: state.administrators.getIn(['form', 'created_id']),
    data: data,
    errors: errors,
    created_at: state.entities.getIn(['administrators', ownProps.id, 'created_at'], null),
    updated_at: state.entities.getIn(['administrators', ownProps.id, 'updated_at'], null)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: (id, cb) => {
      dispatch(loadAdministrator(id, cb));
    },
    update: (id, data, cb) => {
      dispatch(updateAdministrator(id, data, cb));
    },
    create: (data, cb) => {
      dispatch(createAdministrator(data, cb));
    },
    delete: (id, cb) => {
      dispatch(deleteAdministrator(id, cb))
    },
    destroyForm: (formState) => {
      dispatch(administratorFormDestroy(formState));
    },
    sendMessage: (level, title, body, expires) => {
      dispatch(sendMessage(level, title, body, expires));
    }
  }
}

const AdministratorFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdministratorForm);

export default AdministratorFormContainer
