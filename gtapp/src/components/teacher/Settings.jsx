import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  Avatar,
  Switch,
  FormControlLabel,
  Divider,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Person,
  Security,
  Notifications,
  Settings as SettingsIcon,
  Edit,
  Save,
  Cancel,
  PhotoCamera,
  Email,
  Phone,
  School,
  Work,
  LocationOn,
  CalendarToday
} from '@mui/icons-material';
import styles from '../../styles/TeacherSettings.module.css';

const TeacherSettings = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

  // Mock teacher data
  const teacherData = {
    name: 'Nguyễn Thị Mai',
    email: 'nguyenthi.mai@growtalents.edu.vn',
    phone: '0901234567',
    avatar: 'M',
    department: 'Khoa Toán - Tin học',
    position: 'Giáo viên Toán',
    experience: '8 năm',
    education: 'Thạc sĩ Toán học',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    joinDate: '2016-09-01',
    subjects: ['Toán 10', 'Toán 11', 'Toán 12'],
    classes: ['Toán 10A', 'Vật lý 11B', 'Hóa học 12A']
  };

  const [formData, setFormData] = useState(teacherData);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    console.log('Saving profile:', formData);
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleCancelEdit = () => {
    setFormData(teacherData);
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    console.log('Changing password');
    setOpenPasswordDialog(false);
    // Here you would typically change password
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cài đặt và Hồ sơ
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Quản lý thông tin cá nhân và cài đặt hệ thống
        </Typography>
      </div>

      {/* Tabs */}
      <Paper className={styles.tabsContainer}>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Hồ sơ" icon={<Person />} />
          <Tab label="Bảo mật" icon={<Security />} />
          <Tab label="Thông báo" icon={<Notifications />} />
          <Tab label="Hệ thống" icon={<SettingsIcon />} />
        </Tabs>
      </Paper>

      {/* Profile Tab */}
      {selectedTab === 0 && (
        <Card className={styles.contentCard}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6">Thông tin cá nhân</Typography>
              {!isEditing ? (
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  onClick={() => setIsEditing(true)}
                >
                  Chỉnh sửa
                </Button>
              ) : (
                <Box display="flex" gap={1}>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSaveProfile}
                    color="success"
                  >
                    Lưu
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

            <Grid container spacing={3}>
              {/* Avatar and Basic Info */}
              <Grid item xs={12} md={4}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar
                    sx={{ width: 120, height: 120, fontSize: 48, mb: 2 }}
                    src={formData.avatar}
                  >
                    {formData.avatar}
                  </Avatar>
                  {isEditing && (
                    <Button
                      variant="outlined"
                      startIcon={<PhotoCamera />}
                      size="small"
                    >
                      Thay đổi ảnh
                    </Button>
                  )}
                  <Typography variant="h6" mt={2}>
                    {formData.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {formData.position}
                  </Typography>
                </Box>
              </Grid>

              {/* Personal Information */}
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Họ và tên"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <Person sx={{ mr: 1, color: 'action.active' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <Phone sx={{ mr: 1, color: 'action.active' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Khoa"
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <School sx={{ mr: 1, color: 'action.active' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Chức vụ"
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <Work sx={{ mr: 1, color: 'action.active' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Kinh nghiệm"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Địa chỉ"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <LocationOn sx={{ mr: 1, color: 'action.active' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Học vị"
                      value={formData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Ngày vào làm"
                      value={formData.joinDate}
                      onChange={(e) => handleInputChange('joinDate', e.target.value)}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <CalendarToday sx={{ mr: 1, color: 'action.active' }} />
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Teaching Information */}
            <Typography variant="h6" gutterBottom>
              Thông tin giảng dạy
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Môn học đang dạy:
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {formData.subjects.map((subject, index) => (
                    <Chip key={index} label={subject} color="primary" variant="outlined" />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Lớp đang phụ trách:
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {formData.classes.map((cls, index) => (
                    <Chip key={index} label={cls} color="secondary" variant="outlined" />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Security Tab */}
      {selectedTab === 1 && (
        <Card className={styles.contentCard}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Bảo mật tài khoản
            </Typography>
            
            <List>
              <ListItem>
                <ListItemText
                  primary="Đổi mật khẩu"
                  secondary="Cập nhật mật khẩu tài khoản của bạn"
                />
                <Button
                  variant="outlined"
                  onClick={() => setOpenPasswordDialog(true)}
                >
                  Đổi mật khẩu
                </Button>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Xác thực hai yếu tố"
                  secondary="Bảo vệ tài khoản bằng mã xác thực"
                />
                <Switch />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Đăng nhập từ thiết bị mới"
                  secondary="Nhận thông báo khi có đăng nhập mới"
                />
                <Switch defaultChecked />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      )}

      {/* Notifications Tab */}
      {selectedTab === 2 && (
        <Card className={styles.contentCard}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Cài đặt thông báo
            </Typography>
            
            <List>
              <ListItem>
                <ListItemText
                  primary="Thông báo email"
                  secondary="Nhận thông báo qua email"
                />
                <Switch defaultChecked />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Thông báo điểm danh"
                  secondary="Thông báo khi học sinh vắng mặt"
                />
                <Switch defaultChecked />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Thông báo bài tập"
                  secondary="Thông báo khi có bài tập mới"
                />
                <Switch defaultChecked />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Thông báo lịch học"
                  secondary="Nhắc nhở lịch giảng dạy"
                />
                <Switch defaultChecked />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      )}

      {/* System Tab */}
      {selectedTab === 3 && (
        <Card className={styles.contentCard}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Cài đặt hệ thống
            </Typography>
            
            <List>
              <ListItem>
                <ListItemText
                  primary="Chế độ tối"
                  secondary="Giao diện tối cho mắt"
                />
                <Switch />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Ngôn ngữ"
                  secondary="Tiếng Việt"
                />
                <Button variant="outlined" size="small">
                  Thay đổi
                </Button>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Múi giờ"
                  secondary="GMT+7 (Việt Nam)"
                />
                <Button variant="outlined" size="small">
                  Thay đổi
                </Button>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      )}

      {/* Change Password Dialog */}
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Đổi mật khẩu</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Mật khẩu hiện tại"
                placeholder="Nhập mật khẩu hiện tại"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Mật khẩu mới"
                placeholder="Nhập mật khẩu mới"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Xác nhận mật khẩu mới"
                placeholder="Nhập lại mật khẩu mới"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Hủy</Button>
          <Button onClick={handlePasswordChange} variant="contained">
            Đổi mật khẩu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TeacherSettings; 