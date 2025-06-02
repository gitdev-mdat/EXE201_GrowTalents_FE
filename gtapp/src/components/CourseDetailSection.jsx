import React, { useState } from "react";
import PropTypes from "prop-types";
import { Rate } from "antd";
import { ClockCircleOutlined, TeamOutlined } from "@ant-design/icons";
import styles from "../styles/CourseDetailSection.module.css";
import LoginPage from "../pages/LoginPage";
import { courses, createCourseDetail } from "./mock/MockData";

const CourseItem = ({ course, onSelect }) => (
  <div className={styles.item} onClick={() => onSelect(course)}>
    <img src={course.image} alt={course.name} className={styles.itemImage} />
    <div>
      <h3>{course.name}</h3>
      <p>{course.description}</p>
      <div className={styles.listPrice}>{course.price}</div>
    </div>
  </div>
);

CourseItem.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    descriptionDetails: PropTypes.string,
    price: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

const CourseList = ({ courses, onSelect }) => (
  <div className={styles.courseList}>
    {courses.map((course) => (
      <CourseItem key={course.id} course={course} onSelect={onSelect} />
    ))}
  </div>
);

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      descriptionDetails: PropTypes.string,
      price: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

const CourseDetail = ({ courseDetail, showLogin }) => (
  <div className={styles.detailsInformation}>
    <img
      src={courseDetail.image || "/path/to/default-image.jpg"}
      alt={courseDetail.title || "Course Image"}
      className={styles.detailImage}
    />
    <div className={styles.detailsContainer}>
      <span className={styles.label}>Cơ bản</span>
      <Rate
        disabled
        defaultValue={courseDetail.rating || 0}
        className={styles.rate}
      />
      <span className={styles.reviews}>
        {courseDetail.reviews || 0} đánh giá
      </span>
    </div>
    <h2 className={styles.courseTitle}>{courseDetail.title}</h2>
    <div className={styles.courseDescription}>
      {courseDetail.descriptionDetails}
    </div>
    <div className={styles.enrollment}>
      <TeamOutlined /> {courseDetail.students || 0} sinh viên đã ghi danh
    </div>
    {/* <div className={styles.date}>
      <ClockCircleOutlined /> {courseDetail.date}
    </div> */}
    <hr className={styles.hrLine} />
    <button className={styles.btnRegister} onClick={showLogin}>
      Đăng ký ngay
    </button>
  </div>
);

CourseDetail.propTypes = {
  courseDetail: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    descriptionDetails: PropTypes.string.isRequired,
    reviews: PropTypes.number.isRequired,
    students: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  showLogin: PropTypes.func.isRequired,
};

const CourseDetailSection = () => {
  const [selectedCourse, setSelectedCourse] = useState(
    createCourseDetail(courses[0]) // Mặc định lấy chi tiết khóa học đầu tiên
  );
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const onSelectCourse = (course) => {
    const updatedCourseDetail = createCourseDetail(course);
    setSelectedCourse(updatedCourseDetail);
  };

  const showLogin = () => setIsLoginVisible(true);
  const hideLogin = () => setIsLoginVisible(false);

  return (
    <>
      <div className={styles.headerContainer}>
        <h2 className={styles.title}>Khoá học phổ biến</h2>
        <span className={styles.className}>LỚP 6</span>
      </div>

      <div className={styles.container}>
        <div className={styles.courseListContainer}>
          <CourseList courses={courses} onSelect={onSelectCourse} />
        </div>

        <div className={styles.courseDetailContainer}>
          <CourseDetail courseDetail={selectedCourse} showLogin={showLogin} />
        </div>
      </div>

      {isLoginVisible && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <button className={styles.closeBtn} onClick={hideLogin}>
              X
            </button>
            <LoginPage />
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetailSection;
