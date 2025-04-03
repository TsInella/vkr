import React, { useState } from "react";
import { Input, Button, Card } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from "@ant-design/icons";
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
              <label className={styles.label}>ФИО</label>
              <Input className={styles.input} size="large" placeholder="Введите ФИО" prefix={<UserOutlined />} />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Пароль</label>
              <Input.Password
                  className={styles.input}
                  size="large"
                  placeholder="Введите пароль"
                  prefix={<LockOutlined />}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Повторите пароль</label>
              <Input.Password
                  className={styles.input}
                  size="large"
                  placeholder="Повторите пароль"
                  prefix={<LockOutlined />}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  visibilityToggle={{ visible: confirmPasswordVisible, onVisibleChange: setConfirmPasswordVisible }}
              />
            </div>

            <h3 className={styles.subtitle}>Паспортные данные</h3>

            <div className={styles.rowGroup}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Серия</label>
                <Input className={styles.input} size="large" placeholder="Серия" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Номер</label>
                <Input className={styles.input} size="large" placeholder="Номер" />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Выдан</label>
              <Input className={styles.input} size="large" placeholder="Кем выдан" />
            </div>

            <div className={styles.rowGroup}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Дата выдачи</label>
                <Input className={styles.input} size="large" placeholder="ДД.ММ.ГГГГ" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Код</label>
                <Input className={styles.input} size="large" placeholder="Код подразделения" />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Дата рождения</label>
              <Input className={styles.input} size="large" placeholder="ДД.ММ.ГГГГ" />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Место рождения</label>
              <Input className={styles.input} size="large" placeholder="Введите место рождения" />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Регистрация</label>
              <Input className={styles.input} size="large" placeholder="Введите адрес регистрации" />
            </div>
          </div>

          <Button
              type="primary"
              className={styles.registerButton}
              onClick={() => navigate("/newrequest")}
          >
            Зарегистрироваться
          </Button>
        </Card>
      </div>
  );
};

export default Registration;