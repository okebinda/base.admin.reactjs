import React, {Component} from 'react';
import {Translation} from 'react-i18next';
import {Row, Col, Button} from 'reactstrap';
import {Link} from 'react-router-dom';

import {pathTo} from '../../../Routes';
import Logger from '../../../../lib/Logger';
import Config from '../../../../Config';
import TermsOfServicesList from '../containers/TermsOfServicesListContainer';

class TermsOfServicesScreen extends Component {

  static defaultProps = {
    limit: Config.get('DEFAULT_LIST_LENGTH', 10),
    isLoading: true
  }

  scrollToTop = () => {
    Logger.log('debug', `TermsOfServicesScreen.scrollToTop()`);
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
                  <h1>{t('terms_of_services_title')}</h1>
                  <Button
                    color="primary"
                    size="sm"
                    tag={Link}
                    to={pathTo('TermsOfServiceAddScreen')}
                  >
                    {t('action_create')}
                  </Button>
                  {this.props.isLoading ? <span className="event-feedback">{t('feedback_loading')}</span> : ''}
                </Col>
              </Row>

              <Row>
                <Col>
                  <TermsOfServicesList
                    key={page}
                    component="TermsOfServicesScreen"
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
    Logger.log('silly', `TermsOfServicesScreen.componentDidMount()`);
    this.scrollToTop();
  }

  componentDidUpdate() {
    Logger.log('silly', `TermsOfServicesScreen.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `TermsOfServicesScreen.componentWillUnmount()`);
  }
}

export default TermsOfServicesScreen;

Logger.log('silly', `TermsOfServicesScreen loaded.`);
