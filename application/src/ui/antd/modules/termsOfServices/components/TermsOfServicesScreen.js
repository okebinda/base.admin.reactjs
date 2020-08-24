import React, {Component} from 'react';
import {Translation} from 'react-i18next';
import {Button, Card, Col, Row, Spin} from 'antd';
import {LoadingOutlined, PlusCircleOutlined} from '@ant-design/icons';

import TermsOfServicesList from '../containers/TermsOfServicesListContainer';
import DocumentHead from '../../../elements/components/DocumentHead';
import {pathTo} from '../../../Routes';
import Config from '../../../../../Config';
import QueryString from '../../../../../lib/QueryString';
import Logger from '../../../../../lib/Logger';

class TermsOfServicesScreen extends Component {

  static defaultProps = {
    limit: Config.get('DEFAULT_LIST_LENGTH', 10),
    isLoading: true,
  }

  scrollToTop = () => {
    Logger.log('debug', `TermsOfServicesScreen.scrollToTop()`);
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

          <DocumentHead title={t('terms_of_services_route_list')} />

          <Row>
            <Col span={24}>
              <Card
                title={
                  <>
                    {t('terms_of_services_list_title')}
                    <Button
                      size="small"
                      icon={<PlusCircleOutlined />}
                      onClick={e => this.props.history.push(pathTo('TermsOfServiceAddScreen'))}
                    >
                      {t('action_create')}
                    </Button>
                  </>
                }
                extra={this.props.isLoading ? loadingIcon : null}
              >
                <TermsOfServicesList
                  key={page}
                  component="TermsOfServicesScreen"
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

export default TermsOfServicesScreen;

Logger.log('silly', `TermsOfServicesScreen loaded.`);
