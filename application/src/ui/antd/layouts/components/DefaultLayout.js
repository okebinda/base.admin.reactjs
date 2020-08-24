import React, {Suspense, useState} from 'react';
import {Button, Drawer, Dropdown, Layout} from 'antd';
import {MenuOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {Translation} from 'react-i18next';

import {MainRoutes} from '../../Routes';
import MainMenu from '../../menus/containers/MainMenuContainer';
import DrawerMenu from '../../menus/containers/DrawerMenuContainer';
import UserMenu from '../../menus/containers/UserMenuContainer';
import Loading from '../../elements/components/Loading';
import Breadcrumbs from '../../elements/components/Breadcrumbs';
import useWindowDimensions from '../../../../lib/WindowDimensions';
import Config from '../../../../Config';

import '../styles/DefaultLayout.scss';

const {Header, Content, Footer, Sider} = Layout;


const DefaultLayout = props => {

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userMenuVisible, setUserMenuVisible] = useState(false);

  const {width} = useWindowDimensions();
  const collapseSidebarWidth = Config.get('UI_COLLAPSE_SIDEBAR_WIDTH');

  const loading = () => <Loading />;

  const toggle = () => {
    props.uiChangeMenuCollapsed();
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const toggleUserMenu = flag => {
    setUserMenuVisible(flag);
  };

  return (
    <Translation>{(t) => 
      <div className="default-layout">
        <Layout>

          <Drawer
            closable={false}
            placement="right"
            onClose={toggleDrawer}
            visible={drawerVisible}
          >
            <DrawerMenu toggleDrawer={toggleDrawer.bind(this)} />
          </Drawer>

          <Sider
            trigger={null}
            collapsible
            collapsed={props.isMenuCollapsed || width <= collapseSidebarWidth}
          >
            <div className="logo" />
            <MainMenu currentPath={props.location.pathname} />
          </Sider>

          <Layout>

            <Header>

              <div className="main-nav-controls">
                {width > collapseSidebarWidth
                  ? (props.isMenuCollapsed
                    ? <MenuUnfoldOutlined className="trigger" onClick={toggle} />
                    : <MenuFoldOutlined className="trigger" onClick={toggle} />)
                  : null
                }
                <div style={{float: 'right'}}>
                  <Dropdown
                    overlay={<UserMenu clickHandler={toggleUserMenu.bind(this)} />}
                    overlayStyle={{zIndex: 950}}
                    trigger={['click']}
                    onVisibleChange={toggleUserMenu}
                    visible={userMenuVisible}
                  >
                    <Button>
                      <MenuOutlined />
                    </Button>
                  </Dropdown>
                </div>
              </div>
              
              <div className="mobile-nav-controls">
                <div style={{float: 'right'}}>
                  <Button onClick={toggleDrawer}>
                    <MenuOutlined className="trigger-drawer" />
                  </Button>
                </div>
                <h1>{t('app_name')}</h1>
              </div>

            </Header>

            <Content>
              <Breadcrumbs pathname={props.location.pathname} />
              <div id="content-main">
                <Suspense fallback={loading()}>
                  <MainRoutes />
                </Suspense>
              </div>
            </Content>

            <Footer>{t('copyright')}</Footer>

          </Layout>
        </Layout>
      </div>
    }</Translation>
  );
}

export default DefaultLayout;
