import React, { useState } from "react";
import styles from "../../styles/TeacherList.module.css";
import { Button, Modal, Table, Tag } from "antd";

const TeacherList = () => {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const sampleTeachers = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      expertise: "Math",
      email: "teacher.a@growtalents.com",
      phone: "0987654321",
      courses: ["Math 101", "Math 201"],
    },
    {
      id: 2,
      name: "Trần Thị B",
      expertise: "English",
      email: "teacher.b@growtalents.com",
      phone: "0912345678",
      courses: ["English A2"],
    },
  ];

  const handleViewSchedule = (record) => {
    setSelectedTeacher(record);
    setIsScheduleOpen(true);
  };

  const columns = [
    { title: "Họ tên", dataIndex: "name", key: "name" },
    { title: "Chuyên môn", dataIndex: "expertise", key: "expertise" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "SĐT", dataIndex: "phone", key: "phone" },
    {
      title: "Khoá đang dạy",
      dataIndex: "courses",
      key: "courses",
      render: (courses) => courses.map((c) => <Tag key={c}>{c}</Tag>),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          size="small"
          type="primary"
          style={{ backgroundColor: "#1d3274", borderColor: "#1d3274" }}
          onClick={() => handleViewSchedule(record)}
        >
          View Schedule
        </Button>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2>Quản lý giáo viên</h2>
          <Button
            type="primary"
            style={{ backgroundColor: "#1d3274", borderColor: "#1d3274" }}
          >
            Thêm giáo viên
          </Button>
        </div>
        <Table
          rowKey="id"
          dataSource={sampleTeachers}
          columns={columns}
          bordered
          pagination={false}
          className={styles.table}
        />
      </div>

      <Modal
        title={`Schedule of ${selectedTeacher?.name}`}
        open={isScheduleOpen}
        footer={null}
        onCancel={() => setIsScheduleOpen(false)}
      >
        <ul className={styles.scheduleList}>
          <li className={styles.scheduleItem}>
            <div className={styles.left}>
              <Tag color="blue">Monday</Tag>
              <span className={styles.time}>08:00 → 10:00</span>
            </div>
            <div className={styles.className}>Math 101</div>
          </li>
          <li className={styles.scheduleItem}>
            <div className={styles.left}>
              <Tag color="green">Wednesday</Tag>
              <span className={styles.time}>13:00 → 15:00</span>
            </div>
            <div className={styles.className}>Math 102</div>
          </li>
        </ul>
      </Modal>
    </div>
  );
};

export default TeacherList;
