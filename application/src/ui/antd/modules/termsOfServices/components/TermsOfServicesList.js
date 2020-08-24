import React, {useEffect} from 'react';
import {withRouter} from "react-router";
import {Translation, getI18n} from 'react-i18next';
import {Table} from 'antd';

import ListActions from '../../../elements/components/ListActions';
import {StatusTag} from '../../../elements/components/Tags';
import {pathTo} from '../../../Routes';
import Format from '../../../../../lib/Format';
import QueryString from '../../../../../lib/QueryString';
import Logger from '../../../../../lib/Logger';

const TermsOfServicesList = ({component, page, limit, order, total, load, remove, history, ...props}) => {

  const columns = [
    {
      title: getI18n().t('table_header_id'),
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: order === 'id.asc' ? 'ascend' : (order === 'id.desc' ? 'descend' : null),
      sorter: true,
    },
    {
      title: getI18n().t('terms_of_services_version'),
      dataIndex: 'version',
      key: 'version',
      defaultSortOrder: order === 'version.asc' ? 'ascend' : (order === 'version.desc' ? 'descend' : null),
      sorter: true,
    },
    {
      title: getI18n().t('terms_of_services_publish_date'),
      dataIndex: 'publish_date',
      key: 'publish_date',
      render: date => Format.date(date),
      defaultSortOrder: order === 'publish_date.asc' ? 'ascend' : (order === 'publish_date.desc' ? 'descend' : null),
      sorter: true,
    },
    {
      title: getI18n().t('table_header_status'),
      dataIndex: 'status',
      key: 'status',
      render: code => <StatusTag status={code} />,
    },
    {
      title: getI18n().t('table_header_updated_at'),
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: date => Format.date(date),
      defaultSortOrder: order === 'updated_at.asc' ? 'ascend' : (order === 'updated_at.desc' ? 'descend' : null),
      sorter: true,
    },
    {
      title: getI18n().t('table_header_created_at'),
      dataIndex: 'created_at',
      key: 'created_at',
      responsive: ['xl'],
      render: date => Format.date(date),
      defaultSortOrder: order === 'created_at.asc' ? 'ascend' : (order === 'created_at.desc' ? 'descend' : null),
      sorter: true,
    },
    {
      title: getI18n().t('table_header_actions'),
      dataIndex: 'id',
      key: 'actions',
      render: id =>
        <ListActions
          id={id}
          page={page}
          limit={limit}
          order={order}
          load={load.bind(this)}
          remove={remove.bind(this)}
          editScreen="TermsOfServiceEditScreen"
        />,
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

export default withRouter(TermsOfServicesList);

Logger.log('silly', `TermsOfServicesList loaded.`);
