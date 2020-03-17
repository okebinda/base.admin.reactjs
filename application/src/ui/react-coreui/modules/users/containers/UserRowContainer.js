import {connect} from 'react-redux';

import UserRow from '../components/UserRow'

const mapStateToProps = (state, ownProps) => {
  return {
    roles: state.entities.get('roles', {})
  }
}

const UserRowContainer = connect(
  mapStateToProps
)(UserRow);

export default UserRowContainer;
