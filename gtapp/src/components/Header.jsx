import React from "react";
import { BellOutlined, DownOutlined } from "@ant-design/icons";
import styles from "../styles/Header.module.css";
import HeroSection from "./HeroSection";
import AboutUsSection from "./AboutUsSection";
const Header = () => {
  return (
    <div className={styles.header}>
      <span className={styles.title}>GROWTALENTS</span>
      <span className={styles.separator}>|</span>
      <div className={styles["nav-links"]}>
        <a href="#home" className={styles.course}>
          Trang chủ
        </a>
        <a href="#about-us" className={styles.course}>
          Giới thiệu
        </a>
        <a href="#courses" className={styles.course}>
          Khoá học
        </a>
        <a href="#achievement" className={styles.course}>
          Thành tích
        </a>
        <a href="#contact" className={styles.course}>
          Liên hệ
        </a>
      </div>
    </div>
  );
};

export default Header;
