import React, {Component} from 'react';
import {Translation} from 'react-i18next';
import {Button, Card, CardBody, CardHeader, Spinner, Table} from 'reactstrap';
import {Link} from 'react-router-dom';

import {pathTo} from '../../../Routes';
import Logger from '../../../../../lib/Logger';
import AppKeyRow from '../components/AppKeyRow'
import Paginate from '../../../elements/components/Paginate';

class AppKeysList extends Component {

  static defaultProps = {
    page: 1,
    limit: 10,
    isLoading: true
  }

  delete = async (id) => {
    Logger.log('debug', `AppKeysList.delete(${id})`);
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
                <strong><i className="icon-key pr-1"></i>{t('app_keys_title')}</strong>
                {this.props.isLoading ? <span className="event-feedback"><Spinner color="dark" size="sm" /> {t('feedback_loading')}</span> : ''}
                <div class="float-right">
                  <Button
                    color="primary"
                    size="sm"
                    tag={Link}
                    to={pathTo('AppKeyAddScreen')}
                  >
                    <i className="fa fa-plus"></i>{' '}
                    {t('action_create')}
                  </Button>
                </div>
              </CardHeader>
              <CardBody>

                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>{t('table_header_id')}</th>
                      <th>{t('app_key_application')}</th>
                      <th>{t('app_key_key')}</th>
                      <th>{t('table_header_status')}</th>
                      <th>{t('table_header_created_at')}</th>
                      <th>{t('table_header_actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.list.map((app_key, index) =>
                      app_key
                        ? <AppKeyRow
                            key={index}
                            app_key={app_key}
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
    Logger.log('silly', `AppKeysList.componentDidMount()`);
    this.props.load(
      this.props.page,
      this.props.limit
    );
  }

  componentDidUpdate() {
    Logger.log('silly', `AppKeysList.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `AppKeysList.componentWillUnmount()`);
  }
}

export default AppKeysList;

Logger.log('silly', `AppKeysList loaded.`);
