import React from "react";
import TeacherSideBar from "./TeacherSideBar";
import { Navigate, Outlet } from "react-router-dom";
import styles from "../../styles/TeacherLayout.module.css";

const TeacherLayout = () => {
  if (localStorage.getItem("token") == null) {
    return <Navigate to="/login" />;
  }
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
