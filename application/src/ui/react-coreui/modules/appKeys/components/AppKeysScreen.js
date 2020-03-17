import React, {Component} from 'react';
import {Translation} from 'react-i18next';
import {Row, Col} from 'reactstrap';

import Logger from '../../../../../lib/Logger';
import Config from '../../../../../Config';
import AppKeysList from '../containers/AppKeysListContainer';

class AppKeysScreen extends Component {

  static defaultProps = {
    limit: Config.get('DEFAULT_LIST_LENGTH', 10),
    isLoading: true
  }

  scrollToTop = () => {
    Logger.log('debug', `AppKeysScreen.scrollToTop()`);
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
                  <AppKeysList
                    key={page}
                    component="AppKeysScreen"
                    page={page}
                    limit={this.props.limit}
                    total={this.props.total}
                    window={5}
                    order="id.asc"
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
    Logger.log('silly', `AppKeysScreen.componentDidMount()`);
    this.scrollToTop();
  }

  componentDidUpdate() {
    Logger.log('silly', `AppKeysScreen.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `AppKeysScreen.componentWillUnmount()`);
  }
}

export default AppKeysScreen;

Logger.log('silly', `AppKeysScreen loaded.`);
