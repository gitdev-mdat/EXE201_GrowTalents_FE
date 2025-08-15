import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "../styles/CoursesSection.module.css";
import chemistry from "../assets/hoahoc.jpg";
import math from "../assets/toan.jpg";
import english from "../assets/tienganh.jpg";
import physic from "../assets/vatly.jpg";
import literature from "../assets/van.jpg";

const CoursesSection = () => {
  const [selectedLevel, setSelectedLevel] = useState("Cấp 1 (Lớp 1 - 5)");
  const navigate = useNavigate(); // Hook điều hướng

  // Data cho các khóa học
  const courses = {
    "Cấp 1 (Lớp 1 - 5)": [
      {
        name: "Toán",
        img: math,
        description: "Phát triển tư duy logic.",
        price: "1,500,000 VND/khóa",
        instructor: "Nguyễn Thị Mai",
      },
      {
        name: "Văn",
        img: literature,
        description: "Phát triến kỹ năng đọc và viết.",
        price: "1,300,000 VND/khóa",
        instructor: "Nguyễn Minh Hoàng",
      },
      {
        name: "Tiếng Anh",
        img: english,
        description: "Phát triển kỹ năng giao tiếp tiếng Anh cơ bản.",
        price: "1,200,000 VND/khóa",
        instructor: "Phạm Quốc Việt",
      },
    ],
    "Cấp 2 (Lớp 6 - 9)": [
      {
        name: "Toán",
        img: math,
        description: "Tư duy toán học nâng cao.",
        price: "1,800,000 VND/khóa",
        instructor: "Nguyễn Thị Mai",
      },
      {
        name: "Văn",
        img: literature,
        description: "Phân tích văn bản, viết luận.",
        price: "1,500,000 VND/khóa",
        instructor: "Nguyễn Minh Hoàng",
      },
      {
        name: "Tiếng Anh",
        img: english,
        description: "Kỹ năng đọc, viết, giao tiếp.",
        price: "1,400,000 VND/khóa",
        instructor: "Phạm Quốc Việt",
      },
      {
        name: "Lý",
        img: physic,
        description: "Khám phá lý thuyết vật lý.",
        price: "1,600,000 VND/khóa",
        instructor: "Phạm Quốc Nga",
      },
      {
        name: "Hóa",
        img: chemistry,
        description: "Thí nghiệm hóa học thú vị.",
        price: "1,700,000 VND/khóa",
        instructor: "Phạm Minh Tâm",
      },
    ],
    "Cấp 3 (Lớp 10 - 12)": [
      {
        name: "Toán",
        img: math,
        description: "Bài toán khó, phương pháp sáng tạo.",
        price: "2,000,000 VND/khóa",
        instructor: "Nguyễn Thị Mai",
      },
      {
        name: "Văn",
        img: literature,
        description: "Phân tích văn học và luận văn.",
        price: "1,800,000 VND/khóa",
        instructor: "Nguyễn Minh Hoàng",
      },
      {
        name: "Tiếng Anh",
        img: english,
        description: "Thi vào trường quốc tế.",
        price: "1,900,000 VND/khóa",
        instructor: "Phạm Quốc Việt",
      },
      {
        name: "Lý",
        img: physic,
        description: "Vật lý từ lý thuyết đến thực hành.",
        price: "1,800,000 VND/khóa",
        instructor: "Nguyễn Thiện Bình",
      },
      {
        name: "Hóa",
        img: chemistry,
        description: "Hóa học nâng cao, ứng dụng.",
        price: "1,900,000 VND/khóa",
        instructor: "Phạm Minh Tâm",
      },
    ],
  };

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
  };

  const handleViewDetails = (course) => {
    // Điều hướng đến trang chi tiết khóa học và truyền dữ liệu qua state
    navigate("/home/course-detail", { state: { course } });
  };

  return (
    <section id="courses" className={styles.coursesSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Các Khoá Học Của Chúng Tôi</h2>

        {/* Buttons to select level */}
        <div className={styles.levelSelection}>
          {Object.keys(courses).map((level) => (
            <button
              key={level}
              onClick={() => handleLevelChange(level)}
              className={`${styles.levelButton} ${
                selectedLevel === level ? styles.selected : ""
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Displaying the courses based on selected level */}
        <div className={styles.courseLevel}>
          <h3 className={styles.levelTitle}>{selectedLevel}</h3>
          <div className={styles.coursesList}>
            {courses[selectedLevel].map((course) => (
              <div
                key={course.name}
                className={`${styles.courseCard} ${styles.hoverEffect}`}
              >
                <img
                  src={course.img}
                  alt={`${course.name} Course`}
                  className={styles.courseImage}
                />
                <h4 className={styles.courseTitle}>📖 {course.name}</h4>
                <p className={styles.courseDescription}>{course.description}</p>
                <div className={styles.courseInstructor}>
                   Giảng viên: {course.instructor}
                </div>
                <p className={styles.coursePrice}>{course.price}</p>
                <button
                  className={styles.courseButton}
                  onClick={() => handleViewDetails(course)}
                >
                  🔍 Xem Chi Tiết
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;