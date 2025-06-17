import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/StudentCourseList.module.css";
import toan from "../../assets/Math1.svg";
import english from "../../assets/english.svg";
import physic from "../../assets/physic.svg";

const CourseList = () => {
  const navigate = useNavigate();
  
  const courses = [
    {
      id: 1,
      name: "Khoá học toán cơ bản 6",
      subject: "Toán học",
      level: "Lớp 6",
      teacher: "Cô Nguyễn Thị Anh",
      schedule: "Thứ 3, 5 - 15:00-16:30",
      progress: 75,
      image: toan,
      status: "Đang học"
    },
    {
      id: 2,
      name: "Khoá học toán cơ bản 7",
      subject: "Toán học", 
      level: "Lớp 7",
      teacher: "Thầy Trần Văn Bình",
      schedule: "Thứ 2, 4 - 16:30-18:00",
      progress: 60,
      image: toan,
      status: "Đang học"
    },
    {
      id: 3,
      name: "Khoá học tiếng Anh cơ bản",
      subject: "Tiếng Anh",
      level: "Lớp 6-7",
      teacher: "Cô Sarah Johnson",
      schedule: "Thứ 6 - 14:00-15:30",
      progress: 45,
      image: english,
      status: "Đang học"
    },
    {
      id: 4,
      name: "Khoá học Vật lý cơ bản",
      subject: "Vật lý",
      level: "Lớp 7",
      teacher: "Thầy Lê Văn Cường",
      schedule: "Thứ 7 - 09:00-10:30",
      progress: 0,
      image: physic,
      status: "Chưa bắt đầu"
    }
  ];

  const handleViewDetails = (courseId) => {
    navigate(`/student/courses/${courseId}`);
  };

  const handleJoinCourse = (courseId) => {
    navigate(`/student/courses/${courseId}/learn`);
  };

  return (
    <div className={styles.courseListContainer}>
      <div className={styles.header}>
        <h1>Danh sách khóa học</h1>
        <div className={styles.filters}>
          <select className={styles.filterSelect}>
            <option value="all">Tất cả môn học</option>
            <option value="math">Toán học</option>
            <option value="english">Tiếng Anh</option>
            <option value="physics">Vật lý</option>
          </select>
          <select className={styles.filterSelect}>
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang học</option>
            <option value="pending">Chưa bắt đầu</option>
            <option value="completed">Đã hoàn thành</option>
          </select>
        </div>
      </div>

      <div className={styles.coursesGrid}>
        {courses.map((course) => (
          <div key={course.id} className={styles.courseCard}>
            <div className={styles.courseImage}>
              <img src={course.image} alt={course.name} />
              <div className={styles.statusBadge}>
                {course.status}
              </div>
            </div>
            <div className={styles.courseInfo}>
              <h3>{course.name}</h3>
              <p className={styles.subject}>{course.subject} - {course.level}</p>
              <p className={styles.teacher}>Giáo viên: {course.teacher}</p>
              <p className={styles.schedule}>{course.schedule}</p>
              <div className={styles.progressContainer}>
                <span>Tiến độ: {course.progress}%</span>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{width: `${course.progress}%`}}
                  ></div>
                </div>
              </div>
              <div className={styles.actions}>
                <button 
                  className={styles.viewBtn}
                  onClick={() => handleViewDetails(course.id)}
                >
                  Xem chi tiết
                </button>
                {course.status === "Đang học" && (
                  <button 
                    className={styles.joinBtn}
                    onClick={() => handleJoinCourse(course.id)}
                  >
                    Tham gia học
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList; 