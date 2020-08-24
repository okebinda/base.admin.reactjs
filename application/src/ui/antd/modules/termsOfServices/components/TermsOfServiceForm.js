import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom'
import {Translation, getI18n} from 'react-i18next';
import {Affix, Card, Col, DatePicker, Form, Input, Row, Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

import message from '../../../elements/lib/MessageWrapper';
import FormMetadata from '../../../elements/components/FormMetadata';
import {pathTo} from '../../../Routes';
import Format from '../../../../../lib/Format';
import Logger from '../../../../../lib/Logger';
import Config from '../../../../../Config';


const TermsOfServiceForm = ({id, data, errors, load, destroyForm, isLoading, isSubmitting, created_id, ...props}) => {

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
      setRedirectTo(pathTo('TermsOfServiceEditScreen', {id: created_id}));
    }
    return () => {
      destroyForm();
    }
  }, [created_id, setRedirectTo, destroyForm]);

  // submit data handler
  const submitData = async (values) => {
    Logger.log('debug', `TermsOfServiceForm.submitData(###)`);

    // API POST/PUT payload
    let payload = {};
    for (const input of Object.keys(data)) {
      if (input in values) {
        if (['publish_date'].includes(input)) {
          payload[input] = Format.date(values[input], Config.get('API_DATETIME_FORMAT'));
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
    Logger.log('debug', `TermsOfServiceForm.handleFinish(###)`);
    if (!props.isSubmitting) {
      await submitData(values);
    }
  }

  // form error handler
  const handleFinishFailed = ({values, errorFields, outOfDate}) => {
    Logger.log('debug', `TermsOfServiceForm.handleFinishFailed(###)`);
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
        <div className="terms-of-service-form">
          <Form
            name="terms_of_service_form"
            form={form}
            initialValues={data}
            onFinish={handleFinish}
            onFinishFailed={handleFinishFailed}
            {...layout.main}
          >
            <Row gutter={16}>

              <Col xs={24} lg={18}>
                <Card
                  title={id ? t('terms_of_service_edit_title') : t('terms_of_service_add_title')}
                  extra={isLoading
                    ? <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />
                    : null}
                >

                  <div className="form-group">
                    <Form.Item
                      name="version"
                      label={t('terms_of_services_version')}
                      rules={[
                        {required: true, message: t('feedback_validation_required')},
                        {type: 'string', min: 1, max: 10, message: t('feedback_validation_char_range', {min: 1, max: 10})},
                      ]}
                    >
                      <Input autoFocus disabled={isLoading || isSubmitting} />
                    </Form.Item>
                  </div>

                  <div className="form-group">
                    <Form.Item
                      name="publish_date"
                      label={t('terms_of_services_publish_date')}
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

                  <div className="form-group">
                    <Form.Item
                      name="text"
                      label={t('terms_of_services_text')}
                      rules={[
                        {required: true, message: t('feedback_validation_required')},
                      ]}
                    >
                      <Input.TextArea rows={10} disabled={isLoading || isSubmitting} />
                    </Form.Item>
                  </div>

                </Card>
              </Col>

              <Col xs={24} lg={6}>
                <Affix offsetTop={10}>
                  <Card title={t('form_metadata_header')}>
                    <FormMetadata
                      id={id}
                      isSubmitting={isSubmitting}
                      delete={props.delete.bind(this)}
                      deleteRedirectTo="TermsOfServicesScreen"
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

export default TermsOfServiceForm;

Logger.log('silly', `TermsOfServiceForm loaded.`);
