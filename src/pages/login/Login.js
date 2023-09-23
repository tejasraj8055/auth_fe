import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, Row, Col, Image } from 'antd';
import logo from '../../assets/logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import './Login.css';
import { login } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
    const { isLoading, isAuthenticated } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, navigate])
    

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        dispatch(login(values))
    };

    const handleForgotPassword = () => {
        // Add your "Forgot Password" logic here
        console.log('Forgot Password clicked');
        navigate('/forgot-password')
    };

    return (
        <div className='login-container'>
            <Row justify={'start'}>
                <Col style={{ margin: '20px' }}>
                    <Image src={logo} width={200} preview={false} />
                </Col>
            </Row>
            <Row>

                <Col span={6} offset={9}>
                    <Row justify="center" style={{ marginTop: '20px' }}>

                        <h1>Login</h1>
                    </Row>
                    <Form form={form} name="login-form" onFinish={onFinish} layout='vertical'>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>

                        <Button type='link' onClick={handleForgotPassword}>Forgot Password</Button>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={isLoading} block>
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <div className="footer">
                {/* Add your footer content here */}
                &copy; {new Date().getFullYear()} My Company
            </div>
        </div>
    );
};

export default Login;
