import {connect} from 'react-redux';

import {destroySession} from '../../../../state/actions';
import SignOutDropdownItem from '../components/SignOutDropdownItem';

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.session.get('authToken') 
      && state.session.get('authExpires')
      && parseInt(state.session.get('authExpires')) > Math.round(new Date().getTime()/1000)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    destroySession: (cb) => {
      dispatch(destroySession(cb));
    }
  }
}

const SignOutDropdownItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignOutDropdownItem);

export default SignOutDropdownItemContainer;
