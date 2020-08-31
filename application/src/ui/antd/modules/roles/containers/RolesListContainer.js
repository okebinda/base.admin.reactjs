import {connect} from 'react-redux';
import {denormalize} from 'normalizr';

import {schema} from '../../../../../state/schema';
import {loadRoles, deleteRole} from '../../../../../state/modules/roles/actions';
import {sendMessage} from '../../../../../state/actions';
import RolesList from '../components/RolesList';

const mapStateToProps = (state, ownProps) => {

  const page = ownProps.page;
  const limit = ownProps.limit;
  const order = ownProps.order;
  const result = state.roles.getIn(['pages', order, limit, page]);

  return {
    list: result 
      ? result.map(x => {
          return {
            key: x,
            ...denormalize(
              state.entities.getIn(['roles', x]),
              schema.role,
              state.entities.toJS()
            )
          };
        }).toArray()
      : [],
    isLoading: state.roles.get('areRolesLoading'),
    total: state.roles.get('total'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: (page, limit, order, filter, type, cb) => {
      dispatch(loadRoles(page, limit, order, filter, type, cb));
    },
    remove: (id, cb) => {
      dispatch(deleteRole(id, cb));
    },
    sendMessage: (level, title, body, expires) => {
      dispatch(sendMessage(level, title, body, expires));
    },
  }
}

const RolesListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RolesList);

export default RolesListContainer;
