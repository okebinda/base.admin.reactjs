import {connect} from 'react-redux';
import {List} from 'immutable';

import {loadAppKey, updateAppKey, createAppKey, appKeyFormDestroy} from '../../../../state/appKeys/actions';
import AppKeyForm from '../components/AppKeyForm';

const inputs = List([
  'application',
  'key',
  'status'
]);

const mapStateToProps = (state, ownProps) => {

  const data = {}, errors = {};
  for (const val of inputs.values()) {
    data[val] = state.entities.getIn(['app_keys', ownProps.id, val], '');
    if (state.appKeys.getIn(['form', 'errors', val])) {
      errors[val] = state.appKeys.getIn(['form', 'errors', val]);
    }
  }

  return {
    isLoading: state.appKeys.get('isLoading'),
    isSubmitting: state.appKeys.getIn(['form', 'isSubmitting']),
    success: state.appKeys.getIn(['form', 'success']),
    created_id: state.appKeys.getIn(['form', 'created_id']),
    data: data,
    errors: errors
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
    destroyForm: (formState) => {
      dispatch(appKeyFormDestroy(formState));
    }
  }
}

const AppKeyFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppKeyForm);

export default AppKeyFormContainer
