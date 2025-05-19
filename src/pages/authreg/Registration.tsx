import React, { useState } from "react";
import { Input, Button, Card, Space } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined, ExclamationOutlined } from "@ant-design/icons";
import styles from "./Registration.module.scss";
import { useNavigate } from "react-router-dom";

const Registration: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  return (
      <div className={styles.container}>
        <Card className={styles.registerCard}>
          <h2 className={styles.title}>Регистрация</h2>

          <div className={styles.formContainer}>
            <div className={styles.inputGroup}>
              <Input className={styles.input} size="large" placeholder="Введите имя" prefix={<UserOutlined/>} />
              <Input className={styles.input} size="large" placeholder="Введите email" prefix={< ExclamationOutlined/>} />
            </div>

            <div className={styles.inputGroup}>

              <Input.Password
                  className={styles.input}
                  size="large"
                  placeholder="Введите пароль"
                  prefix={<LockOutlined />}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
              />
            </div>


              <Input.Password
                  className={styles.input}
                  size="large"
                  placeholder="Повторите пароль"
                  prefix={<LockOutlined />}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  visibilityToggle={{ visible: confirmPasswordVisible, onVisibleChange: setConfirmPasswordVisible }}
              />

          </div>

          <Button
              type="primary"
              className={styles.registerButton}
              onClick={() => navigate("/account")}
              block
          >
            Зарегистрироваться
          </Button>
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
            Войти в аккаунт
          </Button>

        </Card>
      </div>
  );
};

export default Registration;