import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../styles/StudentTestDetail.module.css";
import toan from "../../assets/Math1.svg";
import english from "../../assets/english.svg";
import physic from "../../assets/physic.svg";

const TestDetail = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [testData, setTestData] = useState(null);

  // Mock data for test details
  const mockTestDetails = {
    1: {
      id: 1,
      course: "Khoá học toán cơ bản 6",
      courseImage: toan,
      teacher: "Cô Nguyễn Thị Anh",
      testName: "Bài kiểm tra chương 1",
      testDate: "2024-01-10",
      duration: "45 phút",
      score: 8.5,
      maxScore: 10,
      percentage: 85,
      grade: "B+",
      totalQuestions: 10,
      correctAnswers: 8,
      wrongAnswers: 2,
      questions: [
        {
          id: 1,
          question: "Tính giá trị của biểu thức: 2x + 3y khi x = 2 và y = 3",
          options: [
            { id: "A", text: "7" },
            { id: "B", text: "13" },
            { id: "C", text: "15" },
            { id: "D", text: "17" }
          ],
          correctAnswer: "B",
          studentAnswer: "B",
          isCorrect: true,
          explanation: "Thay x = 2 và y = 3 vào biểu thức: 2(2) + 3(3) = 4 + 9 = 13"
        },
        {
          id: 2,
          question: "Giải phương trình: 3x - 6 = 9",
          options: [
            { id: "A", text: "x = 3" },
            { id: "B", text: "x = 5" },
            { id: "C", text: "x = 7" },
            { id: "D", text: "x = 9" }
          ],
          correctAnswer: "B",
          studentAnswer: "B",
          isCorrect: true,
          explanation: "3x - 6 = 9 → 3x = 15 → x = 5"
        },
        {
          id: 3,
          question: "Tính diện tích hình chữ nhật có chiều dài 8cm và chiều rộng 5cm",
          options: [
            { id: "A", text: "13cm²" },
            { id: "B", text: "26cm²" },
            { id: "C", text: "40cm²" },
            { id: "D", text: "45cm²" }
          ],
          correctAnswer: "C",
          studentAnswer: "D",
          isCorrect: false,
          explanation: "Diện tích = chiều dài × chiều rộng = 8 × 5 = 40cm²"
        },
        {
          id: 4,
          question: "Tìm ước chung lớn nhất của 12 và 18",
          options: [
            { id: "A", text: "2" },
            { id: "B", text: "3" },
            { id: "C", text: "6" },
            { id: "D", text: "12" }
          ],
          correctAnswer: "C",
          studentAnswer: "C",
          isCorrect: true,
          explanation: "ƯCLN(12, 18) = 6"
        },
        {
          id: 5,
          question: "Tính chu vi hình tròn có bán kính 7cm (π ≈ 3.14)",
          options: [
            { id: "A", text: "21.98cm" },
            { id: "B", text: "43.96cm" },
            { id: "C", text: "153.86cm" },
            { id: "D", text: "307.72cm" }
          ],
          correctAnswer: "B",
          studentAnswer: "A",
          isCorrect: false,
          explanation: "Chu vi = 2πr = 2 × 3.14 × 7 = 43.96cm"
        },
        {
          id: 6,
          question: "Giải bất phương trình: 2x + 4 > 10",
          options: [
            { id: "A", text: "x > 3" },
            { id: "B", text: "x > 6" },
            { id: "C", text: "x > 7" },
            { id: "D", text: "x > 14" }
          ],
          correctAnswer: "A",
          studentAnswer: "A",
          isCorrect: true,
          explanation: "2x + 4 > 10 → 2x > 6 → x > 3"
        },
        {
          id: 7,
          question: "Tính giá trị của (-3)²",
          options: [
            { id: "A", text: "-9" },
            { id: "B", text: "-6" },
            { id: "C", text: "6" },
            { id: "D", text: "9" }
          ],
          correctAnswer: "D",
          studentAnswer: "D",
          isCorrect: true,
          explanation: "(-3)² = (-3) × (-3) = 9"
        },
        {
          id: 8,
          question: "Tìm số trung bình cộng của các số: 5, 8, 12, 15",
          options: [
            { id: "A", text: "8" },
            { id: "B", text: "9" },
            { id: "C", text: "10" },
            { id: "D", text: "11" }
          ],
          correctAnswer: "C",
          studentAnswer: "C",
          isCorrect: true,
          explanation: "Trung bình cộng = (5 + 8 + 12 + 15) ÷ 4 = 40 ÷ 4 = 10"
        },
        {
          id: 9,
          question: "Tính 25% của 80",
          options: [
            { id: "A", text: "15" },
            { id: "B", text: "20" },
            { id: "C", text: "25" },
            { id: "D", text: "30" }
          ],
          correctAnswer: "B",
          studentAnswer: "B",
          isCorrect: true,
          explanation: "25% của 80 = 80 × 0.25 = 20"
        },
        {
          id: 10,
          question: "Tìm x biết: x/4 = 3/12",
          options: [
            { id: "A", text: "1" },
            { id: "B", text: "2" },
            { id: "C", text: "3" },
            { id: "D", text: "4" }
          ],
          correctAnswer: "A",
          studentAnswer: "A",
          isCorrect: true,
          explanation: "x/4 = 3/12 → x = (3 × 4) ÷ 12 = 12 ÷ 12 = 1"
        }
      ],
      teacherComment: "Em làm bài rất tốt, cần chú ý hơn về phần tính toán cẩn thận. Tiếp tục phát huy!",
      feedback: "Tốt"
    },
    2: {
      id: 2,
      course: "Khoá học toán cơ bản 6",
      courseImage: toan,
      teacher: "Cô Nguyễn Thị Anh",
      testName: "Bài kiểm tra 15 phút",
      testDate: "2024-01-15",
      duration: "15 phút",
      score: 9.0,
      maxScore: 10,
      percentage: 90,
      grade: "A",
      totalQuestions: 5,
      correctAnswers: 9,
      wrongAnswers: 1,
      questions: [
        {
          id: 1,
          question: "Tính: 15 + 27",
          options: [
            { id: "A", text: "40" },
            { id: "B", text: "42" },
            { id: "C", text: "43" },
            { id: "D", text: "45" }
          ],
          correctAnswer: "B",
          studentAnswer: "B",
          isCorrect: true,
          explanation: "15 + 27 = 42"
        },
        {
          id: 2,
          question: "Tính: 8 × 7",
          options: [
            { id: "A", text: "54" },
            { id: "B", text: "56" },
            { id: "C", text: "58" },
            { id: "D", text: "60" }
          ],
          correctAnswer: "B",
          studentAnswer: "B",
          isCorrect: true,
          explanation: "8 × 7 = 56"
        },
        {
          id: 3,
          question: "Tính: 63 ÷ 9",
          options: [
            { id: "A", text: "6" },
            { id: "B", text: "7" },
            { id: "C", text: "8" },
            { id: "D", text: "9" }
          ],
          correctAnswer: "B",
          studentAnswer: "C",
          isCorrect: false,
          explanation: "63 ÷ 9 = 7"
        },
        {
          id: 4,
          question: "Tính: 25 - 13",
          options: [
            { id: "A", text: "10" },
            { id: "B", text: "11" },
            { id: "C", text: "12" },
            { id: "D", text: "13" }
          ],
          correctAnswer: "C",
          studentAnswer: "C",
          isCorrect: true,
          explanation: "25 - 13 = 12"
        },
        {
          id: 5,
          question: "Tính: 4²",
          options: [
            { id: "A", text: "8" },
            { id: "B", text: "12" },
            { id: "C", text: "16" },
            { id: "D", text: "20" }
          ],
          correctAnswer: "C",
          studentAnswer: "C",
          isCorrect: true,
          explanation: "4² = 4 × 4 = 16"
        }
      ],
      teacherComment: "Xuất sắc! Em đã hiểu rõ kiến thức và áp dụng tốt vào bài tập.",
      feedback: "Xuất sắc"
    }
  };

  useEffect(() => {
    // Simulate API call to get test details
    const test = mockTestDetails[testId];
    if (test) {
      setTestData(test);
    } else {
      // Handle test not found
      navigate("/student/test-scores");
    }
  }, [testId, navigate]);

  if (!testData) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>Đang tải...</div>
      </div>
    );
  }

  const getStatusIcon = (isCorrect) => {
    return isCorrect ? "✓" : "✗";
  };

  const getStatusColor = (isCorrect) => {
    return isCorrect ? "#52c41a" : "#ff4d4f";
  };

  return (
    <div className={styles.testDetailContainer}>
      <div className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={() => navigate("/student/test-scores")}
        >
          ← Quay lại
        </button>
        <h1>Chi tiết bài kiểm tra</h1>
      </div>

      <div className={styles.testInfo}>
        <div className={styles.testHeader}>
          <div className={styles.courseInfo}>
            <img src={testData.courseImage} alt={testData.course} className={styles.courseImage} />
            <div>
              <h2>{testData.course}</h2>
              <p>Giáo viên: {testData.teacher}</p>
            </div>
          </div>
          <div className={styles.testStats}>
            <div className={styles.scoreDisplay}>
              <span className={styles.scoreValue}>{testData.score}</span>
              <span className={styles.maxScore}>/{testData.maxScore}</span>
            </div>
            <div className={styles.percentage}>{testData.percentage}%</div>
            <div className={styles.grade}>{testData.grade}</div>
          </div>
        </div>

        <div className={styles.testDetails}>
          <h3>{testData.testName}</h3>
          <div className={styles.testMeta}>
            <span>Ngày kiểm tra: {testData.testDate}</span>
            <span>Thời gian: {testData.duration}</span>
            <span>Tổng câu hỏi: {testData.totalQuestions}</span>
          </div>
        </div>

        <div className={styles.summaryStats}>
          <div className={styles.statCard}>
            <h4>Đúng</h4>
            <div className={styles.statValue} style={{color: "#52c41a"}}>
              {testData.correctAnswers}/{testData.totalQuestions}
            </div>
          </div>
          <div className={styles.statCard}>
            <h4>Sai</h4>
            <div className={styles.statValue} style={{color: "#ff4d4f"}}>
              {testData.wrongAnswers}/{testData.totalQuestions}
            </div>
          </div>
          <div className={styles.statCard}>
            <h4>Tỷ lệ đúng</h4>
            <div className={styles.statValue}>
              {((testData.correctAnswers / testData.totalQuestions) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      <div className={styles.questionsSection}>
        <h3>Câu hỏi và đáp án</h3>
        <div className={styles.questionsList}>
          {testData.questions.map((question, index) => (
            <div key={question.id} className={styles.questionCard}>
              <div className={styles.questionHeader}>
                <span className={styles.questionNumber}>Câu {index + 1}</span>
                <div className={styles.questionStatus}>
                  <span 
                    className={styles.statusIcon}
                    style={{color: getStatusColor(question.isCorrect)}}
                  >
                    {getStatusIcon(question.isCorrect)}
                  </span>
                  <span 
                    className={styles.statusText}
                    style={{color: getStatusColor(question.isCorrect)}}
                  >
                    {question.isCorrect ? "Đúng" : "Sai"}
                  </span>
                </div>
              </div>

              <div className={styles.questionContent}>
                <p className={styles.questionText}>{question.question}</p>
                
                <div className={styles.optionsList}>
                  {question.options.map((option) => (
                    <div 
                      key={option.id} 
                      className={`${styles.option} ${
                        option.id === question.correctAnswer ? styles.correctAnswer : ""
                      } ${
                        option.id === question.studentAnswer && !question.isCorrect 
                          ? styles.wrongAnswer 
                          : ""
                      }`}
                    >
                      <span className={styles.optionLabel}>{option.id}.</span>
                      <span className={styles.optionText}>{option.text}</span>
                      {option.id === question.correctAnswer && (
                        <span className={styles.correctMark}>✓</span>
                      )}
                      {option.id === question.studentAnswer && !question.isCorrect && (
                        <span className={styles.wrongMark}>✗</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className={styles.answerInfo}>
                  <div className={styles.answerRow}>
                    <span className={styles.answerLabel}>Đáp án của bạn:</span>
                    <span className={styles.studentAnswer}>{question.studentAnswer}</span>
                  </div>
                  <div className={styles.answerRow}>
                    <span className={styles.answerLabel}>Đáp án đúng:</span>
                    <span className={styles.correctAnswerText}>{question.correctAnswer}</span>
                  </div>
                </div>

                <div className={styles.explanation}>
                  <h5>Giải thích:</h5>
                  <p>{question.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.feedbackSection}>
        <h3>Nhận xét của giáo viên</h3>
        <div className={styles.feedbackContent}>
          <div className={styles.feedbackHeader}>
            <span className={styles.feedbackBadge}>{testData.feedback}</span>
          </div>
          <p className={styles.teacherComment}>{testData.teacherComment}</p>
        </div>
      </div>
    </div>
  );
};

export default TestDetail; 