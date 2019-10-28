import {connect} from 'react-redux';
import {List} from 'immutable';

import {loadTermsOfService, updateTermsOfService, createTermsOfService, termsOfServiceFormDestroy} from '../../../../state/termsOfServices/actions';
import TermsOfServiceForm from '../components/TermsOfServiceForm';

const inputs = List([
  'text',
  'version',
  'publish_date',
  'status'
]);

const mapStateToProps = (state, ownProps) => {

  const data = {}, errors = {};
  for (const val of inputs.values()) {
    data[val] = state.entities.getIn(['terms_of_services', ownProps.id, val], '');
    if (state.termsOfServices.getIn(['form', 'errors', val])) {
      errors[val] = state.termsOfServices.getIn(['form', 'errors', val]);
    }
  }

  return {
    isLoading: state.termsOfServices.get('isLoading'),
    isSubmitting: state.termsOfServices.getIn(['form', 'isSubmitting']),
    success: state.termsOfServices.getIn(['form', 'success']),
    created_id: state.termsOfServices.getIn(['form', 'created_id']),
    data: data,
    errors: errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: (id, cb) => {
      dispatch(loadTermsOfService(id, cb));
    },
    update: (id, data, cb) => {
      dispatch(updateTermsOfService(id, data, cb));
    },
    create: (data, cb) => {
      dispatch(createTermsOfService(data, cb));
    },
    destroyForm: (formState) => {
      dispatch(termsOfServiceFormDestroy(formState));
    }
  }
}

const TermsOfServiceFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TermsOfServiceForm);

export default TermsOfServiceFormContainer
