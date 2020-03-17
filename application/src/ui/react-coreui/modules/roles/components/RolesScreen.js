import React, {Component} from 'react';
import {Translation} from 'react-i18next';
import {Row, Col} from 'reactstrap';

import Logger from '../../../../../lib/Logger';
import Config from '../../../../../Config';
import RolesList from '../containers/RolesListContainer';

class RolesScreen extends Component {

  static defaultProps = {
    limit: Config.get('DEFAULT_LIST_LENGTH', 10),
    isLoading: true
  }

  scrollToTop = () => {
    Logger.log('debug', `RolesScreen.scrollToTop()`);
    if (typeof window !== 'undefined') {
      setTimeout(() => window.scrollTo(0, 0), 100);
    }
  }

  render() {
    const page = parseInt(this.props.match.params.page ? this.props.match.params.page : 1);
    return (
      <Translation>
        {
          (t) => 
            <div className="animated fadeIn">

              <Row>
                <Col>
                  <RolesList
                    key={page}
                    component="RolesScreen"
                    page={page}
                    limit={this.props.limit}
                    total={this.props.total}
                    window={5}
                    order="name.asc"
                  />
                </Col>
              </Row>

            </div>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `RolesScreen.componentDidMount()`);
    this.scrollToTop();
  }

  componentDidUpdate() {
    Logger.log('silly', `RolesScreen.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `RolesScreen.componentWillUnmount()`);
  }
}

export default RolesScreen;

Logger.log('silly', `RolesScreen loaded.`);
