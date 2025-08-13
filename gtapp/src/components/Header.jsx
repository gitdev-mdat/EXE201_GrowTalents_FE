import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BellOutlined, DownOutlined } from "@ant-design/icons";
import styles from "../styles/Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span className={styles.title}>GROWTALENTS</span>
      </div>
      <div className={styles["nav-links"]}>
        <a 
          href="#Home" 
          className={`${styles.course} ${activeSection === "home" ? styles.active : ""}`}
          onClick={() => handleNavClick("Home")}
        >
          🏠 Trang chủ
        </a>
        <a 
          href="#about-us" 
          className={`${styles.course} ${activeSection === "about" ? styles.active : ""}`}
          onClick={() => handleNavClick("about-us")}
        >
          ℹ️ Giới thiệu
        </a>
        <a 
          href="#courses" 
          className={`${styles.course} ${activeSection === "courses" ? styles.active : ""}`}
          onClick={() => handleNavClick("courses")}
        >
          📚 Khoá học
        </a>
        <a 
          href="#achievement" 
          className={`${styles.course} ${activeSection === "achievement" ? styles.active : ""}`}
          onClick={() => handleNavClick("achievement")}
        >
          🏆 Thành tích
        </a>
        <a 
          href="#contact" 
          className={`${styles.course} ${activeSection === "contact" ? styles.active : ""}`}
          onClick={() => handleNavClick("contact")}
        >
          📞 Liên hệ
        </a>
      </div>
      
      <div className={styles.authSection}>
        <button 
          className={styles.loginButton}
          onClick={handleLoginClick}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default Header;
