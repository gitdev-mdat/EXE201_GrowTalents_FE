import { HomeOutlined } from "@ant-design/icons";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";
import PictureInPictureIcon from "@mui/icons-material/PictureInPicture";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { logout } from "../../services/userService";
import styles from "../../styles/SideBar.module.css";

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
        <Link to="/admin/semester" className={styles.item}>
          <AccessTimeIcon /> Academic Year/Semester
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
        <Link onClick={logout} to="/login" className={styles.item}>
          <ExitToAppIcon /> Log out
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
