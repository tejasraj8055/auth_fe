import React from 'react'
import { Form, Input, Button, Typography, Row, Col, Image } from 'antd';
import logo from '../../assets/logo.svg'
import './ForgotPassword.css';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { forgotPassword } from '../../redux/authSlice';

const ForgotPassword = () => {
    const {loading} = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        dispatch(forgotPassword(values))
    }
    return (
        <div className='forgot-password-container'>
            <Row justify={'start'}>
                <Col style={{ margin: '20px' }}>
                    <Image src={logo} width={200} preview={false} />
                </Col>
            </Row>
            <Row>

                <Col span={6} offset={9}>
                    <Row justify="center" style={{ marginTop: '20px' }}>

                        <h1>Forgot Password</h1>
                        <p>Enter you email and we'll send you a link to reset your password</p>
                    </Row>
                    <Form form={form} name="forgot-password-form" onFinish={onFinish} layout='vertical'>
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

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} block>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <Button type='link' onClick={() => navigate('/login')}>Back to Login</Button>
                </Col>
            </Row>
            <div className="footer">
                {/* Add your footer content here */}
                &copy; {new Date().getFullYear()} My Company
            </div>
        </div>
    );
}

export default ForgotPassword