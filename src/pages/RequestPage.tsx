import React from "react";
import { Table, Button, Tag } from "antd";
import styles from "./RequestPage.module.scss";
import {useNavigate} from "react-router-dom";

const RequestPage: React.FC = () => {
    const columns = [
        {
            title: "№",
            dataIndex: "id",
            key: "id",
            width: "10%",
        },
        {
            title: "Наименование",
            dataIndex: "name",
            key: "name",
            width: "60%",
        },
        {
            title: "Статус",
            dataIndex: "status",
            key: "status",
            width: "30%",
            render: (status: string) => {
                let color = "";
                if (status === "В процессе") color = "gold";
                if (status === "Готово") color = "green";
                if (status === "Отказано") color = "red";
                return <Tag color={color}>{status}</Tag>;
            },
        },
    ];

    const data = [
        { key: "1", id: "1", name: "Заявка на выдачу документа", status: "В процессе" },
        { key: "2", id: "2", name: "Заявка на консультацию", status: "Готово" },
        { key: "3", id: "3", name: "Заявка на изменение данных", status: "Отказано" },
    ];

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Мои заявки</h2>
            <Table className={styles.table} columns={columns} dataSource={data} pagination={false} />
            <Button type="primary" className={styles.createButton} onClick = {() => navigate('/newrequest')}>Создать заявку</Button>
        </div>
    );
};

export default RequestPage;