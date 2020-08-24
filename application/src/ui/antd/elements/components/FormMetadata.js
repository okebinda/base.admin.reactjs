import React, {useState} from 'react';
import {Translation, getI18n} from 'react-i18next';
import {Redirect} from 'react-router-dom'
import {Button, Form, Popconfirm, Select, Space} from 'antd';
import {CheckCircleOutlined, DeleteOutlined} from '@ant-design/icons';

import message from '../lib/MessageWrapper';
import useWindowDimensions from '../../../../lib/WindowDimensions';
import {pathTo} from '../../Routes';
import Config from '../../../../Config';
import Format from '../../../../lib/Format';


const StatusInput = ({isLoading, isSubmitting, ...props}) => {

  const options = {
    1: 'status_enabled',
    2: 'status_disabled',
    3: 'status_archived',
    4: 'status_deleted',
    5: 'status_pending',
  };

  return (
    <Translation>{(t) => 
      <div className="form-group">
        <Form.Item
          name="status"
          label={t('form_input_status')}
          labelCol={{span: 24}}
          wrapperCol={{span: 24}}
          rules={[
            {required: true, message: t('feedback_validation_required')},
          ]}
        >
          <Select disabled={isLoading || isSubmitting}>
            {Object.keys(options).map(x => <Select.Option key={x} value={x}>{t(options[x])}</Select.Option>)}
          </Select>
        </Form.Item>
      </div>
    }</Translation>
  )
}

const FormMetadata = ({id, isSubmitting, deleteRedirectTo, showStatus=true, ...props}) => {

  const [redirectTo, setRedirectTo] = useState(null);
  const {width} = useWindowDimensions();

  const confirm = id => {
    props.delete(id, (suceess) => {
      if (suceess) {
        setRedirectTo(pathTo(deleteRedirectTo));
        message.success(getI18n().t('feedback_delete_success'));
      } else {
        message.error(getI18n().t('feedback_delete_error'));
      }
    });
  }

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <Translation>{(t) =>
      <>

      {props.createdAt
        ? <p>{t('form_metadata_created_at')} <small>{Format.date(props.createdAt, Config.get(width < 992 || width > 1250 ? 'DEFAULT_DATETIME_FORMAT' : 'DEFAULT_DATE_FORMAT'))}</small></p>
        : ''}
      {props.updatedAt && props.updatedAt !== props.createdAt
        ? <p>{t('form_metadata_updated_ad')} <small>{Format.date(props.updatedAt, Config.get(width < 992 || width > 1250 ? 'DEFAULT_DATETIME_FORMAT' : 'DEFAULT_DATE_FORMAT'))}</small></p>
        : ''}

        {showStatus ? <StatusInput /> : null}

        <div className="form-actions">

          <Space>
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              htmlType="submit"
              loading={isSubmitting}
            >
              {t('form_button_submit')}
            </Button>

            {id
              ? <Popconfirm
                  placement="topRight"
                  title={getI18n().t('delete_confirm_body')}
                  onConfirm={e => confirm(id)}
                  okText={getI18n().t('confirm_yes')}
                  cancelText={getI18n().t('confirm_cancel')}
                >
                  <Button
                    danger
                    type="primary"
                    icon={<DeleteOutlined />}
                  >
                    {width < 992 || width >= 1300 ? t('action_delete') : null}
                  </Button>
                </Popconfirm>
              : null}
          </Space>

        </div>
      </>
    }</Translation>
  )
}

export default FormMetadata;
