import React, { useState } from "react";
import { Input, Button, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./PersonRequest.module.scss";
import { useNavigate } from "react-router-dom";

const PersonRequest: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <Card className={styles.registerCard}>
                <h2 className={styles.title}>Заявка на сотрудника</h2>

                <div className={styles.formContent}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>ФИО</label>
                        <Input className={styles.input} size="large" placeholder="Введите ФИО" prefix={<UserOutlined />} />
                    </div>

                    <h3 className={styles.subtitle}>Паспортные данные</h3>

                    <div className={styles.rowInputs}>
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

                    <div className={styles.rowInputs}>
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

                    <Button

                        className={styles.registerButton}
                        onClick={() => navigate("/request")}
                    >
                        Создать заявку
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default PersonRequest;