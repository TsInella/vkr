import React, { useState, useMemo } from 'react';
import { Table, Tag, Typography, Input, Select, Space, Button, Popconfirm, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from "./RequestPage.module.scss";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

interface RequestsData {
    key: string;
    number: number;
    name: string;
    status: 'Одобрено' | 'В процессе' | 'Отклонено';
}

const statusOptions = ['Одобрено', 'В процессе', 'Отклонено'];

const RequestPage: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [data, setData] = useState<RequestsData[]>([
        {
            key: '1',
            number: 1,
            name: 'Заявка на въезд грузового транспорта',
            status: 'Одобрено',
        },
        {
            key: '2',
            number: 2,
            name: 'Заявка персональный',
            status: 'В процессе',
        },
        {
            key: '3',
            number: 3,
            name: 'Заявка на материальный груз',
            status: 'Отклонено',
        },
    ]);
    const navigate = useNavigate();

    const filteredData = useMemo(() => {
        return data.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
            const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(item.status);
            return matchesSearch && matchesStatus;
        });
    }, [searchText, selectedStatuses, data]);

    const handleDelete = (key: string) => {
        setData(prevData => prevData.filter(item => item.key !== key));
        message.success('Заявка успешно удалена');
    };

    const columns: ColumnsType<RequestsData> = [
        {
            title: '№',
            dataIndex: 'number',
            key: 'number',
            width: 100,
            sorter: (a, b) => a.number - b.number,
        },
        {
            title: 'Наименование',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (status: RequestsData['status']) => (
                <Tag color={
                    status === 'Отклонено' ? 'red' :
                        status === 'В процессе' ? 'gold' : 'green'
                }>
                    {status}
                </Tag>
            ),
            filters: statusOptions.map(status => ({ text: status, value: status })),
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Вы уверены, что хотите удалить эту заявку?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button type="link" danger>Удалить</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Header />
            <div style={{ padding: '24px' }}>
                <Title level={3} style={{ marginBottom: '24px', textAlign: 'center', marginRight: '9%' }}>
                    Мои заявки
                </Title>

                <Space style={{ marginBottom: 16, width: '100%' }}>
                    <Search
                        placeholder="Поиск по наименованию"
                        allowClear
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 300 }}
                    />

                    <Select
                        mode="multiple"
                        placeholder="Фильтр по статусу"
                        onChange={setSelectedStatuses}
                        style={{ width: 300 }}
                        allowClear
                    >
                        {statusOptions.map(status => (
                            <Option key={status} value={status}>{status}</Option>
                        ))}
                    </Select>
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    pagination={false}
                    bordered
                    scroll={{ x: true }}
                />
                <Button
                    type="primary"
                    className={styles.createButton}
                    onClick={() => navigate('/newrequest')}
                >
                    Создать заявку
                </Button>
            </div>
        </>
    );
};

export default RequestPage;