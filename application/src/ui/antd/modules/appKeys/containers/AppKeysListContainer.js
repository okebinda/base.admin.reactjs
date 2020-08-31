import {connect} from 'react-redux';
import {denormalize} from 'normalizr';

import {schema} from '../../../../../state/schema';
import {loadAppKeys, deleteAppKey} from '../../../../../state/modules/appKeys/actions';
import {sendMessage} from '../../../../../state/actions';
import AppKeysList from '../components/AppKeysList';

const mapStateToProps = (state, ownProps) => {

  const page = ownProps.page;
  const limit = ownProps.limit;
  const order = ownProps.order;
  const result = state.appKeys.getIn(['pages', order, limit, page]);

  return {
    list: result 
      ? result.map(x => {
          return {
            key: x,
            ...denormalize(
              state.entities.getIn(['appKeys', x]),
              schema.appKey,
              state.entities.toJS()
            )
          };
        }).toArray()
      : [],
    isLoading: state.appKeys.get('isLoading'),
    total: state.appKeys.get('total'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: (page, limit, order, filter, cb) => {
      dispatch(loadAppKeys(page, limit, order, filter, cb));
    },
    remove: (id, cb) => {
      dispatch(deleteAppKey(id, cb));
    },
    sendMessage: (level, title, body, expires) => {
      dispatch(sendMessage(level, title, body, expires));
    },
  }
}

const AppKeysListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppKeysList);

export default AppKeysListContainer;
