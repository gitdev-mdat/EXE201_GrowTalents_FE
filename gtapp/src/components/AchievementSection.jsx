import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/AchievementSection.module.css";
import {
  FaAward,
  FaUserGraduate,
  FaStar,
  FaSchool,
  FaChartLine,
  FaCalendarAlt,
  FaTrophy,
  FaMedal,
  FaCertificate,
  FaLightbulb,
  FaRocket,
  FaHeart,
} from "react-icons/fa";
import achievementImage from "../assets/achievement1.jpg";
import graduateImage from "../assets/graduate.jpg";
import testImage from "../assets/test.jpg";

const achievements = [
  {
    id: 1,
    icon: <FaChartLine />,
    number: "95%",
    description: "Học sinh đạt điểm giỏi môn Toán",
    category: "Học tập",
    imageUrl: achievementImage,
    color: "#4CAF50",
    detail: "Với phương pháp giảng dạy sáng tạo và hiệu quả",
    stats: "+5% so với năm trước"
  },
  {
    id: 2,
    icon: <FaTrophy />,
    number: "120+",
    description: "Giải thưởng học sinh cấp thành phố",
    category: "Giải thưởng", 
    imageUrl: testImage,
    color: "#FF9800",
    detail: "Trong các cuộc thi học sinh giỏi và Olympic",
    stats: "Top 3 trung tâm hàng đầu"
  },
  {
    id: 3,
    icon: <FaUserGraduate />,
    number: "1000+",
    description: "Học sinh đăng ký mỗi năm",
    category: "Tuyển sinh",
    imageUrl: graduateImage,
    color: "#2196F3",
    detail: "Niềm tin từ phụ huynh và học sinh",
    stats: "98% học sinh hài lòng"
  },
  {
    id: 4,
    icon: <FaCalendarAlt />,
    number: "10 năm",
    description: "Kinh nghiệm đào tạo tiểu học",
    category: "Kinh nghiệm",
    imageUrl: achievementImage,
    color: "#9C27B0",
    detail: "Xây dựng nền tảng vững chắc cho tương lai",
    stats: "5000+ học sinh đã tốt nghiệp"
  },
  {
    id: 5,
    icon: <FaRocket />,
    number: "85%",
    description: "Học sinh vào trường THCS chuyên",
    category: "Thành tích",
    imageUrl: graduateImage,
    color: "#E91E63",
    detail: "Tỷ lệ đỗ vào các trường top đầu",
    stats: "Cao nhất trong khu vực"
  },
  {
    id: 6,
    icon: <FaHeart />,
    number: "50+",
    description: "Giáo viên kinh nghiệm",
    category: "Đội ngũ",
    imageUrl: testImage,
    color: "#F44336",
    detail: "Đội ngũ giáo viên tận tâm và chuyên nghiệp",
    stats: "100% có bằng cử nhân trở lên"
  },
];

const AchievementSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({});
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' or 'grid'
  const intervalRef = useRef(null);
  const sectionRef = useRef(null);

  // Intersection Observer for animation triggers
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startNumberAnimation();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate numbers when visible
  const startNumberAnimation = () => {
    achievements.forEach((achievement, index) => {
      setTimeout(() => {
        animateNumber(achievement.id, achievement.number);
      }, index * 200);
    });
  };

  const animateNumber = (id, targetNumber) => {
    const numericValue = parseInt(targetNumber.replace(/\D/g, ''));
    const suffix = targetNumber.replace(/[\d]/g, '');
    let current = 0;
    const increment = numericValue / 50;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        current = numericValue;
        clearInterval(timer);
      }
      setAnimatedNumbers(prev => ({
        ...prev,
        [id]: Math.floor(current) + suffix
      }));
    }, 30);
  };

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
        zIndex: 50, 
        opacity: 1 
      };
    }
    
    // Left and right cards (visible but smaller)
    if (Math.abs(normalizedDiff) === 1) {
      const direction = normalizedDiff > 0 ? 1 : -1;
      return { 
        transform: `translateX(${direction * 130}%) scale(0.75)`, 
        zIndex: 30, 
        opacity: 0.7 
      };
    }
    
    // Far left and far right cards (barely visible)
    if (Math.abs(normalizedDiff) === 2) {
      const direction = normalizedDiff > 0 ? 1 : -1;
      return { 
        transform: `translateX(${direction * 220}%) scale(0.6)`, 
        zIndex: 10, 
        opacity: 0.4 
      };
    }
    
    // Hidden cards
    return { 
      transform: `translateX(${normalizedDiff > 0 ? 350 : -350}%) scale(0.5)`, 
      zIndex: 1, 
      opacity: 0 
    };
  };

  return (
    <section ref={sectionRef} className={styles.achievementSection}>
      <div className={styles.container}>
        {/* Enhanced Header */}
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.titleIcon}>🏆</span>
            Thành Tích Nổi Bật
            <span className={styles.titleIcon}>✨</span>
          </h2>
          <p className={styles.subtitle}>
            Những con số ấn tượng chứng minh chất lượng giáo dục hàng đầu
          </p>
          
          {/* View Mode Toggle */}
          <div className={styles.viewToggle}>
            <button 
              className={`${styles.toggleBtn} ${viewMode === 'carousel' ? styles.active : ''}`}
              onClick={() => setViewMode('carousel')}
            >
              Carousel
            </button>
            <button 
              className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.active : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid View
            </button>
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div className={styles.statsOverview}>
          <div className={styles.statCard}>
            <FaStar className={styles.statIcon} />
            <span className={styles.statNumber}>4.9/5</span>
            <span className={styles.statLabel}>Đánh giá</span>
          </div>
          <div className={styles.statCard}>
            <FaCertificate className={styles.statIcon} />
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Chứng nhận</span>
          </div>
          <div className={styles.statCard}>
            <FaLightbulb className={styles.statIcon} />
            <span className={styles.statNumber}>15+</span>
            <span className={styles.statLabel}>Môn học</span>
          </div>
        </div>

        {/* Main Content - Conditional Rendering */}
        {viewMode === 'carousel' ? (
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

                // Only render visible cards (opacity > 0)
                if (position.opacity <= 0) return null;

                return (
                  <div
                    key={achievement.id}
                    className={`${styles.achievementCard} ${isActive ? styles.activeCard : ''} ${isVisible ? styles.slideIn : ''}`}
                    style={{
                      transform: position.transform,
                      zIndex: position.zIndex,
                      opacity: position.opacity,
                      animationDelay: `${index * 0.1}s`
                    }}
                    onClick={() => setActiveSlide(index)}
                  >
                    <div className={styles.cardContent}>
                      {/* Enhanced Card Design */}
                      <div className={styles.cardHeader}>
                        <div 
                          className={styles.categoryBadge}
                          style={{ backgroundColor: achievement.color }}
                        >
                          {achievement.category}
                        </div>
                        <div className={styles.cardEffects}>
                          <div className={styles.sparkle}>✨</div>
                        </div>
                      </div>

                      <div className={styles.iconContainer}>
                        <div 
                          className={styles.icon}
                          style={{ color: achievement.color }}
                        >
                          {achievement.icon}
                        </div>
                        <div className={styles.iconBg} style={{ backgroundColor: `${achievement.color}20` }}></div>
                      </div>

                      <div className={styles.achievementInfo}>
                        <div 
                          className={styles.number}
                          style={{ color: achievement.color }}
                        >
                          {animatedNumbers[achievement.id] || achievement.number}
                        </div>
                        <p className={styles.description}>{achievement.description}</p>
                        <p className={styles.detail}>{achievement.detail}</p>
                        <div className={styles.stats}>{achievement.stats}</div>
                      </div>

                      <div className={styles.imageContainer}>
                        <img
                          src={achievement.imageUrl}
                          alt={achievement.description}
                          className={styles.image}
                        />
                        <div className={styles.imageOverlay}></div>
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
        ) : (
          // Grid View
          <div className={styles.gridContainer}>
            {achievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className={`${styles.gridCard} ${isVisible ? styles.fadeInUp : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.gridCardContent}>
                  <div 
                    className={styles.gridIcon}
                    style={{ color: achievement.color }}
                  >
                    {achievement.icon}
                  </div>
                  <div 
                    className={styles.gridNumber}
                    style={{ color: achievement.color }}
                  >
                    {animatedNumbers[achievement.id] || achievement.number}
                  </div>
                  <h4 className={styles.gridTitle}>{achievement.description}</h4>
                  <p className={styles.gridDetail}>{achievement.detail}</p>
                  <div className={styles.gridStats}>{achievement.stats}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination for Carousel */}
        {viewMode === 'carousel' && (
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
        )}

        {/* Testimonial Section */}
        <div className={styles.testimonialSection}>
          <div className={styles.testimonial}>
            <FaStar className={styles.testimonialIcon} />
            <p className={styles.testimonialText}>
              "GrowTalents đã giúp con tôi tiến bộ vượt bậc trong học tập. 
              Đội ngũ giáo viên tận tâm và phương pháp giảng dạy hiệu quả!"
            </p>
            <span className={styles.testimonialAuthor}>- Phụ huynh học sinh lớp 5A</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementSection;