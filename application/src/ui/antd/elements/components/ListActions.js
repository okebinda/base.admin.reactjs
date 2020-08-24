import React from 'react';
import {withRouter} from "react-router";
import {Translation, getI18n} from 'react-i18next';
import {Button, Popconfirm, Space} from 'antd';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';

import message from '../lib/MessageWrapper';
import {pathTo} from '../../Routes';


const ListActions = ({id, page, limit, order, load, remove, editScreen, history, ...props}) => {

  const confirm = id => {
    remove(id, (success) => {
      if (success) {
        load(page, limit, order);
        message.success(getI18n().t('feedback_delete_success'));
      } else {
        message.error(getI18n().t('feedback_delete_error'));
      }
    });
  }

  return (
    <Translation>{(t) =>
      <>
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={e => history.push(pathTo(editScreen, {id: id}))}
          />
          <Popconfirm
            placement="topRight"
            title={t('delete_confirm_body')}
            onConfirm={e => confirm(id)}
            okText={t('confirm_yes')}
            cancelText={t('confirm_cancel')}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      </>
    }</Translation>
  )
}

export default withRouter(ListActions);
