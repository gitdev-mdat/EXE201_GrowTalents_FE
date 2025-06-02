import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import styles from "../../styles/AdminLayout.module.css";

const AdminLayout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <SideBar />
      </div>
      <div className={styles.content}>
        <Outlet /> {/* Nơi hiển thị nội dung của các route con */}
      </div>
    </div>
  );
};

export default AdminLayout;
