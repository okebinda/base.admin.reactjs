import {connect} from 'react-redux';

import {loadRoles, deleteRole} from '../../../../../state/roles/actions'
import RolesList from '../components/RolesList'

const mapStateToProps = (state, ownProps) => {

  const page = ownProps.page;
  const limit = ownProps.limit;
  const order = ownProps.order;
  const result = state.roles.getIn(['pages', order, limit, page]);

  return {
    list: result ? result.map(x => state.entities.getIn(['roles', x])).toArray() : [],
    isLoading: state.roles.get('areRolesLoading')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: (page, limit, type, cb) => {
      dispatch(loadRoles(page, limit, type, cb));
    },
    delete: (id, cb) => {
      dispatch(deleteRole(id, cb))
    }
  }
}

const RolesListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RolesList);

export default RolesListContainer;
