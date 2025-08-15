import React, { useState } from "react";
import { FaGoogle, FaFacebookF, FaEnvelope, FaHome, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "../styles/LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const LoginPage = () => {
  const [visible, setVisible] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const handleQuit = () => {
    setVisible(false);
  };

  const handleGoHome = () => {
    navigate('/home');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  return (
    <>
      {visible && (
        <div className={styles.loginWrapper}>
          {/* Left side - Image */}
          <div className={styles.imageSection}>
            <div className={styles.imageOverlay}>
              <div className={styles.brandLogo}>
                <img src={logo} alt="GrowTalents Logo" className={styles.logoImage} />
              </div>
              <div className={styles.heroContent}>
                <h3>Chào mừng bạn quay trở lại!</h3>
                <p>Bắt đầu hành trình học tập và phát triển tài năng cùng GrowTalents</p>
              </div>
            </div>
            <div className={styles.backgroundImage}></div>
          </div>

          {/* Right side - Form */}
          <div className={styles.formSection}>
            <div className={styles.formContainer}>
              {/* Header */}
              <div className={styles.header}>
                <button className={styles.homeBtn} onClick={handleGoHome}>
                  <FaHome />
                  <span>Trang chủ</span>
                </button>
              </div>

              {/* Form content */}
              <div className={styles.formContent}>
                <div className={styles.formHeader}>
                  <h1>Đăng nhập</h1>
                  <p>Nhập thông tin của bạn để tiếp tục</p>
                </div>

                {/* Social login buttons */}
                <div className={styles.socialButtons}>
                  <button className={styles.socialBtn}>
                    <FaGoogle color="#DB4437" />
                    <span>Google</span>
                  </button>
                  <button className={styles.socialBtn}>
                    <FaFacebookF color="#1877F2" />
                    <span>Facebook</span>
                  </button>
                </div>

                <div className={styles.divider}>
                  <span>hoặc</span>
                </div>

                {/* Login form */}
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="email">Email hoặc số điện thoại</label>
                    <input 
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Nhập email hoặc số điện thoại"
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="password">Mật khẩu</label>
                    <div className={styles.passwordInput}>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Nhập mật khẩu"
                        required
                      />
                      <button
                        type="button"
                        className={styles.passwordToggle}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className={styles.formOptions}>
                    <label className={styles.checkbox}>
                    </label>
                    <a href="#" className={styles.forgotPassword}>Quên mật khẩu?</a>
                  </div>

                  <button type="submit" className={styles.loginButton}>
                    Đăng nhập
                  </button>
                </form>

                <div className={styles.signupPrompt}>
                  <span>Chưa có tài khoản? </span>
                  <a href="#" className={styles.signupLink}>Đăng ký ngay</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;