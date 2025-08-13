import React, { useState } from "react";
import styles from "../../styles/StudentDocuments.module.css";
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
  ArrowBack,
  ArrowForward,
  Flag
} from "@mui/icons-material";

const Documents = () => {
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Test Dialog states
  const [openTestDialog, setOpenTestDialog] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testResults, setTestResults] = useState(null);

  // Helper function to check if assignment is overdue
  const isOverdue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    return today > due;
  };

  const assignments = [
    {
      id: 6,
      title: "Bài kiểm tra lý thuyết Vật lý",
      course: "Khoá học Vật lý cơ bản",
      type: "MULTIPLE_CHOICE",
      teacher: "Thầy Lê Văn Cường",
      uploadDate: "2025-08-13",
      dueDate: "2025-08-16",
      status: "Chưa nộp",
      duration: 30, // minutes for multiple choice
      totalQuestions: 10,
      courseImage: physic,
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
    {
      id: 7,
      title: "Bài kiểm tra Toán - Chương 2: Phương trình bậc nhất",
      course: "Khoá học toán cơ bản 6",
      type: "MULTIPLE_CHOICE",
      teacher: "Cô Nguyễn Thị Anh",
      uploadDate: "2025-08-13",
      dueDate: "2025-08-18",
      status: "Chưa nộp",
      duration: 45,
      totalQuestions: 8,
      courseImage: toan,
      questions: [
        {
          id: 1,
          question: "Phương trình 2x + 3 = 7 có nghiệm là:",
          options: ["x = 1", "x = 2", "x = 3", "x = 4"],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "Giải phương trình: 3x - 5 = 10",
          options: ["x = 3", "x = 5", "x = 7", "x = 15"],
          correctAnswer: 1
        },
        {
          id: 3,
          question: "Phương trình nào sau đây có nghiệm x = 2?",
          options: ["x + 3 = 5", "2x - 1 = 3", "3x + 2 = 8", "x - 1 = 1"],
          correctAnswer: 1
        },
        {
          id: 4,
          question: "Tìm x biết: 4x + 8 = 20",
          options: ["x = 2", "x = 3", "x = 4", "x = 5"],
          correctAnswer: 1
        },
        {
          id: 5,
          question: "Phương trình 5x - 2 = 3x + 4 có nghiệm là:",
          options: ["x = 1", "x = 2", "x = 3", "x = 4"],
          correctAnswer: 2
        },
        {
          id: 6,
          question: "Giải phương trình: 2(x + 3) = 10",
          options: ["x = 1", "x = 2", "x = 3", "x = 4"],
          correctAnswer: 1
        },
        {
          id: 7,
          question: "Phương trình 3x + 6 = 2x + 9 có nghiệm là:",
          options: ["x = 1", "x = 2", "x = 3", "x = 4"],
          correctAnswer: 2
        },
        {
          id: 8,
          question: "Tìm x biết: 5x - 3 = 2x + 6",
          options: ["x = 2", "x = 3", "x = 4", "x = 5"],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 8,
      title: "Unit 3: Daily Activities",
      course: "Khoá học tiếng Anh cơ bản",
      type: "MULTIPLE_CHOICE",
      teacher: "Cô Sarah Johnson",
      uploadDate: "2025-08-13",
      dueDate: "2025-08-20",
      status: "Chưa nộp",
      duration: 25,
      totalQuestions: 6,
      courseImage: english,
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
          options: ["go", "goes", "going", "went"],
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
          options: ["brush", "brushes", "brushing", "brushed"],
          correctAnswer: 0
        },
        {
          id: 5,
          question: "What is the opposite of 'early'?",
          options: ["late", "fast", "slow", "quick"],
          correctAnswer: 0
        },
        {
          id: 6,
          question: "Choose the correct question: '_____ do you go to bed?'",
          options: ["What", "When", "Where", "Why"],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 11,
      title: "Bài tập tự luận chương 1: Số tự nhiên",
      course: "Khoá học toán cơ bản 6",
      type: "ESSAY",
      teacher: "Cô Nguyễn Thị Anh",
      uploadDate: "2025-08-13",
      dueDate: "2025-08-15",
      status: "Chưa nộp",
      courseImage: toan,
      requirements: [
        "Giải ít nhất 5 bài tập trong sách giáo khoa",
        "Trình bày lời giải chi tiết",
        "Vẽ hình minh họa nếu cần",
        "Ghi rõ họ tên và lớp"
      ]
    },
    {
      id: 12,
      title: "Essay: My Daily Routine",
      course: "Khoá học tiếng Anh cơ bản",
      type: "ESSAY", 
      teacher: "Cô Sarah Johnson",
      uploadDate: "2025-08-13",
      dueDate: "2025-08-16",
      status: "Chưa nộp",
      courseImage: english,
      requirements: [
        "Viết một đoạn văn ít nhất 200 từ",
        "Sử dụng thì hiện tại đơn",
        "Mô tả hoạt động hàng ngày của bạn",
        "Sử dụng từ vựng đã học trong Unit 3"
      ]
    },
    {
      id: 13,
      title: "Bài tập về Chuyển động cơ học",
      course: "Khoá học Vật lý cơ bản",
      type: "ESSAY",
      teacher: "Thầy Lê Văn Cường",
      uploadDate: "2025-08-13",
      dueDate: "2025-08-17",
      status: "Chưa nộp",
      courseImage: physic,
      requirements: [
        "Giải 3 bài tập về chuyển động thẳng đều",
        "Vẽ đồ thị vận tốc - thời gian",
        "Giải thích các hiện tượng vật lý",
        "Trình bày đầy đủ công thức và kết quả"
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Đã nộp":
        return "#52c41a";
      case "Chưa nộp":
        return "#ff4d4f";
      default:
        return "#d9d9d9";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "MULTIPLE_CHOICE":
        return "�";
      case "ESSAY":
        return "📄";
      default:
        return "📁";
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "MULTIPLE_CHOICE":
        return "Trắc nghiệm";
      case "ESSAY":
        return "Tự luận";
      default:
        return "Khác";
    }
  };

  // Only show assignments that are not overdue and not completed
  const filteredAssignments = assignments.filter(assignment => {
    const courseMatch = selectedCourse === "all" || assignment.course === selectedCourse;
    const typeMatch = selectedType === "all" || assignment.type === selectedType;
    const notOverdue = !isOverdue(assignment.dueDate);
    const notCompleted = assignment.status === "Chưa nộp";
    
    return courseMatch && typeMatch && notOverdue && notCompleted;
  });

  const handleStartAssignment = (assignment) => {
    if (assignment.type === "MULTIPLE_CHOICE") {
      // Start multiple choice test
      setCurrentTest(assignment);
      setTimeLeft(assignment.duration * 60); // Convert to seconds
      setCurrentQuestionIndex(0);
      setAnswers({});
      setTestStarted(false);
      setTestCompleted(false);
      setTestResults(null);
      setOpenTestDialog(true);
    } else if (assignment.type === "ESSAY") {
      // Show essay submission modal
      setSelectedAssignment(assignment);
      setShowSubmitModal(true);
      setUploadedFile(null);
    }
  };

  // Multiple Choice Test Functions
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
    const correctAnswers = currentTest.questions.reduce((count, question) => {
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
    
    // Create completed test entry for TestScores
    const completedTest = {
      id: Date.now(),
      course: selectedAssignment.course,
      courseImage: selectedAssignment.courseImage,
      teacher: selectedAssignment.teacher,
      testName: selectedAssignment.title,
      testDate: new Date().toISOString().split('T')[0],
      dueDate: selectedAssignment.dueDate,
      score: parseFloat(score.toFixed(1)),
      maxScore: 10,
      percentage: parseFloat(percentage.toFixed(1)),
      grade: percentage >= 90 ? "A" : percentage >= 80 ? "B+" : percentage >= 70 ? "B" : "C",
      status: "Đã hoàn thành",
      teacherComment: percentage >= 90 ? "Xuất sắc! Em đã nắm vững kiến thức." : 
                     percentage >= 80 ? "Tốt! Em làm bài khá ổn." : 
                     percentage >= 70 ? "Được, nhưng cần cải thiện thêm." : "Cần ôn tập kỹ hơn.",
      feedback: percentage >= 90 ? "Xuất sắc" : percentage >= 80 ? "Tốt" : percentage >= 70 ? "Cần cải thiện" : "Kém"
    };

    // Save to localStorage (in real app, this would be API call)
    const existingTests = JSON.parse(localStorage.getItem('completedTests') || '[]');
    existingTests.push(completedTest);
    localStorage.setItem('completedTests', JSON.stringify(existingTests));

    // Remove from active assignments after test completion
    setTimeout(() => {
      const updatedAssignments = assignments.filter(assignment => assignment.id !== selectedAssignment.id);
      setAssignments(updatedAssignments);
      localStorage.setItem('activeAssignments', JSON.stringify(updatedAssignments));
    }, 3000); // Wait 3 seconds for user to see results
    
    // Update assignment status (in real app, this would be an API call)
    console.log('Test completed:', testResults);
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

  // Timer effect for multiple choice tests
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

  // Essay Assignment Functions  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Kiểm tra file type
      if (file.type !== 'application/pdf') {
        alert('Vui lòng chỉ upload file PDF!');
        return;
      }
      // Kiểm tra kích thước file (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File quá lớn! Vui lòng chọn file nhỏ hơn 10MB.');
        return;
      }
      setUploadedFile(file);
    }
  };

  const handleSubmitEssay = async () => {
    if (!uploadedFile) {
      alert('Vui lòng chọn file để nộp bài!');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Nộp bài essay thành công:', {
        assignmentId: selectedAssignment.id,
        fileName: uploadedFile.name,
        fileSize: uploadedFile.size
      });

      // Create completed test entry for TestScores (essay assignments)
      const completedTest = {
        id: Date.now(),
        course: selectedAssignment.course,
        courseImage: selectedAssignment.courseImage,
        teacher: selectedAssignment.teacher,
        testName: selectedAssignment.title,
        testDate: new Date().toISOString().split('T')[0],
        dueDate: selectedAssignment.dueDate,
        score: Math.floor(Math.random() * 2) + 8, // Random score 8-9 for essay
        maxScore: 10,
        percentage: Math.floor((Math.floor(Math.random() * 2) + 8) / 10 * 100),
        grade: "A",
        status: "Đã hoàn thành",
        teacherComment: "Bài luận có nội dung tốt, lập luận rõ ràng. Tiếp tục phát huy!",
        feedback: "Tốt"
      };

      // Save to localStorage (in real app, this would be API call)
      const existingTests = JSON.parse(localStorage.getItem('completedTests') || '[]');
      existingTests.push(completedTest);
      localStorage.setItem('completedTests', JSON.stringify(existingTests));

      // Remove from active assignments
      const updatedAssignments = assignments.filter(assignment => assignment.id !== selectedAssignment.id);
      setAssignments(updatedAssignments);
      localStorage.setItem('activeAssignments', JSON.stringify(updatedAssignments));
      
      setIsSubmitting(false);
      setShowSubmitModal(false);
      setSelectedAssignment(null);
      setUploadedFile(null);
      
      alert('Đã nộp bài tự luận thành công! Bạn có thể xem điểm tại mục "Điểm số"');
    }, 2000);
  };

  const closeModal = () => {
    setShowSubmitModal(false);
    setSelectedAssignment(null);
    setUploadedFile(null);
  };

  return (
    <div className={styles.documentsContainer}>
      <div className={styles.header}>
        <h1>Bài tập và Assignments</h1>
        <div className={styles.filters}>
          <select 
            className={styles.filterSelect}
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="all">Tất cả khóa học</option>
            <option value="Khoá học toán cơ bản 6">Toán cơ bản 6</option>
            <option value="Khoá học tiếng Anh cơ bản">Tiếng Anh cơ bản</option>
            <option value="Khoá học Vật lý cơ bản">Vật lý cơ bản</option>
          </select>
          <select 
            className={styles.filterSelect}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">Tất cả loại</option>
            <option value="MULTIPLE_CHOICE">Trắc nghiệm</option>
            <option value="ESSAY">Tự luận</option>
          </select>
        </div>
      </div>

      <div className={styles.documentsGrid}>
        {filteredAssignments.map((assignment) => (
          <div key={assignment.id} className={styles.documentCard}>
            <div className={styles.documentHeader}>
              <div className={styles.courseInfo}>
                <img src={assignment.courseImage} alt={assignment.course} className={styles.courseImage} />
                <span className={styles.courseName}>{assignment.course}</span>
              </div>
              <div className={styles.typeInfo}>
                <span className={styles.typeIcon}>{getTypeIcon(assignment.type)}</span>
                <span className={styles.typeLabel}>{getTypeLabel(assignment.type)}</span>
              </div>
            </div>
            
            <div className={styles.documentContent}>
              <h3>{assignment.title}</h3>
              <p className={styles.teacher}>Giáo viên: {assignment.teacher}</p>
              
              {assignment.type === "MULTIPLE_CHOICE" && (
                <div className={styles.testInfo}>
                  <div className={styles.testDetail}>
                    <Timer style={{ fontSize: 16, color: "#1890ff" }} />
                    <span>{assignment.duration} phút</span>
                  </div>
                  <div className={styles.testDetail}>
                    <CheckCircle style={{ fontSize: 16, color: "#52c41a" }} />
                    <span>{assignment.totalQuestions} câu hỏi</span>
                  </div>
                </div>
              )}

              {assignment.type === "ESSAY" && assignment.requirements && (
                <div className={styles.requirements}>
                  <h4>Yêu cầu:</h4>
                  <ul>
                    {assignment.requirements.slice(0, 2).map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                    {assignment.requirements.length > 2 && (
                      <li>... và {assignment.requirements.length - 2} yêu cầu khác</li>
                    )}
                  </ul>
                </div>
              )}
              
              <div className={styles.dateInfo}>
                <p>Ngày đăng: {assignment.uploadDate}</p>
                <p className={styles.dueDate}>
                  Hạn nộp: {assignment.dueDate}
                  <span className={styles.daysLeft}>
                    ({Math.ceil((new Date(assignment.dueDate) - new Date()) / (1000 * 60 * 60 * 24))} ngày còn lại)
                  </span>
                </p>
              </div>
            </div>
            
            <div className={styles.documentActions}>
              <button 
                className={styles.startBtn}
                onClick={() => handleStartAssignment(assignment)}
              >
                {assignment.type === "MULTIPLE_CHOICE" ? (
                  <>
                    <span className={styles.btnIcon}>📝</span>
                    Làm bài trắc nghiệm
                  </>
                ) : (
                  <>
                    <span className={styles.btnIcon}>📤</span>
                    Nộp bài tự luận
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAssignments.length === 0 && (
        <div className={styles.emptyState}>
          <p>Không có bài tập nào phù hợp với bộ lọc đã chọn hoặc tất cả đã quá hạn.</p>
        </div>
      )}

      {/* Modal Nộp bài tự luận */}
      {showSubmitModal && selectedAssignment && selectedAssignment.type === "ESSAY" && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Nộp bài tự luận</h2>
              <button className={styles.closeBtn} onClick={closeModal}>×</button>
            </div>
            
            <div className={styles.modalContent}>
              <div className={styles.assignmentInfo}>
                <h3>{selectedAssignment?.title}</h3>
                <p><strong>Khóa học:</strong> {selectedAssignment?.course}</p>
                <p><strong>Giáo viên:</strong> {selectedAssignment?.teacher}</p>
                <p><strong>Hạn nộp:</strong> {selectedAssignment?.dueDate}</p>
              </div>

              <div className={styles.uploadSection}>
                <h4>Upload bài làm</h4>
                <div className={styles.uploadArea}>
                  <input
                    type="file"
                    id="fileUpload"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className={styles.fileInput}
                  />
                  <label htmlFor="fileUpload" className={styles.uploadLabel}>
                    <div className={styles.uploadIcon}>📄</div>
                    <p>Chọn file PDF để nộp bài</p>
                    <span className={styles.uploadHint}>
                      Chỉ chấp nhận file PDF, tối đa 10MB
                    </span>
                  </label>
                </div>
                
                {uploadedFile && (
                  <div className={styles.filePreview}>
                    <div className={styles.fileInfo}>
                      <span className={styles.fileIcon}>📄</span>
                      <div>
                        <p className={styles.fileName}>{uploadedFile.name}</p>
                        <p className={styles.fileSize}>
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button 
                      className={styles.removeFileBtn}
                      onClick={() => setUploadedFile(null)}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.requirements}>
                <h4>Yêu cầu nộp bài:</h4>
                <ul>
                  {selectedAssignment?.requirements?.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                  <li>Chỉ chấp nhận file định dạng PDF</li>
                  <li>Kích thước file tối đa 10MB</li>
                </ul>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button 
                className={styles.cancelBtn}
                onClick={closeModal}
                disabled={isSubmitting}
              >
                Hủy
              </button>
              <button 
                className={styles.confirmBtn}
                onClick={handleSubmitEssay}
                disabled={!uploadedFile || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.btnIcon}>⏳</span>
                    Đang nộp...
                  </>
                ) : (
                  <>
                    <span className={styles.btnIcon}>✅</span>
                    Nộp bài
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Dialog Làm bài trắc nghiệm */}
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
                Chuẩn bị làm bài trắc nghiệm
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
                    sx={{ 
                      fontSize: '16px',
                      padding: '8px 20px',
                      '&:hover': { backgroundColor: '#388e3c' }
                    }}
                  >
                    <span style={{ marginRight: '8px' }}>📋</span>
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
              <Button variant="contained" onClick={startTest} 
                      sx={{ 
                        backgroundColor: '#1976d2', 
                        '&:hover': { backgroundColor: '#1565c0' },
                        fontSize: '16px',
                        padding: '8px 20px'
                      }}>
                <span style={{ marginRight: '8px' }}>🚀</span>
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
              sx={{ 
                fontSize: '14px',
                padding: '6px 16px',
                '&:hover': { backgroundColor: '#ffebee' }
              }}
            >
              <span style={{ marginRight: '4px' }}>⚡</span>
              Nộp bài sớm
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Documents; 