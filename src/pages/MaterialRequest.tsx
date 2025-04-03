import React, { useState } from "react";
import { Input, Button, Card } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./MaterialRequest.module.scss";
import { useNavigate } from "react-router-dom";

const MaterialRequest: React.FC = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const navigate = useNavigate();

    return (
        <div className={styles.container}>

            <Card className={styles.registerCard}>
                <h2 className={styles.title}>Заявка на материальный пропуск</h2>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Наименование</label>
                    <Input className={styles.input} size="large" placeholder="Введите наименование груза"  />
                </div>



                <div className={styles.inputGroup}>
                    <label className={styles.label}>Характеристики</label>
                    <Input className={styles.input} size="large" placeholder="Подробные характеристики" />
                </div>
                <div className={styles.passportGroup}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Вес</label>
                        <Input className={styles.input} size="large" placeholder="Укажите вес груза" />
                    </div>
                   </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Кол-во</label>
                    <Input className={styles.input} size="large" placeholder="Введите количество" />
                </div>
                <Button
                    type="primary"
                    className={styles.registerButton}
                    onClick={() => navigate("/request")}
                >
                    Создать заявку
                </Button>
            </Card>
        </div>
    );
};

export default MaterialRequest;
