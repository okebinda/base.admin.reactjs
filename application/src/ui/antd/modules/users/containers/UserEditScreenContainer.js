import {connect} from 'react-redux';

import UserEditScreen from '../components/UserEditScreen';

const mapStateToProps = state => {
  return {
    isLoading: state.users.get('isLoading'),
    success: state.users.getIn(['form', 'success']),
  }
}

const UserEditScreenContainer = connect(
  mapStateToProps
)(UserEditScreen);

export default UserEditScreenContainer;
