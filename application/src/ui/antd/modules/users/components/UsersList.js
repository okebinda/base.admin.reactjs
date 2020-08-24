import React, {useEffect} from 'react';
import {withRouter} from "react-router";
import {Translation, getI18n} from 'react-i18next';
import {Table, Tag} from 'antd';

import ListActions from '../../../elements/components/ListActions';
import {StatusTag} from '../../../elements/components/Tags';
import {pathTo} from '../../../Routes';
import Format from '../../../../../lib/Format';
import QueryString from '../../../../../lib/QueryString';
import Logger from '../../../../../lib/Logger';

const UsersList = ({component, page, limit, order, total, load, remove, history, ...props}) => {

  const columns = [
    {
      title: getI18n().t('table_header_id'),
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: order === 'id.asc' ? 'ascend' : (order === 'id.desc' ? 'descend' : null),
      sorter: true,
    },
    {
      title: getI18n().t('users_username'),
      dataIndex: 'username',
      key: 'username',
      defaultSortOrder: order === 'username.asc' ? 'ascend' : (order === 'username.desc' ? 'descend' : null),
      sorter: true,
    },
    {
      title: getI18n().t('users_email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: getI18n().t('users_roles'),
      dataIndex: 'roles',
      key: 'roles',
      responsive: ['xl'],
      render: roles => roles
        ? <>
            {roles.map((x, i) => <Tag key={i}>{x.name}</Tag>)}
          </>
        : null,
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
      responsive: ['lg'],
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
      render : id =>
        <ListActions
          id={id}
          page={page}
          limit={limit}
          load={load.bind(this)}
          remove={remove.bind(this)}
          editScreen="UserEditScreen"
        />
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

export default withRouter(UsersList);

Logger.log('silly', `UsersList loaded.`);
