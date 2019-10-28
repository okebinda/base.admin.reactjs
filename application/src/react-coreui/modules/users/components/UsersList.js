import React, {Component} from 'react';
import {Translation} from 'react-i18next';
import {Card, CardBody, CardHeader, Table} from 'reactstrap';

import Logger from '../../../../lib/Logger';
import UserRow from '../containers/UserRowContainer'
import Paginate from '../../../elements/components/Paginate';

class UsersList extends Component {

  static defaultProps = {
    page: 1,
    limit: 10,
    isLoading: true
  }

  delete = async (id) => {
    Logger.log('debug', `UsersList.delete(${id})`);
    this.props.delete(id, () => {
      this.props.load(
        this.props.page,
        this.props.limit
      );
    });
  }

  render() {
    return (
      <Translation>
        {
          (t) => 
            <Card>
              <CardHeader>
                <strong><i className="icon-people pr-1"></i>{t('users_title')}</strong>
              </CardHeader>
              <CardBody>

                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>{t('table_header_id')}</th>
                      <th>{t('user_username')}</th>
                      <th>{t('user_email')}</th>
                      <th>{t('user_first_name')}</th>
                      <th>{t('user_last_name')}</th>
                      <th>{t('user_roles')}</th>
                      <th>{t('user_is_verified')}</th>
                      <th>{t('user_joined_at')}</th>
                      <th>{t('table_header_status')}</th>
                      <th>{t('table_header_created_at')}</th>
                      <th>{t('table_header_actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.list.map((user, index) =>
                      user
                        ? <UserRow
                            key={index}
                            user={user}
                            delete={this.delete.bind(this)}
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
    Logger.log('silly', `UsersList.componentDidMount()`);
    this.props.load(
      this.props.page,
      this.props.limit
    );
  }

  componentDidUpdate() {
    Logger.log('silly', `UsersList.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `UsersList.componentWillUnmount()`);
  }
}

export default UsersList;

Logger.log('silly', `UsersList loaded.`);
