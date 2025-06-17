import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Pagination,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Tooltip,
  InputAdornment,
  Alert,
  Snackbar
} from '@mui/material';
import { Edit, Delete, Visibility, PersonAdd, VisibilityOff } from '@mui/icons-material';
import styles from '../../styles/TeacherList.module.css';

// Mock data for teachers
const teachers = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    specialization: 'Toán học',
    phone: '0987654321',
    address: 'Hà Nội',
    experience: '5 năm',
    education: 'Thạc sĩ Toán học',
    classes: ['Toán 10', 'Toán 11', 'Toán 12'],
    status: 'active',
    hasAccount: false
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    specialization: 'Vật lý',
    phone: '0987654322',
    address: 'TP.HCM',
    experience: '3 năm',
    education: 'Cử nhân Vật lý',
    classes: ['Lý 10', 'Lý 11'],
    status: 'active',
    hasAccount: false
  },
  // Add more mock data as needed
];

const TeacherList = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State for notifications
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // State for delete confirmation
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);

  // State for new teacher dialog
  const [openNewTeacherDialog, setOpenNewTeacherDialog] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    specialization: "",
    address: "",
    education: "",
    experience: "",
    status: "active",
    hasAccount: false
  });

  // State for create account dialog
  const [openCreateAccountDialog, setOpenCreateAccountDialog] = useState(false);
  const [selectedTeacherForAccount, setSelectedTeacherForAccount] = useState(null);
  const [accountDetails, setAccountDetails] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTeacherClick = (teacher) => {
    setSelectedTeacher(teacher);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Handle new teacher form
  const handleNewTeacherChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTeacher = () => {
    // Create new teacher object with a unique ID
    const newTeacherWithId = {
      ...newTeacher,
      id: Math.max(...teachers.map(t => t.id)) + 1
    };

    // Add new teacher to the list
    setTeachers(prevTeachers => [...prevTeachers, newTeacherWithId]);

    // Show success message
    setSnackbar({
      open: true,
      message: "Thêm giáo viên thành công!",
      severity: "success"
    });

    // Close dialog and reset form
    setOpenNewTeacherDialog(false);
    setNewTeacher({
      name: "",
      dob: "",
      gender: "",
      email: "",
      phone: "",
      specialization: "",
      address: "",
      education: "",
      experience: "",
      status: "active",
      hasAccount: false
    });
  };

  // Handle delete teacher
  const handleDeleteClick = (teacher) => {
    setTeacherToDelete(teacher);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    // Remove teacher from the list
    setTeachers(prevTeachers => 
      prevTeachers.filter(teacher => teacher.id !== teacherToDelete.id)
    );

    // Show success message
    setSnackbar({
      open: true,
      message: "Xóa giáo viên thành công!",
      severity: "success"
    });

    // Close dialog
    setOpenDeleteDialog(false);
    setTeacherToDelete(null);
  };

  // Handle create account
  const handleCreateAccount = (teacher) => {
    setSelectedTeacherForAccount(teacher);
    setAccountDetails({
      username: "",
      password: "",
      confirmPassword: ""
    });
    setOpenCreateAccountDialog(true);
  };

  const handleAccountDetailsChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitAccount = () => {
    if (accountDetails.password !== accountDetails.confirmPassword) {
      setSnackbar({
        open: true,
        message: "Mật khẩu xác nhận không khớp!",
        severity: "error"
      });
      return;
    }

    // Update teacher's account status
    setTeachers(prevTeachers =>
      prevTeachers.map(teacher =>
        teacher.id === selectedTeacherForAccount.id
          ? { ...teacher, hasAccount: true }
          : teacher
      )
    );

    // Show success message
    setSnackbar({
      open: true,
      message: "Tạo tài khoản thành công!",
      severity: "success"
    });

    setOpenCreateAccountDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Danh sách giáo viên</h1>
        <Button variant="contained" color="primary" onClick={() => setOpenNewTeacherDialog(true)}>
          Thêm giáo viên
        </Button>
      </div>

      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên giáo viên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Chuyên môn</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.phone}</TableCell>
                  <TableCell>{teacher.specialization}</TableCell>
                  
                  <TableCell>
                    <span
                      className={`${styles.statusChip} ${
                        teacher.status === "active"
                          ? styles.active
                          : styles.inactive
                      }`}
                    >
                      {teacher.status === "active" ? "Đang dạy" : "Nghỉ phép"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Xem chi tiết">
                      <IconButton size="small" onClick={() => handleTeacherClick(teacher)}>
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Tạo tài khoản">
                      <IconButton 
                        size="small"
                        onClick={() => handleCreateAccount(teacher)}
                        disabled={teacher.hasAccount}
                      >
                        <PersonAdd />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton 
                        size="small"
                        onClick={() => handleDeleteClick(teacher)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className={styles.pagination}>
        <Pagination
          count={Math.ceil(teachers.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedTeacher && (
          <>
            <DialogTitle>Thông tin chi tiết giáo viên</DialogTitle>
            <DialogContent>
              <Box className={styles.teacherDetails}>
                <Typography variant="h6">{selectedTeacher.name}</Typography>
                <Typography>Email: {selectedTeacher.email}</Typography>
                <Typography>Chuyên môn: {selectedTeacher.specialization}</Typography>
                <Typography>Số điện thoại: {selectedTeacher.phone}</Typography>
                <Typography>Địa chỉ: {selectedTeacher.address}</Typography>
                <Typography>Kinh nghiệm: {selectedTeacher.experience}</Typography>
                <Typography>Học vấn: {selectedTeacher.education}</Typography>
                <Typography>
                  Lớp đang dạy: {selectedTeacher.classes.join(', ')}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Đóng</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* New Teacher Dialog */}
      <Dialog
        open={openNewTeacherDialog}
        onClose={() => setOpenNewTeacherDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">Thêm giáo viên mới</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Họ và tên"
                name="name"
                value={newTeacher.name}
                onChange={handleNewTeacherChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ngày sinh"
                name="dob"
                type="date"
                value={newTeacher.dob}
                onChange={handleNewTeacherChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Giới tính</InputLabel>
                <Select
                  name="gender"
                  value={newTeacher.gender}
                  onChange={handleNewTeacherChange}
                  label="Giới tính"
                >
                  <MenuItem value="Nam">Nam</MenuItem>
                  <MenuItem value="Nữ">Nữ</MenuItem>
                  <MenuItem value="Khác">Khác</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={newTeacher.email}
                onChange={handleNewTeacherChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                name="phone"
                value={newTeacher.phone}
                onChange={handleNewTeacherChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Chuyên môn"
                name="specialization"
                value={newTeacher.specialization}
                onChange={handleNewTeacherChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ"
                name="address"
                value={newTeacher.address}
                onChange={handleNewTeacherChange}
                required
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Học vấn"
                name="education"
                value={newTeacher.education}
                onChange={handleNewTeacherChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Kinh nghiệm"
                name="experience"
                value={newTeacher.experience}
                onChange={handleNewTeacherChange}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewTeacherDialog(false)}>Hủy</Button>
          <Button onClick={handleAddTeacher} variant="contained" color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Account Dialog */}
      <Dialog
        open={openCreateAccountDialog}
        onClose={() => setOpenCreateAccountDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">
            Tạo tài khoản cho {selectedTeacherForAccount?.name}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên tài khoản"
                name="username"
                value={accountDetails.username}
                onChange={handleAccountDetailsChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mật khẩu"
                name="password"
                type={showPassword ? "text" : "password"}
                value={accountDetails.password}
                onChange={handleAccountDetailsChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={accountDetails.confirmPassword}
                onChange={handleAccountDetailsChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateAccountDialog(false)}>Hủy</Button>
          <Button onClick={handleSubmitAccount} variant="contained" color="primary">
            Tạo tài khoản
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">Xác nhận xóa</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa giáo viên {teacherToDelete?.name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Hủy</Button>
          <Button 
            onClick={handleConfirmDelete} 
            variant="contained" 
            color="error"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TeacherList; 