import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import HomePage from "./pages/HomePage";
import CourseDetailPage from "./pages/CourseDetailPage";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./components/admin/AdminLayout";
import Students from "./components/admin/Students";
import Courses from "./components/admin/Courses";
import Dashboard from "./components/admin/Dashboard";
import Schedule from "./components/admin/Schedule";
import TeacherList from "./components/admin/TeacherList";
import TuitionRecord from "./components/admin/TuitionRecord";
import SummaryReport from "./components/admin/SummaryReport";
// import HeroSection from "./components/HeroSection";
// import AboutUsSection from "./components/AboutUsSection";
// import CourseSection from "./components/CourseSection";
// import AchievementSection from "./components/AchievementSection";
// import ContactSection from "./components/ContactSection";
function App() {
  return (
    <ConfigProvider>
      <Router>
        <Routes>
          {/* Route chuyển hướng từ "/" đến "/home" */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Routes không liên quan đến admin */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/course-detail" element={<CourseDetailPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Route cha cho admin */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* Route con của admin */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="teachers" element={<TeacherList />} />
            <Route path="students" element={<Students />} />
            <Route path="courses" element={<Courses />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="tuition" element={<TuitionRecord />} />
            <Route path="reports" element={<SummaryReport />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
