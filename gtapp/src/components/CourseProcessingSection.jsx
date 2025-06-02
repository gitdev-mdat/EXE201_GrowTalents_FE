import React from "react";
import styles from "../styles/CourseProcessingSection.module.css";
import ProgressComponent from "./ProgressComponent";
const CourseProcessingSection = () => {
  return (
    <>
      <div className={styles.title}> Quy trình đăng ký khoá học </div>
      <div className={styles.container}>
        <div>
          {" "}
          <ProgressComponent />{" "}
        </div>
      </div>
    </>
  );
};
export default CourseProcessingSection;
