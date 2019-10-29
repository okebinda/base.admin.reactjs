import {connect} from 'react-redux';

import AdministratorsScreen from '../components/AdministratorsScreen'

const mapStateToProps = state => {
  return {
    total: state.administrators.get('total'),
    isLoading: state.administrators.get('isLoading')
  }
}

const AdministratorsScreenContainer = connect(
  mapStateToProps
)(AdministratorsScreen)

export default AdministratorsScreenContainer
