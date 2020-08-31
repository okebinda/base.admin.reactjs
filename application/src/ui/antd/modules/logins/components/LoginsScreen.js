import React, {Component} from 'react';
import {Translation} from 'react-i18next';
import {Card, Col, Row, Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

import LoginsList from '../containers/LoginsListContainer';
import DocumentHead from '../../../elements/components/DocumentHead';
import Config from '../../../../../Config';
import QueryString from '../../../../../lib/QueryString';
import Logger from '../../../../../lib/Logger';

class LoginsScreen extends Component {

  static defaultProps = {
    limit: Config.get('DEFAULT_LIST_LENGTH', 10),
    isLoading: true,
  }

  scrollToTop = () => {
    Logger.log('debug', `LoginsScreen.scrollToTop()`);
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

          <DocumentHead title={t('logins_route_list')} />

          <Row>
            <Col span={24}>
              <Card title={t('logins_list_title')} extra={this.props.isLoading ? loadingIcon : null}>
                <LoginsList
                  key={page}
                  component="LoginsScreen"
                  page={page}
                  limit={this.props.limit}
                  order={order || 'attempt_date.desc'}
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

export default LoginsScreen;

Logger.log('silly', `LoginsScreen loaded.`);
