import React, {Component} from 'react';
import {Translation} from 'react-i18next';
import {Card, CardBody, CardHeader, Spinner, Table} from 'reactstrap';

import Logger from '../../../../lib/Logger';
import LoginRow from '../components/LoginRow'
import Paginate from '../../../elements/components/Paginate';

class LoginsList extends Component {

  static defaultProps = {
    page: 1,
    limit: 10,
    isLoading: true
  }

  render() {
    return (
      <Translation>
        {
          (t) => 
            <Card>
              <CardHeader>
                <strong><i className="icon-lock pr-1"></i>{t('logins_title')}</strong>
                {this.props.isLoading ? <span className="event-feedback"><Spinner color="dark" size="sm" /> {t('feedback_loading')}</span> : ''}
              </CardHeader>
              <CardBody>

                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>{t('table_header_id')}</th>
                      <th>{t('login_user_id')}</th>
                      <th>{t('login_username')}</th>
                      <th>{t('login_ip_address')}</th>
                      <th>{t('login_api')}</th>
                      <th>{t('login_success')}</th>
                      <th>{t('login_attempt_date')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.list.map((login, index) =>
                      login
                        ? <LoginRow
                            key={index}
                            login={login}
                          />
                        : null
                    )}
                  </tbody>
                </Table>

                <Paginate
                    component={this.props.component}
                    page={this.props.page}
                    limit={this.props.limit}
                    total={this.props.total}
                    window={this.props.window}
                  />

              </CardBody>
            </Card>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `LoginsList.componentDidMount()`);
    this.props.load(
      this.props.page,
      this.props.limit
    );
  }

  componentDidUpdate() {
    Logger.log('silly', `LoginsList.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `LoginsList.componentWillUnmount()`);
  }
}

export default LoginsList;

Logger.log('silly', `LoginsList loaded.`);
