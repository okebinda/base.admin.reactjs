import {connect} from 'react-redux';

import UsersScreen from '../components/UsersScreen';

const mapStateToProps = state => {
  return {
    total: state.users.get('total'),
    isLoading: state.users.get('isLoading'),
  }
}

const UsersScreenContainer = connect(
  mapStateToProps
)(UsersScreen);

export default UsersScreenContainer;
