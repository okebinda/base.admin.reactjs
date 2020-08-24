import {connect} from 'react-redux';

import MainMenu from '../components/MainMenu';

const mapStateToProps = (state, ownProps) => {
  return {
    isMenuCollapsed: state.ui.get('isMenuCollapsed')
  }
}

const MainMenuContainer = connect(
  mapStateToProps
)(MainMenu);

export default MainMenuContainer;
