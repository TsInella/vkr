import React, { useState } from "react";
import { Input, Button, Card, Form, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import styles from "./Auth.module.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios, { AxiosError } from "axios";
import { login } from "./authService";

interface AuthData {
  email: string;
  password: string;
}

const Auth: React.FC = () => {
  const [formData, setFormData] = useState<AuthData>({
    email: "",
    password: "",
  });

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<AuthData>>({});
  const { login: contextLogin } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Очищаем ошибку при изменении поля
    if (errors[name as keyof AuthData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<AuthData> = {};

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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    //  if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      console.log(response, response.data);
      const { token, message: msg } = response.data;

      localStorage.setItem("token", token);
      messageApi.success(msg || "Авторизация прошла успешно!");
      navigate("/account");
    } catch (error) {
      const err = error as AxiosError<any>;
      console.log(error);
      if (!err.response) {
        messageApi.error("Ошибка сети");
        return;
      }
      const { message: msg } = err.response.data as { message: string };
      console.log(msg);
      messageApi.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: AuthData) => {
    await handleSubmit();
  };

  return (
    <>
      {contextHolder}
      <div className={styles.container}>
        <Card className={styles.loginCard}>
          <h2 className={styles.title}>Войти в аккаунт</h2>

          <Form form={form} onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Введите email!" },
                { type: "email", message: "Некорректный email" },
              ]}
            >
              <Input
                className={styles.input}
                size="large"
                placeholder="Введите email"
                prefix={<MailOutlined />}
                name="email"
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Введите пароль!" },
                //{ min: 5, message: "Пароль должен содержать минимум 5 символов" },
              ]}
            >
              <Input.Password
                className={styles.input}
                size="large"
                placeholder="Введите пароль"
                prefix={<LockOutlined />}
                name="password"
                onChange={handleChange}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                visibilityToggle={{
                  visible: passwordVisible,
                  onVisibleChange: setPasswordVisible,
                }}
              />
            </Form.Item>

            <Button
              type="primary"
              className={styles.loginButton}
              onClick={() => form.submit()}
              loading={loading}
              block
            >
              Войти
            </Button>
          </Form>

          <div className={styles.linksContainer}>
            <Button
              disabled
              type="link"
              className={styles.forgotButton}
              onClick={() => navigate("/forgot-password")}
            >
              Восстановить доступ
            </Button>

            <Button
              type="link"
              className={styles.regButton}
              onClick={() => navigate("/reg")}
            >
              Зарегистрироваться
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Auth;
