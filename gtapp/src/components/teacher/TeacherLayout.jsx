import React from "react";
import TeacherSideBar from "./TeacherSideBar";
import { Outlet } from "react-router-dom";
import styles from "../../styles/TeacherLayout.module.css";

const TeacherLayout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <TeacherSideBar />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherLayout; 