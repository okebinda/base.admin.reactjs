import React, {Component} from 'react';
import {Translation} from 'react-i18next';
import {Button, Card, Col, Row, Spin} from 'antd';
import {LoadingOutlined, PlusCircleOutlined} from '@ant-design/icons';

import UsersList from '../containers/UsersListContainer';
import DocumentHead from '../../../elements/components/DocumentHead';
import {pathTo} from '../../../Routes';
import Config from '../../../../../Config';
import QueryString from '../../../../../lib/QueryString';
import Logger from '../../../../../lib/Logger';

class UsersScreen extends Component {

  static defaultProps = {
    limit: Config.get('DEFAULT_LIST_LENGTH', 10),
    isLoading: true,
  }

  scrollToTop = () => {
    Logger.log('debug', `UsersScreen.scrollToTop()`);
    if (typeof window !== 'undefined') {
      setTimeout(() => window.scrollTo(0, 0), 100);
    }
  }

  render() {

    const loadingIcon = <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />;
    const page = parseInt(this.props.match.params.page ? this.props.match.params.page : 1);
    const {order, ...filter} = QueryString.parse(this.props.location.search);

    return (
      <Translation>{(t) => 
        <div>

          <DocumentHead title={t('users_route_list')} />

          <Row>
            <Col span={24}>
              <Card
                title={
                  <>
                    {t('users_list_title')}
                    <Button
                      size="small"
                      icon={<PlusCircleOutlined />}
                      onClick={e => this.props.history.push(pathTo('UserAddScreen'))}
                    >
                      {t('action_create')}
                    </Button>
                  </>
                }
                extra={this.props.isLoading ? loadingIcon : null}
              >
                <UsersList
                  key={page}
                  component="UsersScreen"
                  page={page}
                  limit={this.props.limit}
                  order={order || 'updated_at.desc'}
                  filter={filter}
                />
              </Card>
            </Col>
          </Row>

        </div>
      }</Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    this.scrollToTop();
  }
}

export default UsersScreen;

Logger.log('silly', `UsersScreen loaded.`);
