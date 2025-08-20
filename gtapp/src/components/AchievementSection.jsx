import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/AchievementSection.module.css";
import { FaChartLine, FaTrophy, FaUserGraduate } from "react-icons/fa";

import achievementImage from "../assets/achievement1.jpg";
import graduateImage from "../assets/graduate.jpg";
import testImage from "../../public/prize.jpg";

const achievements = [
  {
    id: 1,
    icon: <FaChartLine />,
    number: "95%",
    description: "Học sinh đạt điểm giỏi môn Toán",
    subtitle: "Top 1 thành phố trong 5 năm liên tục",
    category: "Học tập",
    imageUrl: achievementImage,
  },
  {
    id: 2,
    icon: <FaTrophy />,
    number: "120+",
    description: "Giải thưởng học sinh cấp thành phố",
    subtitle: "Được vinh danh bởi Bộ GD & ĐT",
    category: "Giải thưởng",
    imageUrl: testImage,
  },
  {
    id: 3,
    icon: <FaUserGraduate />,
    number: "1000+",
    description: "Học sinh đăng ký mỗi năm",
    subtitle: "20 năm xây dựng niềm tin phụ huynh",
    category: "Tuyển sinh",
    imageUrl: graduateImage,
  },
];

const AchievementSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({});
  const intervalRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startNumberAnimation();
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const startNumberAnimation = () => {
    achievements.forEach((a, i) => {
      setTimeout(() => animateNumber(a.id, a.number), i * 200);
    });
  };

  const animateNumber = (id, targetNumber) => {
    const numericVal = parseInt(targetNumber.replace(/\D/g, ""));
    const suffix = targetNumber.replace(/[\d]/g, "");
    let current = 0;
    const inc = numericVal / 50;
    const t = setInterval(() => {
      current += inc;
      if (current >= numericVal) {
        current = numericVal;
        clearInterval(t);
      }
      setAnimatedNumbers((prev) => ({
        ...prev,
        [id]: Math.floor(current) + suffix,
      }));
    }, 30);
  };

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => handleNext(), 3500);
    }
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [isPaused, activeSlide]);

  const handlePrev = () => {
    setActiveSlide((p) => (p - 1 + achievements.length) % achievements.length);
  };
  const handleNext = () => {
    setActiveSlide((p) => (p + 1) % achievements.length);
  };

  const getCardPosition = (i) => {
    const diff = i - activeSlide;
    let d = diff;
    const total = achievements.length;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    if (d === 0)
      return { transform: "translateX(0%) scale(1)", zIndex: 20, opacity: 1 };
    if (Math.abs(d) === 1) {
      const dir = d > 0 ? 1 : -1;
      return {
        transform: `translateX(${dir * 110}%) scale(0.8)`,
        zIndex: 10,
        opacity: 0.6,
      };
    }
    return { opacity: 0, zIndex: 0 };
  };

  return (
    <section ref={sectionRef} className={styles.achievementSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Thành tựu nổi bật</h2>
        <p className={styles.sectionSubtitle}>
          Hành trình 20+ năm đồng hành và kiến tạo thành công cho thế hệ học
          sinh.
        </p>

        <div
          className={styles.sliderContainer}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={handlePrev}
          >
            ←
          </button>

          <div className={styles.sliderWrapper}>
            {achievements.map((ach, index) => {
              const pos = getCardPosition(index);
              if (pos.opacity === 0) return null;
              return (
                <div
                  key={ach.id}
                  className={`${styles.achievementCard} ${
                    index === activeSlide ? styles.activeCard : ""
                  }`}
                  style={{ ...pos }}
                  onClick={() => setActiveSlide(index)}
                >
                  <div className={styles.cardGlow}></div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <div className={styles.categoryBadge}>{ach.category}</div>
                    </div>

                    <div className={styles.iconContainer}>
                      <div className={styles.icon}>{ach.icon}</div>
                    </div>

                    <div className={styles.infoBlock}>
                      <div className={styles.number}>
                        {animatedNumbers[ach.id] || ach.number}
                      </div>
                      <p className={styles.description}>{ach.description}</p>
                      <p className={styles.subtitleSmall}>{ach.subtitle}</p>
                    </div>

                    <div className={styles.imageContainer}>
                      <img
                        src={ach.imageUrl}
                        alt={ach.description}
                        className={styles.image}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={handleNext}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default AchievementSection;
