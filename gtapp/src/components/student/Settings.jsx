import React, { useState } from "react";
import styles from "../../styles/StudentSettings.module.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    phone: "0123456789",
    dateOfBirth: "2008-05-15",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    parentName: "Nguyễn Văn B",
    parentPhone: "0987654321",
    school: "THCS ABC",
    grade: "Lớp 7"
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    courseReminders: true,
    testReminders: true,
    assignmentReminders: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field) => {
    setNotifications(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveProfile = () => {
    // Logic để lưu thông tin profile
    alert("Thông tin đã được cập nhật!");
  };

  const saveNotifications = () => {
    // Logic để lưu cài đặt thông báo
    alert("Cài đặt thông báo đã được cập nhật!");
  };

  const changePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    // Logic để đổi mật khẩu
    alert("Mật khẩu đã được thay đổi!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.header}>
        <h1>Cài đặt và Hồ sơ</h1>
      </div>

      <div className={styles.settingsContent}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === "profile" ? styles.active : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Hồ sơ cá nhân
          </button>
          <button 
            className={`${styles.tab} ${activeTab === "notifications" ? styles.active : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            Thông báo
          </button>
          <button 
            className={`${styles.tab} ${activeTab === "password" ? styles.active : ""}`}
            onClick={() => setActiveTab("password")}
          >
            Đổi mật khẩu
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "profile" && (
            <div className={styles.profileSection}>
              <h2>Thông tin cá nhân</h2>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Họ và tên</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleProfileChange("name", e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Số điện thoại</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleProfileChange("phone", e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Ngày sinh</label>
                  <input
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => handleProfileChange("dateOfBirth", e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Địa chỉ</label>
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => handleProfileChange("address", e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Trường học</label>
                  <input
                    type="text"
                    value={profileData.school}
                    onChange={(e) => handleProfileChange("school", e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Lớp</label>
                  <input
                    type="text"
                    value={profileData.grade}
                    onChange={(e) => handleProfileChange("grade", e.target.value)}
                  />
                </div>
              </div>

              <h3>Thông tin phụ huynh</h3>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Họ tên phụ huynh</label>
                  <input
                    type="text"
                    value={profileData.parentName}
                    onChange={(e) => handleProfileChange("parentName", e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Số điện thoại phụ huynh</label>
                  <input
                    type="tel"
                    value={profileData.parentPhone}
                    onChange={(e) => handleProfileChange("parentPhone", e.target.value)}
                  />
                </div>
              </div>

              <button className={styles.saveBtn} onClick={saveProfile}>
                Lưu thông tin
              </button>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className={styles.notificationsSection}>
              <h2>Cài đặt thông báo</h2>
              <div className={styles.notificationOptions}>
                <div className={styles.notificationItem}>
                  <div>
                    <h4>Thông báo qua email</h4>
                    <p>Nhận thông báo về khóa học và bài tập qua email</p>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={notifications.emailNotifications}
                      onChange={() => handleNotificationChange("emailNotifications")}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.notificationItem}>
                  <div>
                    <h4>Thông báo qua SMS</h4>
                    <p>Nhận thông báo quan trọng qua tin nhắn SMS</p>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={notifications.smsNotifications}
                      onChange={() => handleNotificationChange("smsNotifications")}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.notificationItem}>
                  <div>
                    <h4>Nhắc nhở buổi học</h4>
                    <p>Nhận nhắc nhở trước buổi học 30 phút</p>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={notifications.courseReminders}
                      onChange={() => handleNotificationChange("courseReminders")}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.notificationItem}>
                  <div>
                    <h4>Nhắc nhở bài kiểm tra</h4>
                    <p>Nhận nhắc nhở về bài kiểm tra sắp tới</p>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={notifications.testReminders}
                      onChange={() => handleNotificationChange("testReminders")}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.notificationItem}>
                  <div>
                    <h4>Nhắc nhở bài tập</h4>
                    <p>Nhận nhắc nhở về deadline bài tập</p>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={notifications.assignmentReminders}
                      onChange={() => handleNotificationChange("assignmentReminders")}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>

              <button className={styles.saveBtn} onClick={saveNotifications}>
                Lưu cài đặt
              </button>
            </div>
          )}

          {activeTab === "password" && (
            <div className={styles.passwordSection}>
              <h2>Đổi mật khẩu</h2>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Mật khẩu hiện tại</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Mật khẩu mới</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                  />
                </div>
              </div>

              <button className={styles.saveBtn} onClick={changePassword}>
                Đổi mật khẩu
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings; 