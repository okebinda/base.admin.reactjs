import {connect} from 'react-redux';
import {List} from 'immutable';

import {
  loadAdministrator,
  updateAdministrator,
  createAdministrator,
  administratorFormDestroy
} from '../../../../state/administrators/actions';
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
    errors: errors
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
    destroyForm: (formState) => {
      dispatch(administratorFormDestroy(formState));
    }
  }
}

const AdministratorFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdministratorForm);

export default AdministratorFormContainer
