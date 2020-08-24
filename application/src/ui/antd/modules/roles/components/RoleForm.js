import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom'
import {Translation, getI18n} from 'react-i18next';
import {Affix, Card, Checkbox, Col, Form, Input, InputNumber, Row, Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

import message from '../../../elements/lib/MessageWrapper';
import FormMetadata from '../../../elements/components/FormMetadata';
import {pathTo} from '../../../Routes';
import Logger from '../../../../../lib/Logger';


const RoleForm = ({id, data, errors, load, destroyForm, isLoading, isSubmitting, created_id, ...props}) => {

  const [redirectTo, setRedirectTo] = useState(null);
  const [form] = Form.useForm();

  // form column settings
  const layout = {
    main: {
      labelCol: {span: 5},
      wrapperCol: {span: 19},
    },
  }

  // load record data from API
  useEffect(() => {
    if (id) {
      load(id);
    }
  }, [id, load]);

  // update input values when new data is available
  useEffect(() => {
    if (id && !isSubmitting) {
      form.setFieldsValue(data);
    }
  }, [form, data, isSubmitting, id]);

  // handle errors reported by API
  useEffect(() => {
    let firstFieldName = '';
    for (const field in errors) {
      form.setFields([{name: field, errors: errors[field]}]);
      if (firstFieldName === '') {
        firstFieldName = field;
      }
    }
    form.scrollToField(firstFieldName);
  }, [form, errors]);

  // redirect add form to edit form on successful create action
  useEffect(() => {
    if (created_id) {
      setRedirectTo(pathTo('RoleEditScreen', {id: created_id}));
    }
    return () => {
      destroyForm();
    }
  }, [created_id, setRedirectTo, destroyForm]);

  // submit data handler
  const submitData = async (values) => {
    Logger.log('debug', `RoleForm.submitData(###)`);

    // API POST/PUT payload
    let payload = {};
    for (const input of Object.keys(data)) {
      if (input in values) {
        if (['login_lockout_policy', 'login_ban_by_ip', 'password_policy', 'is_admin_role'].includes(input)) {
          payload[input] = values[input] ? true : false;
        } else {
          payload[input] = values[input];
        }
      }
    }

    if (id) { // update
      props.update(id, payload, (success) => {
        if (success) {
          message.success(getI18n().t('feedback_form_success'));
        } else {
          message.error(getI18n().t('feedback_form_error'));
        }
      });
    } else { // create
      props.create(payload, (success) => {
        if (success) {
          message.success(getI18n().t('feedback_form_success'));
        } else {
          message.error(getI18n().t('feedback_form_error'));
        }
      });      
    }
  }

  // form submit handler
  const handleFinish = async (values) => {
    Logger.log('debug', `RoleForm.handleFinish(###)`);
    if (!props.isSubmitting) {
      await submitData(values);
    }
  }

  // form error handler
  const handleFinishFailed = ({values, errorFields, outOfDate}) => {
    Logger.log('debug', `RoleForm.handleFinishFailed(###)`);
    message.error(getI18n().t('feedback_form_error'));
    if (errorFields && errorFields.length > 0) {
      form.scrollToField(errorFields[0].name);
    }
  }

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <Translation>{(t) => 
      <>
        <div className="role-form">
          <Form
            name="role_form"
            form={form}
            initialValues={data}
            onFinish={handleFinish}
            onFinishFailed={handleFinishFailed}
            {...layout.main}
          >
            <Row gutter={16}>

              <Col xs={24} lg={18}>
                <Card
                  title={id ? t('roles_edit_title') : t('roles_add_title')}
                  extra={isLoading
                    ? <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />
                    : null}
                >

                  <div className="form-group">
                    <Form.Item
                      name="name"
                      label={t('roles_name')}
                      rules={[
                        {required: true, message: t('feedback_validation_required')},
                        {type: 'string', min: 2, max: 32, message: t('feedback_validation_char_range', {min: 2, max: 32})},
                      ]}
                    >
                      <Input autoFocus disabled={isLoading || isSubmitting} />
                    </Form.Item>
                  </div>

                  <div className="form-group">
                    <Form.Item
                      name="priority"
                      label={t('roles_priority')}
                      rules={[
                        {required: true, message: t('feedback_validation_required')},
                        {type: 'number', message: t('feedback_validation_number')},
                        {type: 'number', min: 0, max: 32767, message: t('feedback_validation_range', {min: 0, max: 32767})},
                      ]}
                    >
                      <InputNumber min={0} max={32767} disabled={isLoading || isSubmitting} />
                    </Form.Item>
                  </div>

                  <div className="form-group">
                    <Form.Item
                      name="is_admin_role"
                      label={t('roles_is_admin_role')}
                      valuePropName="checked"
                    >
                      <Checkbox disabled={isLoading || isSubmitting} />
                    </Form.Item>
                  </div>

                </Card>

                <Card
                  title={t('roles_header_login_policy')}
                  extra={isLoading
                    ? <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />
                    : null}
                >

                  <div className="form-group">
                    <Form.Item
                      name="login_lockout_policy"
                      label={t('roles_login_lockout_policy')}
                      valuePropName="checked"
                    >
                      <Checkbox disabled={isLoading || isSubmitting} />
                    </Form.Item>
                  </div>

                  <div className="form-group">
                    <Form.Item
                      name="login_max_attempts"
                      label={t('roles_login_max_attempts')}
                      rules={[
                        {required: true, message: t('feedback_validation_required')},
                        {type: 'number', message: t('feedback_validation_number')},
                        {type: 'number', min: 0, max: 32767, message: t('feedback_validation_range', {min: 0, max: 32767})},
                      ]}
                    >
                      <InputNumber min={0} max={32767} disabled={isLoading || isSubmitting} />
                    </Form.Item>
                  </div>

                  <div className="form-group">
                    <Form.Item
                      name="login_timeframe"
                      label={t('roles_login_timeframe')}
                      rules={[
                        {required: true, message: t('feedback_validation_required')},
                        {type: 'number', message: t('feedback_validation_number')},
                        {type: 'number', min: 0, max: 32767, message: t('feedback_validation_range', {min: 0, max: 32767})},
                      ]}
                    >
                      <InputNumber min={0} max={32767} disabled={isLoading || isSubmitting} />
                    </Form.Item>
                  </div>

                  <div className="form-group">
                    <Form.Item
                      name="login_ban_time"
                      label={t('roles_login_ban_time')}
                      rules={[
                        {required: true, message: t('feedback_validation_required')},
                        {type: 'number', message: t('feedback_validation_number')},
                        {type: 'number', min: 0, max: 32767, message: t('feedback_validation_range', {min: 0, max: 32767})},
                      ]}
                    >
                      <InputNumber min={0} max={32767} disabled={isLoading || isSubmitting} />
                    </Form.Item>
                  </div>

                  <div className="form-group">
                    <Form.Item
                      name="login_ban_by_ip"
                      label={t('roles_login_ban_by_ip')}
                      valuePropName="checked"
                    >
                      <Checkbox disabled={isLoading || isSubmitting} />
                    </Form.Item>
                  </div>

                </Card>

                <Card
                  title={t('roles_header_password_policy')}
                  extra={isLoading
                    ? <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />
                    : null}
                >

                  <div className="form-group">
                    <Form.Item
                      name="password_policy"
                      label={t('roles_password_policy')}
                      valuePropName="checked"
                    >
                      <Checkbox disabled={isLoading || isSubmitting} />
                    </Form.Item>
                  </div>

                  <div className="form-group">
                    <Form.Item
                      name="password_reuse_history"
                      label={t('roles_password_reuse_history')}
                      rules={[
                        {required: true, message: t('feedback_validation_required')},
                        {type: 'number', message: t('feedback_validation_number')},
                        {type: 'number', min: 0, max: 32767, message: t('feedback_validation_range', {min: 0, max: 32767})},
                      ]}
                    >
                      <InputNumber min={0} max={32767} disabled={isLoading || isSubmitting} />
                    </Form.Item>
                  </div>

                  <div className="form-group">
                    <Form.Item
                      name="password_reset_days"
                      label={t('roles_password_reset_days')}
                      rules={[
                        {required: true, message: t('feedback_validation_required')},
                        {type: 'number', message: t('feedback_validation_number')},
                        {type: 'number', min: 0, max: 32767, message: t('feedback_validation_range', {min: 0, max: 32767})},
                      ]}
                    >
                      <InputNumber min={0} max={32767} disabled={isLoading || isSubmitting} />
                    </Form.Item>
                  </div>

                </Card>

              </Col>

              <Col xs={24} lg={6}>
                <Affix offsetTop={10}>
                  <Card title={t('form_metadata_header')}>
                    <FormMetadata
                      id={id}
                      showStatus={false}
                      isSubmitting={isSubmitting}
                      delete={props.remove.bind(this)}
                      deleteRedirectTo="RolesScreen"
                      createdAt={props.createdAt}
                      updatedAt={props.updatedAt}
                    />
                  </Card>
                </Affix>
              </Col>

            </Row>
          </Form>
        </div>
      </>
    }</Translation>
  );
}

export default RoleForm;

Logger.log('silly', `RoleForm loaded.`);
