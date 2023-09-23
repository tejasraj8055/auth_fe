import React from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const  navigate  = useNavigate();
  const onClick = (e) => {
    console.log('click', e);
    navigate(e.key);
  };
  // Retrieve the menu data from localStorage and parse it into an array
  const menu = JSON.parse(localStorage.getItem('menu'));
  console.log(menu);

  return (
    <Menu
      onClick={onClick}
      style={{
        width: '100%',
        height: '100%',
      }}
      mode="vertical"
    >
      {menu.map((menuItem) => {
        const { name, icon, link, role } = menuItem;
        const allowedRoles = role || []; // Ensure a default value for roles

        // Check if the user has a role that allows them to see this menu item
        if (allowedRoles.includes('admin')) {
          return (
            <Menu.Item key={link} icon={getIcon(icon)}>
              {name}
            </Menu.Item>
          );
        }

        return null; // Hide the menu item if the user doesn't have the required role
      })}
    </Menu>
  );
};

function getIcon(iconName) {
  switch (iconName) {
    case 'dashboard':
      return <MailOutlined />;
    case 'people':
      return <SettingOutlined />;
    case 'calendar_today':
      return <SettingOutlined />;
    case 'payments':
      return <SettingOutlined />;
    case 'settings':
      return <SettingOutlined />;
    default:
      return null;
  }
}

export default Sidebar;
