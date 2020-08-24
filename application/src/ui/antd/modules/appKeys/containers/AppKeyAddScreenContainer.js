import {connect} from 'react-redux';

import AppKeyAddScreen from '../components/AppKeyAddScreen'

const mapStateToProps = state => {
  return {
    isLoading: state.appKeys.get('isLoading'),
    success: state.appKeys.getIn(['form', 'success']),
  }
}

const AppKeyAddScreenContainer = connect(
  mapStateToProps
)(AppKeyAddScreen)

export default AppKeyAddScreenContainer;
