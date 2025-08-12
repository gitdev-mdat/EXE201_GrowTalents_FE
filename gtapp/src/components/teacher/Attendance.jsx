import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Schedule,
  People,
  Add,
  Edit,
  Save,
  Delete,
  History,
  Warning
} from '@mui/icons-material';
import styles from '../../styles/TeacherAttendance.module.css';

const TeacherAttendance = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [openDialog, setOpenDialog] = useState(false);
  const [attendanceData, setAttendanceData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [currentAttendance, setCurrentAttendance] = useState({});

  // Mock data for classes
  const classes = [
    { id: 1, name: 'Toán 10A', students: 40 },
    { id: 2, name: 'Vật lý 11B', students: 35 },
    { id: 3, name: 'Hóa học 12A', students: 30 },
    { id: 4, name: 'Tiếng Anh 10C', students: 38 }
  ];

  // Mock data for students
  const students = [
    { id: 1, name: 'Nguyễn Văn A', avatar: 'A' },
    { id: 2, name: 'Trần Thị B', avatar: 'B' },
    { id: 3, name: 'Lê Văn C', avatar: 'C' },
    { id: 4, name: 'Phạm Thị D', avatar: 'D' },
    { id: 5, name: 'Hoàng Văn E', avatar: 'E' },
    { id: 6, name: 'Vũ Thị F', avatar: 'F' },
    { id: 7, name: 'Đặng Văn G', avatar: 'G' },
    { id: 8, name: 'Bùi Thị H', avatar: 'H' }
  ];

  // Mock data for attendance history
  const attendanceHistory = [
    {
      id: 1,
      date: '2024-03-20',
      class: 'Toán 10A',
      present: 35,
      absent: 5,
      percentage: 87.5,
      teacher: 'Cô Nguyễn Thị Mai'
    },
    {
      id: 2,
      date: '2024-03-19',
      class: 'Toán 10A',
      present: 38,
      absent: 2,
      percentage: 95,
      teacher: 'Cô Nguyễn Thị Mai'
    },
    {
      id: 3,
      date: '2024-03-18',
      class: 'Toán 10A',
      present: 36,
      absent: 4,
      percentage: 90,
      teacher: 'Cô Nguyễn Thị Mai'
    }
  ];

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleAttendanceChange = (studentId, present) => {
    setCurrentAttendance(prev => ({
      ...prev,
      [studentId]: present
    }));
  };

  const handleNoteChange = (studentId, note) => {
    setCurrentAttendance(prev => ({
      ...prev,
      [`${studentId}_note`]: note
    }));
  };

  const handleCreateAttendance = () => {
    setOpenDialog(true);
    // Initialize attendance data for all students
    const initialAttendance = {};
    students.forEach(student => {
      initialAttendance[student.id] = true; // Default to present
      initialAttendance[`${student.id}_note`] = '';
    });
    setCurrentAttendance(initialAttendance);
  };

  const handleSaveAttendance = () => {
    console.log('Saving attendance for date:', selectedDate);
    console.log('Class:', selectedClass);
    console.log('Attendance data:', currentAttendance);
    
    // Calculate statistics
    const presentCount = Object.keys(currentAttendance).filter(key => 
      !key.includes('_note') && currentAttendance[key] === true
    ).length;
    const absentCount = students.length - presentCount;
    const percentage = Math.round((presentCount / students.length) * 100);
    
    console.log('Statistics:', { presentCount, absentCount, percentage });
    
    setOpenDialog(false);
    setCurrentAttendance({});
    // Here you would typically save to backend
  };

  const handleEditAttendance = () => {
    setIsEditing(true);
    // Load existing attendance data
    const existingAttendance = {};
    students.forEach(student => {
      existingAttendance[student.id] = true; // Default values
      existingAttendance[`${student.id}_note`] = '';
    });
    setCurrentAttendance(existingAttendance);
  };

  const handleSaveEditAttendance = () => {
    console.log('Saving edited attendance:', currentAttendance);
    setIsEditing(false);
    setCurrentAttendance({});
    // Here you would typically save to backend
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentAttendance({});
  };

  const getAttendanceStats = () => {
    if (Object.keys(currentAttendance).length === 0) {
      return { present: 0, absent: 0, percentage: 0 };
    }
    
    const present = Object.keys(currentAttendance).filter(key => 
      !key.includes('_note') && currentAttendance[key] === true
    ).length;
    const absent = students.length - present;
    const percentage = Math.round((present / students.length) * 100);
    return { present, absent, percentage };
  };

  const stats = getAttendanceStats();

  const getStudentAttendance = (studentId) => {
    return currentAttendance[studentId] !== undefined ? currentAttendance[studentId] : true;
  };

  const getStudentNote = (studentId) => {
    return currentAttendance[`${studentId}_note`] || '';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography variant="h4" component="h1" gutterBottom>
          Điểm danh học sinh
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Quản lý điểm danh và theo dõi sự hiện diện của học sinh
        </Typography>
      </div>

      {/* Filters */}
      <Card className={styles.filterCard}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Chọn lớp</InputLabel>
                <Select
                  value={selectedClass}
                  label="Chọn lớp"
                  onChange={handleClassChange}
                >
                  {classes.map((cls) => (
                    <MenuItem key={cls.id} value={cls.id}>
                      {cls.name} ({cls.students} học sinh)
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="date"
                label="Ngày điểm danh"
                value={selectedDate}
                onChange={handleDateChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleCreateAttendance}
                  fullWidth
                >
                  Tạo điểm danh mới
                </Button>
                {!isEditing && (
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={handleEditAttendance}
                    fullWidth
                  >
                    Chỉnh sửa
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Grid container spacing={3} className={styles.statsGrid}>
        <Grid item xs={12} md={4}>
          <Card className={styles.statCard}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <CheckCircle sx={{ color: 'success.main', fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="success.main">
                    {stats.present}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Có mặt
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className={styles.statCard}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Cancel sx={{ color: 'error.main', fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="error.main">
                    {stats.absent}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Vắng mặt
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className={styles.statCard}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <People sx={{ color: 'primary.main', fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="primary.main">
                    {stats.percentage}%
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Tỷ lệ có mặt
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Attendance Table */}
      <Card className={styles.tableCard}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              Danh sách điểm danh - {selectedClass ? classes.find(c => c.id === selectedClass)?.name : 'Chọn lớp'}
            </Typography>
            {isEditing && (
              <Box display="flex" gap={1}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSaveEditAttendance}
                  color="success"
                >
                  Lưu điểm danh
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  onClick={handleCancelEdit}
                  color="error"
                >
                  Hủy
                </Button>
              </Box>
            )}
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Học sinh</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Ghi chú</TableCell>
                  {isEditing && <TableCell>Thao tác</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, index) => {
                  const isPresent = getStudentAttendance(student.id);
                  const note = getStudentNote(student.id);
                  
                  return (
                    <TableRow key={student.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                            {student.avatar}
                          </Avatar>
                          <Typography>{student.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <FormControlLabel
                            control={
                              <Switch
                                checked={isPresent}
                                onChange={(e) => handleAttendanceChange(student.id, e.target.checked)}
                                color="success"
                              />
                            }
                            label={isPresent ? 'Có mặt' : 'Vắng mặt'}
                          />
                        ) : (
                          <Chip
                            label={isPresent ? 'Có mặt' : 'Vắng mặt'}
                            color={isPresent ? 'success' : 'error'}
                            icon={isPresent ? <CheckCircle /> : <Cancel />}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          placeholder="Ghi chú..."
                          variant="outlined"
                          value={note}
                          onChange={(e) => handleNoteChange(student.id, e.target.value)}
                          disabled={!isEditing}
                        />
                      </TableCell>
                      {isEditing && (
                        <TableCell>
                          <Box display="flex" gap={1}>
                            <Tooltip title="Đánh dấu có mặt">
                              <IconButton
                                size="small"
                                color="success"
                                onClick={() => handleAttendanceChange(student.id, true)}
                              >
                                <CheckCircle />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Đánh dấu vắng mặt">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleAttendanceChange(student.id, false)}
                              >
                                <Cancel />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Attendance History */}
      <Card className={styles.historyCard}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Lịch sử điểm danh
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ngày</TableCell>
                  <TableCell>Lớp</TableCell>
                  <TableCell>Có mặt</TableCell>
                  <TableCell>Vắng mặt</TableCell>
                  <TableCell>Tỷ lệ</TableCell>
                  <TableCell>Giáo viên</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceHistory.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.class}</TableCell>
                    <TableCell>
                      <Chip label={record.present} color="success" size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip label={record.absent} color="error" size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={`${record.percentage}%`} 
                        color={record.percentage >= 90 ? 'success' : record.percentage >= 80 ? 'warning' : 'error'} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>{record.teacher}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Create New Attendance Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Tạo điểm danh mới</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Chọn lớp</InputLabel>
                <Select
                  value={selectedClass}
                  label="Chọn lớp"
                  onChange={handleClassChange}
                >
                  {classes.map((cls) => (
                    <MenuItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Ngày điểm danh"
                value={selectedDate}
                onChange={handleDateChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            {/* Attendance Table in Dialog */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Điểm danh học sinh
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell>Học sinh</TableCell>
                      <TableCell>Trạng thái</TableCell>
                      <TableCell>Ghi chú</TableCell>
                      <TableCell>Thao tác</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((student, index) => {
                      const isPresent = getStudentAttendance(student.id);
                      const note = getStudentNote(student.id);
                      
                      return (
                        <TableRow key={student.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                {student.avatar}
                              </Avatar>
                              <Typography>{student.name}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={isPresent}
                                  onChange={(e) => handleAttendanceChange(student.id, e.target.checked)}
                                  color="success"
                                />
                              }
                              label={isPresent ? 'Có mặt' : 'Vắng mặt'}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              placeholder="Ghi chú..."
                              variant="outlined"
                              value={note}
                              onChange={(e) => handleNoteChange(student.id, e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Box display="flex" gap={1}>
                              <Tooltip title="Đánh dấu có mặt">
                                <IconButton
                                  size="small"
                                  color="success"
                                  onClick={() => handleAttendanceChange(student.id, true)}
                                >
                                  <CheckCircle />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Đánh dấu vắng mặt">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleAttendanceChange(student.id, false)}
                                >
                                  <Cancel />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button onClick={handleSaveAttendance} variant="contained" startIcon={<Save />}>
            Lưu điểm danh
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TeacherAttendance; 