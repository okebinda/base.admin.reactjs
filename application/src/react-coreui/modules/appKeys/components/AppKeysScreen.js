import React, {Component} from 'react';
import {Translation} from 'react-i18next';
import {Row, Col, Button} from 'reactstrap';
import {Link} from 'react-router-dom';

import {pathTo} from '../../../Routes';
import Logger from '../../../../lib/Logger';
import Config from '../../../../Config';
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

              <Row className="title-bar">
                <Col>
                  <h1>{t('app_keys_title')}</h1>
                  <Button
                    color="primary"
                    size="sm"
                    tag={Link}
                    to={pathTo('AppKeyAddScreen')}
                  >
                    {t('action_create')}
                  </Button>
                  {this.props.isLoading ? <span className="event-feedback">{t('feedback_loading')}</span> : ''}
                </Col>
              </Row>

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
