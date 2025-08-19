import React, { useState } from "react";
import styles from "../../styles/TuitionRecord.module.css";
import { Table, Button, Tag, Pagination, Space } from "antd";

const tuitionRecords = [
  {
    id: 1,
    studentName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    course: "Toán 10",
    amount: "2,000,000",
    paymentDate: "2024-03-15",
    status: "Đã thanh toán",
    paymentMethod: "Chuyển khoản",
  },
  {
    id: 2,
    studentName: "Trần Thị B",
    email: "tranthib@example.com",
    course: "Vật lý 11",
    amount: "2,500,000",
    paymentDate: "2024-03-14",
    status: "Đã thanh toán",
    paymentMethod: "Tiền mặt",
  },
  {
    id: 3,
    studentName: "Lê Văn C",
    email: "levanc@example.com",
    course: "Hóa học 12",
    amount: "3,000,000",
    paymentDate: "2024-03-20",
    status: "Chưa thanh toán",
    paymentMethod: "Chưa xác định",
  },
  {
    id: 4,
    studentName: "Phạm Thị D",
    email: "phamthid@example.com",
    course: "Tiếng Anh 10",
    amount: "1,800,000",
    paymentDate: "2024-03-18",
    status: "Đã thanh toán",
    paymentMethod: "Chuyển khoản",
  },
  {
    id: 5,
    studentName: "Hoàng Văn E",
    email: "hoangvane@example.com",
    course: "Văn học 11",
    amount: "2,200,000",
    paymentDate: "2024-03-22",
    status: "Chưa thanh toán",
    paymentMethod: "Chưa xác định",
  },
  {
    id: 6,
    studentName: "Vũ Thị F",
    email: "vuthif@example.com",
    course: "Sinh học 12",
    amount: "2,800,000",
    paymentDate: "2024-03-16",
    status: "Đã thanh toán",
    paymentMethod: "Tiền mặt",
  },
  {
    id: 7,
    studentName: "Đặng Văn G",
    email: "dangvang@example.com",
    course: "Lịch sử 10",
    amount: "1,500,000",
    paymentDate: "2024-03-25",
    status: "Chưa thanh toán",
    paymentMethod: "Chưa xác định",
  },
  {
    id: 8,
    studentName: "Bùi Thị H",
    email: "buithih@example.com",
    course: "Địa lý 11",
    amount: "1,900,000",
    paymentDate: "2024-03-17",
    status: "Đã thanh toán",
    paymentMethod: "Chuyển khoản",
  },
  {
    id: 9,
    studentName: "Ngô Văn I",
    email: "ngovani@example.com",
    course: "Tin học 12",
    amount: "2,600,000",
    paymentDate: "2024-03-19",
    status: "Đã thanh toán",
    paymentMethod: "Tiền mặt",
  },
  {
    id: 10,
    studentName: "Lý Thị J",
    email: "lythij@example.com",
    course: "GDCD 10",
    amount: "1,700,000",
    paymentDate: "2024-03-21",
    status: "Chưa thanh toán",
    paymentMethod: "Chưa xác định",
  },
  {
    id: 11,
    studentName: "Trịnh Văn K",
    email: "trinhvank@example.com",
    course: "Công nghệ 11",
    amount: "2,400,000",
    paymentDate: "2024-03-23",
    status: "Đã thanh toán",
    paymentMethod: "Chuyển khoản",
  },
]; // Mock data cho lương giáo viên
const teacherSalaries = [
  {
    id: 1,
    name: "Thầy Nguyễn Văn X",
    email: "nguyenvx@example.com",
    phone: "0912345678",
    salary: "10,000,000",
    allowance: "2,000,000",
    paymentDate: "2024-03-28",
    status: "Đã thanh toán",
  },
  {
    id: 2,
    name: "Cô Trần Thị Y",
    email: "tranthy@example.com",
    phone: "0987654321",
    salary: "9,000,000",
    allowance: "1,500,000",
    paymentDate: "2024-03-29",
    status: "Chưa thanh toán",
  },
];

const TuitionRecord = () => {
  const [page, setPage] = useState(1);
  const [view, setView] = useState("student");
  const rowsPerPage = 10;

  const getStatusColor = (status) => {
    switch (status) {
      case "Đã thanh toán":
        return "green";
      case "Chưa thanh toán":
        return "volcano";
      default:
        return "default";
    }
  };

  const columnsStudent = [
    { title: "Tên học viên", dataIndex: "studentName", key: "studentName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Khóa học", dataIndex: "course", key: "course" },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (v) => `${v} VNĐ`,
    },
    { title: "Ngày thanh toán", dataIndex: "paymentDate", key: "paymentDate" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (v) => <Tag color={getStatusColor(v)}>{v}</Tag>,
    },
    { title: "Phương thức", dataIndex: "paymentMethod", key: "paymentMethod" },
  ];

  const columnsTeacher = [
    { title: "Tên giáo viên", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    {
      title: "Lương",
      dataIndex: "salary",
      key: "salary",
      render: (v) => `${v} VNĐ`,
    },
    {
      title: "Phụ cấp giờ dạy",
      dataIndex: "allowance",
      key: "allowance",
      render: (v) => `${v} VNĐ`,
    },
    { title: "Ngày thanh toán", dataIndex: "paymentDate", key: "paymentDate" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (v) => <Tag color={getStatusColor(v)}>{v}</Tag>,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Space>
          <Button
            type={view === "student" ? "primary" : "default"}
            onClick={() => setView("student")}
          >
            Học phí học viên
          </Button>
          <Button
            type={view === "teacher" ? "primary" : "default"}
            onClick={() => setView("teacher")}
          >
            Lương giáo viên
          </Button>
        </Space>
      </div>

      {view === "student" && (
        <>
          <Table
            bordered
            pagination={false}
            columns={columnsStudent}
            dataSource={tuitionRecords.slice(
              (page - 1) * rowsPerPage,
              page * rowsPerPage
            )}
            rowKey="id"
          />
          <div style={{ textAlign: "right", marginTop: "1rem" }}>
            <Pagination
              current={page}
              pageSize={rowsPerPage}
              total={tuitionRecords.length}
              onChange={(p) => setPage(p)}
            />
          </div>
        </>
      )}

      {view === "teacher" && (
        <Table
          bordered
          pagination={false}
          columns={columnsTeacher}
          dataSource={teacherSalaries}
          rowKey="id"
        />
      )}
    </div>
  );
};

export default TuitionRecord;
