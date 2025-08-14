import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import {
  Schedule,
  Add,
  Today,
  AccessTime,
  Group,
  RequestPage
} from '@mui/icons-material';
import styles from '../../styles/TeacherSchedule.module.css';

const TeacherSchedule = () => {
  const [selectedWeek, setSelectedWeek] = useState('');
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [scheduleChangeRequests, setScheduleChangeRequests] = useState([
    {
      id: 1,
      date: '2024-01-15',
      currentSchedule: 'Thứ 2, 08:00 - 09:30, Toán 10A',
      requestedChange: 'Đổi sang Thứ 3, 14:00 - 15:30',
      reason: 'Có việc cá nhân cần xử lý',
      status: 'Không duyệt'
    },
    {
      id: 2,
      date: '2024-01-10',
      currentSchedule: 'Thứ 4, 10:00 - 11:30, Vật lý 11B',
      requestedChange: 'Đổi phòng từ Phòng 102 sang Phòng Lab 1',
      reason: 'Cần phòng lab cho thí nghiệm',
      status: 'Đã duyệt'
    }
  ]);

  // Mock data for schedule (removed room)
  const scheduleData = [
    { id: 1, day: 'Thứ 2', time: '08:00 - 09:30', subject: 'Toán 10A', students: 40, type: 'Lý thuyết' },
    { id: 2, day: 'Thứ 2', time: '10:00 - 11:30', subject: 'Vật lý 11B', students: 35, type: 'Thực hành' },
    { id: 3, day: 'Thứ 3', time: '08:00 - 09:30', subject: 'Hóa học 12A', students: 30, type: 'Lý thuyết' },
    { id: 4, day: 'Thứ 3', time: '14:00 - 15:30', subject: 'Toán 10A', students: 40, type: 'Bài tập' },
    { id: 5, day: 'Thứ 4', time: '08:00 - 09:30', subject: 'Tiếng Anh 10C', students: 38, type: 'Lý thuyết' },
    { id: 6, day: 'Thứ 5', time: '10:00 - 11:30', subject: 'Vật lý 11B', students: 35, type: 'Lý thuyết' },
    { id: 7, day: 'Thứ 6', time: '08:00 - 09:30', subject: 'Hóa học 12A', students: 30, type: 'Thực hành' }
  ];

  const classes = [
    { id: 1, name: 'Toán 10A', students: 40 },
    { id: 2, name: 'Vật lý 11B', students: 35 },
    { id: 3, name: 'Hóa học 12A', students: 30 },
    { id: 4, name: 'Tiếng Anh 10C', students: 38 }
  ];

  const timeSlots = [
    '08:00 - 09:30',
    '10:00 - 11:30',
    '14:00 - 15:30',
    '16:00 - 17:30'
  ];

  const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  const handleAddRequest = () => {
    setOpenRequestDialog(true);
  };

  const handleSaveRequest = () => {
    console.log('Saving schedule change request');
    setOpenRequestDialog(false);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Lý thuyết': return 'primary';
      case 'Thực hành': return 'secondary';
      case 'Bài tập': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Không duyệt': return 'error';
      case 'Đã duyệt': return 'success';
      case 'Từ chối': return 'error';
      default: return 'default';
    }
  };

  const getScheduleStats = () => {
    const totalClasses = scheduleData.length;
    const totalStudents = scheduleData.reduce((sum, item) => sum + item.students, 0);
    const totalHours = scheduleData.length * 1.5;
    const uniqueSubjects = new Set(scheduleData.map(item => item.subject)).size;
    return { totalClasses, totalStudents, totalHours, uniqueSubjects };
  };

  const stats = getScheduleStats();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography variant="h4" component="h1" gutterBottom>
          Lịch giảng dạy
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Xem lịch giảng dạy và đề xuất thay đổi lịch
        </Typography>
      </div>

      {/* Filters */}
      <Card className={styles.filterCard}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="week"
                label="Chọn tuần"
                value={selectedWeek}
                onChange={handleWeekChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Lọc theo môn học</InputLabel>
                <Select label="Lọc theo môn học">
                  <MenuItem value="">Tất cả môn học</MenuItem>
                  {classes.map((cls) => (
                    <MenuItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                startIcon={<RequestPage />}
                onClick={handleAddRequest}
                fullWidth
              >
                Đề xuất đổi lịch
              </Button>
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
                <Schedule sx={{ color: 'primary.main', fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="primary.main">
                    {stats.totalClasses}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Buổi học/tuần
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
                <Group sx={{ color: 'success.main', fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="success.main">
                    {stats.totalStudents}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Tổng học sinh
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
                <AccessTime sx={{ color: 'warning.main', fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="warning.main">
                    {stats.totalHours}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Giờ giảng/tuần
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
                <Today sx={{ color: 'info.main', fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="info.main">
                    {stats.uniqueSubjects}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Môn học
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Schedule Table */}
      <Card className={styles.tableCard}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Lịch giảng dạy tuần {selectedWeek || 'hiện tại'}
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            Lịch giảng dạy được quản lý bởi Admin. Bạn chỉ có thể xem và đề xuất thay đổi.
          </Alert>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Thứ</TableCell>
                  <TableCell>Thời gian</TableCell>
                  <TableCell>Môn học</TableCell>
                  <TableCell>Số học sinh</TableCell>
                  <TableCell>Loại</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scheduleData.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold">
                        {schedule.day}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <AccessTime sx={{ mr: 1, fontSize: 16 }} />
                        {schedule.time}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight="medium">
                        {schedule.subject}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Group sx={{ mr: 1, fontSize: 16 }} />
                        {schedule.students}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={schedule.type}
                        color={getTypeColor(schedule.type)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Schedule Change Requests */}
      <Card className={styles.tableCard} sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Đề xuất thay đổi lịch
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ngày đề xuất</TableCell>
                  <TableCell>Lịch hiện tại</TableCell>
                  <TableCell>Đề xuất thay đổi</TableCell>
                  <TableCell>Lý do</TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scheduleChangeRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(request.date).toLocaleDateString('vi-VN')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {request.currentSchedule}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {request.requestedChange}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {request.reason}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={request.status}
                        color={getStatusColor(request.status)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Schedule Change Request Dialog */}
      <Dialog open={openRequestDialog} onClose={() => setOpenRequestDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Đề xuất thay đổi lịch giảng dạy</DialogTitle>
        <DialogContent>
  <Grid container spacing={3} sx={{ mt: 1 }}>
    {/* Chọn Thứ */}
    <Grid item xs={12} md={4}>
      <FormControl fullWidth>
        <InputLabel>Chọn Thứ</InputLabel>
        <Select label="Chọn Thứ">
          {days.map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

    {/* Chọn Giờ */}
    <Grid item xs={12} md={4}>
      <FormControl fullWidth>
        <InputLabel>Chọn Giờ</InputLabel>
        <Select label="Chọn Giờ">
          {timeSlots.map((time) => (
            <MenuItem key={time} value={time}>
              {time}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

    {/* Chọn Môn học / Lớp */}
    <Grid item xs={12} md={4}>
      <FormControl fullWidth>
        <InputLabel>Chọn Môn học / Lớp</InputLabel>
        <Select label="Chọn Môn học / Lớp">
          {classes.map((cls) => (
            <MenuItem key={cls.id} value={cls.name}>
              {cls.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

    {/* Ngày muốn thay đổi */}
    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        type="date"
        label="Ngày muốn thay đổi"
        InputLabelProps={{ shrink: true }}
      />
    </Grid>

    {/* Thời gian mới */}
    <Grid item xs={12} md={6}>
      <FormControl fullWidth>
        <InputLabel>Thời gian mới</InputLabel>
        <Select label="Thời gian mới">
          {timeSlots.map((time) => (
            <MenuItem key={time} value={time}>
              {time}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

    {/* Lý do */}
    <Grid item xs={12}>
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Lý do thay đổi"
        placeholder="Vui lòng giải thích lý do cần thay đổi lịch..."
        required
      />
    </Grid>

    {/* Ghi chú bổ sung */}
    <Grid item xs={12}>
      <TextField
        fullWidth
        multiline
        rows={2}
        label="Ghi chú bổ sung"
        placeholder="Thông tin bổ sung nếu cần..."
      />
    </Grid>
  </Grid>
</DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenRequestDialog(false)}>Hủy</Button>
          <Button onClick={handleSaveRequest} variant="contained">
            Gửi đề xuất
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TeacherSchedule;
