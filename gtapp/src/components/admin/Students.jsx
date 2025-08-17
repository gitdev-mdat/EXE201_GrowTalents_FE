import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import styles from "../../styles/Students.module.css";
import { Add, Remove, Edit } from "@mui/icons-material";
import StudentFormDialog from "./StudentFormDialog";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Box,
  Typography,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from "@mui/material";

const initialStudents = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvanadaknong@gmail.com",
    class: "Giao tiếp tiếng Anh",
    grade: "Khối 6",
    gender: "Nam",
    phone: "0982123124",
    address: "187/11 đường số 28, phường 6, Gò Vấp",
    dob: "2003-09-02",
    currentClasses: [
      { className: "Giao tiếp tiếng Anh", semester: "1", year: "2023-2024" },
      { className: "Toán nâng cao", semester: "2", year: "2023-2024" },
    ],
    availableClasses: ["Vật lý cơ bản", "Hóa học nâng cao"]
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthibdaknong@gmail.com",
    class: "Toán nâng cao",
    grade: "Khối 7",
    gender: "Nữ",
    phone: "0912345678",
    address: "123 Lê Lợi, Phường 1, Quận 3",
    dob: "2004-05-15",
    currentClasses: [
      { className: "Toán nâng cao", semester: "1", year: "2023-2024" }
    ],
    availableClasses: ["Tiếng Anh giao tiếp", "Vật lý cơ bản"]
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levancdaknong@gmail.com",
    class: "Lý nâng cao",
    grade: "Khối 8",
    gender: "Nam",
    phone: "0908765432",
    address: "456 Hoàng Hoa Thám, Phường 6, Quận 10",
    dob: "2005-12-12",
    currentClasses: [],
    availableClasses: []
  }
];

const Students = () => {
  const [students, setStudents] = useState(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  // Modal thêm/sửa học sinh
  const [openForm, setOpenForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // State cho thêm lớp
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setOpenDialog(true);
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === "" || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const currentStudents = filteredStudents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Thêm lớp (có kỳ và năm)
  const handleAddToClass = () => {
    if (selectedClass && selectedSemester && selectedYear && selectedStudent) {
      const newClass = {
        className: selectedClass,
        semester: selectedSemester,
        year: selectedYear,
      };

      const updatedStudent = {
        ...selectedStudent,
        currentClasses: [...(selectedStudent.currentClasses || []), newClass],
        availableClasses: (selectedStudent.availableClasses || []).filter(
          (c) => c !== selectedClass
        ),
      };

      setSelectedStudent(updatedStudent);
      setSelectedClass("");
      setSelectedSemester("");
      setSelectedYear("");
      setStudents((prev) =>
        prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
      );
    }
  };

  // Xóa lớp
  const handleRemoveFromClass = (classObj) => {
    if (selectedStudent) {
      const updatedStudent = {
        ...selectedStudent,
        currentClasses: (selectedStudent.currentClasses || []).filter(
          (c) =>
            !(
              c.className === classObj.className &&
              c.semester === classObj.semester &&
              c.year === classObj.year
            )
        ),
        availableClasses: [
          ...(selectedStudent.availableClasses || []),
          classObj.className,
        ],
      };

      setSelectedStudent(updatedStudent);
      setStudents((prev) =>
        prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
      );
    }
  };

  // Thêm học sinh mới
  const handleOpenAdd = () => {
    setEditingStudent(null);
    setOpenForm(true);
  };

  // Sửa học sinh
  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setOpenForm(true);
  };

  // Submit form thêm/sửa
  const handleSubmitStudent = (data) => {
    if (editingStudent) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === editingStudent.id ? { ...s, ...data } : s
        )
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

  return (
    <div className={styles.container}>
      <Paper className={styles.paper}>
        {/* Header */}
        <div className={styles.header}>
          <Typography variant="h5">Quản lý học sinh</Typography>
          <Button variant="contained" color="primary" onClick={handleOpenAdd}>
            Thêm học sinh mới
          </Button>
        </div>

        {/* Search & Filter */}
        <div className={styles.filterContainer}>
          <TextField
            className={styles.search}
            placeholder="Tìm kiếm theo tên hoặc email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            size="small"
          />
          <FormControl className={styles.filter} size="small">
            <InputLabel>Khối</InputLabel>
            <Select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              label="Khối"
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="Khối 6">Khối 6</MenuItem>
              <MenuItem value="Khối 7">Khối 7</MenuItem>
              <MenuItem value="Khối 8">Khối 8</MenuItem>
              <MenuItem value="Khối 9">Khối 9</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Student Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Họ và tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Khối</TableCell>
                <TableCell>Giới tính</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentStudents.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleStudentClick(student)}
                      sx={{ mr: 1 }}
                    >
                      Xem chi tiết
                    </Button>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenEdit(student)}
                      size="small"
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredStudents.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Số hàng mỗi trang:"
        />
      </Paper>

      {/* Detail Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">Thông tin chi tiết học sinh</Typography>
        </DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box className={styles.detailInfo}>
                  <div className={styles.detailInfoCard}>
                    <Typography variant="subtitle1">Họ và tên:</Typography>
                    <Typography>{selectedStudent.name}</Typography>
                  </div>
                  <div className={styles.detailInfoCard}>
                    <Typography variant="subtitle1">Email:</Typography>
                    <Typography>{selectedStudent.email}</Typography>
                  </div>
                  <div className={styles.detailInfoCard}>
                    <Typography variant="subtitle1">Số điện thoại:</Typography>
                    <Typography>{selectedStudent.phone}</Typography>
                  </div>
                  <div className={styles.detailInfoCard}>
                    <Typography variant="subtitle1">Địa chỉ:</Typography>
                    <Typography>{selectedStudent.address}</Typography>
                  </div>
                  <div className={styles.detailInfoCard}>
                    <Typography variant="subtitle1">Ngày sinh:</Typography>
                    <Typography>{selectedStudent.dob}</Typography>
                  </div>
                  <div className={styles.detailInfoCard}>
                    <Typography variant="subtitle1">Khối:</Typography>
                    <Typography>{selectedStudent.grade}</Typography>
                  </div>
                </Box>

                {/* Class Management */}
                <Box className={styles.classManagement}>
                  <Typography variant="h6" gutterBottom>
                    Lớp học hiện tại
                  </Typography>
                  <Box className={styles.currentClasses}>
                    {(selectedStudent.currentClasses || []).map((c, idx) => (
                      <Chip
                        key={idx}
                        label={`${c.className} - Kỳ ${c.semester}, Năm ${c.year}`}
                        onDelete={() => handleRemoveFromClass(c)}
                        deleteIcon={<Remove />}
                        className={styles.classChip}
                      />
                    ))}
                  </Box>

                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Thêm vào lớp học
                  </Typography>
                  <Box className={styles.addClassSection}>
                    {/* Chọn lớp */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Chọn lớp</InputLabel>
                      <Select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        label="Chọn lớp"
                      >
                        {(selectedStudent.availableClasses || []).map((className) => (
                          <MenuItem key={className} value={className}>
                            {className}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* Chọn kỳ học */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Kỳ học</InputLabel>
                      <Select
                        value={selectedSemester}
                        onChange={(e) => setSelectedSemester(e.target.value)}
                        label="Kỳ học"
                      >
                        <MenuItem value="1">Kỳ 1</MenuItem>
                        <MenuItem value="2">Kỳ 2</MenuItem>
                      </Select>
                    </FormControl>

                    {/* Chọn năm học */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Năm học</InputLabel>
                      <Select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        label="Năm học"
                      >
                        <MenuItem value="2023-2024">2023-2024</MenuItem>
                        <MenuItem value="2024-2025">2024-2025</MenuItem>
                        <MenuItem value="2025-2026">2025-2026</MenuItem>
                      </Select>
                    </FormControl>

                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      onClick={handleAddToClass}
                      disabled={!selectedClass || !selectedSemester || !selectedYear}
                    >
                      Thêm vào lớp
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>

      {/* Student Form Dialog */}
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
