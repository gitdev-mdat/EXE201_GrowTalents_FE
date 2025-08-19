import React, { useState } from "react";
import { Modal, Typography, Button, Space, Select, Tag, Row, Col } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "../../styles/Students.module.css";

const StudentDetailDialog = ({ open, onClose, student, onUpdateStudent }) => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  if (!student) return null;

  const handleRemoveFromClass = (classObj) => {
    const updated = {
      ...student,
      currentClasses: (student.currentClasses || []).filter(
        (c) =>
          !(
            c.className === classObj.className &&
            c.semester === classObj.semester &&
            c.year === classObj.year
          )
      ),
      availableClasses: [
        ...(student.availableClasses || []),
        classObj.className,
      ],
    };
    onUpdateStudent(updated);
  };

  const handleAddToClass = () => {
    if (selectedClass && selectedSemester && selectedYear) {
      const newClass = {
        className: selectedClass,
        semester: selectedSemester,
        year: selectedYear,
      };
      const updated = {
        ...student,
        currentClasses: [...(student.currentClasses || []), newClass],
        availableClasses: (student.availableClasses || []).filter(
          (c) => c !== selectedClass
        ),
      };
      onUpdateStudent(updated);
      setSelectedClass("");
      setSelectedSemester("");
      setSelectedYear("");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      title="Thông tin chi tiết học sinh"
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Text strong>Họ và tên:</Typography.Text>
          <Typography.Text> {student.name}</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text strong>Email:</Typography.Text>
          <Typography.Text> {student.email}</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text strong>Số ĐT:</Typography.Text>
          <Typography.Text> {student.phone}</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text strong>Địa chỉ:</Typography.Text>
          <Typography.Text> {student.address}</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text strong>Ngày sinh:</Typography.Text>
          <Typography.Text> {student.dob}</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text strong>Khối:</Typography.Text>
          <Typography.Text> {student.grade}</Typography.Text>
        </Col>
      </Row>

      {/* Lớp đang học */}
      <Typography.Title level={5} style={{ marginTop: 24 }}>
        Lớp học hiện tại
      </Typography.Title>
      <Space wrap>
        {(student.currentClasses || []).map((c, idx) => (
          <Tag
            key={idx}
            closable
            onClose={() => handleRemoveFromClass(c)}
            closeIcon={<DeleteOutlined />}
          >
            {`${c.className} - Kỳ ${c.semester}, Năm ${c.year}`}
          </Tag>
        ))}
      </Space>

      {/* Thêm lớp */}
      <Typography.Title level={5} style={{ marginTop: 24 }}>
        Thêm vào lớp học
      </Typography.Title>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Select
          placeholder="Chọn lớp"
          value={selectedClass}
          onChange={setSelectedClass}
          style={{ width: "100%" }}
        >
          {(student.availableClasses || []).map((c) => (
            <Select.Option key={c} value={c}>
              {c}
            </Select.Option>
          ))}
        </Select>
        <Select
          placeholder="Kỳ học"
          value={selectedSemester}
          onChange={setSelectedSemester}
          style={{ width: "100%" }}
        >
          <Select.Option value="1">Kỳ 1</Select.Option>
          <Select.Option value="2">Kỳ 2</Select.Option>
        </Select>
        <Select
          placeholder="Năm học"
          value={selectedYear}
          onChange={setSelectedYear}
          style={{ width: "100%" }}
        >
          <Select.Option value="2023-2024">2023-2024</Select.Option>
          <Select.Option value="2024-2025">2024-2025</Select.Option>
          <Select.Option value="2025-2026">2025-2026</Select.Option>
        </Select>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          disabled={!selectedClass || !selectedSemester || !selectedYear}
          onClick={handleAddToClass}
        >
          Thêm vào lớp
        </Button>
      </Space>
    </Modal>
  );
};

export default StudentDetailDialog;
