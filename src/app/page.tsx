'use client'
import styles from './page.module.css'
import type { FormProps } from 'antd';
import { signIn } from 'next-auth/react';
import { Button, Checkbox, Form, Input, Card, message } from "antd";
import { useRouter } from 'next/navigation';

const LoginPage = () => {

    const router = useRouter()
    const [messageApi, contextHolder] = message.useMessage()

    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            let username = values.username
            let password = values.password
            const result = await signIn('credentials', {
                redirect: false,
                username,
                password
            })
            if (!result || result.error) {
                console.error(result?.error || 'Unknown error');
                messageApi.open({
                    type: 'error',
                    content: 'Login failed',
                });
                return false;
            }
            router.push('/home')
        } catch (err) {
            console.log(err)
            alert('Login failed')
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <main className={styles.main}>
            {contextHolder}
            <Card>
                <h1>
                    Login Page
                </h1>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        username: '',
                        password: '',
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" label={null}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </main>
    )
}

export default LoginPage