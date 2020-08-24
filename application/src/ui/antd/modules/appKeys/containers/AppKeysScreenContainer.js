import {connect} from 'react-redux';

import AppKeysScreen from '../components/AppKeysScreen';

const mapStateToProps = state => {
  return {
    total: state.appKeys.get('total'),
    isLoading: state.appKeys.get('isLoading')
  }
}

const AppKeysScreenContainer = connect(
  mapStateToProps
)(AppKeysScreen);

export default AppKeysScreenContainer;
