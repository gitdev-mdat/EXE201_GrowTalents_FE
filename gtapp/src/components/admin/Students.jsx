import React, { useEffect, useState } from "react";
import studentApi from "../../api/studentAPI";
import styles from "../../styles/Students.module.css";

import {
  Input,
  Button,
  Select,
  Table,
  Tag,
  Modal,
  Space,
  Pagination,
} from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import StudentFormDialog from "./StudentFormDialog";
import StudentDetailDialog from "./StudentDetailDialog";

const { Option } = Select;

const Students = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const [openForm, setOpenForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    const fetchInitData = async () => {
      try {
        const res = await studentApi.getAll();
        if (res && res.data && Array.isArray(res.data.data)) {
          const mappedStudents = res.data.data.map((item, idx) => ({
            id: item.userId || idx + 1,
            name: item.userName || "",
            email: item.userEmail || "",
            phone: item.userPhone || "",
            parentName: item.userParentName || "",
            parentPhone: item.userParentPhone || "",
            status: item.userStatus || "",
            description: item.description || "",
            class: "",
            grade: "",
            gender: "",
            address: "",
            dob: "",
            currentClasses: [],
            availableClasses: [],
          }));
          setStudents(mappedStudents);
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };
    fetchInitData();
  }, []);

  const filteredStudents = students.filter((student) => {
    const matches =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade =
      selectedGrade === "" || student.grade === selectedGrade;
    return matches && matchesGrade;
  });

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setOpenForm(true);
  };

  const handleSubmitStudent = (data) => {
    if (editingStudent) {
      setStudents((prev) =>
        prev.map((s) => (s.id === editingStudent.id ? { ...s, ...data } : s))
      );
    } else {
      const newStudent = {
        ...data,
        id: students.length ? Math.max(...students.map((s) => s.id)) + 1 : 1,
        currentClasses: [],
        availableClasses: [],
        grade: "Khối 6",
        class: "",
      };
      setStudents((prev) => [...prev, newStudent]);
    }
  };

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Khối",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={() => {
              setSelectedStudent(record);
              setOpenDialog(true);
            }}
          >
            Xem chi tiết
          </Button>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setEditingStudent(record);
              setOpenForm(true);
            }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2>Quản lý học sinh</h2>
          <Button
            type="primary"
            style={{ backgroundColor: "#1d3274", borderColor: "#1d3274" }}
            onClick={handleOpenAdd}
          >
            Thêm học sinh
          </Button>
        </div>

        <div className={styles.filterContainer}>
          <Input
            placeholder="Tìm theo tên hoặc email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1 }}
          />
          <Select
            value={selectedGrade}
            onChange={(v) => setSelectedGrade(v)}
            style={{ width: 160 }}
          >
            <Option value="">Tất cả khối</Option>
            <Option value="Khối 6">Khối 6</Option>
            <Option value="Khối 7">Khối 7</Option>
            <Option value="Khối 8">Khối 8</Option>
            <Option value="Khối 9">Khối 9</Option>
          </Select>
        </div>

        <Table
          rowKey="id"
          dataSource={filteredStudents.slice(
            (page - 1) * rowsPerPage,
            page * rowsPerPage
          )}
          columns={columns}
          pagination={false}
          bordered
        />

        <Pagination
          current={page}
          pageSize={rowsPerPage}
          total={filteredStudents.length}
          onChange={(p) => setPage(p)}
          style={{ marginTop: "1rem", textAlign: "right" }}
        />
      </div>

      {/* Detail */}
      <StudentDetailDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        student={selectedStudent}
        onUpdateStudent={(updated) => {
          setSelectedStudent(updated);
          setStudents((prev) =>
            prev.map((s) => (s.id === updated.id ? updated : s))
          );
        }}
      />

      <StudentFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmitStudent}
        initialData={editingStudent}
      />
    </div>
  );
};

export default Students;
