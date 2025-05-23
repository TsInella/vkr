import { PlusCircleFilled, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Table, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import { on } from "events";
import { useEffect, useState } from "react";
import Header from "../../components/Header";

const columns: ColumnsType<any> = [
  {
    title: "№",
    dataIndex: "id",
    key: "id",
    width: 100,
  },
  {
    title: "Наименование",
    dataIndex: "name",
    key: "name",
  },
];

export const Templates = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [modalCreateVisible, setModalCreateVisible] = useState(false);
  const [createFileVisible, setCreateFileVisible] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<string | null>(null);
  const [currentTemplateData, setCurrentTemplateData] = useState<any | null>(
    null
  );
  const getTemplateByID = async (id: string) => {
    axios
      .get(`http://5.35.98.185:4444/api/template/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((r) => setCurrentTemplateData(r.data));
  };
  console.log(createFileVisible, " fv");
  useEffect(() => {
    if (currentTemplate) getTemplateByID(currentTemplate);
  }, [currentTemplate]);
  const getTemplates = async () => {
    setLoading(true);
    const response = await axios
      .get("http://5.35.98.185:4444/api/templates", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((r) => {
        setData(r.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const createTemplate = async (formData: FormData) => {
    await axios.post("http://5.35.98.185:4444/api/template", formData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    await getTemplates();
  };
  const [formCreate] = Form.useForm();
  const [formCreateFile] = Form.useForm();
  useEffect(() => {
    getTemplates();
  }, []);
  const beforeUpload = (file: File) => {
    const isDocx =
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    return isDocx;
  };
  console.log(currentTemplateData);
  const createFile = async (data: any) => {
    await axios
      .post("http://5.35.98.185:4444/api/template/create", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        responseType: "blob",
      })
      .then((response) => {
        // Создаём ссылку на blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        // Создаём временный <a>
        const link = document.createElement("a");
        link.href = url;
        // Укажи нужное имя файла
        link.setAttribute("download", "template.docx");
        document.body.appendChild(link);
        link.click();
        // Удаляем ссылку
        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .then(() => {
        setCreateFileVisible(false);
        formCreateFile.resetFields();
        setCurrentTemplate(null);
        setCurrentTemplateData(null);
      });
    await getTemplates();
  };
  return (
    <>
      <Header />
      <div>
        <div>
          <Button onClick={() => setModalCreateVisible(true)}>
            <PlusCircleFilled /> Создать шаблон
          </Button>
        </div>
        <Modal
          footer={null}
          title="Создать шаблон документа"
          closable
          onCancel={() => {
            setModalCreateVisible(false);
            formCreate.resetFields();
          }}
          onClose={() => {
            setModalCreateVisible(false);
            formCreate.resetFields();
          }}
          open={modalCreateVisible}
        >
          <Form
            form={formCreate}
            layout="vertical"
            // initialValues={userData}
            onFinish={(values) => {
              const formData = new FormData();
              formData.append("name", values.name);
              // console.log(values.template.);
              if (values.template && values.template.originFileObj) {
                formData.append("template", values.template.originFileObj);
              }
              createTemplate(formData).then(() => setModalCreateVisible(false));
            }}
            // className={styles.form}
          >
            <Form.Item label="Название" name="name" required>
              <Input></Input>
            </Form.Item>
            <Form.Item
              label="Шаблон (docx)"
              name="template"
              valuePropName="file"
              getValueFromEvent={(e) => e && e.fileList && e.fileList[0]}
              rules={[{ required: true, message: "Загрузите docx файл" }]}
            >
              <Upload
                beforeUpload={beforeUpload}
                maxCount={1}
                accept=".docx"
                showUploadList={{ showRemoveIcon: true }}
                customRequest={({ file, onSuccess }) => {
                  // Не загружаем файл сразу, только после onFinish
                  setTimeout(() => onSuccess && onSuccess("ok"), 0);
                }}
              >
                <Button icon={<UploadOutlined />}>Выбрать файл</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Отправить
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          footer={null}
          title="Создать документ по шаблону"
          closable
          onCancel={() => {
            setCreateFileVisible(false);
            formCreateFile.resetFields();
            setCurrentTemplate(null);
            setCurrentTemplateData(null);
          }}
          onClose={() => {
            setCreateFileVisible(false);
            formCreateFile.resetFields();
            setCurrentTemplate(null);
            setCurrentTemplateData(null);
          }}
          open={createFileVisible}
        >
          <Form
            form={formCreateFile}
            layout="vertical"
            onFinish={(values) => {
              createFile({ id: currentTemplate, schema: values });
              // createTemplate(formData).then(() => setModalCreateVisible(false));
            }}
            // className={styles.form}
          >
            {" "}
            {currentTemplateData
              ? Object.keys(currentTemplateData.template.schema).map((k) => {
                  return (
                    <Form.Item label={k} name={k}>
                      <Input></Input>
                    </Form.Item>
                  );
                })
              : null}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Создать документ по шаблону
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Table
          onRow={(record) => {
            return {
              onClick: () => {
                setCurrentTemplate(record.id);
                setCreateFileVisible(true);
              },
            };
          }}
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          scroll={{ x: true }}
        />
      </div>
    </>
  );
};
