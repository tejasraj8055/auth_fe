import React, { useEffect } from 'react'
import { Form, Input, Button, Typography, Row, Col, Image } from 'antd';
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../assets/logo.svg'
import './ResetPassword.css';
import { RESET, resetPassword } from '../../redux/authSlice';

const ResetPassword = () => {
    const { loading, isPasswordReset } = useSelector(state => state.auth)
    const { token } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    useEffect(() => {
        RESET()
        if (isPasswordReset) {
            setTimeout(() => {
                navigate('/login')
            }, 3000);
        }
    }, [isPasswordReset])
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        console.log(token)
        dispatch(resetPassword({ password: values.password, token: token }))
    }
    return (
        <div className='reset-password-container'>
            <Row justify={'start'}>
                <Col style={{ margin: '20px' }}>
                    <Image src={logo} width={200} preview={false} />
                </Col>
            </Row>
            <Row>

                <Col span={6} offset={9}>
                    <Row justify="center" style={{ marginTop: '20px' }}>

                        <h1>Reset Password</h1>

                    </Row>
                    <Form form={form} name="reset-password-form" onFinish={onFinish} layout='vertical'>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your new password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="New Password" />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your new password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('The two passwords do not match!');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Confirm Password" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={loading}>
                                Reset Password
                            </Button>
                        </Form.Item>
                    </Form>
                    <Button type='link' onClick={() => navigate('/login')} >Back to Login</Button>
                </Col>
            </Row>
            <div className="footer">
                {/* Add your footer content here */}
                &copy; {new Date().getFullYear()} My Company
            </div>
        </div>
    )
}

export default ResetPassword