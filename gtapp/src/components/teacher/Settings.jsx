import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  Avatar,
  Switch,
  FormControlLabel,
  Divider,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Person,
  Security,
  Notifications,
  Settings as SettingsIcon,
  Edit,
  Save,
  Cancel,
  PhotoCamera,
  Email,
  Phone,
  School,
  Work,
  LocationOn,
  CalendarToday
} from '@mui/icons-material';
import styles from '../../styles/TeacherSettings.module.css';

const TeacherSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "Nguyễn Thị Mai",
    email: "nguyenthi.mai@growtalents.edu.vn",
    phone: "0901234567",
    dateOfBirth: "1985-09-01",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    department: "Khoa Toán - Tin học",
    position: "Giáo viên Toán",
    education: "Thạc sĩ Toán học",
    experience: "8 năm"
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    scheduleReminders: true,
    testReminders: true
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
    alert("Thông tin đã được cập nhật!");
  };

  const saveNotifications = () => {
    alert("Cài đặt thông báo đã được cập nhật!");
  };

  const changePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
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
        <h1>Cài đặt & Hồ sơ giáo viên</h1>
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
                  <label>Phòng ban</label>
                  <input
                    type="text"
                    value={profileData.department}
                    onChange={(e) => handleProfileChange("department", e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Chức vụ</label>
                  <input
                    type="text"
                    value={profileData.position}
                    onChange={(e) => handleProfileChange("position", e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Trình độ học vấn</label>
                  <input
                    type="text"
                    value={profileData.education}
                    onChange={(e) => handleProfileChange("education", e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Kinh nghiệm</label>
                  <input
                    type="text"
                    value={profileData.experience}
                    onChange={(e) => handleProfileChange("experience", e.target.value)}
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
                    <p>Nhận thông báo về lịch dạy, bài kiểm tra, thông báo hệ thống qua email.</p>
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
                    <p>Nhận thông báo quan trọng qua tin nhắn điện thoại.</p>
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
                    <h4>Nhắc lịch dạy</h4>
                    <p>Nhận nhắc nhở trước khi đến giờ dạy.</p>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={notifications.scheduleReminders}
                      onChange={() => handleNotificationChange("scheduleReminders")}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <div className={styles.notificationItem}>
                  <div>
                    <h4>Nhắc bài kiểm tra</h4>
                    <p>Nhận nhắc nhở khi sắp đến ngày kiểm tra hoặc cần nhập điểm.</p>
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
              </div>
              <button className={styles.saveBtn} onClick={saveNotifications}>
                Lưu cài đặt thông báo
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

export default TeacherSettings; 