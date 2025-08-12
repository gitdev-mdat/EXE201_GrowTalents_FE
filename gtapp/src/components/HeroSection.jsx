import React from "react";
import { useNavigate } from "react-router-dom"; // Import React Router's useNavigate
import styles from "../styles/HeroSection.module.css";
import student from "../assets/student.png";

const HeroSection = () => {
  const navigate = useNavigate(); // Hook để điều hướng

  const handleButtonClick = () => {
    navigate("/login"); // Điều hướng đến trang /login
  };

  return (
    <section id="Home" className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.heading}>
            GrowTalents: Trung Tâm Dạy Học Uy Tín Hàng Đầu Đăk Nông
          </h1>
          <p className={styles.subheading}>
            <div>
              <strong>Cải cách tư duy - nâng cao năng lực </strong>
            </div>
            <div>
              <strong>
                Xây dựng giáo án phù hợp riêng cho từng em học sinh
              </strong>
            </div>
            <div>
              <strong>
                Cam kết cải thiện điểm số - Hoàn tiền nếu không như cam kết{" "}
              </strong>
            </div>
          </p>
          <button className={styles.ctaButton} onClick={handleButtonClick}>
            Đăng Ký Học Thử Miễn Phí <span className="icon">🎓</span>
          </button>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.waveContainer}>
            <img src={student} alt="Student" className={styles.studentImage} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;