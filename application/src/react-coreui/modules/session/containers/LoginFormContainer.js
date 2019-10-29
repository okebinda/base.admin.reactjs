import {connect} from 'react-redux';

import {createSession} from '../../../../state/actions';
import LoginForm from '../components/LoginForm';

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.session.get('isLoading'),
    success: state.session.getIn(['form', 'success'])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createSession: (data, cb) => {
      dispatch(createSession(data, cb));
    }
  }
}

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default LoginFormContainer
