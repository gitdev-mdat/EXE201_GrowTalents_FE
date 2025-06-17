import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/StudentSideBar.module.css";
import logo from "../../assets/logo.png";
import { HomeOutlined } from "@ant-design/icons";
import SchoolIcon from "@mui/icons-material/School";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const StudentSideBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={logo} className={styles.logo} alt="Logo" />
        <div className={styles.name}>GrowTalents</div>
      </div>
      <div className={styles.itemsContainer}>
        <Link to="/student/dashboard" className={styles.item}>
          <HomeOutlined /> Dashboard
        </Link>
        <Link to="/student/courses" className={styles.item}>
          <SchoolIcon /> List Course
        </Link>
        <Link to="/student/schedule" className={styles.item}>
          <ScheduleIcon /> Personal Study Schedule
        </Link>
        <Link to="/student/documents" className={styles.item}>
          <LibraryBooksIcon /> Documents / Exercises
        </Link>
        <Link to="/student/test-scores" className={styles.item}>
          <AssessmentIcon /> Test Scores / Teacher Comments
        </Link>
        <Link to="/student/settings" className={styles.item}>
          <SettingsIcon /> Settings and profile
        </Link>
        <Link to="/login" className={styles.item}>
          <ExitToAppIcon /> Log out
        </Link>
      </div>
    </div>
  );
};

export default StudentSideBar; 