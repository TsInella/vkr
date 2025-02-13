import React, { useState } from "react";
import { Input, Button, Card } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./Auth.module.scss";

const Auth: React.FC = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

   return (
        <div className={styles.container}>
            <Card className={styles.loginCard}>
                <h2 className={styles.title}>Войти в аккаунт</h2>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>ФИО</label>
                    <Input
                        className={styles.input}
                        size="large"
                        placeholder="Введите ФИО"
                        prefix={<UserOutlined />}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Пароль</label>
                    <Input.Password
                        className={styles.input}
                        size="large"
                        placeholder="Введите пароль"
                        prefix={<LockOutlined />}
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                    />
                </div>
                <Button type="primary" className={styles.loginButton}>Войти</Button>
            </Card>
        </div>
    );
}

export default Auth;