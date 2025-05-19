import React, { useState } from "react";
import { Input, Button, Card, Form } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./Auth.module.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Auth: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { login } = useAuth();

    const onFinish = () => {
        navigate("/account");
    };

    return (
        <div className={styles.container}>
            <Card className={styles.loginCard}>
                <h2 className={styles.title}>Войти в аккаунт</h2>

                <Form form={form} onFinish={onFinish}>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Введите email!' }]}
                    >
                        <Input
                            className={styles.input}
                            size="large"
                            placeholder="Введите email"
                            prefix={<UserOutlined />}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Введите пароль!' }]}
                    >
                        <Input.Password
                            className={styles.input}
                            size="large"
                            placeholder="Введите пароль"
                            prefix={<LockOutlined />}
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        className={styles.loginButton}
                        onClick={() => form.submit()}
                    >
                        Войти
                    </Button>
                </Form>

                <div className={styles.linksContainer}>
                    <Button
                        type="primary"
                        className={styles.forgotButton}
                        onClick={() => navigate("/forgot-password")}
                    >
                        Восстановить доступ
                    </Button>

                    <Button
                        type="primary"
                        className={styles.regButton}
                        onClick={() => navigate("/reg")}
                    >
                        Зарегистрироваться
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default Auth;