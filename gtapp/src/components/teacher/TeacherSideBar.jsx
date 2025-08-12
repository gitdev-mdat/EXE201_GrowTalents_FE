import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/TeacherSideBar.module.css";
import logo from "../../assets/logo.png";
import { HomeOutlined } from "@ant-design/icons";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import GradeIcon from "@mui/icons-material/Grade";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const TeacherSideBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={logo} className={styles.logo} alt="Logo" />
        <div className={styles.name}>GrowTalents</div>
      </div>
      <div className={styles.itemsContainer}>
        <Link to="/teacher/dashboard" className={styles.item}>
          <DashboardIcon /> Dashboard
        </Link>
        <Link to="/teacher/attendance" className={styles.item}>
          <PeopleIcon /> Attendance of students
        </Link>
        <Link to="/teacher/scores" className={styles.item}>
          <GradeIcon /> Enter score
        </Link>
        <Link to="/teacher/documents" className={styles.item}>
          <UploadFileIcon />    Upload documents / assign homework
        </Link>
        <Link to="/teacher/schedule" className={styles.item}>
          <ScheduleIcon /> Teaching schedule
        </Link>
        <Link to="/teacher/settings" className={styles.item}>
          <SettingsIcon /> Settings & Profile
        </Link>
        <Link to="/login" className={styles.item}>
          <ExitToAppIcon /> Log out
        </Link>
      </div>
    </div>
  );
};

export default TeacherSideBar; 