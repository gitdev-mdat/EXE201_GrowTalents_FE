import React, { useState } from "react";
import styles from "../../styles/AdminSettings.module.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "Admin Manager",
    email: "admin@growtalents.com",
    phone: "0123456789",
    position: "Quản lý hệ thống",
    department: "Quản lý",
    avatar: null
  });

  const [systemSettings, setSystemSettings] = useState({
    siteName: "GrowTalents",
    siteDescription: "Hệ thống quản lý giáo dục",
    maintenanceMode: false,
    allowRegistration: true,
    maxStudentsPerClass: 30,
    autoBackup: true,
    emailNotifications: true,
    smsNotifications: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    requirePasswordChange: false,
    passwordExpiryDays: 90,
    maxLoginAttempts: 5,
    sessionTimeout: 30,
    twoFactorAuth: false
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

  const handleSystemChange = (field, value) => {
    setSystemSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSecurityChange = (field, value) => {
    setSecuritySettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveProfile = () => {
    alert("Thông tin hồ sơ đã được cập nhật!");
  };

  const saveSystemSettings = () => {
    alert("Cài đặt hệ thống đã được lưu!");
  };

  const saveSecuritySettings = () => {
    alert("Cài đặt bảo mật đã được lưu!");
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

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileData(prev => ({
        ...prev,
        avatar: URL.createObjectURL(file)
      }));
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.header}>
        <h1>Cài đặt hệ thống</h1>
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
            className={`${styles.tab} ${activeTab === "system" ? styles.active : ""}`}
            onClick={() => setActiveTab("system")}
          >
            Cài đặt hệ thống
          </button>
          <button 
            className={`${styles.tab} ${activeTab === "security" ? styles.active : ""}`}
            onClick={() => setActiveTab("security")}
          >
            Bảo mật
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
              <div className={styles.avatarSection}>
                <div className={styles.avatarContainer}>
                  <img 
                    src={profileData.avatar || "https://via.placeholder.com/100x100"} 
                    alt="Avatar" 
                    className={styles.avatar}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    id="avatar-upload"
                    className={styles.avatarInput}
                  />
                  <label htmlFor="avatar-upload" className={styles.avatarLabel}>
                    Thay đổi ảnh
                  </label>
                </div>
              </div>
              
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
                  <label>Chức vụ</label>
                  <input
                    type="text"
                    value={profileData.position}
                    onChange={(e) => handleProfileChange("position", e.target.value)}
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
              </div>

              <button className={styles.saveBtn} onClick={saveProfile}>
                Lưu thông tin
              </button>
            </div>
          )}

          {activeTab === "system" && (
            <div className={styles.systemSection}>
              <h2>Cài đặt hệ thống</h2>
              
              <div className={styles.settingsGroup}>
                <h3>Thông tin website</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Tên website</label>
                    <input
                      type="text"
                      value={systemSettings.siteName}
                      onChange={(e) => handleSystemChange("siteName", e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Mô tả website</label>
                    <textarea
                      value={systemSettings.siteDescription}
                      onChange={(e) => handleSystemChange("siteDescription", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.settingsGroup}>
                <h3>Cài đặt chung</h3>
                <div className={styles.toggleOptions}>
                  <div className={styles.toggleItem}>
                    <div>
                      <h4>Chế độ bảo trì</h4>
                      <p>Tạm thời tắt website để bảo trì</p>
                    </div>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={systemSettings.maintenanceMode}
                        onChange={(e) => handleSystemChange("maintenanceMode", e.target.checked)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  <div className={styles.toggleItem}>
                    <div>
                      <h4>Cho phép đăng ký</h4>
                      <p>Cho phép người dùng đăng ký tài khoản mới</p>
                    </div>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={systemSettings.allowRegistration}
                        onChange={(e) => handleSystemChange("allowRegistration", e.target.checked)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  <div className={styles.toggleItem}>
                    <div>
                      <h4>Sao lưu tự động</h4>
                      <p>Tự động sao lưu dữ liệu hàng ngày</p>
                    </div>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={systemSettings.autoBackup}
                        onChange={(e) => handleSystemChange("autoBackup", e.target.checked)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Số học sinh tối đa mỗi lớp</label>
                    <input
                      type="number"
                      value={systemSettings.maxStudentsPerClass}
                      onChange={(e) => handleSystemChange("maxStudentsPerClass", parseInt(e.target.value))}
                      min="1"
                      max="100"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.settingsGroup}>
                <h3>Thông báo</h3>
                <div className={styles.toggleOptions}>
                  <div className={styles.toggleItem}>
                    <div>
                      <h4>Thông báo qua email</h4>
                      <p>Gửi thông báo qua email</p>
                    </div>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={systemSettings.emailNotifications}
                        onChange={(e) => handleSystemChange("emailNotifications", e.target.checked)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  <div className={styles.toggleItem}>
                    <div>
                      <h4>Thông báo qua SMS</h4>
                      <p>Gửi thông báo qua tin nhắn SMS</p>
                    </div>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={systemSettings.smsNotifications}
                        onChange={(e) => handleSystemChange("smsNotifications", e.target.checked)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>
              </div>

              <button className={styles.saveBtn} onClick={saveSystemSettings}>
                Lưu cài đặt hệ thống
              </button>
            </div>
          )}

          {activeTab === "security" && (
            <div className={styles.securitySection}>
              <h2>Cài đặt bảo mật</h2>
              
              <div className={styles.settingsGroup}>
                <h3>Bảo mật mật khẩu</h3>
                <div className={styles.toggleOptions}>
                  <div className={styles.toggleItem}>
                    <div>
                      <h4>Yêu cầu đổi mật khẩu định kỳ</h4>
                      <p>Bắt buộc người dùng đổi mật khẩu theo chu kỳ</p>
                    </div>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={securitySettings.requirePasswordChange}
                        onChange={(e) => handleSecurityChange("requirePasswordChange", e.target.checked)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  <div className={styles.toggleItem}>
                    <div>
                      <h4>Xác thực 2 yếu tố</h4>
                      <p>Yêu cầu mã xác thực qua SMS hoặc email</p>
                    </div>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={securitySettings.twoFactorAuth}
                        onChange={(e) => handleSecurityChange("twoFactorAuth", e.target.checked)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Thời hạn mật khẩu (ngày)</label>
                    <input
                      type="number"
                      value={securitySettings.passwordExpiryDays}
                      onChange={(e) => handleSecurityChange("passwordExpiryDays", parseInt(e.target.value))}
                      min="30"
                      max="365"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Số lần đăng nhập tối đa</label>
                    <input
                      type="number"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) => handleSecurityChange("maxLoginAttempts", parseInt(e.target.value))}
                      min="3"
                      max="10"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Thời gian timeout phiên (phút)</label>
                    <input
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => handleSecurityChange("sessionTimeout", parseInt(e.target.value))}
                      min="5"
                      max="120"
                    />
                  </div>
                </div>
              </div>

              <button className={styles.saveBtn} onClick={saveSecuritySettings}>
                Lưu cài đặt bảo mật
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