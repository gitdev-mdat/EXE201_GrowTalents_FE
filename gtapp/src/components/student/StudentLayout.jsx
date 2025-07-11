import React from "react";
import StudentSideBar from "./StudentSideBar";
import { Outlet } from "react-router-dom";
import styles from "../../styles/StudentLayout.module.css";

const StudentLayout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <StudentSideBar />
      </div>
      <div className={styles.content}>
        <Outlet /> {/* Nơi hiển thị nội dung của các route con */}
      </div>
    </div>
  );
};

export default StudentLayout; 