import React, { useState, useEffect } from 'react';
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
  FormControlLabel,
  Alert,
  CircularProgress,
  Snackbar
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
  Warning,
  Block,
  Download,
  Assessment
} from '@mui/icons-material';
import styles from '../../styles/TeacherAttendance.module.css';
import attendanceService, { ATTENDANCE_STATUS, ATTENDANCE_STATUS_LABELS, ATTENDANCE_STATUS_COLORS } from '../../services/attendanceService';
import AttendanceFilters from './AttendanceFilters';

const TeacherAttendance = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [openDialog, setOpenDialog] = useState(false);
  const [attendanceData, setAttendanceData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [currentAttendance, setCurrentAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // 📊 REPORT FILTERS STATE
  const [reportStartDate, setReportStartDate] = useState('');
  const [reportEndDate, setReportEndDate] = useState('');
  const [showReportSection, setShowReportSection] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [reportStats, setReportStats] = useState({
    totalSessions: 0,
    averageAttendance: 0,
    totalPresent: 0,
    totalAbsent: 0
  });

  // Mock teacherId - should come from auth context
  const teacherId = 1;

  // Check if selected date is in the future - KHÔNG CHO CHỌN NGÀY TƯƠNG LAI
  const isDateBlocked = !attendanceService.isValidAttendanceDate(selectedDate);
  const todayDate = new Date().toISOString().split('T')[0];

  // Load data on component mount
  useEffect(() => {
    loadTeacherClasses();
    loadAttendanceHistory();
  }, []);

  // Load students when class changes
  useEffect(() => {
    if (selectedClass) {
      loadStudentsByClass(selectedClass);
    }
  }, [selectedClass]);

  const loadTeacherClasses = async () => {
    try {
      setLoading(true);
      const response = await attendanceService.getTeacherClasses(teacherId);
      setClasses(response);
    } catch (error) {
      showSnackbar('Lỗi khi tải danh sách lớp: ' + error.message, 'error');
      // Fallback to mock data
      setClasses([
        { id: 1, name: 'Toán 10A', students: 40 },
        { id: 2, name: 'Vật lý 11B', students: 35 },
        { id: 3, name: 'Hóa học 12A', students: 30 },
        { id: 4, name: 'Tiếng Anh 10C', students: 38 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const loadStudentsByClass = async (classId) => {
    try {
      setLoading(true);
      // Mock students data - in real app, this would be an API call
      const mockStudents = [
        { id: 1, name: 'Nguyễn Văn A', avatar: 'A' },
        { id: 2, name: 'Trần Thị B', avatar: 'B' },
        { id: 3, name: 'Lê Văn C', avatar: 'C' },
        { id: 4, name: 'Phạm Thị D', avatar: 'D' },
        { id: 5, name: 'Hoàng Văn E', avatar: 'E' },
        { id: 6, name: 'Vũ Thị F', avatar: 'F' },
        { id: 7, name: 'Đặng Văn G', avatar: 'G' },
        { id: 8, name: 'Bùi Thị H', avatar: 'H' }
      ];
      setStudents(mockStudents);
    } catch (error) {
      showSnackbar('Lỗi khi tải danh sách học sinh: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadAttendanceHistory = async () => {
    try {
      const response = await attendanceService.getAttendanceHistory(teacherId);
      setAttendanceHistory(response);
    } catch (error) {
      showSnackbar('Lỗi khi tải lịch sử điểm danh: ' + error.message, 'error');
      // Fallback to mock data
      setAttendanceHistory([
        {
          id: 1,
          date: '2025-08-12',
          class: 'Toán 10A',
          present: 35,
          absent: 5,
          percentage: 87.5,
          teacher: 'Cô Nguyễn Thị Mai'
        },
        {
          id: 2,
          date: '2025-08-11',
          class: 'Toán 10A',
          present: 38,
          absent: 2,
          percentage: 95,
          teacher: 'Cô Nguyễn Thị Mai'
        }
      ]);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
    setCurrentAttendance({});
    setAttendanceData({});
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    
    // Clear current attendance if date is in future
    if (!attendanceService.isValidAttendanceDate(newDate)) {
      setCurrentAttendance({});
      setAttendanceData({});
      showSnackbar('Không thể chọn ngày trong tương lai!', 'warning');
    }
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
    if (isDateBlocked) {
      showSnackbar('❌ Không thể điểm danh cho ngày trong tương lai!', 'error');
      return;
    }
    
    if (!selectedClass) {
      showSnackbar('⚠️ Vui lòng chọn lớp trước khi tạo điểm danh!', 'warning');
      return;
    }

    setOpenDialog(true);
    // Initialize attendance data for all students
    const initialAttendance = {};
    students.forEach(student => {
      initialAttendance[student.id] = true; // Default to present
      initialAttendance[`${student.id}_note`] = '';
    });
    setCurrentAttendance(initialAttendance);
  };

  const handleSaveAttendance = async () => {
    try {
      setLoading(true);
      
      // Prepare attendance data for API
      const attendanceRecords = students.map(student => ({
        studentId: student.id,
        status: currentAttendance[student.id] ? ATTENDANCE_STATUS.PRESENT : ATTENDANCE_STATUS.ABSENT,
        note: currentAttendance[`${student.id}_note`] || ''
      }));

      const attendanceData = attendanceService.formatAttendanceData(
        selectedClass,
        selectedDate,
        attendanceRecords
      );

      // Validate data before sending
      const validation = attendanceService.validateAttendanceData(attendanceData);
      if (!validation.isValid) {
        showSnackbar('❌ Dữ liệu không hợp lệ: ' + validation.errors.join(', '), 'error');
        return;
      }

      const result = await attendanceService.createAttendance(attendanceData);
      showSnackbar('✅ ' + result, 'success');
      
      setOpenDialog(false);
      setCurrentAttendance({});
      
      // Reload attendance history
      loadAttendanceHistory();
    } catch (error) {
      showSnackbar('❌ Lỗi khi lưu điểm danh: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditAttendance = () => {
    if (isDateBlocked) {
      showSnackbar('❌ Không thể chỉnh sửa điểm danh cho ngày trong tương lai!', 'error');
      return;
    }
    
    if (!selectedClass) {
      showSnackbar('⚠️ Vui lòng chọn lớp trước khi chỉnh sửa điểm danh!', 'warning');
      return;
    }

    setIsEditing(true);
    // Load existing attendance data
    loadExistingAttendance();
  };

  const loadExistingAttendance = async () => {
    try {
      setLoading(true);
      // Load existing attendance for the selected date and class
      const response = await attendanceService.getAttendanceByCourse(selectedClass, selectedDate);
      
      const existingAttendance = {};
      students.forEach(student => {
        const attendanceRecord = response.find(record => record.studentId === student.id);
        if (attendanceRecord) {
          existingAttendance[student.id] = attendanceRecord.status === ATTENDANCE_STATUS.PRESENT;
          existingAttendance[`${student.id}_note`] = attendanceRecord.note || '';
        } else {
          existingAttendance[student.id] = true; // Default to present
          existingAttendance[`${student.id}_note`] = '';
        }
      });
      setCurrentAttendance(existingAttendance);
    } catch (error) {
      showSnackbar('⚠️ Lỗi khi tải dữ liệu điểm danh: ' + error.message, 'warning');
      // Initialize with default values if no existing data
      const defaultAttendance = {};
      students.forEach(student => {
        defaultAttendance[student.id] = true;
        defaultAttendance[`${student.id}_note`] = '';
      });
      setCurrentAttendance(defaultAttendance);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEditAttendance = async () => {
    try {
      setLoading(true);
      
      const attendanceRecords = students.map(student => ({
        studentId: student.id,
        status: currentAttendance[student.id] ? ATTENDANCE_STATUS.PRESENT : ATTENDANCE_STATUS.ABSENT,
        note: currentAttendance[`${student.id}_note`] || ''
      }));

      const attendanceData = attendanceService.formatAttendanceData(
        selectedClass,
        selectedDate,
        attendanceRecords
      );

      // Validate data before sending
      const validation = attendanceService.validateAttendanceData(attendanceData);
      if (!validation.isValid) {
        showSnackbar('❌ Dữ liệu không hợp lệ: ' + validation.errors.join(', '), 'error');
        return;
      }

      const result = await attendanceService.createAttendance(attendanceData);
      showSnackbar('✅ Cập nhật điểm danh thành công!', 'success');
      
      setIsEditing(false);
      setCurrentAttendance({});
      
      // Reload attendance history
      loadAttendanceHistory();
    } catch (error) {
      showSnackbar('❌ Lỗi khi cập nhật điểm danh: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentAttendance({});
  };

  // 📊 REPORT FUNCTIONS
  const handleApplyReportFilter = async () => {
    try {
      setLoading(true);
      const response = await attendanceService.getAttendanceHistory(
        teacherId, 
        reportStartDate, 
        reportEndDate
      );
      
      setReportData(response);
      
      // Calculate report statistics
      const stats = {
        totalSessions: response.length,
        totalPresent: response.reduce((sum, session) => sum + (session.present || 0), 0),
        totalAbsent: response.reduce((sum, session) => sum + (session.absent || 0), 0),
        averageAttendance: 0
      };
      
      if (stats.totalSessions > 0) {
        stats.averageAttendance = Math.round(
          (stats.totalPresent / (stats.totalPresent + stats.totalAbsent)) * 100
        );
      }
      
      setReportStats(stats);
      setShowReportSection(true);
      showSnackbar(`📊 Đã tải ${response.length} buổi điểm danh`, 'success');
    } catch (error) {
      showSnackbar('❌ Lỗi khi tải báo cáo: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClearReportFilter = () => {
    setReportStartDate('');
    setReportEndDate('');
    setReportData([]);
    setShowReportSection(false);
    setReportStats({
      totalSessions: 0,
      averageAttendance: 0,
      totalPresent: 0,
      totalAbsent: 0
    });
  };

  const handleExportReport = () => {
    try {
      // Create CSV content
      const csvContent = [
        ['Ngày', 'Lớp', 'Có mặt', 'Vắng mặt', 'Tỷ lệ %', 'Giáo viên'],
        ...reportData.map(record => [
          record.date,
          record.class,
          record.present,
          record.absent,
          record.percentage,
          record.teacher
        ])
      ].map(row => row.join(',')).join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `attendance_report_${reportStartDate}_${reportEndDate}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showSnackbar('📥 Đã xuất báo cáo thành công!', 'success');
    } catch (error) {
      showSnackbar('❌ Lỗi khi xuất báo cáo: ' + error.message, 'error');
    }
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

      {/* ⚠️ Date Validation Alert - CHẶN NGÀY TƯƠNG LAI */}
      {isDateBlocked && (
        <Card sx={{ mb: 2, border: '2px solid #f44336' }}>
          <CardContent>
            <Alert 
              severity="error" 
              icon={<Block />}
              sx={{ 
                alignItems: 'center',
                backgroundColor: '#ffebee',
                '& .MuiAlert-icon': { color: '#f44336' }
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                🚫 <strong>CẢNH BÁO:</strong> Không thể điểm danh cho ngày trong tương lai!
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Ngày đã chọn: <strong>{selectedDate}</strong> | 
                Ngày hiện tại: <strong>{todayDate}</strong>
              </Typography>
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                ⏰ Vui lòng chọn ngày hôm nay ({todayDate}) hoặc trước đó.
              </Typography>
            </Alert>
          </CardContent>
        </Card>
      )}

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
                  disabled={loading}
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
                inputProps={{
                  max: todayDate // CHẶN CHỌN NGÀY TƯƠNG LAI
                }}
                error={isDateBlocked}
                helperText={isDateBlocked ? '❌ Không thể chọn ngày trong tương lai' : '✅ Ngày hợp lệ'}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-error': {
                      '& fieldset': {
                        borderColor: '#f44336',
                        borderWidth: '2px'
                      }
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={20} /> : <Add />}
                  onClick={handleCreateAttendance}
                  fullWidth
                  disabled={loading || isDateBlocked || !selectedClass}
                  sx={{
                    backgroundColor: isDateBlocked ? '#bdbdbd' : '#1976d2',
                    '&:hover': {
                      backgroundColor: isDateBlocked ? '#bdbdbd' : '#115293'
                    }
                  }}
                >
                  {isDateBlocked ? '🚫 Không thể tạo' : '➕ Tạo điểm danh mới'}
                </Button>
                {!isEditing && (
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={handleEditAttendance}
                    fullWidth
                    disabled={loading || isDateBlocked || !selectedClass}
                    sx={{
                      borderColor: isDateBlocked ? '#bdbdbd' : '#1976d2',
                      color: isDateBlocked ? '#bdbdbd' : '#1976d2'
                    }}
                  >
                    {isDateBlocked ? '🚫 Không thể sửa' : '✏️ Chỉnh sửa'}
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Grid container spacing={3} className={styles.statsGrid}>
        <Grid item xs={12} md={3}>
          <Card className={styles.statCard}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <CheckCircle sx={{ color: 'success.main', fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="success.main" fontWeight="bold">
                    {stats.present}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Có mặt
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {students.length > 0 ? Math.round((stats.present / students.length) * 100) : 0}% tổng số
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className={styles.statCard}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Cancel sx={{ color: 'error.main', fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="error.main" fontWeight="bold">
                    {stats.absent}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Vắng mặt
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {students.length > 0 ? Math.round((stats.absent / students.length) * 100) : 0}% tổng số
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className={styles.statCard}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <People sx={{ color: 'primary.main', fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="primary.main" fontWeight="bold">
                    {students.length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Tổng học sinh
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Lớp {selectedClass ? classes.find(c => c.id === selectedClass)?.name : 'chưa chọn'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className={styles.statCard}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Schedule sx={{ 
                  color: stats.percentage >= 90 ? 'success.main' : stats.percentage >= 75 ? 'warning.main' : 'error.main', 
                  fontSize: 40, 
                  mr: 2 
                }} />
                <Box>
                  <Typography 
                    variant="h4" 
                    color={stats.percentage >= 90 ? 'success.main' : stats.percentage >= 75 ? 'warning.main' : 'error.main'}
                    fontWeight="bold"
                  >
                    {stats.percentage}%
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Tỷ lệ có mặt
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {stats.percentage >= 90 ? '🟢 Tốt' : stats.percentage >= 75 ? '🟡 Trung bình' : '🔴 Cần cải thiện'}
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
                  startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                  onClick={handleSaveEditAttendance}
                  color="success"
                  disabled={loading}
                >
                  Lưu điểm danh
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  onClick={handleCancelEdit}
                  color="error"
                  disabled={loading}
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
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" display="flex" alignItems="center">
              <Assessment sx={{ mr: 1 }} />
              📊 Lịch sử điểm danh & Báo cáo
            </Typography>
            {showReportSection && (
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={handleExportReport}
                color="success"
                size="small"
              >
                📥 Xuất Excel
              </Button>
            )}
          </Box>
          
          {/* 📊 REPORT FILTERS */}
          <AttendanceFilters
            startDate={reportStartDate}
            endDate={reportEndDate}
            onStartDateChange={setReportStartDate}
            onEndDateChange={setReportEndDate}
            onApplyFilter={handleApplyReportFilter}
            onClearFilter={handleClearReportFilter}
            onExportData={handleExportReport}
            loading={loading}
          />

          {/* 📈 REPORT STATISTICS */}
          {showReportSection && (
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={3}>
                <Card sx={{ backgroundColor: '#e3f2fd', textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    {reportStats.totalSessions}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    📅 Tổng buổi học
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card sx={{ backgroundColor: '#e8f5e8', textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="success.main" fontWeight="bold">
                    {reportStats.totalPresent}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ✅ Tổng có mặt
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card sx={{ backgroundColor: '#ffebee', textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="error.main" fontWeight="bold">
                    {reportStats.totalAbsent}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ❌ Tổng vắng mặt
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card sx={{ 
                  backgroundColor: reportStats.averageAttendance >= 90 ? '#e8f5e8' : 
                                  reportStats.averageAttendance >= 75 ? '#fff3e0' : '#ffebee',
                  textAlign: 'center', 
                  p: 2 
                }}>
                  <Typography 
                    variant="h4" 
                    color={reportStats.averageAttendance >= 90 ? 'success.main' : 
                           reportStats.averageAttendance >= 75 ? 'warning.main' : 'error.main'}
                    fontWeight="bold"
                  >
                    {reportStats.averageAttendance}%
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    📊 TB có mặt
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* 📋 REPORT TABLE */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>📅 Ngày</TableCell>
                  <TableCell>🏫 Lớp</TableCell>
                  <TableCell>✅ Có mặt</TableCell>
                  <TableCell>❌ Vắng mặt</TableCell>
                  <TableCell>📊 Tỷ lệ</TableCell>
                  <TableCell>👨‍🏫 Giáo viên</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(showReportSection ? reportData : attendanceHistory).map((record) => (
                  <TableRow key={record.id} hover>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>
                      <Chip label={record.class} color="primary" variant="outlined" size="small" />
                    </TableCell>
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
                        sx={{ fontWeight: 'bold' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{record.teacher}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
                {(showReportSection ? reportData : attendanceHistory).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="textSecondary">
                        📝 {showReportSection ? 'Không có dữ liệu trong khoảng thời gian đã chọn' : 'Chưa có lịch sử điểm danh'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
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
                inputProps={{
                  max: todayDate // CHẶN CHỌN NGÀY TƯƠNG LAI
                }}
                error={isDateBlocked}
                helperText={isDateBlocked ? '❌ Không thể chọn ngày trong tương lai' : '✅ Ngày hợp lệ'}
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
          <Button onClick={() => setOpenDialog(false)} disabled={loading}>
            Hủy
          </Button>
          <Button 
            onClick={handleSaveAttendance} 
            variant="contained" 
            startIcon={loading ? <CircularProgress size={20} /> : <Save />}
            disabled={loading || isDateBlocked}
            sx={{
              backgroundColor: isDateBlocked ? '#bdbdbd' : '#1976d2',
              '&:hover': {
                backgroundColor: isDateBlocked ? '#bdbdbd' : '#115293'
              }
            }}
          >
            {isDateBlocked ? '🚫 Không thể lưu' : '💾 Lưu điểm danh'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TeacherAttendance; 