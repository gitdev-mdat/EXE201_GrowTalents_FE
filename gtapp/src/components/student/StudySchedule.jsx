import React, { useState } from "react";
import styles from "../../styles/StudentStudySchedule.module.css";

const StudySchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const scheduleData = [
    {
      id: 1,
      course: "Khoá học toán cơ bản 6",
      teacher: "Cô Nguyễn Thị Anh",
      time: "15:00 - 16:30",
      day: "Thứ 3",
      date: "2024-01-15",
      room: "Phòng 101",
      status: "Sắp diễn ra"
    },
    {
      id: 2,
      course: "Khoá học toán cơ bản 7",
      teacher: "Thầy Trần Văn Bình",
      time: "16:30 - 18:00",
      day: "Thứ 4",
      date: "2024-01-16",
      room: "Phòng 102",
      status: "Sắp diễn ra"
    },
    {
      id: 3,
      course: "Khoá học tiếng Anh cơ bản",
      teacher: "Cô Sarah Johnson",
      time: "14:00 - 15:30",
      day: "Thứ 6",
      date: "2024-01-18",
      room: "Phòng 103",
      status: "Sắp diễn ra"
    },
    {
      id: 4,
      course: "Khoá học Vật lý cơ bản",
      teacher: "Thầy Lê Văn Cường",
      time: "09:00 - 10:30",
      day: "Thứ 7",
      date: "2024-01-19",
      room: "Phòng 104",
      status: "Chưa bắt đầu"
    }
  ];

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    return days[date.getDay()];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Sắp diễn ra":
        return "#1890ff";
      case "Đang diễn ra":
        return "#52c41a";
      case "Đã hoàn thành":
        return "#52c41a";
      case "Chưa bắt đầu":
        return "#faad14";
      default:
        return "#d9d9d9";
    }
  };

  return (
    <div className={styles.scheduleContainer}>
      <div className={styles.header}>
        <h1>Lịch học cá nhân</h1>
        <div className={styles.datePicker}>
          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className={styles.dateInput}
          />
        </div>
      </div>

      <div className={styles.scheduleContent}>
        <div className={styles.weeklyView}>
          <h2>Lịch học tuần này</h2>
          <div className={styles.scheduleTable}>
            <table>
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>Thứ 2</th>
                  <th>Thứ 3</th>
                  <th>Thứ 4</th>
                  <th>Thứ 5</th>
                  <th>Thứ 6</th>
                  <th>Thứ 7</th>
                  <th>Chủ nhật</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>09:00-10:30</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className={styles.scheduleCell}>
                    <div className={styles.courseItem}>
                      <strong>Vật lý cơ bản</strong>
                      <p>Thầy Lê Văn Cường</p>
                      <p>Phòng 104</p>
                    </div>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>14:00-15:30</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className={styles.scheduleCell}>
                    <div className={styles.courseItem}>
                      <strong>Tiếng Anh cơ bản</strong>
                      <p>Cô Sarah Johnson</p>
                      <p>Phòng 103</p>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>15:00-16:30</td>
                  <td></td>
                  <td className={styles.scheduleCell}>
                    <div className={styles.courseItem}>
                      <strong>Toán cơ bản 6</strong>
                      <p>Cô Nguyễn Thị Anh</p>
                      <p>Phòng 101</p>
                    </div>
                  </td>
                  <td></td>
                  <td className={styles.scheduleCell}>
                    <div className={styles.courseItem}>
                      <strong>Toán cơ bản 6</strong>
                      <p>Cô Nguyễn Thị Anh</p>
                      <p>Phòng 101</p>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>16:30-18:00</td>
                  <td className={styles.scheduleCell}>
                    <div className={styles.courseItem}>
                      <strong>Toán cơ bản 7</strong>
                      <p>Thầy Trần Văn Bình</p>
                      <p>Phòng 102</p>
                    </div>
                  </td>
                  <td></td>
                  <td className={styles.scheduleCell}>
                    <div className={styles.courseItem}>
                      <strong>Toán cơ bản 7</strong>
                      <p>Thầy Trần Văn Bình</p>
                      <p>Phòng 102</p>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.upcomingSessions}>
          <h2>Buổi học sắp tới</h2>
          <div className={styles.sessionsList}>
            {scheduleData.map((session) => (
              <div key={session.id} className={styles.sessionCard}>
                <div className={styles.sessionHeader}>
                  <h3>{session.course}</h3>
                  <span 
                    className={styles.statusBadge}
                    style={{backgroundColor: getStatusColor(session.status)}}
                  >
                    {session.status}
                  </span>
                </div>
                <div className={styles.sessionDetails}>
                  <p><strong>Giáo viên:</strong> {session.teacher}</p>
                  <p><strong>Thời gian:</strong> {session.day}, {session.time}</p>
                  <p><strong>Phòng học:</strong> {session.room}</p>
                  <p><strong>Ngày:</strong> {session.date}</p>
                </div>
                <div className={styles.sessionActions}>
                  <button className={styles.joinBtn}>Tham gia học</button>
                  <button className={styles.remindBtn}>Nhắc nhở</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudySchedule; 