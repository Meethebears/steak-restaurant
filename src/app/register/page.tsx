"use client";
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'
import type { FormProps } from 'antd';
import styles from './page.module.css'
import './style.css'
import { useRouter } from 'next/navigation'
import { Button, Checkbox, Form, Input, Card } from "antd";
import Menu from "../Menu"
import Loading from '../component/Loading'
import useCreateUser from './api/useCreateUser'

const Register = () => {
     const [createUserResult,LoadingcreateUser,createUser] = useCreateUser();

    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            const result = await createUser({username:values.username,password:values.password});
            console.log(result)
            if (result.success) {
                console.log("User created successfully!");
            } else {
                console.log("Error creating user:", result.errorMessage);
            }
        } catch (error) {
            console.error("Error in onFinish:", error);
        }
    }
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <main className={styles.main}>
            <Card>
                <h1>
                    Register Page
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
export default Register