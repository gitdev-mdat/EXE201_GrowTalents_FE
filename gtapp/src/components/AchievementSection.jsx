import React, { useEffect, useState, useRef } from "react";
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
    id: 1,
    icon: <FaChartLine />,
    number: "95%",
    description: "Học sinh đạt điểm giỏi môn Toán",
    category: "Học tập",
    imageUrl: achievementImage
  },
  {
    id: 2,
    icon: <FaAward />,
    number: "120+",
    description: "Giải thưởng học sinh cấp thành phố",
    category: "Giải thưởng", 
    imageUrl: achievementImage
  },
  {
    id: 3,
    icon: <FaUserGraduate />,
    number: "1000+",
    description: "Học sinh đăng ký mỗi năm",
    category: "Tuyển sinh",
    imageUrl: achievementImage
  },
  {
    id: 4,
    icon: <FaCalendarAlt />,
    number: "10 năm",
    description: "Kinh nghiệm đào tạo tiểu học",
    category: "Kinh nghiệm",
    imageUrl: achievementImage
  },
];

const AchievementSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Auto-rotate slides
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, 3000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, activeSlide]);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + achievements.length) % achievements.length);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % achievements.length);
  };

  const getCardPosition = (index) => {
    const diff = index - activeSlide;
    const totalCards = achievements.length;
    
    // Normalize diff to be between -totalCards/2 and totalCards/2
    let normalizedDiff = diff;
    if (normalizedDiff > totalCards / 2) normalizedDiff -= totalCards;
    if (normalizedDiff < -totalCards / 2) normalizedDiff += totalCards;
    
    // Active card (center)
    if (normalizedDiff === 0) {
      return { 
        transform: "translateX(0%) scale(1)", 
        zIndex: 30, 
        opacity: 1 
      };
    }
    
    // Left and right cards (visible)
    if (Math.abs(normalizedDiff) === 1) {
      const direction = normalizedDiff > 0 ? 1 : -1;
      return { 
        transform: `translateX(${direction * 110}%) scale(0.85)`, 
        zIndex: 20, 
        opacity: 0.7 
      };
    }
    
    // Hidden cards
    return { 
      transform: `translateX(${normalizedDiff > 0 ? 200 : -200}%) scale(0.7)`, 
      zIndex: 10, 
      opacity: 0 
    };
  };

  return (
    <section className={styles.achievementSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>🏆 Thành Tích Nổi Bật</h2>
        
        <div 
          className={styles.sliderContainer}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={handlePrev}
            aria-label="Previous achievement"
          >
            ←
          </button>

          <div className={styles.sliderWrapper}>
            {achievements.map((achievement, index) => {
              const position = getCardPosition(index);
              const isActive = index === activeSlide;

              // Chỉ render card nếu nó visible
              if (position.opacity === 0) return null;

              return (
                <div
                  key={achievement.id}
                  className={`${styles.achievementCard} ${isActive ? styles.activeCard : ''}`}
                  style={{
                    transform: position.transform,
                    zIndex: position.zIndex,
                    opacity: position.opacity,
                  }}
                  onClick={() => setActiveSlide(index)}
                >
                  <div className={styles.cardContent}>
                    {/* Category Badge */}
                    <div className={styles.categoryBadge}>
                      {achievement.category}
                    </div>

                    {/* Icon Section */}
                    <div className={styles.iconContainer}>
                      <div className={styles.icon}>
                        {achievement.icon}
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className={styles.achievementInfo}>
                      <div className={styles.number}>{achievement.number}</div>
                      <p className={styles.description}>{achievement.description}</p>
                    </div>

                    {/* Achievement Image */}
                    <div className={styles.imageContainer}>
                      <img
                        src={achievement.imageUrl}
                        alt={achievement.description}
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
            aria-label="Next achievement"
          >
            →
          </button>
        </div>

        <div className={styles.pagination}>
          {achievements.map((_, index) => (
            <button
              key={index}
              className={`${styles.paginationDot} ${activeSlide === index ? styles.activeDot : ''}`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementSection;