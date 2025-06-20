import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/StudentTestScores.module.css";
import toan from "../../assets/Math1.svg";
import english from "../../assets/english.svg";
import physic from "../../assets/physic.svg";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Alert,
  IconButton,
  Chip
} from "@mui/material";
import {
  Timer,
  CheckCircle,
  Cancel,
  ArrowBack,
  ArrowForward,
  Flag
} from "@mui/icons-material";

const TestScores = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [openTestDialog, setOpenTestDialog] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testResults, setTestResults] = useState(null);

  // Mock test data
  const mockTests = {
    6: {
      id: 6,
      title: "Bài kiểm tra lý thuyết Vật lý",
      course: "Khoá học Vật lý cơ bản",
      duration: 30, // minutes
      totalQuestions: 10,
      questions: [
        {
          id: 1,
          question: "Định luật Newton thứ nhất còn được gọi là gì?",
          options: [
            "Định luật quán tính",
            "Định luật tương tác",
            "Định luật hấp dẫn",
            "Định luật bảo toàn năng lượng"
          ],
          correctAnswer: 0
        },
        {
          id: 2,
          question: "Đơn vị đo lực trong hệ SI là gì?",
          options: [
            "Joule (J)",
            "Newton (N)",
            "Watt (W)",
            "Pascal (Pa)"
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          question: "Công thức tính động năng của một vật là:",
          options: [
            "E = mgh",
            "E = ½mv²",
            "E = Fs",
            "E = Pt"
          ],
          correctAnswer: 1
        },
        {
          id: 4,
          question: "Khi một vật chuyển động tròn đều, lực hướng tâm có hướng:",
          options: [
            "Tiếp tuyến với quỹ đạo",
            "Hướng vào tâm quỹ đạo",
            "Hướng ra ngoài tâm quỹ đạo",
            "Vuông góc với mặt phẳng quỹ đạo"
          ],
          correctAnswer: 1
        },
        {
          id: 5,
          question: "Hiện tượng nào sau đây là ví dụ về chuyển động thẳng đều?",
          options: [
            "Vật rơi tự do",
            "Vật chuyển động tròn",
            "Vật chuyển động trên đường thẳng với vận tốc không đổi",
            "Vật dao động điều hòa"
          ],
          correctAnswer: 2
        },
        {
          id: 6,
          question: "Định luật bảo toàn động lượng phát biểu rằng:",
          options: [
            "Tổng động lượng của hệ kín được bảo toàn",
            "Tổng động năng của hệ được bảo toàn",
            "Tổng thế năng của hệ được bảo toàn",
            "Tổng cơ năng của hệ được bảo toàn"
          ],
          correctAnswer: 0
        },
        {
          id: 7,
          question: "Công thức tính áp suất là:",
          options: [
            "P = F/A",
            "P = m/V",
            "P = F/s",
            "P = W/t"
          ],
          correctAnswer: 0
        },
        {
          id: 8,
          question: "Khi tăng nhiệt độ của một chất khí, áp suất của nó sẽ:",
          options: [
            "Giảm",
            "Tăng",
            "Không đổi",
            "Có thể tăng hoặc giảm tùy thuộc vào thể tích"
          ],
          correctAnswer: 1
        },
        {
          id: 9,
          question: "Hiện tượng khúc xạ ánh sáng xảy ra khi:",
          options: [
            "Ánh sáng truyền từ môi trường này sang môi trường khác",
            "Ánh sáng phản xạ trên bề mặt",
            "Ánh sáng bị hấp thụ hoàn toàn",
            "Ánh sáng truyền thẳng"
          ],
          correctAnswer: 0
        },
        {
          id: 10,
          question: "Đơn vị đo cường độ dòng điện là:",
          options: [
            "Volt (V)",
            "Ampere (A)",
            "Ohm (Ω)",
            "Watt (W)"
          ],
          correctAnswer: 1
        }
      ]
    },
    7: {
      id: 7,
      title: "Bài kiểm tra Toán - Chương 2: Phương trình bậc nhất",
      course: "Khoá học toán cơ bản 6",
      duration: 45, // minutes
      totalQuestions: 15,
      questions: [
        {
          id: 1,
          question: "Phương trình 2x + 3 = 7 có nghiệm là:",
          options: [
            "x = 1",
            "x = 2",
            "x = 3",
            "x = 4"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "Giải phương trình: 3x - 5 = 10",
          options: [
            "x = 3",
            "x = 5",
            "x = 7",
            "x = 15"
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          question: "Phương trình nào sau đây có nghiệm x = 2?",
          options: [
            "x + 3 = 5",
            "2x - 1 = 3",
            "3x + 2 = 8",
            "x - 1 = 1"
          ],
          correctAnswer: 1
        },
        {
          id: 4,
          question: "Tìm x biết: 4x + 8 = 20",
          options: [
            "x = 2",
            "x = 3",
            "x = 4",
            "x = 5"
          ],
          correctAnswer: 1
        },
        {
          id: 5,
          question: "Phương trình 5x - 2 = 3x + 4 có nghiệm là:",
          options: [
            "x = 1",
            "x = 2",
            "x = 3",
            "x = 4"
          ],
          correctAnswer: 2
        },
        {
          id: 6,
          question: "Giải phương trình: 2(x + 3) = 10",
          options: [
            "x = 1",
            "x = 2",
            "x = 3",
            "x = 4"
          ],
          correctAnswer: 1
        },
        {
          id: 7,
          question: "Phương trình 3x + 6 = 2x + 9 có nghiệm là:",
          options: [
            "x = 1",
            "x = 2",
            "x = 3",
            "x = 4"
          ],
          correctAnswer: 2
        },
        {
          id: 8,
          question: "Tìm x biết: 5x - 3 = 2x + 6",
          options: [
            "x = 2",
            "x = 3",
            "x = 4",
            "x = 5"
          ],
          correctAnswer: 1
        },
        {
          id: 9,
          question: "Phương trình 4x - 8 = 2x + 4 có nghiệm là:",
          options: [
            "x = 4",
            "x = 5",
            "x = 6",
            "x = 7"
          ],
          correctAnswer: 2
        },
        {
          id: 10,
          question: "Giải phương trình: 3(x - 2) = 9",
          options: [
            "x = 3",
            "x = 4",
            "x = 5",
            "x = 6"
          ],
          correctAnswer: 2
        },
        {
          id: 11,
          question: "Phương trình 6x + 4 = 4x + 10 có nghiệm là:",
          options: [
            "x = 2",
            "x = 3",
            "x = 4",
            "x = 5"
          ],
          correctAnswer: 1
        },
        {
          id: 12,
          question: "Tìm x biết: 2x + 5 = 3x - 1",
          options: [
            "x = 4",
            "x = 5",
            "x = 6",
            "x = 7"
          ],
          correctAnswer: 2
        },
        {
          id: 13,
          question: "Phương trình 5x - 2 = 3x + 6 có nghiệm là:",
          options: [
            "x = 2",
            "x = 3",
            "x = 4",
            "x = 5"
          ],
          correctAnswer: 2
        },
        {
          id: 14,
          question: "Giải phương trình: 4(x + 1) = 16",
          options: [
            "x = 2",
            "x = 3",
            "x = 4",
            "x = 5"
          ],
          correctAnswer: 1
        },
        {
          id: 15,
          question: "Phương trình 7x - 3 = 4x + 9 có nghiệm là:",
          options: [
            "x = 3",
            "x = 4",
            "x = 5",
            "x = 6"
          ],
          correctAnswer: 1
        }
      ]
    },
    8: {
      id: 8,
      title: "Bài kiểm tra Tiếng Anh - Unit 3: Daily Activities",
      course: "Khoá học tiếng Anh cơ bản",
      duration: 25, // minutes
      totalQuestions: 12,
      questions: [
        {
          id: 1,
          question: "What do you usually do in the morning?",
          options: [
            "I usually go to bed",
            "I usually have breakfast",
            "I usually watch TV",
            "I usually go to work"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "Choose the correct form: 'She _____ to school every day.'",
          options: [
            "go",
            "goes",
            "going",
            "went"
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          question: "What time do you usually wake up?",
          options: [
            "I wake up at 6 AM",
            "I am waking up at 6 AM",
            "I wakes up at 6 AM",
            "I will wake up at 6 AM"
          ],
          correctAnswer: 0
        },
        {
          id: 4,
          question: "Complete the sentence: 'I _____ my teeth twice a day.'",
          options: [
            "brush",
            "brushes",
            "brushing",
            "brushed"
          ],
          correctAnswer: 0
        },
        {
          id: 5,
          question: "What is the opposite of 'early'?",
          options: [
            "late",
            "fast",
            "slow",
            "quick"
          ],
          correctAnswer: 0
        },
        {
          id: 6,
          question: "Choose the correct question: '_____ do you go to bed?'",
          options: [
            "What",
            "When",
            "Where",
            "Why"
          ],
          correctAnswer: 1
        },
        {
          id: 7,
          question: "Complete: 'I _____ dinner at 7 PM.'",
          options: [
            "have",
            "has",
            "having",
            "had"
          ],
          correctAnswer: 0
        },
        {
          id: 8,
          question: "What do you do after dinner?",
          options: [
            "I go to school",
            "I have breakfast",
            "I watch TV or read a book",
            "I go to work"
          ],
          correctAnswer: 2
        },
        {
          id: 9,
          question: "Choose the correct form: 'They _____ to the gym every week.'",
          options: [
            "go",
            "goes",
            "going",
            "went"
          ],
          correctAnswer: 0
        },
        {
          id: 10,
          question: "What is the meaning of 'routine'?",
          options: [
            "Something you do once",
            "Something you do regularly",
            "Something you do rarely",
            "Something you do never"
          ],
          correctAnswer: 1
        },
        {
          id: 11,
          question: "Complete: 'I _____ to music while I study.'",
          options: [
            "listen",
            "listens",
            "listening",
            "listened"
          ],
          correctAnswer: 0
        },
        {
          id: 12,
          question: "What time do you usually go to bed?",
          options: [
            "I go to bed at 10 PM",
            "I am going to bed at 10 PM",
            "I goes to bed at 10 PM",
            "I will go to bed at 10 PM"
          ],
          correctAnswer: 0
        }
      ]
    }
  };

  const testScores = [
    {
      id: 1,
      course: "Khoá học toán cơ bản 6",
      courseImage: toan,
      teacher: "Cô Nguyễn Thị Anh",
      testName: "Bài kiểm tra chương 1",
      testDate: "2024-01-10",
      score: 8.5,
      maxScore: 10,
      percentage: 85,
      grade: "B+",
      status: "Đã hoàn thành",
      teacherComment: "Em làm bài rất tốt, cần chú ý hơn về phần tính toán cẩn thận. Tiếp tục phát huy!",
      feedback: "Tốt"
    },
    {
      id: 2,
      course: "Khoá học toán cơ bản 6",
      courseImage: toan,
      teacher: "Cô Nguyễn Thị Anh",
      testName: "Bài kiểm tra 15 phút",
      testDate: "2024-01-15",
      score: 9.0,
      maxScore: 10,
      percentage: 90,
      grade: "A",
      status: "Đã hoàn thành",
      teacherComment: "Xuất sắc! Em đã hiểu rõ kiến thức và áp dụng tốt vào bài tập.",
      feedback: "Xuất sắc"
    },
    {
      id: 3,
      course: "Khoá học toán cơ bản 7",
      courseImage: toan,
      teacher: "Thầy Trần Văn Bình",
      testName: "Bài kiểm tra giữa kỳ",
      testDate: "2024-01-12",
      score: 7.5,
      maxScore: 10,
      percentage: 75,
      grade: "B",
      status: "Đã hoàn thành",
      teacherComment: "Em cần ôn tập thêm phần đại số. Hãy làm nhiều bài tập hơn để cải thiện.",
      feedback: "Cần cải thiện"
    },
    {
      id: 4,
      course: "Khoá học tiếng Anh cơ bản",
      courseImage: english,
      teacher: "Cô Sarah Johnson",
      testName: "Vocabulary Test - Unit 1",
      testDate: "2024-01-08",
      score: 18,
      maxScore: 20,
      percentage: 90,
      grade: "A",
      status: "Đã hoàn thành",
      teacherComment: "Excellent vocabulary! Your pronunciation is also improving. Keep up the good work!",
      feedback: "Xuất sắc"
    },
    {
      id: 5,
      course: "Khoá học tiếng Anh cơ bản",
      courseImage: english,
      teacher: "Cô Sarah Johnson",
      testName: "Grammar Quiz",
      testDate: "2024-01-14",
      score: 16,
      maxScore: 20,
      percentage: 80,
      grade: "B+",
      status: "Đã hoàn thành",
      teacherComment: "Good understanding of basic grammar. Practice more with present perfect tense.",
      feedback: "Tốt"
    },
    {
      id: 6,
      course: "Khoá học Vật lý cơ bản",
      courseImage: physic,
      teacher: "Thầy Lê Văn Cường",
      testName: "Bài kiểm tra lý thuyết",
      testDate: "2024-01-16",
      score: 0,
      maxScore: 10,
      percentage: 0,
      grade: "N/A",
      status: "Chưa làm",
      teacherComment: "",
      feedback: "Chưa có"
    },
    {
      id: 7,
      course: "Khoá học toán cơ bản 6",
      courseImage: toan,
      teacher: "Cô Nguyễn Thị Anh",
      testName: "Bài kiểm tra chương 2: Phương trình bậc nhất",
      testDate: "2024-01-18",
      score: 0,
      maxScore: 10,
      percentage: 0,
      grade: "N/A",
      status: "Chưa làm",
      teacherComment: "",
      feedback: "Chưa có"
    },
    {
      id: 8,
      course: "Khoá học tiếng Anh cơ bản",
      courseImage: english,
      teacher: "Cô Sarah Johnson",
      testName: "Unit 3: Daily Activities",
      testDate: "2024-01-20",
      score: 0,
      maxScore: 10,
      percentage: 0,
      grade: "N/A",
      status: "Chưa làm",
      teacherComment: "",
      feedback: "Chưa có"
    }
  ];

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A":
        return "#52c41a";
      case "B+":
        return "#1890ff";
      case "B":
        return "#faad14";
      case "C":
        return "#ff4d4f";
      default:
        return "#d9d9d9";
    }
  };

  const getFeedbackColor = (feedback) => {
    switch (feedback) {
      case "Xuất sắc":
        return "#52c41a";
      case "Tốt":
        return "#1890ff";
      case "Cần cải thiện":
        return "#faad14";
      case "Chưa có":
        return "#d9d9d9";
      default:
        return "#d9d9d9";
    }
  };

  const filteredScores = testScores.filter(score => {
    const courseMatch = selectedCourse === "all" || score.course === selectedCourse;
    const periodMatch = selectedPeriod === "all" || score.testDate.includes("2024-01");
    return courseMatch && periodMatch;
  });

  const calculateAverageScore = () => {
    const completedTests = filteredScores.filter(score => score.status === "Đã hoàn thành");
    if (completedTests.length === 0) return 0;
    
    const totalScore = completedTests.reduce((sum, test) => sum + test.percentage, 0);
    return (totalScore / completedTests.length).toFixed(1);
  };

  // Test functions
  const handleStartTest = (testId) => {
    const test = mockTests[testId];
    if (test) {
      setCurrentTest(test);
      setTimeLeft(test.duration * 60); // Convert to seconds
      setCurrentQuestionIndex(0);
      setAnswers({});
      setTestStarted(false);
      setTestCompleted(false);
      setTestResults(null);
      setOpenTestDialog(true);
    }
  };

  const startTest = () => {
    setTestStarted(true);
  };

  const handleAnswerChange = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentTest.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitTest = () => {
    const correctAnswers = currentTest.questions.reduce((count, question, index) => {
      return count + (answers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);

    const score = (correctAnswers / currentTest.questions.length) * 10;
    const percentage = (correctAnswers / currentTest.questions.length) * 100;

    setTestResults({
      score: score.toFixed(1),
      maxScore: 10,
      percentage: percentage.toFixed(1),
      correctAnswers,
      totalQuestions: currentTest.questions.length,
      grade: percentage >= 90 ? "A" : percentage >= 80 ? "B+" : percentage >= 70 ? "B" : "C"
    });

    setTestCompleted(true);
  };

  const closeTestDialog = () => {
    setOpenTestDialog(false);
    setCurrentTest(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeLeft(0);
    setTestStarted(false);
    setTestCompleted(false);
    setTestResults(null);
  };

  // Timer effect
  React.useEffect(() => {
    let timer;
    if (testStarted && timeLeft > 0 && !testCompleted) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testStarted, timeLeft, testCompleted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentQuestion = () => {
    return currentTest?.questions[currentQuestionIndex];
  };

  const getAnsweredQuestions = () => {
    return Object.keys(answers).length;
  };

  return (
    <div className={styles.testScoresContainer}>
      <div className={styles.header}>
        <h1>Điểm số và Nhận xét</h1>
        <div className={styles.filters}>
          <select 
            className={styles.filterSelect}
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="all">Tất cả khóa học</option>
            <option value="Khoá học toán cơ bản 6">Toán cơ bản 6</option>
            <option value="Khoá học toán cơ bản 7">Toán cơ bản 7</option>
            <option value="Khoá học tiếng Anh cơ bản">Tiếng Anh cơ bản</option>
            <option value="Khoá học Vật lý cơ bản">Vật lý cơ bản</option>
          </select>
          <select 
            className={styles.filterSelect}
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="all">Tất cả thời gian</option>
            <option value="2024-01">Tháng 1/2024</option>
            <option value="2023-12">Tháng 12/2023</option>
          </select>
        </div>
      </div>

      <div className={styles.summaryStats}>
        <div className={styles.statCard}>
          <h3>Điểm trung bình</h3>
          <div className={styles.statValue}>{calculateAverageScore()}%</div>
        </div>
        <div className={styles.statCard}>
          <h3>Bài kiểm tra đã làm</h3>
          <div className={styles.statValue}>
            {filteredScores.filter(score => score.status === "Đã hoàn thành").length}
          </div>
        </div>
        <div className={styles.statCard}>
          <h3>Bài kiểm tra chưa làm</h3>
          <div className={styles.statValue}>
            {filteredScores.filter(score => score.status === "Chưa làm").length}
          </div>
        </div>
      </div>

      <div className={styles.scoresList}>
        {filteredScores.map((score) => (
          <div key={score.id} className={styles.scoreCard}>
            <div className={styles.scoreHeader}>
              <div className={styles.courseInfo}>
                <img src={score.courseImage} alt={score.course} className={styles.courseImage} />
                <div>
                  <h3>{score.course}</h3>
                  <p>Giáo viên: {score.teacher}</p>
                </div>
              </div>
              <div className={styles.scoreInfo}>
                <div className={styles.scoreDisplay}>
                  <span className={styles.scoreValue}>{score.score}</span>
                  <span className={styles.maxScore}>/{score.maxScore}</span>
                </div>
                <div className={styles.percentage}>{score.percentage}%</div>
                <div 
                  className={styles.grade}
                  style={{backgroundColor: getGradeColor(score.grade)}}
                >
                  {score.grade}
                </div>
              </div>
            </div>
            
            <div className={styles.testDetails}>
              <h4>{score.testName}</h4>
              <p>Ngày kiểm tra: {score.testDate}</p>
              <span 
                className={styles.statusBadge}
                style={{
                  backgroundColor: score.status === "Đã hoàn thành" ? "#52c41a" : "#faad14"
                }}
              >
                {score.status}
              </span>
            </div>
            
            {score.status === "Đã hoàn thành" && (
              <div className={styles.feedbackSection}>
                <div className={styles.feedbackHeader}>
                  <h4>Nhận xét của giáo viên:</h4>
                  <span 
                    className={styles.feedbackBadge}
                    style={{backgroundColor: getFeedbackColor(score.feedback)}}
                  >
                    {score.feedback}
                  </span>
                </div>
                <p className={styles.teacherComment}>{score.teacherComment}</p>
              </div>
            )}
            
            <div className={styles.scoreActions}>
              <button 
                className={styles.viewDetailBtn}
                onClick={() => navigate(`/student/test-detail/${score.id}`)}
              >
                Xem chi tiết
              </button>
              {score.status === "Chưa làm" && (
                <button 
                  className={styles.takeTestBtn}
                  onClick={() => handleStartTest(score.id)}
                >
                  Làm bài kiểm tra
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredScores.length === 0 && (
        <div className={styles.emptyState}>
          <p>Không có bài kiểm tra nào phù hợp với bộ lọc đã chọn.</p>
        </div>
      )}

      {/* Test Dialog */}
      <Dialog 
        open={openTestDialog} 
        onClose={closeTestDialog} 
        maxWidth="md" 
        fullWidth
        disableEscapeKeyDown={testStarted && !testCompleted}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              {currentTest?.title}
            </Typography>
            {testStarted && !testCompleted && (
              <Box display="flex" alignItems="center" gap={1}>
                <Timer color="warning" />
                <Typography variant="h6" color="warning.main">
                  {formatTime(timeLeft)}
                </Typography>
              </Box>
            )}
          </Box>
        </DialogTitle>
        
        <DialogContent>
          {!testStarted ? (
            <Box textAlign="center" py={4}>
              <Typography variant="h5" gutterBottom>
                Chuẩn bị làm bài kiểm tra
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                {currentTest?.course}
              </Typography>
              <Box display="flex" justifyContent="center" gap={2} mb={3}>
                <Chip 
                  icon={<Timer />} 
                  label={`${currentTest?.duration} phút`} 
                  color="primary" 
                />
                <Chip 
                  icon={<CheckCircle />} 
                  label={`${currentTest?.totalQuestions} câu hỏi`} 
                  color="secondary" 
                />
              </Box>
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  • Bài kiểm tra có thời gian giới hạn {currentTest?.duration} phút<br/>
                  • Gồm {currentTest?.totalQuestions} câu hỏi trắc nghiệm<br/>
                  • Bạn có thể quay lại sửa đáp án trước khi nộp bài<br/>
                  • Hệ thống sẽ tự động nộp bài khi hết thời gian
                </Typography>
              </Alert>
            </Box>
          ) : testCompleted ? (
            <Box textAlign="center" py={4}>
              <Typography variant="h4" gutterBottom color="primary">
                Hoàn thành bài kiểm tra!
              </Typography>
              <Box display="flex" justifyContent="center" gap={3} my={3}>
                <Box textAlign="center">
                  <Typography variant="h3" color="primary">
                    {testResults?.score}/{testResults?.maxScore}
                  </Typography>
                  <Typography variant="body1">Điểm số</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h3" color="secondary">
                    {testResults?.percentage}%
                  </Typography>
                  <Typography variant="body1">Phần trăm</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h3" color="success.main">
                    {testResults?.correctAnswers}/{testResults?.totalQuestions}
                  </Typography>
                  <Typography variant="body1">Câu đúng</Typography>
                </Box>
              </Box>
              <Chip 
                label={`Xếp loại: ${testResults?.grade}`}
                color={testResults?.grade === "A" ? "success" : testResults?.grade === "B+" ? "primary" : "warning"}
                size="large"
              />
            </Box>
          ) : (
            <Box>
              {/* Progress bar */}
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="body2">
                  Câu {currentQuestionIndex + 1} / {currentTest?.questions.length}
                </Typography>
                <Typography variant="body2" color="primary">
                  {getAnsweredQuestions()} / {currentTest?.questions.length} câu đã trả lời
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(currentQuestionIndex + 1) / currentTest?.questions.length * 100}
                sx={{ mb: 3 }}
              />

              {/* Question */}
              <Typography variant="h6" gutterBottom>
                Câu {currentQuestionIndex + 1}: {getCurrentQuestion()?.question}
              </Typography>

              {/* Options */}
              <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
                <RadioGroup
                  value={answers[getCurrentQuestion()?.id] || ''}
                  onChange={(e) => handleAnswerChange(getCurrentQuestion()?.id, parseInt(e.target.value))}
                >
                  {getCurrentQuestion()?.options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={index}
                      control={<Radio />}
                      label={option}
                      sx={{
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        margin: '8px 0',
                        padding: '12px',
                        width: '100%',
                        '&:hover': {
                          backgroundColor: '#f5f5f5'
                        }
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              {/* Navigation buttons */}
              <Box display="flex" justifyContent="space-between" mt={4}>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBack />}
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Câu trước
                </Button>
                
                <Box display="flex" gap={1}>
                  {currentTest?.questions.map((_, index) => (
                    <IconButton
                      key={index}
                      size="small"
                      onClick={() => setCurrentQuestionIndex(index)}
                      sx={{
                        border: '1px solid',
                        borderColor: index === currentQuestionIndex ? 'primary.main' : 'grey.300',
                        backgroundColor: answers[currentTest.questions[index]?.id] !== undefined ? 'success.light' : 'transparent',
                        color: answers[currentTest.questions[index]?.id] !== undefined ? 'success.contrastText' : 'inherit'
                      }}
                    >
                      {index + 1}
                    </IconButton>
                  ))}
                </Box>

                {currentQuestionIndex === currentTest?.questions.length - 1 ? (
                  <Button
                    variant="contained"
                    color="success"
                    endIcon={<CheckCircle />}
                    onClick={handleSubmitTest}
                  >
                    Nộp bài
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    onClick={handleNextQuestion}
                  >
                    Câu tiếp
                  </Button>
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions>
          {!testStarted ? (
            <>
              <Button onClick={closeTestDialog}>Hủy</Button>
              <Button variant="contained" onClick={startTest}>
                Bắt đầu làm bài
              </Button>
            </>
          ) : testCompleted ? (
            <Button variant="contained" onClick={closeTestDialog}>
              Đóng
            </Button>
          ) : (
            <Button 
              variant="outlined" 
              color="error" 
              onClick={handleSubmitTest}
              startIcon={<Flag />}
            >
              Nộp bài sớm
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TestScores; 