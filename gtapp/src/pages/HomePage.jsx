import HeroSection from "../components/HeroSection";
import AboutUsSection from "../components/AboutUsSection";
import CoursesSection from "../components/CoursesSection";
import AchievementSection from "../components/AchievementSection";
import ContactSection from "../components/ContactSection";
import Header from "../components/Header";

export default function HomePage() {
  return (
    <>
      <Header />

      <div id="home">
        <HeroSection />
      </div>
      <div id="about-us">
        <AboutUsSection />
      </div>
      <div id="courses">
        <CoursesSection />
      </div>
      <div id="achievement">
        <AchievementSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </>
  );
}
