import {connect} from 'react-redux';

import AppKeyEditScreen from '../components/AppKeyEditScreen'

const mapStateToProps = state => {
  return {
    isLoading: state.appKeys.get('isLoading'),
    success: state.appKeys.getIn(['form', 'success']),
  }
}

const AppKeyEditScreenContainer = connect(
  mapStateToProps
)(AppKeyEditScreen)

export default AppKeyEditScreenContainer
