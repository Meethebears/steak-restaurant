'use client';

import styles from './page.module.css'
import { Button, Form, Input, Alert, Space, notification } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AddProduct = () => {
    type NotificationType = 'success' | 'info' | 'warning' | 'error';
    const [form] = Form.useForm();

    const [visible, setVisible] = useState(false);

    const router = useRouter()
    const [api, contextHolder] = notification.useNotification();

    const OpenNotificationWithIcon = (type: NotificationType, message: string) => {
        if (type == "success") {
            api[type]({
                message: 'Success',
                description:
                    'AddProduct Data has been recorded successfully.',
            });
        } else {
            api[type]({
                message: message,
                description:
                    'AddProduct Data has been recorded is fail.',
            });
        }
    };

    const onFinish = async (values: any) => {
        const value = {
            name: values.productname,
            price: Number(values.price),
            img: values.img
        }

        let data;
        data = await axios.post('http://localhost:5000/api/product', value)
            .then((response) => {
                if (response.statusText == "OK") {
                    OpenNotificationWithIcon('success', '')
                    console.log(response);
                    form.resetFields();
                }
            })
            .catch((err) => {
                OpenNotificationWithIcon('error', err)
                console.log("Error", err);
            }
            )
    };

    type FieldType = {
        productname: string;
        price: number;
        img: string;
    };

    return (
        <>
            {contextHolder}
            <main className={styles.main}>
                <div>
                    <h1 style={{ marginBottom: 40 }}>เพิ่มรายการสินค้า</h1>
                    <Form
                        form={form}
                        name='addproduct'
                        labelCol={{ span: 8 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                    >
                        <Form.Item<FieldType>
                            label="ชื่อสินค้า"
                            name="productname"
                            rules={[{ required: true, message: 'Please input your product name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="ราคาสินค้า"
                            name="price"
                            rules={[{ required: true, message: 'Please input your price!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Link รูปภาพ"
                            name="img"
                            rules={[{ required: true, message: 'Please input your Link img!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </main>
        </>
    )
}

export default AddProduct