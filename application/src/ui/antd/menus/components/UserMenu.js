import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Menu, Modal, Progress} from 'antd';
import {UserOutlined, LogoutOutlined} from '@ant-design/icons';
import {Translation, getI18n} from 'react-i18next';

import {pathTo} from '../../Routes';
import Logger from '../../../../lib/Logger';
import Config from '../../../../Config';


const ReachableContext = React.createContext();

const UserMenu = (props) => {

  const [modal, contextHolder] = Modal.useModal();

  const logoutCountdown = Config.get('AUTO_LOGOUT_COUNTDOWN'); // seconds
  const countdownTimer = useRef();

  const [isLogoutConfirmModalVisible, setIsLogoutConfirmModalVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(logoutCountdown);

  const onLogoutClickHandler = (evt) => {
    Logger.log('debug', `UserMenu.onLogoutClickHandler()`);
    setTimeLeft(logoutCountdown);
    setIsLogoutConfirmModalVisible(true);
    modal.confirm({
      rootPrefixCls: 'ant',  // https://github.com/ant-design/ant-design/issues/25895
      prefixCls: 'ant-modal',
      title: getI18n().t('session_confirm_alert_logout_title'),
      content:  <>
                  {getI18n().t('session_confirm_alert_logout_body')}
                  <ReachableContext.Consumer>
                    {timeLeft => 
                      <Progress
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        percent={(timeLeft / logoutCountdown) * 100}
                        showInfo={false}
                      />}
                    </ReachableContext.Consumer>
                </>,
      onOk: logout,
      onCancel: () => {
        setIsLogoutConfirmModalVisible(false);
      },
      maskClosable: false,
      okText: getI18n().t('confirm_yes'),
      cancelText: getI18n().t('confirm_cancel')
    });
  }

  const logout = useCallback(() => {
    Logger.log('debug', `UserMenu.logout()`);
    props.destroySession(() => props.history.push(pathTo(Config.get('DEFAULT_LOGIN_SCREEN'))));
    clearInterval(countdownTimer.current);
  }, [props]);

  useEffect(() => {
    if (isLogoutConfirmModalVisible) {
      countdownTimer.current = setInterval(() => {
        setTimeLeft(timeLeft - 0.1);
        if(timeLeft < 0) {
          logout();
        }
      }, 100);
      return () => {
        clearInterval(countdownTimer.current);
      }
    } else {
      clearInterval(countdownTimer.current);
    }
  }, [isLogoutConfirmModalVisible, timeLeft, logout]);

  return (
    <Translation>{(t) => 
      <ReachableContext.Provider value={timeLeft}>
        <Menu selectable={false} onClick={() => props.clickHandler(false)}>

          <Menu.Item key="1">
            <Link to={pathTo('UserAccountScreen')}>
              <UserOutlined />
              {t('user_account_menu_item')}
            </Link>
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item key="2" onClick={onLogoutClickHandler}>
            <LogoutOutlined />
            {t('session_menu_item_signout')}
          </Menu.Item>
          
        </Menu>
        {contextHolder}

      </ReachableContext.Provider>
    }</Translation>
  )
}

export default withRouter(UserMenu);
