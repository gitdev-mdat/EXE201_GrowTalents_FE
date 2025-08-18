import React, { useState } from 'react';
import { useEffect } from 'react';
import assignmentApi from '../../api/assignmentAPI';
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
  const [selectedTest, setSelectedTest] = useState(null); 
  const [openDialog, setOpenDialog] = useState(false);
  const [editingScores, setEditingScores] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // State for assignments (tests)
  const [tests, setTests] = useState([]);
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const teacherId = localStorage.getItem('teacherId');
        if (!teacherId) return;
        const res = await assignmentApi.getByTeacher({ teacherId });
        if (res && res.data && Array.isArray(res.data.data)) {
          // Map API data to local test format
          const mapped = res.data.data.map((item, idx) => ({
            id: item.assignmentId || idx + 1,
            name: item.title || item.lessonTitle || '',
            maxScore: 10, // Nếu có trường maxScore thì lấy, không thì mặc định 10
            date: '', // Nếu có trường ngày thì lấy, không thì để rỗng
            ...item
          }));
          setTests(mapped);
        }
      } catch (error) {
        setTests([]);
      }
    };
    fetchAssignments();
  }, []);

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

  const handleViewScores = (testId) => {
    setSelectedTest(testId);
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
    // Save to backend here
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingScores({});
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

  const getStudentsDoneCount = (testId) => {
    return testId % 2 === 0 ? 8 : 5;
  };

  const getStudentsDoneList = (testId) => {
    return testId % 2 === 0 ? students.slice(0, 8) : students.slice(0, 5);
  };

  const [expandedTestId, setExpandedTestId] = useState(null);
  const handleExpandTest = (testId) => {
    setExpandedTestId(expandedTestId === testId ? null : testId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography variant="h4" gutterBottom>
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
                  <TableCell>Xem điểm</TableCell>
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
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleViewScores(test.id)}
                        >
                          Xem điểm
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedTestId === test.id && (
                      <TableRow>
                        <TableCell colSpan={6} style={{ background: '#f9f9f9', paddingLeft: 48 }}>
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

      {/* Scores Table - chỉ hiển thị khi đã chọn bài kiểm tra */}
      {selectedTest && (
        <Card className={styles.tableCard}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">
                Bảng điểm - {tests.find(t => t.id === selectedTest)?.name}
              </Typography>

              <Box display="flex" gap={1}>
                {!isEditing ? (
                  <Button variant="outlined" startIcon={<Edit />} onClick={handleEditScores}>
                    Sửa điểm
                  </Button>
                ) : (
                  <>
                    <Button variant="contained" startIcon={<Save />} onClick={handleSaveScores} color="success">
                      Lưu
                    </Button>
                    <Button variant="outlined" startIcon={<Cancel />} onClick={handleCancelEdit} color="error">
                      Hủy
                    </Button>
                  </>
                )}
              </Box>
            </Box>

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
                            <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>{student.avatar}</Avatar>
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
                            <Typography variant="h6" color="primary">{currentScore}</Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Chip label={scoreStatus.label} color={scoreStatus.color} icon={<Grade />} />
                        </TableCell>
                        <TableCell>
                          <TextField size="small" placeholder="Ghi chú..." variant="outlined" />
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
      )}
    </div>
  );
};

export default TeacherScores;