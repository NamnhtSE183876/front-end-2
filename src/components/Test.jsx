import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Table,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import uploadFile from "../utils/file";

const Test = () => {
  const [students, setStudents] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const api = "https://66f500119aa4891f2a23708f.mockapi.io/StudentManager";

  const fetchStudent = async () => {
    const response = await axios.get(api);
    console.log(response.data);
    setStudents(response.data);
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return <img src={image} alt="" width={200} />;
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => {
        return (
          <>
            <Popconfirm
              title="Delete"
              description="Are u sure?"
              onConfirm={() => handleDeleteStudent(id)}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const handleOpenModal = () => {
    setOpenModel(true);
  };

  const handleCloseModal = () => {
    setOpenModel(false);
  };

  const handleSubmitStudent = async (student) => {
    // xử lý lấy thông tin lấy thằng student trong form
    // => post xuống api

    //upload ảnh lên trước
    if (fileList.length > 0) {
      const file = fileList[0];
      console.log(file);

      const url = await uploadFile(file.originFileObj);
      console.log(url);
      student.image = url;
    }
    //quăng data xuống cho BE

    console.log(student);
    try {
      setSubmitting(true);
      const response = await axios.post(api, student);
      // => thành công
      toast.success("Successfully add new student");
      setOpenModel(false);
      setSubmitting(false);

      //clear dữ liệu cũ
      form.resetFields();

      //lấy lại danh sách mới
      fetchStudent();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add student");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`${api}/${studentId}`);
      toast.success("Bye bye");
      fetchStudent();
    } catch (error) {
      toast.error("oh no cant delete");
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <div>
      <h1>StudentManager</h1>
      <button onClick={handleOpenModal}>Create new student</button>
      <Table columns={columns} dataSource={students} />
      {/* nếu open là true => modal hiện, false => modal ẩn đi*/}
      {/*onCancel : antd cung cấp*/}
      <Modal
        confirmLoading={submitting}
        onOk={() => form.submit()}
        title="Create new student"
        open={openModel}
        onCancel={handleCloseModal}
      >
        {/*pop up*/}
        {/*form*/}
        <Form onFinish={handleSubmitStudent} form={form}>
          {/* name  => tên biến */}
          {/*rule => định nghĩa validation*/}

          <Form.Item
            label="Student name"
            name="name"
            rules={[
              {
                required: true,
                message: "Why you no enter name?",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Student code"
            name="code"
            rules={[
              {
                required: true,
                message: "Why you no enter code aye?",
              },
              {
                pattern: "SE\\d{6}$",
                message: "Invalid format!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Student score"
            name="score"
            rules={[
              {
                required: true,
                message: "Why you no enter score huh?",
              },
              {
                type: "number",
                min: 0,
                max: 10,
                message: "Invalid score!",
              },
            ]}
          >
            <InputNumber step={0.5} />
          </Form.Item>

          <Form.Item label="image" name="image">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default Test;
