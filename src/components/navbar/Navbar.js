import React, { useState } from 'react';
import { Layout, Row, Col, Button, Modal } from 'antd';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Routes, Route, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { useDispatch } from 'react-redux';
import { RESET, logout } from '../../redux/authSlice';

const { Header } = Layout;

const navbarStyle = {
  background: 'white',
  borderBottom: '1px solid #ddd',
  width: '100%',
  height: '100%',
};

const buttonStyle = {
  verticalAlign: 'middle',
};

const iconButton = (icon, label, onClick) => (
  <Button type="link" size="large" icon={icon} style={buttonStyle} onClick={onClick}>
    {label}
  </Button>
);

const LogoutModal = ({ visible, onCancel, onConfirm }) => (
  <Modal
    title="Logout"
    visible={visible}
    onOk={() => {
      onConfirm();
      onCancel();
    }}
    onCancel={onCancel}
  >
    <p>Are you sure you want to logout?</p>
  </Modal>
);

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const handleLogout = () => {
    setIsLogoutModalVisible(true);
  };

  const handleConfirmLogout = () => {
    dispatch(logout());
    dispatch(RESET());
    navigate('/login');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <Header style={navbarStyle}>
      <LogoutModal
        visible={isLogoutModalVisible}
        onCancel={() => setIsLogoutModalVisible(false)}
        onConfirm={handleConfirmLogout}
      />
      <Row justify="space-between">
        <Col span={6} style={{ marginTop: '5px' }}>
          <img src={logo} alt="Logo" width={150} />
        </Col>
        <Col span={6} style={{ marginTop: '10px' }}>
          <Row justify="end" align="middle">
            {iconButton(<SettingOutlined />, '', handleSettingsClick)}
            {iconButton(<UserOutlined />, '', handleProfileClick)}
            {iconButton(<LogoutOutlined />, '', handleLogout)}
          </Row>
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;
