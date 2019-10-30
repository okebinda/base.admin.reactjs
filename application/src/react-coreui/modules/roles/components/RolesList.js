import React, {Component} from 'react';
import {Translation} from 'react-i18next';
import {Card, CardBody, CardHeader, Table} from 'reactstrap';

import Logger from '../../../../lib/Logger';
import RoleRow from '../components/RoleRow'
import Paginate from '../../../elements/components/Paginate';

class RolesList extends Component {

  static defaultProps = {
    page: 1,
    limit: 10,
    isLoading: true
  }

  delete = async (id) => {
    Logger.log('debug', `RolesList.delete(${id})`);
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
                <strong><i className="icon-shield pr-1"></i>{t('roles_title')}</strong>
              </CardHeader>
              <CardBody>

                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>{t('table_header_id')}</th>
                      <th>{t('role_name')}</th>
                      <th>{t('role_is_admin_role')}</th>
                      <th>{t('role_priority')}</th>
                      <th>{t('role_login_lockout_policy')}</th>
                      <th>{t('role_password_policy')}</th>
                      <th>{t('table_header_created_at')}</th>
                      <th>{t('table_header_actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.list.map((role, index) =>
                      role
                        ? <RoleRow
                            key={index}
                            role={role}
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
    Logger.log('silly', `RolesList.componentDidMount()`);
    this.props.load(
      this.props.page,
      this.props.limit
    );
  }

  componentDidUpdate() {
    Logger.log('silly', `RolesList.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `RolesList.componentWillUnmount()`);
  }
}

export default RolesList;

Logger.log('silly', `RolesList loaded.`);
