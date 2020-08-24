import {connect} from 'react-redux';
import {denormalize} from 'normalizr';

import {schema} from '../../../../../state/schema';
import {loadUsers, deleteUser} from '../../../../../state/modules/users/actions';
import {sendMessage} from '../../../../../state/actions';
import UsersList from '../components/UsersList';

const mapStateToProps = (state, ownProps) => {

  const page = ownProps.page;
  const limit = ownProps.limit;
  const order = ownProps.order;
  const result = state.users.getIn(['pages', order, limit, page]);

  return {
    list: result 
      ? result.map(x => {
          return {
            key: x,
            ...denormalize(
              state.entities.getIn(['users', x]),
              schema.user,
              state.entities.toJS()
            )
          };
        }).toArray()
      : [],
    isLoading: state.users.get('isLoading'),
    total: state.users.get('total'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: (page, limit, order, cb) => {
      dispatch(loadUsers(page, limit, order, cb));
    },
    remove: (id, cb) => {
      dispatch(deleteUser(id, cb));
    },
    sendMessage: (level, title, body, expires) => {
      dispatch(sendMessage(level, title, body, expires));
    },
  }
}

const UsersListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);

export default UsersListContainer;
