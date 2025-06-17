import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../styles/StudentCourseLearning.module.css";
import toan from "../../assets/Math1.svg";
import english from "../../assets/english.svg";
import physic from "../../assets/physic.svg";

const CourseLearning = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock data cho khóa học
  const coursesData = [
    {
      id: 1,
      name: "Khoá học toán cơ bản 6",
      subject: "Toán học",
      level: "Lớp 6",
      teacher: "Cô Nguyễn Thị Anh",
      image: toan,
      currentWeek: 4,
      currentLesson: "Hình học cơ bản",
      lessons: [
        {
          id: 1,
          title: "Bài 1: Điểm, đường thẳng, đoạn thẳng",
          duration: "45 phút",
          type: "video",
          status: "completed",
          videoUrl: "https://example.com/video1.mp4",
          description: "Học về các khái niệm cơ bản trong hình học: điểm, đường thẳng, đoạn thẳng và mối quan hệ giữa chúng."
        },
        {
          id: 2,
          title: "Bài 2: Góc và các loại góc",
          duration: "50 phút",
          type: "video",
          status: "in-progress",
          videoUrl: "https://example.com/video2.mp4",
          description: "Tìm hiểu về góc, cách đo góc và phân loại các loại góc khác nhau."
        },
        {
          id: 3,
          title: "Bài tập thực hành",
          duration: "30 phút",
          type: "exercise",
          status: "pending",
          description: "Làm các bài tập để củng cố kiến thức về hình học cơ bản."
        },
        {
          id: 4,
          title: "Bài 3: Đường tròn và hình tròn",
          duration: "40 phút",
          type: "video",
          status: "pending",
          videoUrl: "https://example.com/video3.mp4",
          description: "Học về đường tròn, hình tròn và các tính chất cơ bản."
        }
      ],
      materials: [
        {
          name: "Slide bài giảng tuần 4",
          type: "pdf",
          size: "2.5 MB"
        },
        {
          name: "Bài tập tuần 4",
          type: "docx",
          size: "1.8 MB"
        }
      ]
    },
    {
      id: 2,
      name: "Khoá học toán cơ bản 7",
      subject: "Toán học",
      level: "Lớp 7",
      teacher: "Thầy Trần Văn Bình",
      image: toan,
      currentWeek: 3,
      currentLesson: "Phương trình bậc nhất",
      lessons: [
        {
          id: 1,
          title: "Bài 1: Giải phương trình bậc nhất một ẩn",
          duration: "55 phút",
          type: "video",
          status: "in-progress",
          videoUrl: "https://example.com/video1.mp4",
          description: "Học cách giải phương trình bậc nhất một ẩn và các phương pháp giải."
        }
      ],
      materials: [
        {
          name: "Slide bài giảng tuần 3",
          type: "pdf",
          size: "3.2 MB"
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return "✓";
      case "in-progress":
        return "▶";
      case "pending":
        return "○";
      default:
        return "○";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#52c41a";
      case "in-progress":
        return "#1890ff";
      case "pending":
        return "#d9d9d9";
      default:
        return "#d9d9d9";
    }
  };

  const handleLessonClick = (lessonIndex) => {
    setCurrentLesson(lessonIndex);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.learningContainer}>
      <div className={styles.header}>
        <button 
          className={styles.backBtn}
          onClick={() => navigate("/student/courses")}
        >
          ← Quay lại danh sách
        </button>
        <div className={styles.courseInfo}>
          <img src={course.image} alt={course.name} className={styles.courseImage} />
          <div>
            <h1>{course.name}</h1>
            <p>Tuần {course.currentWeek}: {course.currentLesson}</p>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.videoSection}>
          <div className={styles.videoPlayer}>
            <div className={styles.videoPlaceholder}>
              <div className={styles.videoControls}>
                <button 
                  className={styles.playButton}
                  onClick={handlePlayPause}
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>
                <div className={styles.videoInfo}>
                  <h3>{course.lessons[currentLesson]?.title}</h3>
                  <p>{course.lessons[currentLesson]?.description}</p>
                </div>
              </div>
              <div className={styles.videoProgress}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{width: "35%"}}></div>
                </div>
                <span>15:30 / 45:00</span>
              </div>
            </div>
          </div>

          <div className={styles.lessonNavigation}>
            <button 
              className={styles.navBtn}
              disabled={currentLesson === 0}
              onClick={() => setCurrentLesson(currentLesson - 1)}
            >
              ← Bài trước
            </button>
            <button 
              className={styles.navBtn}
              disabled={currentLesson === course.lessons.length - 1}
              onClick={() => setCurrentLesson(currentLesson + 1)}
            >
              Bài tiếp theo →
            </button>
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.lessonsList}>
            <h3>Danh sách bài học</h3>
            {course.lessons.map((lesson, index) => (
              <div 
                key={lesson.id}
                className={`${styles.lessonItem} ${currentLesson === index ? styles.active : ""}`}
                onClick={() => handleLessonClick(index)}
              >
                <div className={styles.lessonStatus}>
                  <span 
                    className={styles.statusIcon}
                    style={{color: getStatusColor(lesson.status)}}
                  >
                    {getStatusIcon(lesson.status)}
                  </span>
                </div>
                <div className={styles.lessonInfo}>
                  <h4>{lesson.title}</h4>
                  <p>{lesson.duration} • {lesson.type === "video" ? "Video" : "Bài tập"}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.materialsSection}>
            <h3>Tài liệu học tập</h3>
            {course.materials.map((material, index) => (
              <div key={index} className={styles.materialItem}>
                <div className={styles.materialInfo}>
                  <h4>{material.name}</h4>
                  <p>{material.type.toUpperCase()} • {material.size}</p>
                </div>
                <div className={styles.materialActions}>
                  <button className={styles.downloadBtn}>Tải</button>
                  <button className={styles.viewBtn}>Xem</button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.notesSection}>
            <h3>Ghi chú</h3>
            <textarea 
              className={styles.notesTextarea}
              placeholder="Ghi chú của bạn..."
              rows={4}
            ></textarea>
            <button className={styles.saveNotesBtn}>Lưu ghi chú</button>
          </div>
        </div>
      </div>

      <div className={styles.bottomActions}>
        <div className={styles.progressInfo}>
          <span>Tiến độ: {Math.round((currentLesson + 1) / course.lessons.length * 100)}%</span>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{width: `${(currentLesson + 1) / course.lessons.length * 100}%`}}
            ></div>
          </div>
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.markCompleteBtn}>
            Đánh dấu hoàn thành
          </button>
          <button className={styles.nextLessonBtn}>
            Bài tiếp theo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseLearning; 