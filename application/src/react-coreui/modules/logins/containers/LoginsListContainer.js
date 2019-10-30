import {connect} from 'react-redux';

import {loadLogins} from '../../../../state/logins/actions'
import LoginsList from '../components/LoginsList'

const mapStateToProps = (state, ownProps) => {

  const page = ownProps.page;
  const limit = ownProps.limit;
  const order = ownProps.order;
  const result = state.logins.getIn(['pages', order, limit, page]);

  return {
    list: result ? result.map(x => state.entities.getIn(['logins', x])).toArray() : [],
    isLoading: state.roles.get('isLoading')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: (page, limit, cb) => {
      dispatch(loadLogins(page, limit, cb));
    }
  }
}

const LoginsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginsList);

export default LoginsListContainer;
