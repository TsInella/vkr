import React, { useState } from "react";
import { Input, Button, Card } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./TransportRequest.module.scss";
import { useNavigate } from "react-router-dom";

const TransportRequest: React.FC = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const navigate = useNavigate();

    return (
        <div className={styles.container}>

            <Card className={styles.registerCard}>
                <h2 className={styles.title}>Заявка на транспорт</h2>

                <div className={styles.passportGroup}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Марка</label>
                        <Input className={styles.input} size="large" placeholder="Серия" />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Модель</label>
                        <Input className={styles.input} size="large" placeholder="Номер" />
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Номер</label>
                    <Input className={styles.input} size="large" placeholder="Кем выдан" />
                </div>


                <div className={styles.inputGroup}>
                    <label className={styles.label}>Собственник</label>
                    <Input className={styles.input} size="large" placeholder="Введите место рождения" />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Цвет</label>
                    <Input className={styles.input} size="large" placeholder="Введите адрес регистрации" />
                </div>
                <Button
                    type="primary"
                    className={styles.registerButton}
                    onClick={() => navigate("/newrequest")}
                >
                    Подать заявку
                </Button>
            </Card>
        </div>
    );
};

export default TransportRequest;
