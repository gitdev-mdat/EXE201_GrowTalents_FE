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
  TextField,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Grade,
  Add,
  Edit,
  Save,
  Cancel,
  TrendingUp,
  TrendingDown
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/TeacherScores.module.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const TeacherScores = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTest, setSelectedTest] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingScores, setEditingScores] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // Mock data for classes
  const classes = [
    { id: 1, name: 'Toán 10A', students: 40 },
    { id: 2, name: 'Vật lý 11B', students: 35 },
    { id: 3, name: 'Hóa học 12A', students: 30 },
    { id: 4, name: 'Tiếng Anh 10C', students: 38 }
  ];

  // Mock data for tests
  const tests = [
    { id: 1, name: 'Kiểm tra 15 phút - Chương 1', maxScore: 10, date: '2024-03-20' },
    { id: 2, name: 'Kiểm tra 1 tiết - Chương 2', maxScore: 10, date: '2024-03-25' },
    { id: 3, name: 'Kiểm tra học kỳ 1', maxScore: 10, date: '2024-04-01' },
    { id: 4, name: 'Bài tập về nhà - Tuần 1', maxScore: 10, date: '2024-03-18' }
  ];

  // Mock data for students with scores
  const students = [
    { id: 1, name: 'Nguyễn Văn A', avatar: 'A', score: 8.5, status: 'good' },
    { id: 2, name: 'Trần Thị B', avatar: 'B', score: 9.0, status: 'excellent' },
    { id: 3, name: 'Lê Văn C', avatar: 'C', score: 6.5, status: 'average' },
    { id: 4, name: 'Phạm Thị D', avatar: 'D', score: 7.0, status: 'good' },
    { id: 5, name: 'Hoàng Văn E', avatar: 'E', score: 5.5, status: 'poor' },
    { id: 6, name: 'Vũ Thị F', avatar: 'F', score: 8.0, status: 'good' },
    { id: 7, name: 'Đặng Văn G', avatar: 'G', score: 9.5, status: 'excellent' },
    { id: 8, name: 'Bùi Thị H', avatar: 'H', score: 7.5, status: 'good' }
  ];

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleTestChange = (event) => {
    setSelectedTest(event.target.value);
  };

  const handleScoreChange = (studentId, score) => {
    setEditingScores(prev => ({
      ...prev,
      [studentId]: score
    }));
  };

  const handleEditScores = () => {
    setIsEditing(true);
    const initialScores = {};
    students.forEach(student => {
      initialScores[student.id] = student.score;
    });
    setEditingScores(initialScores);
  };

  const handleSaveScores = () => {
    console.log('Saving scores:', editingScores);
    setIsEditing(false);
    setEditingScores({});
    // Here you would typically save to backend
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingScores({});
  };

  const handleCreateQuiz = () => {
    navigate('/teacher/quiz-creator');
  };

  const getScoreStatus = (score) => {
    if (score >= 9.0) return { status: 'excellent', label: 'Xuất sắc', color: 'success' };
    if (score >= 8.0) return { status: 'good', label: 'Tốt', color: 'primary' };
    if (score >= 6.5) return { status: 'average', label: 'Trung bình', color: 'warning' };
    return { status: 'poor', label: 'Yếu', color: 'error' };
  };

  const getScoreStats = () => {
    const scores = students.map(s => s.score);
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    const max = Math.max(...scores);
    const min = Math.min(...scores);
    const passed = scores.filter(s => s >= 5.0).length;
    const percentage = Math.round((passed / scores.length) * 100);
    return { average: average.toFixed(1), max, min, passed, percentage };
  };

  const stats = getScoreStats();

  // Mock: Số học sinh đã làm bài cho mỗi test (giả lập)
  const getStudentsDoneCount = (testId) => {
    return testId % 2 === 0 ? 8 : 5;
  };
  // Mock: Danh sách học sinh đã làm bài cho mỗi test (giả lập)
  const getStudentsDoneList = (testId) => {
    // Lẻ: 5 học sinh đầu, chẵn: 8 học sinh đầu
    return testId % 2 === 0 ? students.slice(0, 8) : students.slice(0, 5);
  };

  // State để mở rộng từng test
  const [expandedTestId, setExpandedTestId] = useState(null);
  const handleExpandTest = (testId) => {
    setExpandedTestId(expandedTestId === testId ? null : testId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography variant="h4" component="h1" gutterBottom>
          Nhập điểm bài kiểm tra
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Quản lý và nhập điểm cho các bài kiểm tra của học sinh
        </Typography>
      </div>

      {/* Created Tests Section */}
      <Card className={styles.tableCard} style={{ marginBottom: 24 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Danh sách các bài kiểm tra đã tạo
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Tên bài kiểm tra</TableCell>
                  <TableCell>Ngày kiểm tra</TableCell>
                  <TableCell>Điểm tối đa</TableCell>
                  <TableCell>Số học sinh đã làm</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tests.map((test) => (
                  <React.Fragment key={test.id}>
                    <TableRow>
                      <TableCell>
                        <IconButton size="small" onClick={() => handleExpandTest(test.id)}>
                          {expandedTestId === test.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell>{test.name}</TableCell>
                      <TableCell>{test.date}</TableCell>
                      <TableCell>{test.maxScore}</TableCell>
                      <TableCell>
                        <Chip
                          label={`${getStudentsDoneCount(test.id)} học sinh`}
                          color={getStudentsDoneCount(test.id) >= 8 ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                    {expandedTestId === test.id && (
                      <TableRow>
                        <TableCell colSpan={5} style={{ background: '#f9f9f9', paddingLeft: 48 }}>
                          <Typography variant="subtitle2" gutterBottom>
                            Học sinh đã làm bài:
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={2}>
                            {getStudentsDoneList(test.id).map((student) => (
                              <Chip
                                key={student.id}
                                label={student.name}
                                avatar={<Avatar>{student.avatar}</Avatar>}
                                color="primary"
                                variant="outlined"
                              />
                            ))}
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

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
              <FormControl fullWidth>
                <InputLabel>Chọn bài kiểm tra</InputLabel>
                <Select
                  value={selectedTest}
                  label="Chọn bài kiểm tra"
                  onChange={handleTestChange}
                >
                  {tests.map((test) => (
                    <MenuItem key={test.id} value={test.id}>
                      {test.name} (Tối đa: {test.maxScore} điểm)
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex" gap={1}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleCreateQuiz}
                  fullWidth
                >
                  Tạo bài kiểm tra trắc nghiệm
                </Button>
                {!isEditing ? (
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={handleEditScores}
                  >
                    Sửa điểm
                  </Button>
                ) : (
                  <Box display="flex" gap={1}>
                    <Button
                      variant="contained"
                      startIcon={<Save />}
                      onClick={handleSaveScores}
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
                <TrendingUp sx={{ color: 'success.main', fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="success.main">
                    {stats.average}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Điểm trung bình
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
                <Grade sx={{ color: 'primary.main', fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="primary.main">
                    {stats.max}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Điểm cao nhất
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
                <TrendingDown sx={{ color: 'error.main', fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="error.main">
                    {stats.min}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Điểm thấp nhất
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
                <Grade sx={{ color: 'warning.main', fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="warning.main">
                    {stats.percentage}%
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Tỷ lệ đạt ({stats.passed}/{students.length})
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Scores Table */}
      <Card className={styles.tableCard}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Bảng điểm - {selectedTest ? tests.find(t => t.id === selectedTest)?.name : 'Chọn bài kiểm tra'}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Học sinh</TableCell>
                  <TableCell>Điểm</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Ghi chú</TableCell>
                  {isEditing && <TableCell>Thao tác</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, index) => {
                  const scoreStatus = getScoreStatus(student.score);
                  const currentScore = isEditing ? editingScores[student.id] || student.score : student.score;
                  
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
                          <TextField
                            type="number"
                            value={currentScore}
                            onChange={(e) => handleScoreChange(student.id, parseFloat(e.target.value) || 0)}
                            inputProps={{ 
                              min: 0, 
                              max: tests.find(t => t.id === selectedTest)?.maxScore || 10,
                              step: 0.1
                            }}
                            size="small"
                            variant="outlined"
                          />
                        ) : (
                          <Typography variant="h6" color="primary">
                            {currentScore}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={scoreStatus.label}
                          color={scoreStatus.color}
                          icon={<Grade />}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          placeholder="Ghi chú..."
                          variant="outlined"
                        />
                      </TableCell>
                      {isEditing && (
                        <TableCell>
                          <Tooltip title="Cập nhật điểm">
                            <IconButton color="primary" size="small">
                              <Save />
                            </IconButton>
                          </Tooltip>
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

      {/* Create New Test Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Tạo bài kiểm tra mới</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tên bài kiểm tra"
                placeholder="VD: Kiểm tra 15 phút - Chương 1"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Điểm tối đa"
                inputProps={{ min: 1, max: 10 }}
                defaultValue={10}
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
                label="Ngày kiểm tra"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button variant="contained">Tạo bài kiểm tra</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TeacherScores; 