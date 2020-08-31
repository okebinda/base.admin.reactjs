import {connect} from 'react-redux';
import {denormalize} from 'normalizr';

import {schema} from '../../../../../state/schema';
import {loadLogins} from '../../../../../state/modules/logins/actions';
import LoginsList from '../components/LoginsList';

const mapStateToProps = (state, ownProps) => {

  const page = ownProps.page;
  const limit = ownProps.limit;
  const order = ownProps.order;
  const result = state.logins.getIn(['pages', order, limit, page]);

  return {
    list: result 
      ? result.map(x => {
          return {
            key: x,
            ...denormalize(
              state.entities.getIn(['logins', x]),
              schema.login,
              state.entities.toJS()
            )
          };
        }).toArray()
      : [],
    isLoading: state.logins.get('isLoading'),
    total: state.logins.get('total'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: (page, limit, order, filter, cb) => {
      dispatch(loadLogins(page, limit, order, filter, cb));
    }
  }
}

const LoginsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginsList);

export default LoginsListContainer;
