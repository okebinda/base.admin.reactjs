import {connect} from 'react-redux';
import {denormalize} from 'normalizr';

import {schema} from '../../../../../state/schema';
import {loadAdministrators, deleteAdministrator} from '../../../../../state/modules/administrators/actions';
import {sendMessage} from '../../../../../state/actions';
import AdministratorsList from '../components/AdministratorsList';

const mapStateToProps = (state, ownProps) => {

  const page = ownProps.page;
  const limit = ownProps.limit;
  const order = ownProps.order;
  const result = state.administrators.getIn(['pages', order, limit, page]);

  return {
    list: result 
      ? result.map(x => {
          return {
            key: x,
            ...denormalize(
              state.entities.getIn(['administrators', x]),
              schema.administrator,
              state.entities.toJS()
            )
          };
        }).toArray()
      : [],
    isLoading: state.administrators.get('isLoading'),
    total: state.administrators.get('total'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: (page, limit, order, filter, cb) => {
      dispatch(loadAdministrators(page, limit, order, filter, cb));
    },
    remove: (id, cb) => {
      dispatch(deleteAdministrator(id, cb));
    },
    sendMessage: (level, title, body, expires) => {
      dispatch(sendMessage(level, title, body, expires));
    },
  }
}

const AdministratorsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdministratorsList);

export default AdministratorsListContainer;
