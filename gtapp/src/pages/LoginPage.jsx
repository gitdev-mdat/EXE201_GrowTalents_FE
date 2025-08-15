import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { login } from "../services/userService";
import styles from "../styles/LoginPage.module.css";

const LoginPage = () => {
  const [visible, setVisible] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleQuit = () => {
    setVisible(false);
  };

  const handleGoHome = () => {
    navigate("/home");
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNavigate = (role) => {
    if (role == "ADMIN") {
      navigate("/admin");
    } else if (role == "STUDENT") {
      navigate("/student");
    } else if (role == "TEACHER") {
      navigate("/teacher");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authenticationRequest = {
      username: formData.email,
      password: formData.password,
    };
    try {
      const response = await login(authenticationRequest);
      if (response) {
        localStorage.setItem("token", response.data?.data?.token);
        localStorage.setItem(
          "role",
          jwtDecode(response.data?.data?.token)?.role
        );
        localStorage.setItem(
          "userId",
          jwtDecode(response.data?.data?.token)?.sub
        );
        handleNavigate(jwtDecode(response.data?.data?.token)?.role);
        toast.success("Đăng nhập thành công!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Đăng nhập thất bại!");
    }
  };

  return (
    <>
      {visible && (
        <div className={styles.loginWrapper}>
          {/* Left side - Image */}
          <div className={styles.imageSection}>
            <div className={styles.imageOverlay}>
              <div className={styles.brandLogo}>
                <img
                  src={logo}
                  alt="GrowTalents Logo"
                  className={styles.logoImage}
                />
              </div>
              <div className={styles.heroContent}>
                <h3>Chào mừng bạn quay trở lại!</h3>
                <p>
                  Bắt đầu hành trình học tập và phát triển tài năng cùng
                  GrowTalents
                </p>
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
                {/* <div className={styles.socialButtons}>
                  <button className={styles.socialBtn}>
                    <FaGoogle color="#DB4437" />
                    <span>Google</span>
                  </button>
                  <button className={styles.socialBtn}>
                    <FaFacebookF color="#1877F2" />
                    <span>Facebook</span>
                  </button>
                </div> */}

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
                    <label className={styles.checkbox}></label>
                    <a href="#" className={styles.forgotPassword}>
                      Quên mật khẩu?
                    </a>
                  </div>

                  <button type="submit" className={styles.loginButton}>
                    Đăng nhập
                  </button>
                </form>

                <div className={styles.signupPrompt}>
                  <span>Chưa có tài khoản? </span>
                  <a href="#" className={styles.signupLink}>
                    Đăng ký ngay
                  </a>
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
