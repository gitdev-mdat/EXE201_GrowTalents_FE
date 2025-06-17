import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import styles from "../../styles/Students.module.css";
import { Phone, LocationOn, Cake, School, Add, Remove, Edit } from "@mui/icons-material";
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
  Tooltip,
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
    currentClasses: ["Giao tiếp tiếng Anh", "Toán nâng cao"],
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
    currentClasses: ["Toán nâng cao"],
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
  },
  {
    id: 4,
    name: "Lê Văn D",
    email: "levanDdaknong@gmail.com",
    class: "Lý nâng cao",
    grade: "Khối 8",
    gender: "Nam",
    phone: "0908765432",
    address: "456 Hoàng Hoa Thám, Phường 6, Quận 10",
    dob: "2005-12-12",
    currentClasses: [],
    availableClasses: []
  },
  {
    id: 5,
    name: "Lê Văn E",
    email: "levanedaknong@gmail.com",
    class: "Lý nâng cao",
    grade: "Khối 8",
    gender: "Nam",
    phone: "0908765432",
    address: "456 Hoàng Hoa Thám, Phường 6, Quận 10",
    dob: "2005-12-12",
    currentClasses: [],
    availableClasses: []
  },
  {
    id: 6,
    name: "Lê Văn G",
    email: "levangdaknong@gmail.com",
    class: "Lý nâng cao",
    grade: "Khối 8",
    gender: "Nam",
    phone: "0908765432",
    address: "456 Hoàng Hoa Thám, Phường 6, Quận 10",
    dob: "2005-12-12",
    currentClasses: [],
    availableClasses: []
  },
];

const Students = () => {
  // State lưu trữ danh sách học sinh
  const [students, setStudents] = useState(initialStudents);
  // State lưu trữ thông tin học sinh được chọn
  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  // Modal thêm/sửa học sinh
  const [openForm, setOpenForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Hàm xử lý khi bấm vào học sinh
  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setOpenDialog(true);
  };

  // Lọc học sinh dựa trên từ khóa tìm kiếm và khối
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === "" || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const currentStudents = filteredStudents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Hàm thêm học sinh vào lớp
  const handleAddToClass = () => {
    if (selectedClass && selectedStudent) {
      const updatedStudent = {
        ...selectedStudent,
        currentClasses: [...(selectedStudent.currentClasses || []), selectedClass],
        availableClasses: (selectedStudent.availableClasses || []).filter(c => c !== selectedClass)
      };
      setSelectedStudent(updatedStudent);
      setSelectedClass("");
      setStudents((prev) => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    }
  };

  // Hàm xóa học sinh khỏi lớp
  const handleRemoveFromClass = (className) => {
    if (selectedStudent) {
      const updatedStudent = {
        ...selectedStudent,
        currentClasses: (selectedStudent.currentClasses || []).filter(c => c !== className),
        availableClasses: [...(selectedStudent.availableClasses || []), className]
      };
      setSelectedStudent(updatedStudent);
      setStudents((prev) => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    }
  };

  // Mở modal thêm học sinh mới
  const handleOpenAdd = () => {
    setEditingStudent(null);
    setOpenForm(true);
  };

  // Mở modal sửa học sinh
  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setOpenForm(true);
  };

  // Xử lý thêm/sửa học sinh
  const handleSubmitStudent = (data) => {
    if (editingStudent) {
      // Sửa
      setStudents((prev) => prev.map(s => s.id === editingStudent.id ? { ...s, ...data } : s));
    } else {
      // Thêm mới
      const newStudent = {
        ...data,
        id: students.length ? Math.max(...students.map(s => s.id)) + 1 : 1,
        currentClasses: [],
        availableClasses: [],
        grade: "Khối 6", // mặc định
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
          <Typography variant="h5" component="h1">
            Quản lý học sinh
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpenAdd}>
            Thêm học sinh mới
          </Button>
        </div>

        {/* Search and Filter */}
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
                    <IconButton color="primary" onClick={() => handleOpenEdit(student)} size="small">
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
                    <Typography variant="subtitle1" className={styles.label}>Họ và tên:</Typography>
                    <Typography variant="body1">{selectedStudent.name}</Typography>
                  </div>
                  <div className={styles.detailInfoCard}>
                    <Typography variant="subtitle1" className={styles.label}>Email:</Typography>
                    <Typography variant="body1">{selectedStudent.email}</Typography>
                  </div>
                  <div className={styles.detailInfoCard}>
                    <Typography variant="subtitle1" className={styles.label}>Số điện thoại:</Typography>
                    <Typography variant="body1">{selectedStudent.phone}</Typography>
                  </div>
                  <div className={styles.detailInfoCard}>
                    <Typography variant="subtitle1" className={styles.label}>Địa chỉ:</Typography>
                    <Typography variant="body1">{selectedStudent.address}</Typography>
                  </div>
                  <div className={styles.detailInfoCard}>
                    <Typography variant="subtitle1" className={styles.label}>Ngày sinh:</Typography>
                    <Typography variant="body1">{selectedStudent.dob}</Typography>
                  </div>
                  <div className={styles.detailInfoCard}>
                    <Typography variant="subtitle1" className={styles.label}>Khối:</Typography>
                    <Typography variant="body1">{selectedStudent.grade}</Typography>
                  </div>
                </Box>

                {/* Class Management */}
                <Box className={styles.classManagement}>
                  <Typography variant="h6" gutterBottom>
                    Lớp học hiện tại
                  </Typography>
                  <Box className={styles.currentClasses}>
                    {(selectedStudent.currentClasses || []).map((className) => (
                      <Chip
                        key={className}
                        label={className}
                        onDelete={() => handleRemoveFromClass(className)}
                        deleteIcon={<Remove />}
                        className={styles.classChip}
                      />
                    ))}
                  </Box>

                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Thêm vào lớp học
                  </Typography>
                  <Box className={styles.addClassSection}>
                    <FormControl fullWidth>
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
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      onClick={handleAddToClass}
                      disabled={!selectedClass}
                      sx={{ mt: 1 }}
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

      {/* Student Form Dialog (Add/Edit) */}
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
