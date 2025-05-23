import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  Typography,
  Input,
  Space,
  Button,
  Popconfirm,
  message,
  Tag,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import Header from "../../components/Header";
import axios from "axios";

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

export const UsersTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<UserData[]>([]);

  const filteredData = useMemo(() => {
    return data
      .filter((item) => {
        const matchesSearch =
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.email.toLowerCase().includes(searchText.toLowerCase());
        return matchesSearch;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [searchText, data]);
  const getUsers = async () => {
    await axios
      .get("http://5.35.98.185:4444/api/user/users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((r) =>
        setData(r.data.filter((u: any) => (u as any).role === "client"))
      );
  };
  useEffect(() => {
    getUsers();
  }, []);
  const handleDelete = async (id: string) => {
    // console.log(id);
    await axios.delete(`http://5.35.98.185:4444/api/user/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    await getUsers();
    // setData((prevData) => prevData.filter((item) => item.key !== key));
    message.success("Пользователь успешно удалён");
  };

  const columns: ColumnsType<UserData> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Статус",
      dataIndex: "registrationDate",
      render: (_, data) => {
        console.log(data);
        return "is_verified" in data && data.is_verified ? (
          <Tag color="green">Почта подтверждена</Tag>
        ) : (
          <Tag color="red">Почта не подтверждена</Tag>
        );
      },
    },
    {
      title: "Действия",
      key: "actions",
      render: ({ id }, record) => (
        <Space size="middle">
          <Popconfirm
            title="Вы уверены, что хотите удалить этого пользователя?"
            onConfirm={() => handleDelete(id)}
            okText="Да"
            cancelText="Нет"
          >
            <Button type="link" danger>
              Удалить
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Header />
      <div style={{ padding: "24px" }}>
        <Title level={3} style={{ marginBottom: "24px", textAlign: "center" }}>
          Управление пользователями
        </Title>

        <Space style={{ marginBottom: 16, width: "100%" }}>
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
