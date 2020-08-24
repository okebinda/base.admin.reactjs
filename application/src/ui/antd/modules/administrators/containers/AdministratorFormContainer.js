import {connect} from 'react-redux';
import {List} from 'immutable';
import moment from 'moment';

import {
  loadAdministrator,
  updateAdministrator,
  createAdministrator,
  deleteAdministrator,
  administratorFormDestroy
} from '../../../../../state/modules/administrators/actions';
import {sendMessage} from '../../../../../state/actions';
import AdministratorForm from '../components/AdministratorForm';
import Config from '../../../../../Config';

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

  // change select number values to strings to work with ant design select inputs
  Object.keys(data).forEach(x => {
    if (['status'].includes(x)) {
      data[x] = data[x].toString();
    }
  });

  data['joined_at'] = data['joined_at']
    ? moment(data['joined_at'], Config.get('API_DATETIME_FORMAT'))
    : moment();

  return {
    isLoading: state.administrators.get('isLoading'),
    isSubmitting: state.administrators.getIn(['form', 'isSubmitting']),
    success: state.administrators.getIn(['form', 'success']),
    created_id: state.administrators.getIn(['form', 'created_id']),
    data: data,
    errors: errors,
    createdAt: state.entities.getIn(['administrators', ownProps.id, 'created_at'], null),
    updatedAt: state.entities.getIn(['administrators', ownProps.id, 'updated_at'], null),
    passwordChangedAt: state.entities.getIn(['administrators', ownProps.id, 'password_changed_at'], null),
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
    remove: (id, cb) => {
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

export default AdministratorFormContainer;
