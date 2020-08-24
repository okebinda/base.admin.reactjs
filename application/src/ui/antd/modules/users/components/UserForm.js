import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom'
import {Translation, getI18n} from 'react-i18next';
import {Affix, Card, Checkbox, Col, DatePicker, Form, Input, Row, Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

import RoleInput from '../../roles/containers/RoleInputContainer';
import message from '../../../elements/lib/MessageWrapper';
import FormMetadata from '../../../elements/components/FormMetadata';
import {pathTo} from '../../../Routes';
import Format from '../../../../../lib/Format';
import Logger from '../../../../../lib/Logger';
import Config from '../../../../../Config';


const UserForm = ({id, data, errors, load, destroyForm, isLoading, isSubmitting, created_id, ...props}) => {

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
      setRedirectTo(pathTo('UserEditScreen', {id: created_id}));
    }
    return () => {
      destroyForm();
    }
  }, [created_id, setRedirectTo, destroyForm]);

  // submit data handler
  const submitData = async (values) => {
    Logger.log('debug', `UserForm.submitData(###)`);

    // API POST/PUT payload
    let payload = {
      'profile': {}
    };
    for (const input of Object.keys(data)) {
      if (input in values) {
        if (['first_name', 'last_name'].includes(input)) {
          payload['profile'][input] = values[input];
        }
        
        else if (['joined_at'].includes(input)) {
          payload['profile'][input] = Format.date(values[input], Config.get('API_DATETIME_FORMAT'));
        }
        
        else if (['is_verified'].includes(input)) {
          payload[input] = values[input] ? true : false;
        }
        
        else {
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
    Logger.log('debug', `UserForm.handleFinish(###)`);
    if (!props.isSubmitting) {
      await submitData(values);
    }
  }

  // form error handler
  const handleFinishFailed = ({values, errorFields, outOfDate}) => {
    Logger.log('debug', `UserForm.handleFinishFailed(###)`);
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
        <div className="user-form">
          <Form
            name="user_form"
            form={form}
            initialValues={data}
            onFinish={handleFinish}
            onFinishFailed={handleFinishFailed}
            {...layout.main}
          >
            <Row gutter={16}>

              <Col xs={24} lg={18}>
                <Card
                  title={id ? t('users_edit_title') : t('users_add_title')}
                  extra={isLoading
                    ? <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />
                    : null}
                >

                  <div className="form-group">
                    <Form.Item
                      name="username"
                      label={t('users_username')}
                      rules={[
                        {required: true, message: t('feedback_validation_required')},
                        {type: 'string', min: 2, max: 40, message: t('feedback_validation_char_range', {min: 2, max: 40})},
                        {pattern: /^\w+$/, message: t('feedback_validation_alphanumeric')},
                        {pattern: /(?!^\d+$)^.+$/, message: t('feedback_validation_not_number')},
                      ]}
                    >
                      <Input autoFocus disabled={isLoading || isSubmitting} />
                    </Form.Item>
                  </div>

                  <div className="form-group">
                    <Form.Item
                      name="email"
                      label={t('users_email')}
                      rules={[
                        {required: true, message: t('feedback_validation_required')},
                        {type: 'email', message: t('feedback_validation_email')},
                      ]}
                    >
                      <Input disabled={isLoading || isSubmitting} />
                    </Form.Item>
                  </div>

                  <div className="form-group">
                    <RoleInput
                      name="roles"
                      label={t('users_roles')}
                      type="user"
                    />
                  </div>
                  
                  <div className="form-group">
                    <Form.Item
                      name="is_verified"
                      label={t('users_is_verified')}
                      valuePropName="checked"
                    >
                      <Checkbox disabled={isLoading || isSubmitting} />
                    </Form.Item>
                  </div>

                </Card>

                <Card
                  title={t('users_header_profile')}
                >

                  <div className="form-group">
                    <Form.Item
                      name="first_name"
                      label={t('users_first_name')}
                      rules={[
                        {required: true, message: t('feedback_validation_required')},
                        {type: 'string', min: 1, max: 40, message: t('feedback_validation_char_range', {min: 1, max: 40})},
                      ]}
                    >
                      <Input disabled={isLoading || isSubmitting} />
                    </Form.Item>
                  </div>

                  <div className="form-group">
                    <Form.Item
                      name="last_name"
                      label={t('users_last_name')}
                      rules={[
                        {required: true, message: t('feedback_validation_required')},
                        {type: 'string', min: 2, max: 40, message: t('feedback_validation_char_range', {min: 2, max: 40})},
                      ]}
                    >
                      <Input disabled={isLoading || isSubmitting} />
                    </Form.Item>
                  </div>

                  <div className="form-group">
                    <Form.Item
                      name="joined_at"
                      label={t('users_joined_at')}
                      rules={[
                        {required: true, message: t('feedback_validation_required')},
                      ]}
                    >
                      <DatePicker
                        showTime
                        disabled={isLoading || isSubmitting}
                        format={Config.get('DEFAULT_DATETIME_FORMAT')}
                      />
                    </Form.Item>
                  </div>

                </Card>

                <Card
                  title={t('users_header_password')}
                >

                  <div className="form-group">
                    <Form.Item
                      name="password"
                      label={t('users_password')}
                      extra={id ? t('users_password_last_changed_at') : null}
                      rules={[
                        {required: id ? false : true, message: t('feedback_validation_required')},
                        {type: 'string', min: 8, max: 40, message: t('feedback_validation_char_range', {min: 8, max: 40})},
                        {pattern: /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,40}$/, message: t('feedback_validation_password_complexity')},
                      ]}
                    >
                      <Input.Password disabled={isLoading || isSubmitting} />
                    </Form.Item>
                  </div>

                  {props.passwordChangedAt
                    ? <Row>
                        <Col span={layout.main.wrapperCol.span} offset={layout.main.labelCol.span}>
                          <p>{t('users_password_last_changed_at')} <b>{Format.date(props.passwordChangedAt, Config.get('DEFAULT_DATETIME_FORMAT'))}</b></p>
                        </Col>
                      </Row>
                    : null}

                </Card>

              </Col>

              <Col xs={24} lg={6}>
                <Affix offsetTop={10}>
                  <Card title={t('form_metadata_header')}>
                    <FormMetadata
                      id={id}
                      isSubmitting={isSubmitting}
                      delete={props.remove.bind(this)}
                      deleteRedirectTo="UsersScreen"
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

export default UserForm;

Logger.log('silly', `UserForm loaded.`);
