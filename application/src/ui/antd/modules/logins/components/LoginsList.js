import React, {useEffect} from 'react';
import {Translation, getI18n} from 'react-i18next';
import {Table, Tag} from 'antd';
import {withRouter} from "react-router";

import {BooleanTag} from '../../../elements/components/Tags';
import {pathTo} from '../../../Routes';
import Config from '../../../../../Config';
import Format from '../../../../../lib/Format';
import QueryString from '../../../../../lib/QueryString';
import Logger from '../../../../../lib/Logger';

const LoginsList = ({component, page, limit, order, total, load, history, ...props}) => {

  const columns = [
    {
      title: getI18n().t('table_header_id'),
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: order === 'id.asc' ? 'ascend' : (order === 'id.desc' ? 'descend' : null),
      sorter: true,
    },
    {
      title: getI18n().t('logins_user_id'),
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: getI18n().t('logins_username'),
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: getI18n().t('logins_ip_address'),
      dataIndex: 'ip_address',
      key: 'ip_address',
    },
    {
      title: getI18n().t('logins_api'),
      dataIndex: 'api',
      key: 'api',
      render: code => code === 1 
        ? <Tag color="orange">{getI18n().t('logins_api_admin')}</Tag>
        : <Tag color="cyan">{getI18n().t('logins_api_public')}</Tag>,
    },
    {
      title: getI18n().t('logins_success'),
      dataIndex: 'success',
      key: 'success',
      render: success => <BooleanTag value={success} />,
    },
    {
      title: getI18n().t('logins_attempt_date'),
      dataIndex: 'attempt_date',
      key: 'attempt_date',
      render: date => Format.date(date, Config.get('DEFAULT_DATETIME_FORMAT')),
      defaultSortOrder: order === 'attempt_date.asc' ? 'ascend' : (order === 'attempt_date.desc' ? 'descend' : null),
      sorter: true,
    },
  ];

  const pagination = {
    current: page,
    pageSize: limit,
    total: total,
    position: ['bottomCenter'],
  }

  const handleTableChange = (pagination, filters, sorter) => {

    let path = props.location.pathname;
    let params = null;

    // handle pagination
    if ('current' in pagination && pagination['current']) {
      path = pathTo(component, {page: pagination['current']});
    }

    // handle sorting
    if ('field' in sorter && 'order' in sorter) {
      if (sorter['field'] && sorter['order']) {
        const order = sorter['field'] + '.' + (sorter['order'] === 'ascend' ? 'asc' : 'desc');
        params = {order: order};
      }
    }

    history.push(QueryString.append(path, params));
  }

  useEffect(() => {
    load(page, limit, order);
  }, [page, limit, order, load]);

  return (
    <Translation>{(t) => 

      <Table
        dataSource={props.list}
        columns={columns}
        pagination={page === 1 && total < limit  ? false : pagination}
        loading={props.isLoading}
        scroll={{x: true}}
        onChange={handleTableChange}
      />

    }</Translation>
  );
}

export default withRouter(LoginsList);

Logger.log('silly', `LoginsList loaded.`);
