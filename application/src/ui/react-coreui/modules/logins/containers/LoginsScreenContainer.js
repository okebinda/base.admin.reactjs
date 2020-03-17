import {connect} from 'react-redux';

import LoginsScreen from '../components/LoginsScreen'

const mapStateToProps = state => {
  return {
    total: state.logins.get('total'),
    isLoading: state.logins.get('isLoading')
  }
}

const LoginsScreenContainer = connect(
  mapStateToProps
)(LoginsScreen)

export default LoginsScreenContainer
