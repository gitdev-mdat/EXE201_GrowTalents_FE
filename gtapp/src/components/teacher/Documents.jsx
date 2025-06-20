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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import {
  Upload,
  Description,
  Assignment,
  Delete,
  Download,
  Visibility,
  Add,
  Folder,
  PictureAsPdf,
  Image,
  VideoLibrary
} from '@mui/icons-material';
import styles from '../../styles/TeacherDocuments.module.css';

const TeacherDocuments = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);

  // Mock data for classes
  const classes = [
    { id: 1, name: 'Toán 10A', students: 40 },
    { id: 2, name: 'Vật lý 11B', students: 35 },
    { id: 3, name: 'Hóa học 12A', students: 30 },
    { id: 4, name: 'Tiếng Anh 10C', students: 38 }
  ];

  // Mock data for documents
  const documents = [
    {
      id: 1,
      name: 'Bài giảng Chương 1 - Đại số',
      type: 'pdf',
      size: '2.5 MB',
      uploadDate: '2024-03-20',
      downloads: 45,
      class: 'Toán 10A'
    },
    {
      id: 2,
      name: 'Bài tập về nhà - Tuần 1',
      type: 'pdf',
      size: '1.2 MB',
      uploadDate: '2024-03-18',
      downloads: 38,
      class: 'Toán 10A'
    },
    {
      id: 3,
      name: 'Hình ảnh minh họa - Vật lý',
      type: 'image',
      size: '3.1 MB',
      uploadDate: '2024-03-19',
      downloads: 32,
      class: 'Vật lý 11B'
    },
    {
      id: 4,
      name: 'Video bài giảng - Hóa học',
      type: 'video',
      size: '15.2 MB',
      uploadDate: '2024-03-17',
      downloads: 28,
      class: 'Hóa học 12A'
    }
  ];

  // Mock data for assignments
  const assignments = [
    {
      id: 1,
      title: 'Bài tập về nhà - Chương 1',
      description: 'Làm bài tập 1-10 trong sách giáo khoa trang 25-30',
      dueDate: '2024-03-25',
      class: 'Toán 10A',
      status: 'active',
      submissions: 35,
      totalStudents: 40
    },
    {
      id: 2,
      title: 'Báo cáo thí nghiệm - Vật lý',
      description: 'Viết báo cáo thí nghiệm về chuyển động thẳng đều',
      dueDate: '2024-03-28',
      class: 'Vật lý 11B',
      status: 'active',
      submissions: 30,
      totalStudents: 35
    },
    {
      id: 3,
      title: 'Bài kiểm tra online - Hóa học',
      description: 'Kiểm tra kiến thức chương 2 - Hóa học vô cơ',
      dueDate: '2024-03-30',
      class: 'Hóa học 12A',
      status: 'draft',
      submissions: 0,
      totalStudents: 30
    }
  ];

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <PictureAsPdf color="error" />;
      case 'image':
        return <Image color="primary" />;
      case 'video':
        return <VideoLibrary color="secondary" />;
      default:
        return <Description color="action" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'draft':
        return 'warning';
      case 'expired':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Đang hoạt động';
      case 'draft':
        return 'Bản nháp';
      case 'expired':
        return 'Hết hạn';
      default:
        return 'Không xác định';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tài liệu và Bài tập
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Quản lý tài liệu giảng dạy và giao bài tập cho học sinh
        </Typography>
      </div>

      {/* Filters */}
      <Card className={styles.filterCard}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Chọn lớp</InputLabel>
                <Select
                  value={selectedClass}
                  label="Chọn lớp"
                  onChange={handleClassChange}
                >
                  <MenuItem value="">Tất cả các lớp</MenuItem>
                  {classes.map((cls) => (
                    <MenuItem key={cls.id} value={cls.id}>
                      {cls.name} ({cls.students} học sinh)
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  startIcon={<Upload />}
                  onClick={() => setOpenUploadDialog(true)}
                  fullWidth
                >
                  Tải lên tài liệu
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Assignment />}
                  onClick={() => setOpenAssignmentDialog(true)}
                  fullWidth
                >
                  Tạo bài tập
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Paper className={styles.tabsContainer}>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Tài liệu" icon={<Description />} />
          <Tab label="Bài tập" icon={<Assignment />} />
        </Tabs>
      </Paper>

      {/* Content based on selected tab */}
      {selectedTab === 0 && (
        <Card className={styles.contentCard}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Tài liệu đã tải lên
            </Typography>
            <List>
              {documents.map((doc) => (
                <ListItem key={doc.id} className={styles.documentItem}>
                  <ListItemIcon>
                    {getFileIcon(doc.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={doc.name}
                    secondary={
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          Lớp: {doc.class} | Kích thước: {doc.size} | 
                          Tải lên: {doc.uploadDate} | Lượt tải: {doc.downloads}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Box display="flex" gap={1}>
                      <IconButton size="small" title="Xem">
                        <Visibility />
                      </IconButton>
                      <IconButton size="small" title="Tải xuống">
                        <Download />
                      </IconButton>
                      <IconButton size="small" title="Xóa" color="error">
                        <Delete />
                      </IconButton>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {selectedTab === 1 && (
        <Card className={styles.contentCard}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Bài tập đã giao
            </Typography>
            <Grid container spacing={3}>
              {assignments.map((assignment) => (
                <Grid item xs={12} md={6} key={assignment.id}>
                  <Card className={styles.assignmentCard}>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Typography variant="h6" component="h3">
                          {assignment.title}
                        </Typography>
                        <Chip
                          label={getStatusLabel(assignment.status)}
                          color={getStatusColor(assignment.status)}
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" color="textSecondary" mb={2}>
                        {assignment.description}
                      </Typography>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="body2">
                          <strong>Lớp:</strong> {assignment.class}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Hạn nộp:</strong> {assignment.dueDate}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">
                          <strong>Đã nộp:</strong> {assignment.submissions}/{assignment.totalStudents}
                        </Typography>
                        <Box display="flex" gap={1}>
                          <Button size="small" variant="outlined">
                            Xem chi tiết
                          </Button>
                          <Button size="small" variant="outlined" color="error">
                            Xóa
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Upload Document Dialog */}
      <Dialog open={openUploadDialog} onClose={() => setOpenUploadDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Tải lên tài liệu mới</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên tài liệu"
                placeholder="VD: Bài giảng Chương 1 - Đại số"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Chọn lớp</InputLabel>
                <Select label="Chọn lớp">
                  {classes.map((cls) => (
                    <MenuItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Loại tài liệu</InputLabel>
                <Select label="Loại tài liệu">
                  <MenuItem value="lecture">Bài giảng</MenuItem>
                  <MenuItem value="exercise">Bài tập</MenuItem>
                  <MenuItem value="reference">Tài liệu tham khảo</MenuItem>
                  <MenuItem value="other">Khác</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Mô tả"
                placeholder="Mô tả ngắn về tài liệu..."
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<Upload />}
                fullWidth
                sx={{ py: 2 }}
              >
                Chọn file để tải lên
                <input type="file" hidden />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUploadDialog(false)}>Hủy</Button>
          <Button variant="contained">Tải lên</Button>
        </DialogActions>
      </Dialog>

      {/* Create Assignment Dialog */}
      <Dialog open={openAssignmentDialog} onClose={() => setOpenAssignmentDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Tạo bài tập mới</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tiêu đề bài tập"
                placeholder="VD: Bài tập về nhà - Chương 1"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Chọn lớp</InputLabel>
                <Select label="Chọn lớp">
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
                label="Hạn nộp"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Nội dung bài tập"
                placeholder="Mô tả chi tiết bài tập..."
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<Upload />}
                fullWidth
                sx={{ py: 2 }}
              >
                Đính kèm tài liệu (nếu có)
                <input type="file" hidden />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAssignmentDialog(false)}>Hủy</Button>
          <Button variant="contained">Tạo bài tập</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TeacherDocuments; 