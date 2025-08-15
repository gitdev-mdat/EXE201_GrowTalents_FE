import { Navigate, Outlet } from "react-router-dom";
import styles from "../../styles/AdminLayout.module.css";
import SideBar from "./SideBar";

const AdminLayout = () => {
  if (
    localStorage.getItem("token") == null &&
    localStorage.getItem("role") !== "ADMIN"
  ) {
    return <Navigate to="/login" />;
  }
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
