import React, {Component} from 'react';
import {Translation} from 'react-i18next';
import {Card, CardBody, CardHeader, Table} from 'reactstrap';

import Logger from '../../../../lib/Logger';
import TermsOfServiceRow from '../components/TermsOfServiceRow';
import Paginate from '../../../elements/components/Paginate';

class TermsOfServicesList extends Component {

  static defaultProps = {
    page: 1,
    limit: 10,
    isLoading: true
  }

  delete = async (id) => {
    Logger.log('debug', `TermsOfServicesList.delete(${id})`);
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
                <strong><i className="icon-info pr-1"></i>{t('terms_of_services_title')}</strong>
              </CardHeader>
              <CardBody>

                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>{t('table_header_id')}</th>
                      <th>{t('terms_of_service_text')}</th>
                      <th>{t('terms_of_service_version')}</th>
                      <th>{t('terms_of_service_publish_date')}</th>
                      <th>{t('table_header_status')}</th>
                      <th>{t('table_header_created_at')}</th>
                      <th>{t('table_header_actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.list.map((termsOfService, index) =>
                      termsOfService
                        ? <TermsOfServiceRow
                            key={index}
                            termsOfService={termsOfService}
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
    Logger.log('silly', `TermsOfServicesList.componentDidMount()`);
    this.props.load(
      this.props.page,
      this.props.limit
    );
  }

  componentDidUpdate() {
    Logger.log('silly', `TermsOfServicesList.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `TermsOfServicesList.componentWillUnmount()`);
  }
}

export default TermsOfServicesList;

Logger.log('silly', `TermsOfServicesList loaded.`);