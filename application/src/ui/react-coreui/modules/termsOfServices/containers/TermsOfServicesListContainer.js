import {connect} from 'react-redux';

import {loadTermsOfServices, deleteTermsOfService} from '../../../../../state/termsOfServices/actions'
import TermsOfServicesList from '../components/TermsOfServicesList'

const mapStateToProps = (state, ownProps) => {

  const page = ownProps.page;
  const limit = ownProps.limit;
  const order = ownProps.order;
  const result = state.termsOfServices.getIn(['pages', order, limit, page]);

  return {
    list: result ? result.map(x => state.entities.getIn(['terms_of_services', x])).toArray() : [],
    isLoading: state.termsOfServices.get('isLoading')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: (page, limit, cb) => {
      dispatch(loadTermsOfServices(page, limit, cb));
    },
    delete: (id, cb) => {
      dispatch(deleteTermsOfService(id, cb))
    }
  }
}

const TermsOfServicesListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TermsOfServicesList);

export default TermsOfServicesListContainer;
