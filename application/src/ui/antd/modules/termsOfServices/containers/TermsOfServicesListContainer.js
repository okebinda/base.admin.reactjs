import {connect} from 'react-redux';
import {denormalize} from 'normalizr';

import {schema} from '../../../../../state/schema';
import {loadTermsOfServices, deleteTermsOfService} from '../../../../../state/modules/termsOfServices/actions';
import {sendMessage} from '../../../../../state/actions';
import TermsOfServicesList from '../components/TermsOfServicesList';

const mapStateToProps = (state, ownProps) => {

  const page = ownProps.page;
  const limit = ownProps.limit;
  const order = ownProps.order;
  const result = state.termsOfServices.getIn(['pages', order, limit, page]);

  return {
    list: result 
      ? result.map(x => {
          return {
            key: x,
            ...denormalize(
              state.entities.getIn(['termsOfServices', x]),
              schema.appKey,
              state.entities.toJS()
            )
          };
        }).toArray()
      : [],
    isLoading: state.termsOfServices.get('isLoading'),
    total: state.termsOfServices.get('total'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: (page, limit, order, cb) => {
      dispatch(loadTermsOfServices(page, limit, order, cb));
    },
    remove: (id, cb) => {
      dispatch(deleteTermsOfService(id, cb));
    },
    sendMessage: (level, title, body, expires) => {
      dispatch(sendMessage(level, title, body, expires));
    },
  }
}

const TermsOfServicesListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TermsOfServicesList);

export default TermsOfServicesListContainer;
