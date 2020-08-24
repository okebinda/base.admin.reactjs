import {connect} from 'react-redux';

import RolesScreen from '../components/RolesScreen';

const mapStateToProps = state => {
  return {
    total: state.roles.get('total'),
    isLoading: state.roles.get('areRolesLoading')
  }
}

const RolesScreenContainer = connect(
  mapStateToProps
)(RolesScreen);

export default RolesScreenContainer;
