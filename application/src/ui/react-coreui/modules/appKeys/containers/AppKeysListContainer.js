import {connect} from 'react-redux';

import {loadAppKeys, deleteAppKey} from '../../../../../state/appKeys/actions'
import AppKeysList from '../components/AppKeysList'

const mapStateToProps = (state, ownProps) => {

  const page = ownProps.page;
  const limit = ownProps.limit;
  const order = ownProps.order;
  const result = state.appKeys.getIn(['pages', order, limit, page]);

  return {
    list: result ? result.map(x => state.entities.getIn(['app_keys', x])).toArray() : [],
    isLoading: state.appKeys.get('isLoading')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: (page, limit, cb) => {
      dispatch(loadAppKeys(page, limit, cb));
    },
    delete: (id, cb) => {
      dispatch(deleteAppKey(id, cb))
    }
  }
}

const AppKeysListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppKeysList);

export default AppKeysListContainer;
