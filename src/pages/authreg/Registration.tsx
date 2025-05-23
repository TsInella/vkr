import React, { useState } from "react";
import { Input, Button, Card, Space, message, notification } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import styles from "./Registration.module.scss";
import { useNavigate } from "react-router-dom";
import { register } from "./authService";
import axios, {AxiosError} from 'axios'

interface RegistrationData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<RegistrationData>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Очищаем ошибку при изменении поля
    if (errors[name as keyof RegistrationData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegistrationData> = {};

    if (!formData.name) newErrors.name = "Введите имя";
    if (!formData.email) {
      newErrors.email = "Введите email";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Некорректный email";
    }
    if (!formData.password) {
      newErrors.password = "Введите пароль";
    } else if (formData.password.length < 5) {
      newErrors.password = "Пароль должен содержать минимум 5 символов";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {

    // if (!validateForm()) return;

    setLoading(true);
    try {
      // Отправляем только email и password, согласно вашей API схеме
      const response = await register({
        email: formData.email,
        password: formData.password
      }).then((response) => {
        console.log(response, (response as any).data)
        return response.data.json()
        // if (response.ok) {
        //   return response.json();
        // }
        // console.log(response, (response as any).data)
        // throw new Error(response.json() as any);
      })
      console.log(response)

      // Сохраняем токен
      // const {message: msg} = response as {message: string}
      // localStorage.setItem("token", response.token);
      messageApi.success("Регистрация прошла успешно!");
      // navigate("/account");
    } catch (error) {
      const err = error as AxiosError<any>
      console.log(error)
      if (!err.response) return null
      const {message: msg} = err.response.data as {message: string}
      console.log(msg)
      messageApi.error(msg);
      // notification.error({message: msg})
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        {contextHolder}
      <div className={styles.container}>
        <Card className={styles.registerCard}>
          <h2 className={styles.title}>Регистрация</h2>

          <div className={styles.formContainer}>
            <div className={styles.inputGroup}>
              <Input
                  className={styles.input}
                  size="large"
                  placeholder="Введите имя"
                  prefix={<UserOutlined />}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  status={errors.name ? "error" : ""}
              />
              {errors.name && <div className={styles.errorText}>{errors.name}</div>}

              <Input
                  className={styles.input}
                  size="large"
                  placeholder="Введите email"
                  prefix={<MailOutlined />}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  status={errors.email ? "error" : ""}
              />
              {errors.email && <div className={styles.errorText}>{errors.email}</div>}
            </div>

            <div className={styles.inputGroup}>
              <Input.Password
                  className={styles.input}
                  size="large"
                  placeholder="Введите пароль"
                  prefix={<LockOutlined />}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                  status={errors.password ? "error" : ""}
              />
              {errors.password && <div className={styles.errorText}>{errors.password}</div>}

              <Input.Password
                  className={styles.input}
                  size="large"
                  placeholder="Повторите пароль"
                  prefix={<LockOutlined />}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  visibilityToggle={{ visible: confirmPasswordVisible, onVisibleChange: setConfirmPasswordVisible }}
                  status={errors.confirmPassword ? "error" : ""}
              />
              {errors.confirmPassword && <div className={styles.errorText}>{errors.confirmPassword}</div>}
            </div>
          </div>

          <Button
              type="primary"
              className={styles.registerButton}
              onClick={handleSubmit}
              loading={loading}
              block
          >
            Зарегистрироваться
          </Button>

          <Space className={styles.bottomButtons}>
            <Button
                type="link"
                className={styles.forgotButton}
                onClick={() => navigate("/forgot-password")}
            >
              Восстановить доступ
            </Button>

            <Button
                type="link"
                className={styles.regButton}
                onClick={() => navigate("/auth")}
            >
              Войти в аккаунт
            </Button>
          </Space>
        </Card>
      </div>
        </>
  );
};

export default Registration;