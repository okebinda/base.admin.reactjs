import React, {Component} from 'react';
import {Translation} from 'react-i18next';
import {Row, Col, Button} from 'reactstrap';
import {Link} from 'react-router-dom';

import {pathTo} from '../../../Routes';
import Logger from '../../../../lib/Logger';
import Config from '../../../../Config';
import UsersList from '../containers/UsersListContainer';

class UsersScreen extends Component {

  static defaultProps = {
    limit: Config.get('DEFAULT_LIST_LENGTH', 10),
    isLoading: true
  }

  scrollToTop = () => {
    Logger.log('debug', `UsersScreen.scrollToTop()`);
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
                  <h1>{t('users_title')}</h1>
                  <Button
                    color="primary"
                    size="sm"
                    tag={Link}
                    to={pathTo('UserAddScreen')}
                  >
                    {t('action_create')}
                  </Button>
                  {this.props.isLoading ? <span className="event-feedback">{t('feedback_loading')}</span> : ''}
                </Col>
              </Row>

              <Row>
                <Col>
                  <UsersList
                    key={page}
                    component="UsersScreen"
                    page={page}
                    limit={this.props.limit}
                    total={this.props.total}
                    window={5}
                    order="id.desc"
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
    Logger.log('silly', `UsersScreen.componentDidMount()`);
    this.scrollToTop();
  }

  componentDidUpdate() {
    Logger.log('silly', `UsersScreen.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `UsersScreen.componentWillUnmount()`);
  }
}

export default UsersScreen;

Logger.log('silly', `UsersScreen loaded.`);
