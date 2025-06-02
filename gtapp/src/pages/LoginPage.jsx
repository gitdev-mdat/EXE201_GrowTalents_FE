import React from "react";
import logo from "../assets/logo.png";
import { FaGoogle, FaFacebookF, FaEnvelope } from "react-icons/fa";
import styles from "../styles/LoginPage.module.css";
import { useState } from "react";

const LoginPage = () => {
  const [visible, setVisible] = useState(true);
  const handleQuit = () => {
    setVisible(false);
  };
  return (
    <>
      {visible && (
        <div className={styles.container}>
          <span className={styles.quit} onClick={handleQuit}>
            {" "}
            X{" "}
          </span>
          <div className={styles.logoContainer}>
            <img src={logo} alt="Logo" className={styles.logo} />
          </div>
          <div className={styles.title}>Đăng nhập GrowTalents</div>
          <div className={styles.note}>
            Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người sử
            dụng chung sẽ bị khoá
          </div>
          <div className={styles.itemContainer}>
            <button className={styles.item}>
              <FaGoogle className={styles.icon} /> Đăng nhập với Google
            </button>
            <button className={styles.item}>
              <FaFacebookF className={styles.icon} /> Đăng nhập với Facebook
            </button>
            <button className={styles.item}>
              <FaEnvelope className={styles.icon} /> Sử dụng email/ số điện
              thoại
            </button>
          </div>
          <div className={styles.footer}>
            <div>
              <p>Bạn đã có tài khoản?</p>
              <span className={styles.link}>Đăng nhập</span>
            </div>
            <div>
              <span className={styles.link}>Quên mật khẩu?</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
