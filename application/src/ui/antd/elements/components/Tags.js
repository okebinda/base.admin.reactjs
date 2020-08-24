import React from 'react';
import {Translation} from 'react-i18next';
import {Tag} from 'antd';


const BooleanTag = ({value, ...props}) => {
  return (
    <Translation>{(t) =>
      <Tag color={value ? "green" : "red"}>{value ? t('boolean_true') : t('boolean_false')}</Tag>
    }</Translation>
  )
}

const StatusTag = ({status, ...props}) => {

  const labels = {
    1: "status_enabled",
    2: "status_disabled",
    3: "status_archived",
    4: "status_deleted",
    5: "status_pending"
  };

  const colors = {
    1: "success",
    2: "default",
    3: "warning",
    4: "error",
    5: "processing"
  };

  return (
    <Translation>{(t) =>
      <Tag color={colors[status]}>{t(labels[status])}</Tag>
    }</Translation>
  )
}

export {BooleanTag, StatusTag};
