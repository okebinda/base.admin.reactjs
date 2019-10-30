import React, {Component} from 'react';
import {Translation} from 'react-i18next';
import {Row, Col} from 'reactstrap';

import Logger from '../../../../lib/Logger';
import LoginsList from '../containers/LoginsListContainer';

class LoginsScreen extends Component {

  static defaultProps = {
    limit: 25,
    isLoading: true
  }

  scrollToTop = () => {
    Logger.log('debug', `LoginsScreen.scrollToTop()`);
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
                  <h1>{t('logins_title')}</h1>
                  {this.props.isLoading ? <span className="event-feedback">{t('feedback_loading')}</span> : ''}
                </Col>
              </Row>

              <Row>
                <Col>
                  <LoginsList
                    key={page}
                    component="LoginsScreen"
                    page={page}
                    limit={this.props.limit}
                    total={this.props.total}
                    window={5}
                    order="attempt_date.desc"
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
    Logger.log('silly', `LoginsScreen.componentDidMount()`);
    this.scrollToTop();
  }

  componentDidUpdate() {
    Logger.log('silly', `LoginsScreen.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `LoginsScreen.componentWillUnmount()`);
  }
}

export default LoginsScreen;

Logger.log('silly', `LoginsScreen loaded.`);
