import React from "react";
import styles from "../styles/AboutUsSection.module.css";
import video from "../assets/growtalents.mp4";

const AboutUsSection = () => {
  return (
    <section id="AboutUs" className={styles.aboutUsSection}>
      <div className={styles.container}>
        {/* Video Container */}
        <div className={styles.videoContainer}>
          <h3 className={styles.videoTitle}>
            Giới Thiệu Trung Tâm Grow Talents
          </h3>
          <div className={styles.videoWrapper}>
            <video className={styles.videoPlayer} controls>
              <source src={video} type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ video.
            </video>
          </div>
        </div>

        {/* Thành tích */}
        <div className={styles.achievementContainer}>
          <div className={styles.achievementList}>
            <div className={styles.achievementItem}>
              <div className={styles.achievementHeader}>
                <div className={styles.achievementIcon}>📚</div>
                <h4 className={styles.achievementTitle}>
                  10+ Năm Kinh Nghiệm Giảng Dạy Trường Chuyên
                </h4>
              </div>
              <p className={styles.achievementText}>
                Đội ngũ giáo viên của chúng tôi luôn mang đến những phương pháp
                giảng dạy hiệu quả, tận tâm, giúp học sinh phát huy tối đa tiềm
                năng học tập.
              </p>
            </div>
            <div className={styles.achievementItem}>
              <div className={styles.achievementHeader}>
                <div className={styles.achievementIcon}>🎓</div>
                <h4 className={styles.achievementTitle}>
                  99% Học Sinh Cải Thiện Điểm Số
                </h4>
              </div>
              <p className={styles.achievementText}>
                Chúng tôi đã có nhiều học viên đạt từ 7 đến 10 điểm trong các kỳ
                thi môn Toán, Lý, Hóa, và Tiếng Anh chỉ trong vòng 3 tháng học.
              </p>
            </div>
            <div className={styles.achievementItem}>
              <div className={styles.achievementHeader}>
                <div className={styles.achievementIcon}>🌱</div>
                <h4 className={styles.achievementTitle}>
                  Vào Được Các Trường Mơ Ước
                </h4>
              </div>
              <p className={styles.achievementText}>
                Với phương pháp giảng dạy toàn diện, chúng tôi đã giúp nhiều học
                sinh vào được các trường THCS, THPT danh tiếng, như Trường THPT
                Chuyên Nguyễn Chí Thanh (Đăk Nông) và THCS-THPT Nguyễn Khuyến
                (Tp.HCM), khẳng định sự thành công của các em trong hành trình
                học tập.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
