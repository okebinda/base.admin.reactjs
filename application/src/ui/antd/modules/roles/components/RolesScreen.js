import React, {Component} from 'react';
import {Translation} from 'react-i18next';
import {Button, Card, Col, Row, Spin} from 'antd';
import {LoadingOutlined, PlusCircleOutlined} from '@ant-design/icons';

import RolesList from '../containers/RolesListContainer';
import DocumentHead from '../../../elements/components/DocumentHead';
import {pathTo} from '../../../Routes';
import Config from '../../../../../Config';
import QueryString from '../../../../../lib/QueryString';
import Logger from '../../../../../lib/Logger';

class RolesScreen extends Component {

  static defaultProps = {
    limit: Config.get('DEFAULT_LIST_LENGTH', 10),
    isLoading: true,
  }

  scrollToTop = () => {
    Logger.log('debug', `RolesScreen.scrollToTop()`);
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

          <DocumentHead title={t('roles_route_list')} />

          <Row>
            <Col span={24}>
              <Card
                title={
                  <>
                    {t('roles_list_title')}
                    <Button
                      size="small"
                      icon={<PlusCircleOutlined />}
                      onClick={e => this.props.history.push(pathTo('RoleAddScreen'))}
                    >
                      {t('action_create')}
                    </Button>
                  </>
                }
                extra={this.props.isLoading ? loadingIcon : null}
              >
                <RolesList
                  key={page}
                  component="RolesScreen"
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

export default RolesScreen;

Logger.log('silly', `RolesScreen loaded.`);
