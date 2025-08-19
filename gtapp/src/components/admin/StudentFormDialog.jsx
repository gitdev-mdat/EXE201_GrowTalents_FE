import React, { useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import moment from "moment";

const { Option } = Select;
const GENDERS = ["Nam", "Nữ", "Khác"];

const StudentFormDialog = ({ open, onClose, onSubmit, initialData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        ...initialData,
        dob: initialData.dob ? moment(initialData.dob) : null,
      });
    } else {
      form.resetFields();
    }
  }, [initialData, open]);

  const handleFinish = (values) => {
    const payload = {
      ...values,
      dob: values.dob ? values.dob.format("YYYY-MM-DD") : "",
    };
    onSubmit(payload);
    onClose();
  };

  return (
    <Modal
      open={open}
      title={initialData ? "Chỉnh sửa học sinh" : "Thêm học sinh mới"}
      onCancel={onClose}
      okText={initialData ? "Lưu" : "Thêm mới"}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ gender: "Nam" }}
      >
        <Form.Item
          name="name"
          label="Họ và tên"
          rules={[{ required: true, message: "Bắt buộc" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="dob"
          label="Ngày sinh"
          rules={[{ required: true, message: "Bắt buộc" }]}
        >
          <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Giới tính"
          rules={[{ required: true, message: "Bắt buộc" }]}
        >
          <Select>
            {GENDERS.map((g) => (
              <Option key={g} value={g}>
                {g}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Bắt buộc" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[{ required: true, message: "Bắt buộc" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[{ required: true, message: "Bắt buộc" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StudentFormDialog;
