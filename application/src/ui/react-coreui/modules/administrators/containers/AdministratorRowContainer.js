import {connect} from 'react-redux';

import AdministratorRow from '../components/AdministratorRow';

const mapStateToProps = (state, ownProps) => {
  return {
    roles: state.entities.get('roles', {})
  }
}

const AdministratorRowContainer = connect(
  mapStateToProps
)(AdministratorRow);

export default AdministratorRowContainer;
