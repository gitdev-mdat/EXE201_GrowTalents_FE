import React from "react";
import styles from "../styles/CourseSection.module.css";

const CourseSection = () => {
  return (
    <div className={styles.courseSection}>
      <h2 className={styles.title}>Chủ đề được quan tâm</h2>
      <div className={styles.courseList}>
        <div className={`${styles.courseItem} ${styles.vatLy}`}>
          <span className={styles.title}></span>
        </div>
        <div className={`${styles.courseItem} ${styles.tiengAnh}`}>
          <span className={styles.title}></span>
        </div>
        <div className={`${styles.courseItem} ${styles.hoa}`}>
          <span className={styles.title}></span>
        </div>
        <div className={`${styles.courseItem} ${styles.toan}`}>
          <span className={styles.title}></span>
        </div>
      </div>
    </div>
  );
};

export default CourseSection;
