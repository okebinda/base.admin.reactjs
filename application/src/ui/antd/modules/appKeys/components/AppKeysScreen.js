import React, {Component} from 'react';
import {Translation} from 'react-i18next';
import {Button, Card, Col, Row, Spin} from 'antd';
import {LoadingOutlined, PlusCircleOutlined} from '@ant-design/icons';

import AppKeysList from '../containers/AppKeysListContainer';
import DocumentHead from '../../../elements/components/DocumentHead';
import {pathTo} from '../../../Routes';
import Config from '../../../../../Config';
import QueryString from '../../../../../lib/QueryString';
import Logger from '../../../../../lib/Logger';

class AppKeysScreen extends Component {

  static defaultProps = {
    limit: Config.get('DEFAULT_LIST_LENGTH', 10),
    isLoading: true,
  }

  scrollToTop = () => {
    Logger.log('debug', `AppKeysScreen.scrollToTop()`);
    if (typeof window !== 'undefined') {
      setTimeout(() => window.scrollTo(0, 0), 100);
    }
  }

  render() {

    const loadingIcon = <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />;
    const page = parseInt(this.props.match.params.page ? this.props.match.params.page : 1);

    return (
      <Translation>{(t) => 
        <div>

          <DocumentHead title={t('app_keys_route_list')} />

          <Row>
            <Col span={24}>
              <Card
                title={
                  <>
                    {t('app_keys_list_title')}
                    <Button
                      size="small"
                      icon={<PlusCircleOutlined />}
                      onClick={e => this.props.history.push(pathTo('AppKeyAddScreen'))}
                    >
                      {t('action_create')}
                    </Button>
                  </>
                }
                extra={this.props.isLoading ? loadingIcon : null}
              >
                <AppKeysList
                  key={page}
                  component="AppKeysScreen"
                  page={page}
                  limit={this.props.limit}
                  order={(() => {
                    if (this.props.location.search) {
                      const qs = QueryString.parse(this.props.location.search);
                      if ('order' in qs) {
                        return qs['order'];
                      }
                    }
                    return 'updated_at.desc';
                  })()}
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

export default AppKeysScreen;

Logger.log('silly', `AppKeysScreen loaded.`);
