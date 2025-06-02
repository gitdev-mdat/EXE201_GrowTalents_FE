import React from "react";
import styles from "../../styles/Dashboard.module.css";
import toan from "../../assets/Math1.svg"; // Đảm bảo đường dẫn hình ảnh đúng

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Phần thống kê tổng quan */}
      <div className={styles.statisticRow}>
        <div className={styles.statisticItem}>
          <span className={styles.label}>Lớp đang dạy:</span>
          <span className={styles.value}>3</span>
        </div>
        <div className={styles.statisticItem}>
          <span className={styles.label}>Số buổi đã dạy:</span>
          <span className={styles.value}>5</span>
        </div>
        <div className={styles.statisticItem}>
          <span className={styles.label}>Số giờ đã dạy:</span>
          <span className={styles.value}>12</span>
        </div>
        <div className={styles.statisticItem}>
          <span className={styles.label}>Thu nhập ước tính:</span>
          <span className={styles.value}>12.000.000đ</span>
        </div>
      </div>

      {/* Thống kê theo tuần/tháng */}
      <div className={styles.statisticColumn}>
        <div className={styles.statisticHeader}>
          <span className={styles.title}>Thống kê</span>
          <select className={styles.select}>
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
          </select>
        </div>

        {/* Bảng thông tin khóa học */}
        <div className={styles.tableContainer}>
          <table className={styles.courseTable}>
            <thead>
              <tr>
                <th>Thông tin khóa học</th>
                <th>Học viên</th>
                <th>Giờ đã dạy</th>
                <th>Thu nhập</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.courseInfo}>
                  <img src={toan} alt="Toán cơ bản 6" />
                  <span>Khoá học toán cơ bản 6</span>
                  <label>Lớp 6</label>
                </td>
                <td>20</td>
                <td>4</td>
                <td>10.000.000đ</td>
              </tr>
              <tr>
                <td className={styles.courseInfo}>
                  <img src={toan} alt="Toán cơ bản 7" />
                  <span>Khoá học toán cơ bản 7</span>
                  <label>Lớp 7</label>
                </td>
                <td>20</td>
                <td>4</td>
                <td>10.000.000đ</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
