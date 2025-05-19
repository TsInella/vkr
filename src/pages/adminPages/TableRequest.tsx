import React, { useState, useMemo } from 'react';
import { Table, Tag, Typography, Input, Select, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

interface RequestData {
    key: string;
    number: number;
    name: string;
    status: 'Отклонено' | 'В обработке' | 'Одобрено';
}

const statusOptions = ['Отклонено', 'В обработке', 'Одобрено'];

const initialData: RequestData[] = [
    {
        key: '1',
        number: 1,
        name: 'Заявка на въезд грузового транспорта',
        status: 'Одобрено',
    },
    {
        key: '2',
        number: 2,
        name: 'Заявка на временный пропуск',
        status: 'В обработке',
    },
    {
        key: '3',
        number: 3,
        name: 'Заявка на постоянный пропуск',
        status: 'Отклонено',
    },
];

const TablePass: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

    const filteredData = useMemo(() => {
        return initialData.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
            const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(item.status);
            return matchesSearch && matchesStatus;
        });
    }, [searchText, selectedStatuses]);

    const columns: ColumnsType<RequestData> = [
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
            render: (status: RequestData['status']) => (
                <Tag color={
                    status === 'Отклонено' ? 'red' :
                        status === 'В обработке' ? 'gold' : 'green'
                }>
                    {status}
                </Tag>
            ),
            filters: statusOptions.map(status => ({ text: status, value: status })),
            onFilter: (value, record) => record.status === value,
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Title level={3} style={{ marginBottom: '24px', textAlign: 'center' }}>
                Заявки
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
        </div>
    );
};

export default TablePass;