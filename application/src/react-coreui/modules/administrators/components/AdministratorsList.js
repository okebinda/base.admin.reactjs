import React, {Component} from 'react';
import {Translation} from 'react-i18next';
import {Card, CardBody, CardHeader, Table} from 'reactstrap';

import Logger from '../../../../lib/Logger';
import AdministratorRow from '../containers/AdministratorRowContainer'
import Paginate from '../../../elements/components/Paginate';

class AdministratorsList extends Component {

  static defaultProps = {
    page: 1,
    limit: 10,
    isLoading: true
  }

  delete = async (id) => {
    Logger.log('debug', `AdministratorsList.delete(${id})`);
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
                <strong><i className="icon-people pr-1"></i>{t('administrators_title')}</strong>
              </CardHeader>
              <CardBody>

                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>{t('table_header_id')}</th>
                      <th>{t('administrator_username')}</th>
                      <th>{t('administrator_email')}</th>
                      <th>{t('administrator_first_name')}</th>
                      <th>{t('administrator_last_name')}</th>
                      <th>{t('administrator_roles')}</th>
                      <th>{t('administrator_joined_at')}</th>
                      <th>{t('table_header_status')}</th>
                      <th>{t('table_header_created_at')}</th>
                      <th>{t('table_header_actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.list.map((administrator, index) =>
                      administrator
                        ? <AdministratorRow
                            key={index}
                            administrator={administrator}
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
    Logger.log('silly', `AdministratorsList.componentDidMount()`);
    this.props.load(
      this.props.page,
      this.props.limit
    );
  }

  componentDidUpdate() {
    Logger.log('silly', `AdministratorsList.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `AdministratorsList.componentWillUnmount()`);
  }
}

export default AdministratorsList;

Logger.log('silly', `AdministratorsList loaded.`);
