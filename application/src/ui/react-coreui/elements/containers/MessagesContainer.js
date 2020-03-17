import {connect} from 'react-redux';

import {removeMessage} from '../../../../state/actions';
import Messages from '../components/Messages';

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    remove: (key) => {
      dispatch(removeMessage(key));
    }
  }
}

const MessagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);

export default MessagesContainer;
