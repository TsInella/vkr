import React, { useState } from 'react';
import { Card, Tag, Form, Input, Button, Row, Col, notification } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import Header from "../components/Header";
import styles from './Account.module.scss';

const Account: React.FC = () => {
    const [form] = Form.useForm();
    const [userData] = useState({
        active: true,
        fullName: null,
        email: null,
    });

    const onFinish = (values: any) => {
        notification.success({
            message: 'Данные сохранены',
            icon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
        });
        console.log('Обновленные данные:', values);
    };

    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.content}>

                    <Row gutter={[32, 32]}>
                        <Col xs={24} md={8}>
                            <div
                                className={styles.cardTitle}>Пропуск</div>
                                <div className={styles.statusWrapper}>
                                    <Tag
                                        className={userData.active ? styles.activeTag : styles.inactiveTag}
                                    >
                                        {userData.active ? 'Активен' : 'Не активен'}
                                    </Tag>
                                    <div className={styles.statusGlow} />
                                </div>
                        </Col>

                        <Col xs={24} md={16}>
                            <div
                                 className={styles.cardTitle}>Редактировать профиль</div>
                                <Form
                                    form={form}
                                    layout="vertical"
                                    initialValues={userData}
                                    onFinish={onFinish}
                                    className={styles.form}
                                >
                                    {/* Добавленные поля формы */}
                                    <Form.Item
                                        name="fullName"
                                    >
                                        <Input size="large" placeholder="Имя" />
                                    </Form.Item>

                                    <Form.Item
                                        name="email"
                                    >
                                        <Input size="large" placeholder="Email" />
                                    </Form.Item>

                                    <Form.Item

                                        name="password"
                                        rules={[{ min: 6, message: 'Минимум 6 символов' }]}
                                    >
                                        <Input.Password size="large" placeholder="Новый пароль" />
                                    </Form.Item>

                                    <Form.Item

                                        name="confirmPassword"
                                        dependencies={['password']}
                                        rules={[
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('Пароли не совпадают'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password size="large" placeholder="Повторите пароль" />
                                    </Form.Item>

                                    <Button
                                        type="primary"
                                        className={styles.saveButton}
                                        htmlType="submit"
                                    >
                                        Сохранить изменения
                                    </Button>
                                </Form>

                        </Col>
                    </Row>

            </div>
        </div>
    );
};

export default Account;