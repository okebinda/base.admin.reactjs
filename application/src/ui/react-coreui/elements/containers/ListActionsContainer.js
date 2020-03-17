import {connect} from 'react-redux';

import {sendMessage} from '../../../../state/actions';
import ListActions from '../components/ListActions';


const mapDispatchToProps = dispatch => {
  return {
    sendMessage: (level, title, body, expires) => {
      dispatch(sendMessage(level, title, body, expires));
    }
  }
}

const ListActionsContainer = connect(
  mapDispatchToProps
)(ListActions);

export default ListActionsContainer;
