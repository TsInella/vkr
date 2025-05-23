import React, { useState, useMemo } from 'react';
import { Table, Typography, Input, Space, Button, Popconfirm, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Header from "../../components/Header";

const { Title } = Typography;
const { Search } = Input;

interface UserData {
    key: string;
    id: number;
    name: string;
    email: string;
    registrationDate: string;
    role?: string; // Добавляем поле роли, если оно есть в API
}

const initialData: UserData[] = [
    {
        key: '1',
        id: 1,
        name: 'Иванов Иван',
        email: 'ivanov@example.com',
        registrationDate: '15.05.2023',
    },
    {
        key: '2',
        id: 2,
        name: 'Петров Петр',
        email: 'petrov@example.com',
        registrationDate: '20.06.2023',
    },
    {
        key: '3',
        id: 3,
        name: 'Сидорова Анна',
        email: 'sidorova@example.com',
        registrationDate: '10.04.2023',
    },
    {
        key: '4',
        id: 4,
        name: 'Кузнецов Дмитрий',
        email: 'kuznetsov@example.com',
        registrationDate: '05.07.2023',
    },
    {
        key: '5',
        id: 5,
        name: 'Смирнова Ольга',
        email: 'smirnova@example.com',
        registrationDate: '12.03.2023',
    },
];

const UsersTable: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState<UserData[]>(initialData);

    const filteredData = useMemo(() => {
        return data.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                item.email.toLowerCase().includes(searchText.toLowerCase());
            return matchesSearch;
        }).sort((a, b) => a.name.localeCompare(b.name));
    }, [searchText, data]);

    const handleDelete = (key: string) => {
        setData(prevData => prevData.filter(item => item.key !== key));
        message.success('Пользователь успешно удалён');
    };

    const columns: ColumnsType<UserData> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Дата регистрации',
            dataIndex: 'registrationDate',
            key: 'registrationDate',
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Вы уверены, что хотите удалить этого пользователя?"
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
                <Title level={3} style={{ marginBottom: '24px', textAlign: 'center' }}>
                    Управление пользователями
                </Title>

                <Space style={{ marginBottom: 16, width: '100%' }}>
                    <Search
                        placeholder="Поиск по имени или email"
                        allowClear
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 300 }}
                    />
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    pagination={false}
                    bordered
                    scroll={{ x: true }}
                />
            </div>
        </>
    );
};

export default UsersTable;