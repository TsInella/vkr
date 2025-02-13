import React, { useState } from 'react';
import { Card, Avatar, Tag, Form, Input, Button, DatePicker, Upload, notification, Row, Col } from 'antd';
import { CheckCircleFilled, UserOutlined, UploadOutlined } from '@ant-design/icons';

const Account: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        avatar: 'https://example.com/avatar.jpg',
        active: true,
        fullName: 'Иванов Иван Иванович',
        passport: {
            series: '4510',
            number: '123456',
            issuedBy: 'ОУФМС России',
            issueDate: '2015-04-25',
            code: '123-456',
            birthDate: '1990-01-01',
            birthPlace: 'г. Москва',
            registration: 'г. Москва, ул. Тверская, д.1',
        },
        vehicle: {
            brand: 'Toyota',
            model: 'Camry',
            number: 'A123BC77',
            color: 'Черный',
            owner: 'Иванов И.И.',
        },
    });

    const handleUpload = (info: any) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Здесь должна быть логика загрузки на сервер
            setUserData({ ...userData, avatar: info.file.response.url });
            setLoading(false);
        }
    };

    const onFinish = (values: any) => {
        setUserData({ ...userData, ...values });
        notification.success({
            message: 'Данные сохранены',
            icon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
        });
    };

    return (
        <Card title="Личный кабинет" style={{ margin: 16 }}>
            <Row gutter={24}>
                <Col span={6}>
                    <div style={{ textAlign: 'center' }}>
                        <Avatar
                            size={128}
                            src={userData.avatar}
                            icon={<UserOutlined />}
                            style={{ marginBottom: 16 }}
                        />
                        <Tag color={userData.active ? 'green' : 'red'}>
                            {userData.active ? 'Активно' : 'Не активно'}
                        </Tag>
                        <Upload
                            name="avatar"
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={handleUpload}
                        >
                            <Button icon={<UploadOutlined />} style={{ marginTop: 16 }}>
                                Сменить фото
                            </Button>
                        </Upload>
                    </div>
                </Col>

                <Col span={18}>
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={userData}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="ФИО"
                            name="fullName"
                            rules={[{ required: true, message: 'Введите ФИО' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Card title="Паспортные данные" style={{ marginBottom: 24 }}>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item label="Серия" name={['passport', 'series']}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item label="Номер" name={['passport', 'number']}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Дата рождения" name={['passport', 'birthDate']}>
                                        <DatePicker style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item label="Кем выдан" name={['passport', 'issuedBy']}>
                                <Input />
                            </Form.Item>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Дата выдачи" name={['passport', 'issueDate']}>
                                        <DatePicker style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Код подразделения" name={['passport', 'code']}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item label="Место рождения" name={['passport', 'birthPlace']}>
                                <Input />
                            </Form.Item>

                            <Form.Item label="Регистрация" name={['passport', 'registration']}>
                                <Input />
                            </Form.Item>
                        </Card>

                        <Card title="Транспорт" style={{ marginBottom: 24 }}>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Form.Item label="Марка" name={['vehicle', 'brand']}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Модель" name={['vehicle', 'model']}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Номер" name={['vehicle', 'number']}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Цвет" name={['vehicle', 'color']}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Собственник" name={['vehicle', 'owner']}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>

                        <Button type="primary" htmlType="submit">
                            Сохранить изменения
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Card>
    );
};

export default Account;