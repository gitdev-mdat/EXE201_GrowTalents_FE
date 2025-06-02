import styles from "../styles/AchievementSection.module.css";
import {
  FaAward,
  FaUserGraduate,
  FaStar,
  FaSchool,
  FaChartLine,
  FaCalendarAlt,
} from "react-icons/fa";
import achievementImage from "../assets/achievement1.jpg"; // Hình ảnh minh họa

const achievements = [
  {
    icon: <FaChartLine />,
    number: "95%",
    description: "Học sinh đạt điểm giỏi môn Toán",
    imageUrl: achievementImage,
  },
  {
    icon: <FaAward />,
    number: "120+",
    description: "Giải thưởng học sinh cấp thành phố",
    imageUrl: achievementImage,
  },
  {
    icon: <FaUserGraduate />,
    number: "1000+",
    description: "Học sinh đăng ký mỗi năm",
    imageUrl: achievementImage,
  },
  {
    icon: <FaCalendarAlt />,
    number: "10 năm",
    description: "Kinh nghiệm đào tạo tiểu học",
    imageUrl: achievementImage,
  },
];

const AchievementSection = () => {
  return (
    <section className={styles.achievementSection}>
      <h2 className={styles.sectionTitle}>Thành Tích Nổi Bật</h2>
      <div className={styles.achievementGrid}>
        {achievements.map((item, index) => (
          <div className={styles.achievementCard} key={index}>
            <div className={styles.icon}>{item.icon}</div>
            <div className={styles.number}>{item.number}</div>
            <p className={styles.description}>{item.description}</p>
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt="achievement"
                className={styles.image}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AchievementSection;
