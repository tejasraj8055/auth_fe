import React from 'react';
import { Layout, Row, Col } from 'antd';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Home from '../../pages/home/Home';
import Navbar from '../navbar/Navbar';
import Login from './../../pages/login/Login';
import FormComponent from '../../pages/form/FormComponent';

const { Content } = Layout;

const AuthenticatedLayout = () => {
  return (
    <Layout>
      <Row style={{ minHeight: '100vh' }}>
        <Row style={{ height: '10vh', width: '100%' }} align={'middle'}>
          <Navbar />
        </Row>
        <Row style={{ width: '100%' }}>
          <Col style={{ height: '90vh', width: '15%', background: '#F6F8FC' }}>
            <Sidebar />
          </Col>
          <Col style={{ height: '90vh', width: '85%', overflowY: 'auto' }}>
            {/* content */}
            <Row style={{ height: '100%', width: '100%' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/form" element={<FormComponent />} />
              </Routes>
            </Row>
          </Col>
        </Row>
      </Row>
    </Layout>
  );
};

const UnauthenticatedLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

const AppLayout = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const navigate = useNavigate();

  return isAuthenticated ? <AuthenticatedLayout /> : <UnauthenticatedLayout />;
};

export default AppLayout;
