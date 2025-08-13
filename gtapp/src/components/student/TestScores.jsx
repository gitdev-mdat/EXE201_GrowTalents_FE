import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/StudentTestScores.module.css";
import toan from "../../assets/Math1.svg";
import english from "../../assets/english.svg";
import physic from "../../assets/physic.svg";

const TestScores = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [completedTests, setCompletedTests] = useState([]);

  // Load completed tests from localStorage on component mount
  useEffect(() => {
    const savedTests = JSON.parse(localStorage.getItem('completedTests') || '[]');
    setCompletedTests(savedTests);

    // Listen for storage changes to update when new tests are completed
    const handleStorageChange = () => {
      const updatedTests = JSON.parse(localStorage.getItem('completedTests') || '[]');
      setCompletedTests(updatedTests);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check for updates when component becomes visible (for same-tab updates)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const updatedTests = JSON.parse(localStorage.getItem('completedTests') || '[]');
        setCompletedTests(updatedTests);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Helper function to check if assignment is overdue
  const isOverdue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    return today > due;
  };

  const staticTestScores = [
    {
      id: 1,
      course: "Khoá học toán cơ bản 6",
      courseImage: toan,
      teacher: "Cô Nguyễn Thị Anh",
      testName: "Bài kiểm tra chương 1",
      testDate: "2024-01-10",
      dueDate: "2024-01-10",
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
      dueDate: "2024-01-15",
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
      dueDate: "2024-01-12",
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
      dueDate: "2024-01-08",
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
      dueDate: "2024-01-14",
      score: 16,
      maxScore: 20,
      percentage: 80,
      grade: "B+",
      status: "Đã hoàn thành",
      teacherComment: "Good understanding of basic grammar. Practice more with present perfect tense.",
      feedback: "Tốt"
    },
    // Overdue assignments - show with 0 score
    {
      id: 9,
      course: "Khoá học Vật lý cơ bản",
      courseImage: physic,
      teacher: "Thầy Lê Văn Cường",
      testName: "Bài kiểm tra lý thuyết",
      testDate: "2024-01-16",
      dueDate: "2024-01-16",
      score: 0,
      maxScore: 10,
      percentage: 0,
      grade: "F",
      status: "Quá hạn",
      teacherComment: "Học sinh không nộp bài trong thời hạn quy định.",
      feedback: "Không hoàn thành"
    },
    {
      id: 10,
      course: "Khoá học toán cơ bản 6",
      courseImage: toan,
      teacher: "Cô Nguyễn Thị Anh",
      testName: "Bài tập về nhà chương 1",
      testDate: "2025-08-10",
      dueDate: "2025-08-10",
      score: 0,
      maxScore: 10,
      percentage: 0,
      grade: "F",
      status: "Quá hạn",
      teacherComment: "Bài tập không được nộp đúng hạn.",
      feedback: "Không hoàn thành"
    }
  ];

  // Combine static scores with completed tests from localStorage
  const testScores = [...staticTestScores, ...completedTests];

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
      case "F":
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
      case "Không hoàn thành":
        return "#ff4d4f";
      case "Chưa có":
        return "#d9d9d9";
      default:
        return "#d9d9d9";
    }
  };

  // Only show completed tests and overdue tests (with 0 score)
  const filteredScores = testScores.filter(score => {
    const courseMatch = selectedCourse === "all" || score.course === selectedCourse;
    const periodMatch = selectedPeriod === "all" || score.testDate.includes("2024-01");
    
    // Only show completed tests or overdue tests
    const isCompleted = score.status === "Đã hoàn thành";
    const isOverdueTest = score.status === "Quá hạn";
    
    return courseMatch && periodMatch && (isCompleted || isOverdueTest);
  });

  const calculateAverageScore = () => {
    const completedTests = filteredScores.filter(score => score.status === "Đã hoàn thành");
    if (completedTests.length === 0) return 0;
    
    const totalScore = completedTests.reduce((sum, test) => sum + test.percentage, 0);
    return (totalScore / completedTests.length).toFixed(1);
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
          <h3>Bài kiểm tra quá hạn</h3>
          <div className={styles.statValue}>
            {filteredScores.filter(score => score.status === "Quá hạn").length}
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
                  backgroundColor: score.status === "Đã hoàn thành" ? "#52c41a" : 
                                   score.status === "Quá hạn" ? "#ff4d4f" : "#faad14"
                }}
              >
                {score.status}
              </span>
            </div>
            
            {(score.status === "Đã hoàn thành" || score.status === "Quá hạn") && (
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
            </div>
          </div>
        ))}
      </div>

      {filteredScores.length === 0 && (
        <div className={styles.emptyState}>
          <p>Không có bài kiểm tra nào phù hợp với bộ lọc đã chọn.</p>
        </div>
      )}
    </div>
  );
};

export default TestScores; 