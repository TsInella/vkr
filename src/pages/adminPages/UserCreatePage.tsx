import React from "react";
import { Input, Button, Card, Form, Select } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "./UserCreatePage.module.scss";
import Header from "../../components/Header";

const { Option } = Select;

const UserCreatePage: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = () => {
        // Здесь будет логика создания пользователя
        navigate("/users");
    };

    return (
        <>
            <Header/>
        <div className={styles.container}>
            <Card className={styles.createCard}>
                <h2 className={styles.title}>Создать пользователя</h2>

                <Form form={form} onFinish={onFinish}>
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Введите имя пользователя!' }]}
                    >
                        <Input
                            className={styles.input}
                            size="large"
                            placeholder="Имя пользователя"
                            prefix={<UserOutlined />}
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Введите email!', type: 'email' }]}
                    >
                        <Input
                            className={styles.input}
                            size="large"
                            placeholder="Email"
                            prefix={<MailOutlined />}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Введите пароль!' }]}
                    >
                        <Input.Password
                            className={styles.input}
                            size="large"
                            placeholder="Пароль"
                            prefix={<LockOutlined />}
                        />
                    </Form.Item>

                    <Form.Item
                        name="role"
                        rules={[{ required: true, message: 'Выберите роль!' }]}
                    >
                        <Select
                            className={styles.selectInput}
                            size="large"
                            placeholder="Выберите роль"
                        >
                            <Option value="admin">Администратор</Option>
                            <Option value="user">Клиент</Option>
                        </Select>
                    </Form.Item>

                    <div className={styles.buttonsContainer}>
                        <Button
                            type="primary"
                            className={styles.createButton}
                            onClick={() => form.submit()}
                        >
                            Создать
                        </Button>

                        <Button
                            className={styles.cancelButton}
                            onClick={() => navigate("/users")}
                        >
                            Отмена
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
        </>
    );
}

export default UserCreatePage;