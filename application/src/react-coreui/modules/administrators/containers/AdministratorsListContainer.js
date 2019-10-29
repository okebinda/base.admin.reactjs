import {connect} from 'react-redux';

import {loadAdministrators, deleteAdministrator} from '../../../../state/administrators/actions'
import AdministratorsList from '../components/AdministratorsList'

const mapStateToProps = (state, ownProps) => {

  const page = ownProps.page;
  const limit = ownProps.limit;
  const order = ownProps.order;
  const result = state.administrators.getIn(['pages', order, limit, page]);

  return {
    list: result ? result.map(x => state.entities.getIn(['administrators', x])).toArray() : [],
    isLoading: state.administrators.get('isLoading')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: (page, limit, cb) => {
      dispatch(loadAdministrators(page, limit, cb));
    },
    delete: (id, cb) => {
      dispatch(deleteAdministrator(id, cb))
    }
  }
}

const AdministratorsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdministratorsList);

export default AdministratorsListContainer;
