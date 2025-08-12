import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
  Paper
} from '@mui/material';
import {
  Add,
  Delete,
  Save,
  ArrowBack,
  QuestionAnswer,
  Timer,
  Grade,
  School
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/TeacherQuizCreator.module.css';

const QuizCreator = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    class: '',
    duration: 60,
    totalQuestions: 0,
    maxScore: 10,
    dueDate: '',
    questions: []
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 1
  });

  const [openQuestionDialog, setOpenQuestionDialog] = useState(false);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(-1);

  // Mock data for classes
  const classes = [
    { id: 1, name: 'Toán 10A', students: 40 },
    { id: 2, name: 'Vật lý 11B', students: 35 },
    { id: 3, name: 'Hóa học 12A', students: 30 },
    { id: 4, name: 'Tiếng Anh 10C', students: 38 }
  ];

  const handleInputChange = (field, value) => {
    setQuizData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleQuestionChange = (field, value) => {
    setCurrentQuestion(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const handleAddQuestion = () => {
    if (editingQuestionIndex >= 0) {
      // Edit existing question
      const newQuestions = [...quizData.questions];
      newQuestions[editingQuestionIndex] = currentQuestion;
      setQuizData(prev => ({
        ...prev,
        questions: newQuestions,
        totalQuestions: newQuestions.length
      }));
      setEditingQuestionIndex(-1);
    } else {
      // Add new question
      setQuizData(prev => ({
        ...prev,
        questions: [...prev.questions, currentQuestion],
        totalQuestions: prev.questions.length + 1
      }));
    }
    
    // Reset current question
    setCurrentQuestion({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 1
    });
    setOpenQuestionDialog(false);
  };

  const handleEditQuestion = (index) => {
    setCurrentQuestion(quizData.questions[index]);
    setEditingQuestionIndex(index);
    setOpenQuestionDialog(true);
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = quizData.questions.filter((_, i) => i !== index);
    setQuizData(prev => ({
      ...prev,
      questions: newQuestions,
      totalQuestions: newQuestions.length
    }));
  };

  const handleSaveQuiz = () => {
    console.log('Saving quiz:', quizData);
    // Here you would typically save to backend
    navigate('/teacher/scores');
  };

  const getTotalPoints = () => {
    return quizData.questions.reduce((total, question) => total + question.points, 0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Box display="flex" alignItems="center" mb={2}>
          <IconButton onClick={() => navigate('/teacher/scores')} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" component="h1">
            Tạo bài kiểm tra trắc nghiệm
          </Typography>
        </Box>
        <Typography variant="subtitle1" color="textSecondary">
          Tạo bài kiểm tra trắc nghiệm mới cho học sinh
        </Typography>
      </div>

      <Grid container spacing={3}>
        {/* Quiz Information */}
        <Grid item xs={12} md={8}>
          <Card className={styles.quizInfoCard}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Thông tin bài kiểm tra
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tiêu đề bài kiểm tra"
                    value={quizData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="VD: Kiểm tra 15 phút - Chương 1"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Mô tả"
                    value={quizData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Mô tả chi tiết về bài kiểm tra..."
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Chọn lớp</InputLabel>
                    <Select
                      value={quizData.class}
                      label="Chọn lớp"
                      onChange={(e) => handleInputChange('class', e.target.value)}
                    >
                      {classes.map((cls) => (
                        <MenuItem key={cls.id} value={cls.name}>
                          {cls.name} ({cls.students} học sinh)
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Thời gian làm bài (phút)"
                    value={quizData.duration}
                    onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                    inputProps={{ min: 1, max: 180 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Hạn nộp"
                    value={quizData.dueDate}
                    onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Điểm tối đa"
                    value={quizData.maxScore}
                    onChange={(e) => handleInputChange('maxScore', parseInt(e.target.value))}
                    inputProps={{ min: 1, max: 100 }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Questions List */}
          <Card className={styles.questionsCard}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">
                  Danh sách câu hỏi ({quizData.questions.length})
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setOpenQuestionDialog(true)}
                >
                  Thêm câu hỏi
                </Button>
              </Box>

              {quizData.questions.length === 0 ? (
                <Box textAlign="center" py={4}>
                  <QuestionAnswer sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    Chưa có câu hỏi nào
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Nhấn "Thêm câu hỏi" để bắt đầu tạo bài kiểm tra
                  </Typography>
                </Box>
              ) : (
                <List>
                  {quizData.questions.map((question, index) => (
                    <React.Fragment key={index}>
                      <ListItem className={styles.questionItem}>
                        <ListItemText
                          primary={
                            <Box>
                              <Typography variant="subtitle1" fontWeight="medium">
                                Câu {index + 1}: {question.question}
                              </Typography>
                              <Box mt={1}>
                                {question.options.map((option, optIndex) => (
                                  <Typography
                                    key={optIndex}
                                    variant="body2"
                                    color={optIndex === question.correctAnswer ? 'success.main' : 'text.secondary'}
                                    sx={{
                                      fontWeight: optIndex === question.correctAnswer ? 'bold' : 'normal',
                                      ml: 2
                                    }}
                                  >
                                    {String.fromCharCode(65 + optIndex)}. {option}
                                  </Typography>
                                ))}
                              </Box>
                              <Box mt={1} display="flex" gap={1}>
                                <Chip
                                  label={`${question.points} điểm`}
                                  size="small"
                                  color="primary"
                                />
                                <Chip
                                  label={`Đáp án: ${String.fromCharCode(65 + question.correctAnswer)}`}
                                  size="small"
                                  color="success"
                                />
                              </Box>
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <Box display="flex" gap={1}>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => handleEditQuestion(index)}
                            >
                              Sửa
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() => handleDeleteQuestion(index)}
                            >
                              Xóa
                            </Button>
                          </Box>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index < quizData.questions.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Quiz Summary */}
        <Grid item xs={12} md={4}>
          <Card className={styles.summaryCard}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tóm tắt bài kiểm tra
              </Typography>
              
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="Số câu hỏi"
                    secondary={quizData.questions.length}
                  />
                  <QuestionAnswer color="primary" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Thời gian"
                    secondary={`${quizData.duration} phút`}
                  />
                  <Timer color="primary" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Tổng điểm"
                    secondary={`${getTotalPoints()}/${quizData.maxScore}`}
                  />
                  <Grade color="primary" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Lớp"
                    secondary={quizData.class || 'Chưa chọn'}
                  />
                  <School color="primary" />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" flexDirection="column" gap={2}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSaveQuiz}
                  disabled={quizData.questions.length === 0 || !quizData.title || !quizData.class}
                  fullWidth
                >
                  Lưu bài kiểm tra
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/teacher/scores')}
                  fullWidth
                >
                  Hủy
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add/Edit Question Dialog */}
      <Dialog open={openQuestionDialog} onClose={() => setOpenQuestionDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingQuestionIndex >= 0 ? 'Sửa câu hỏi' : 'Thêm câu hỏi mới'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Câu hỏi"
                value={currentQuestion.question}
                onChange={(e) => handleQuestionChange('question', e.target.value)}
                placeholder="Nhập câu hỏi..."
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Các lựa chọn:
              </Typography>
              {currentQuestion.options.map((option, index) => (
                <Box key={index} display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1" sx={{ minWidth: 40 }}>
                    {String.fromCharCode(65 + index)}.
                  </Typography>
                  <TextField
                    fullWidth
                    label={`Lựa chọn ${String.fromCharCode(65 + index)}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Nhập lựa chọn ${String.fromCharCode(65 + index)}...`}
                  />
                  <Button
                    variant={currentQuestion.correctAnswer === index ? "contained" : "outlined"}
                    color={currentQuestion.correctAnswer === index ? "success" : "primary"}
                    onClick={() => handleQuestionChange('correctAnswer', index)}
                    sx={{ ml: 1, minWidth: 100 }}
                  >
                    {currentQuestion.correctAnswer === index ? 'Đúng' : 'Đánh dấu đúng'}
                  </Button>
                </Box>
              ))}
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Điểm cho câu hỏi"
                value={currentQuestion.points}
                onChange={(e) => handleQuestionChange('points', parseInt(e.target.value))}
                inputProps={{ min: 1, max: 10 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenQuestionDialog(false)}>Hủy</Button>
          <Button
            onClick={handleAddQuestion}
            variant="contained"
            disabled={!currentQuestion.question || currentQuestion.options.some(opt => !opt)}
          >
            {editingQuestionIndex >= 0 ? 'Cập nhật' : 'Thêm câu hỏi'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuizCreator; 