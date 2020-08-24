import {connect} from 'react-redux';
import {List} from 'immutable';

import {
  loadAppKey,
  updateAppKey,
  createAppKey,
  deleteAppKey,
  appKeyFormDestroy
} from '../../../../../state/modules/appKeys/actions';
import {sendMessage} from '../../../../../state/actions';
import AppKeyForm from '../components/AppKeyForm';

const inputs = List([
  'application',
  'key',
  'status'
]);

const mapStateToProps = (state, ownProps) => {

  const data = {}, errors = {};
  for (const val of inputs.values()) {
    data[val] = state.entities.getIn(['appKeys', ownProps.id, val], '');
    if (state.appKeys.getIn(['form', 'errors', val])) {
      errors[val] = state.appKeys.getIn(['form', 'errors', val]);
    }
  }

  // change select number values to strings to work with ant design select inputs
  Object.keys(data).forEach(x => {
    if (['status'].includes(x)) {
      data[x] = data[x].toString();
    }
  });

  return {
    isLoading: state.appKeys.get('isLoading'),
    isSubmitting: state.appKeys.getIn(['form', 'isSubmitting']),
    success: state.appKeys.getIn(['form', 'success']),
    created_id: state.appKeys.getIn(['form', 'created_id']),
    data: data,
    errors: errors,
    createdAt: state.entities.getIn(['appKeys', ownProps.id, 'created_at'], null),
    updatedAt: state.entities.getIn(['appKeys', ownProps.id, 'updated_at'], null),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: (id, cb) => {
      dispatch(loadAppKey(id, cb));
    },
    update: (id, data, cb) => {
      dispatch(updateAppKey(id, data, cb));
    },
    create: (data, cb) => {
      dispatch(createAppKey(data, cb));
    },
    delete: (id, cb) => {
      dispatch(deleteAppKey(id, cb))
    },
    destroyForm: (formState) => {
      dispatch(appKeyFormDestroy(formState));
    },
    sendMessage: (level, title, body, expires) => {
      dispatch(sendMessage(level, title, body, expires));
    },
  }
}

const AppKeyFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppKeyForm);

export default AppKeyFormContainer;
