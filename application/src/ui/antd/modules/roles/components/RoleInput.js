import React, {useEffect} from 'react';
import {getI18n} from 'react-i18next';
import {Checkbox, Form} from 'antd';

import Logger from '../../../../../lib/Logger';


const RoleInput = ({name, label, roles, load, isLoading=true, isSubmitting=false, ...props}) => {

  useEffect(() => {
    load();
  }, [load]);

  // Using these because ant design is picky with its input fields:
  //  Form, Form.Item & Input need to be directly nested (i.e.: no <Translation> in the middle),
  //  and doesn't like setting 'name' prop on Form.Item w/o Input element (i.e.: shouldn't render loading text)
  const loadingText = getI18n().t('feedback_loading');
  const validationRequiredText = getI18n().t('feedback_validation_required');
  const showInputs = roles.length < 1 && isLoading;

  return (
    <>
      {showInputs

        ? <Form.Item
            label={label}
          >
            {loadingText}
          </Form.Item>

        : <Form.Item
            name={name}
            label={label}
            rules={[
              {required: true, message: validationRequiredText},
            ]}
          >
            <Checkbox.Group options={roles} disabled={isLoading || isSubmitting} />
          </Form.Item>}
    </>
  );
}

export default RoleInput;

Logger.log('silly', `RoleInput loaded.`);
