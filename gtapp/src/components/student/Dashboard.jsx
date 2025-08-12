import React from "react";
import styles from "../../styles/StudentDashboard.module.css";
import toan from "../../assets/Math1.svg";

const StudentDashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* Phần thống kê tổng quan */}
      <div className={styles.statisticRow}>
        <div className={styles.statisticItem}>
          <span className={styles.label}>Khóa học đang học:</span>
          <span className={styles.value}>3</span>
        </div>
        <div className={styles.statisticItem}>
          <span className={styles.label}>Buổi học đã tham gia:</span>
          <span className={styles.value}>15</span>
        </div>
        <div className={styles.statisticItem}>
          <span className={styles.label}>Điểm trung bình:</span>
          <span className={styles.value}>8.5</span>
        </div>
        <div className={styles.statisticItem}>
          <span className={styles.label}>Thời gian học:</span>
          <span className={styles.value}>45 giờ</span>
        </div>
      </div>

      {/* Thống kê theo tuần/tháng */}
      <div className={styles.statisticColumn}>
        <div className={styles.statisticHeader}>
          <span className={styles.title}>Thống kê học tập</span>
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
                <th>Khóa học đang học</th>
                <th>Tiến độ</th>
                <th>Điểm số</th>
                <th>Buổi học tiếp theo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.courseInfo}>
                  <img src={toan} alt="Toán cơ bản 6" />
                  <span>Khoá học toán cơ bản 6</span>
                  <label>Lớp 6</label>
                </td>
                <td>75%</td>
                <td>8.5</td>
                <td>Thứ 3, 15:00</td>
              </tr>
              <tr>
                <td className={styles.courseInfo}>
                  <img src={toan} alt="Toán cơ bản 7" />
                  <span>Khoá học toán cơ bản 7</span>
                  <label>Lớp 7</label>
                </td>
                <td>60%</td>
                <td>8.0</td>
                <td>Thứ 5, 16:30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 