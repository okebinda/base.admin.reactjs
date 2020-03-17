import {connect} from 'react-redux';

import PrivateRoute from '../components/PrivateRoute';

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.session.get('authToken') 
      && state.session.get('authExpires')
      && parseInt(state.session.get('authExpires')) - 60 > Math.round(new Date().getTime()/1000)
  }
}

const PrivateRouteContainer = connect(
  mapStateToProps
)(PrivateRoute);

export default PrivateRouteContainer;
