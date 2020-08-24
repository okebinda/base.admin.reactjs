import {connect} from 'react-redux';
import {List} from 'immutable';
import moment from 'moment';

import {
  loadTermsOfService,
  updateTermsOfService,
  createTermsOfService,
  deleteTermsOfService,
  termsOfServiceFormDestroy
} from '../../../../../state/modules/termsOfServices/actions';
import {sendMessage} from '../../../../../state/actions';
import TermsOfServiceForm from '../components/TermsOfServiceForm';
import Config from '../../../../../Config';

const inputs = List([
  'text',
  'version',
  'publish_date',
  'status'
]);

const mapStateToProps = (state, ownProps) => {

  const data = {}, errors = {};
  for (const val of inputs.values()) {
    data[val] = state.entities.getIn(['termsOfServices', ownProps.id, val], '');
    if (state.termsOfServices.getIn(['form', 'errors', val])) {
      errors[val] = state.termsOfServices.getIn(['form', 'errors', val]);
    }
  }

  // change select number values to strings to work with ant design select inputs
  Object.keys(data).forEach(x => {
    if (['status'].includes(x)) {
      data[x] = data[x].toString();
    }
  });

  data['publish_date'] = data['publish_date']
    ? moment(data['publish_date'], Config.get('API_DATETIME_FORMAT'))
    : moment();

  return {
    isLoading: state.termsOfServices.get('isLoading'),
    isSubmitting: state.termsOfServices.getIn(['form', 'isSubmitting']),
    success: state.termsOfServices.getIn(['form', 'success']),
    created_id: state.termsOfServices.getIn(['form', 'created_id']),
    data: data,
    errors: errors,
    createdAt: state.entities.getIn(['termsOfServices', ownProps.id, 'created_at'], null),
    updatedAt: state.entities.getIn(['termsOfServices', ownProps.id, 'updated_at'], null),
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
    delete: (id, cb) => {
      dispatch(deleteTermsOfService(id, cb))
    },
    destroyForm: (formState) => {
      dispatch(termsOfServiceFormDestroy(formState));
    },
    sendMessage: (level, title, body, expires) => {
      dispatch(sendMessage(level, title, body, expires));
    },
  }
}

const TermsOfServiceFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TermsOfServiceForm);

export default TermsOfServiceFormContainer;
