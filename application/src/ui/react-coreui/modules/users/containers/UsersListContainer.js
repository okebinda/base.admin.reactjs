import {connect} from 'react-redux';

import {loadUsers, deleteUser} from '../../../../../state/users/actions'
import UsersList from '../components/UsersList'

const mapStateToProps = (state, ownProps) => {

  const page = ownProps.page;
  const limit = ownProps.limit;
  const order = ownProps.order;
  const result = state.users.getIn(['pages', order, limit, page]);

  return {
    list: result ? result.map(x => state.entities.getIn(['users', x])).toArray() : [],
    isLoading: state.users.get('isLoading')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: (page, limit, cb) => {
      dispatch(loadUsers(page, limit, cb));
    },
    delete: (id, cb) => {
      dispatch(deleteUser(id, cb))
    }
  }
}

const UsersListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);

export default UsersListContainer;
