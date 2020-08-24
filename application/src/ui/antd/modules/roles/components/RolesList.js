import React, {useEffect} from 'react';
import {withRouter} from "react-router";
import {Translation, getI18n} from 'react-i18next';
import {Table} from 'antd';

import ListActions from '../../../elements/components/ListActions';
import {BooleanTag} from '../../../elements/components/Tags';
import {pathTo} from '../../../Routes';
import Format from '../../../../../lib/Format';
import QueryString from '../../../../../lib/QueryString';
import Logger from '../../../../../lib/Logger';

const RolesList = ({component, page, limit, order, total, load, remove, history, ...props}) => {

  const columns = [
    {
      title: getI18n().t('table_header_id'),
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: order === 'id.asc' ? 'ascend' : (order === 'id.desc' ? 'descend' : null),
      sorter: true,
    },
    {
      title: getI18n().t('roles_header_name'),
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: order === 'id.asc' ? 'ascend' : (order === 'id.desc' ? 'descend' : null),
      sorter: true,
    },
    {
      title: getI18n().t('roles_header_admin_role'),
      dataIndex: 'is_admin_role',
      key: 'is_admin_role',
      render: success => <BooleanTag value={success} />,
    },
    {
      title: getI18n().t('roles_header_login_policy'),
      dataIndex: 'login_lockout_policy',
      key: 'login_lockout_policy',
      render: success => <BooleanTag value={success} />,
    },
    {
      title: getI18n().t('roles_header_password_policy'),
      dataIndex: 'password_policy',
      key: 'password_policy',
      render: success => <BooleanTag value={success} />,
    },
    {
      title: getI18n().t('table_header_updated_at'),
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: date => Format.date(date),
      defaultSortOrder: order === 'id.asc' ? 'ascend' : (order === 'id.desc' ? 'descend' : null),
      sorter: true,
    },
    {
      title: getI18n().t('table_header_created_at'),
      dataIndex: 'created_at',
      key: 'created_at',
      responsive: ['xl'],
      render: date => Format.date(date),
      defaultSortOrder: order === 'id.asc' ? 'ascend' : (order === 'id.desc' ? 'descend' : null),
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
          editScreen="RoleEditScreen"
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

export default withRouter(RolesList);

Logger.log('silly', `RolesList loaded.`);
