import React from 'react';
import { Button } from 'antd';
import styles from './NewRequest.module.scss';
import {useNavigate} from "react-router-dom";

const NewRequest: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <h1>Создать заявку</h1>
            <div className={styles.buttons}>
                <Button className={styles.requestbutton} onClick = {() => navigate('/person') }>Заявка на сотрудника</Button>
                <Button className={styles.requestbutton} onClick = {() => navigate ('/transport')}>Заявка на транспорт</Button>
                <Button className={styles.requestbutton} onClick = {() => navigate('/material')}>Заявка на материальный пропуск</Button>
            </div>
        </div>
    );
};

export default NewRequest;