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

const LoginsList = ({component, page, limit, order, total, filter, load, history, ...props}) => {

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
      filters: [
        {text: getI18n().t('logins_api_admin'), value: 1},
        {text: getI18n().t('logins_api_public'), value: 2},
      ],
      filteredValue: 'api' in filter ? filter['api'].split(',') : null,
      render: code => code === 1 
        ? <Tag color="orange">{getI18n().t('logins_api_admin')}</Tag>
        : <Tag color="cyan">{getI18n().t('logins_api_public')}</Tag>,
    },
    {
      title: getI18n().t('logins_success'),
      dataIndex: 'success',
      key: 'success',
      filters: [
        {text: getI18n().t('boolean_true'), value: 1},
        {text: getI18n().t('boolean_false'), value: 0},
      ],
      filteredValue: 'success' in filter ? filter['success'].split(',') : null,
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
    const params = {};

    // handle pagination
    if ('current' in pagination && pagination['current']) {
      path = pathTo(component, {page: pagination['current']});
    }

    // handle sorting
    if ('field' in sorter && 'order' in sorter) {
      if (sorter['field'] && sorter['order']) {
        const order = sorter['field'] + '.' + (sorter['order'] === 'ascend' ? 'asc' : 'desc');
        params['order'] = order;
      }
    }

    // handle filters
    if (filters) {
      for (const key in filters) {
        if (filters[key]) {
          params[key] = filters[key].join(',');
        }
      }
    }

    history.push(QueryString.append(path, params));
  }

  const filterString = JSON.stringify(filter);
  useEffect(() => {
    load(page, limit, order, JSON.parse(filterString));
  }, [page, limit, order, filterString, load]);

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
