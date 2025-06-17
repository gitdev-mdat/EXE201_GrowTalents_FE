import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/SideBar.module.css";
import logo from "../../assets/logo.png";
import { HomeOutlined } from "@ant-design/icons";
import SchoolIcon from "@mui/icons-material/School";
import PictureInPictureIcon from "@mui/icons-material/PictureInPicture";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import PaymentIcon from "@mui/icons-material/Payment";
import AssessmentIcon from "@mui/icons-material/Assessment";

const SideBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={logo} className={styles.logo} alt="Logo" />
        <div className={styles.name}>GrowTalents</div>
      </div>
      <div className={styles.itemsContainer}>
        <Link to="/admin/dashboard" className={styles.item}>
          <HomeOutlined /> Dashboard
        </Link>
        <Link to="/admin/schedule" className={styles.item}>
          <AccessTimeIcon /> Schedule
        </Link>
        <Link to="/admin/teachers" className={styles.item}>
          <PersonIcon /> Teachers
        </Link>
        <Link to="/admin/students" className={styles.item}>
          <PictureInPictureIcon /> Students/classes
        </Link>
        <Link to="/admin/courses" className={styles.item}>
          <LibraryBooksIcon /> Courses
        </Link>
        <Link to="/admin/tuition" className={styles.item}>
          <PaymentIcon /> Tuition Recording
        </Link>
        <Link to="/admin/reports" className={styles.item}>
          <AssessmentIcon /> Summary & Report Export
        </Link>
        <Link to="/admin/settings" className={styles.item}>
          <SettingsIcon /> Settings and profile
        </Link>
        <Link to="/login" className={styles.item}>
          <ExitToAppIcon /> Log out
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
