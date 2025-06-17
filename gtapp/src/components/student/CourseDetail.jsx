import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../styles/StudentCourseDetail.module.css";
import toan from "../../assets/Math1.svg";
import english from "../../assets/english.svg";
import physic from "../../assets/physic.svg";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - trong thực tế sẽ fetch từ API
  const coursesData = [
    {
      id: 1,
      name: "Khoá học toán cơ bản 6",
      subject: "Toán học",
      level: "Lớp 6",
      teacher: "Cô Nguyễn Thị Anh",
      teacherEmail: "nguyenthi.anh@growtalents.com",
      teacherPhone: "0123456789",
      schedule: "Thứ 3, 5 - 15:00-16:30",
      duration: "12 tuần",
      totalLessons: 24,
      completedLessons: 18,
      progress: 75,
      image: toan,
      status: "Đang học",
      description: "Khóa học toán cơ bản dành cho học sinh lớp 6, bao gồm các chủ đề: Số tự nhiên, Phân số, Số thập phân, Hình học cơ bản, Đại số sơ cấp.",
      objectives: [
        "Nắm vững kiến thức cơ bản về số học",
        "Phát triển tư duy logic và khả năng tính toán",
        "Làm quen với các khái niệm hình học cơ bản",
        "Chuẩn bị nền tảng cho chương trình lớp 7"
      ],
      syllabus: [
        {
          week: 1,
          title: "Ôn tập số tự nhiên",
          topics: ["Các phép tính cơ bản", "Tính chất của phép cộng và nhân"],
          status: "completed"
        },
        {
          week: 2,
          title: "Phân số",
          topics: ["Khái niệm phân số", "So sánh phân số", "Cộng trừ phân số"],
          status: "completed"
        },
        {
          week: 3,
          title: "Số thập phân",
          topics: ["Khái niệm số thập phân", "Các phép tính với số thập phân"],
          status: "completed"
        },
        {
          week: 4,
          title: "Hình học cơ bản",
          topics: ["Điểm, đường thẳng, đoạn thẳng", "Góc và các loại góc"],
          status: "in-progress"
        },
        {
          week: 5,
          title: "Đại số sơ cấp",
          topics: ["Biểu thức đại số", "Phương trình bậc nhất"],
          status: "pending"
        }
      ],
      materials: [
        {
          name: "Sách giáo khoa Toán 6",
          type: "pdf",
          size: "15.2 MB",
          uploadDate: "2024-01-01"
        },
        {
          name: "Bài tập chương 1",
          type: "docx",
          size: "2.1 MB",
          uploadDate: "2024-01-05"
        },
        {
          name: "Video bài giảng tuần 1",
          type: "mp4",
          size: "45.8 MB",
          uploadDate: "2024-01-03"
        }
      ],
      assignments: [
        {
          id: 1,
          title: "Bài tập về nhà tuần 1",
          dueDate: "2024-01-15",
          status: "submitted",
          score: 8.5
        },
        {
          id: 2,
          title: "Bài kiểm tra chương 1",
          dueDate: "2024-01-20",
          status: "pending"
        }
      ]
    },
    {
      id: 2,
      name: "Khoá học toán cơ bản 7",
      subject: "Toán học",
      level: "Lớp 7",
      teacher: "Thầy Trần Văn Bình",
      teacherEmail: "tranvan.binh@growtalents.com",
      teacherPhone: "0987654321",
      schedule: "Thứ 2, 4 - 16:30-18:00",
      duration: "12 tuần",
      totalLessons: 24,
      completedLessons: 14,
      progress: 60,
      image: toan,
      status: "Đang học",
      description: "Khóa học toán cơ bản dành cho học sinh lớp 7, tập trung vào đại số và hình học.",
      objectives: [
        "Nắm vững kiến thức đại số cơ bản",
        "Phát triển kỹ năng giải phương trình",
        "Hiểu sâu về hình học phẳng",
        "Chuẩn bị cho chương trình lớp 8"
      ],
      syllabus: [
        {
          week: 1,
          title: "Ôn tập kiến thức lớp 6",
          topics: ["Số hữu tỉ", "Các phép tính cơ bản"],
          status: "completed"
        },
        {
          week: 2,
          title: "Đại số",
          topics: ["Biểu thức đại số", "Đơn thức, đa thức"],
          status: "completed"
        },
        {
          week: 3,
          title: "Phương trình bậc nhất",
          topics: ["Giải phương trình bậc nhất một ẩn"],
          status: "in-progress"
        }
      ],
      materials: [
        {
          name: "Sách giáo khoa Toán 7",
          type: "pdf",
          size: "18.5 MB",
          uploadDate: "2024-01-01"
        }
      ],
      assignments: [
        {
          id: 1,
          title: "Bài tập đại số",
          dueDate: "2024-01-18",
          status: "submitted",
          score: 7.5
        }
      ]
    }
  ];

  useEffect(() => {
    const foundCourse = coursesData.find(c => c.id === parseInt(courseId));
    if (foundCourse) {
      setCourse(foundCourse);
    } else {
      navigate("/student/courses");
    }
  }, [courseId, navigate]);

  if (!course) {
    return <div>Loading...</div>;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#52c41a";
      case "in-progress":
        return "#1890ff";
      case "pending":
        return "#faad14";
      default:
        return "#d9d9d9";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Hoàn thành";
      case "in-progress":
        return "Đang học";
      case "pending":
        return "Chưa học";
      default:
        return "Không xác định";
    }
  };

  return (
    <div className={styles.courseDetailContainer}>
      <div className={styles.header}>
        <button 
          className={styles.backBtn}
          onClick={() => navigate("/student/courses")}
        >
          ← Quay lại danh sách
        </button>
        <h1>{course.name}</h1>
      </div>

      <div className={styles.courseOverview}>
        <div className={styles.courseImage}>
          <img src={course.image} alt={course.name} />
          <div className={styles.statusBadge}>
            {course.status}
          </div>
        </div>
        <div className={styles.courseInfo}>
          <h2>{course.name}</h2>
          <p className={styles.subject}>{course.subject} - {course.level}</p>
          <p className={styles.teacher}>Giáo viên: {course.teacher}</p>
          <p className={styles.schedule}>Lịch học: {course.schedule}</p>
          <p className={styles.duration}>Thời lượng: {course.duration}</p>
          <div className={styles.progressContainer}>
            <span>Tiến độ: {course.progress}%</span>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{width: `${course.progress}%`}}
              ></div>
            </div>
            <span>{course.completedLessons}/{course.totalLessons} bài học</span>
          </div>
          <div className={styles.actions}>
            {course.status === "Đang học" && (
              <button 
                className={styles.joinBtn}
                onClick={() => navigate(`/student/courses/${course.id}/learn`)}
              >
                Tham gia học ngay
              </button>
            )}
            <button className={styles.contactBtn}>Liên hệ giáo viên</button>
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === "overview" ? styles.active : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Tổng quan
        </button>
        <button 
          className={`${styles.tab} ${activeTab === "syllabus" ? styles.active : ""}`}
          onClick={() => setActiveTab("syllabus")}
        >
          Chương trình học
        </button>
        <button 
          className={`${styles.tab} ${activeTab === "materials" ? styles.active : ""}`}
          onClick={() => setActiveTab("materials")}
        >
          Tài liệu
        </button>
        <button 
          className={`${styles.tab} ${activeTab === "assignments" ? styles.active : ""}`}
          onClick={() => setActiveTab("assignments")}
        >
          Bài tập
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "overview" && (
          <div className={styles.overviewSection}>
            <div className={styles.description}>
              <h3>Mô tả khóa học</h3>
              <p>{course.description}</p>
            </div>
            
            <div className={styles.objectives}>
              <h3>Mục tiêu học tập</h3>
              <ul>
                {course.objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>

            <div className={styles.teacherInfo}>
              <h3>Thông tin giáo viên</h3>
              <div className={styles.teacherCard}>
                <h4>{course.teacher}</h4>
                <p>Email: {course.teacherEmail}</p>
                <p>Số điện thoại: {course.teacherPhone}</p>
                <button className={styles.contactTeacherBtn}>
                  Liên hệ giáo viên
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "syllabus" && (
          <div className={styles.syllabusSection}>
            <h3>Chương trình học</h3>
            <div className={styles.syllabusList}>
              {course.syllabus.map((week, index) => (
                <div key={index} className={styles.weekCard}>
                  <div className={styles.weekHeader}>
                    <h4>Tuần {week.week}: {week.title}</h4>
                    <span 
                      className={styles.weekStatus}
                      style={{backgroundColor: getStatusColor(week.status)}}
                    >
                      {getStatusText(week.status)}
                    </span>
                  </div>
                  <div className={styles.weekTopics}>
                    <h5>Nội dung:</h5>
                    <ul>
                      {week.topics.map((topic, topicIndex) => (
                        <li key={topicIndex}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                  {week.status === "in-progress" && (
                    <button 
                      className={styles.startLessonBtn}
                      onClick={() => navigate(`/student/courses/${course.id}/learn`)}
                    >
                      Bắt đầu học
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "materials" && (
          <div className={styles.materialsSection}>
            <h3>Tài liệu học tập</h3>
            <div className={styles.materialsList}>
              {course.materials.map((material, index) => (
                <div key={index} className={styles.materialCard}>
                  <div className={styles.materialInfo}>
                    <h4>{material.name}</h4>
                    <p>Loại: {material.type.toUpperCase()}</p>
                    <p>Kích thước: {material.size}</p>
                    <p>Ngày đăng: {material.uploadDate}</p>
                  </div>
                  <div className={styles.materialActions}>
                    <button className={styles.downloadBtn}>Tải xuống</button>
                    <button className={styles.viewBtn}>Xem trước</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "assignments" && (
          <div className={styles.assignmentsSection}>
            <h3>Bài tập và kiểm tra</h3>
            <div className={styles.assignmentsList}>
              {course.assignments.map((assignment) => (
                <div key={assignment.id} className={styles.assignmentCard}>
                  <div className={styles.assignmentInfo}>
                    <h4>{assignment.title}</h4>
                    <p>Hạn nộp: {assignment.dueDate}</p>
                    {assignment.score && (
                      <p>Điểm: {assignment.score}/10</p>
                    )}
                  </div>
                  <div className={styles.assignmentActions}>
                    {assignment.status === "submitted" ? (
                      <span className={styles.submittedBadge}>Đã nộp</span>
                    ) : (
                      <button className={styles.submitBtn}>Nộp bài</button>
                    )}
                    <button className={styles.viewBtn}>Xem chi tiết</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail; 