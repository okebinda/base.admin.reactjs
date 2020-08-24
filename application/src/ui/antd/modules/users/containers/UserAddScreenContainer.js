import {connect} from 'react-redux';

import UserAddScreen from '../components/UserAddScreen';

const mapStateToProps = state => {
  return {
    isLoading: state.users.get('isLoading'),
    success: state.users.getIn(['form', 'success']),
  }
}

const UserAddScreenContainer = connect(
  mapStateToProps
)(UserAddScreen);

export default UserAddScreenContainer;
