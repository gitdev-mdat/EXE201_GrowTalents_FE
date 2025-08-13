import React from "react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Section */}
        <div className={styles.topSection}>
          {/* Company Info */}
          <div className={styles.companyInfo}>
            <h3 className={styles.companyName}>
              <span className={styles.logo}>🌟</span>
              GROWTALENTS
            </h3>
            <p className={styles.companyDescription}>
              Trung tâm dạy học uy tín hàng đầu Đăk Nông, cam kết mang đến 
              chất lượng giáo dục tốt nhất cho học sinh từ 12-16 tuổi.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <span className={styles.socialIcon}>📘</span>
                Facebook
              </a>
              <a href="#" className={styles.socialLink}>
                <span className={styles.socialIcon}>📺</span>
                YouTube
              </a>
              <a href="#" className={styles.socialLink}>
                <span className={styles.socialIcon}>📧</span>
                Email
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksSection}>
            <h4 className={styles.sectionTitle}>🔗 Liên Kết Nhanh</h4>
            <ul className={styles.linksList}>
              <li><a href="#Home" className={styles.footerLink}>🏠 Trang chủ</a></li>
              <li><a href="#about-us" className={styles.footerLink}>ℹ️ Giới thiệu</a></li>
              <li><a href="#courses" className={styles.footerLink}>📚 Khóa học</a></li>
              <li><a href="#achievement" className={styles.footerLink}>🏆 Thành tích</a></li>
              <li><a href="#contact" className={styles.footerLink}>📞 Liên hệ</a></li>
            </ul>
          </div>

          {/* Courses */}
          <div className={styles.coursesSection}>
            <h4 className={styles.sectionTitle}>📖 Môn Học</h4>
            <ul className={styles.linksList}>
              <li><a href="#" className={styles.footerLink}>🔢 Toán học</a></li>
              <li><a href="#" className={styles.footerLink}>🔬 Vật lý</a></li>
              <li><a href="#" className={styles.footerLink}>⚗️ Hóa học</a></li>
              <li><a href="#" className={styles.footerLink}>📝 Văn học</a></li>
              <li><a href="#" className={styles.footerLink}>🌍 Tiếng Anh</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.contactSection}>
            <h4 className={styles.sectionTitle}>📍 Thông Tin Liên Hệ</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>🏢</span>
                <span>123 Đường ABC, Thành phố Gia Nghĩa, Đăk Nông</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📱</span>
                <span>0123 456 789</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                <span>info@growtalents.edu.vn</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>🕒</span>
                <span>T2-T7: 7:00 - 21:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            <p>© 2025 GrowTalents. Tất cả quyền được bảo lưu.</p>
          </div>
          <div className={styles.policies}>
            <a href="#" className={styles.policyLink}>Chính sách bảo mật</a>
            <span className={styles.separator}>|</span>
            <a href="#" className={styles.policyLink}>Điều khoản sử dụng</a>
            <span className={styles.separator}>|</span>
            <a href="#" className={styles.policyLink}>Quy định thanh toán</a>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.floatingElement} style={{ top: '20%', left: '10%' }}>📚</div>
        <div className={styles.floatingElement} style={{ top: '60%', right: '15%' }}>🎓</div>
        <div className={styles.floatingElement} style={{ bottom: '20%', left: '20%' }}>✨</div>
        <div className={styles.floatingElement} style={{ top: '40%', right: '30%' }}>🌟</div>
      </div>
    </footer>
  );
};

export default Footer;
