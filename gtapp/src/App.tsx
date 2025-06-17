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
import Settings from "./components/admin/Settings";

// Student components
import StudentLayout from "./components/student/StudentLayout";
import StudentDashboard from "./components/student/Dashboard";
import CourseList from "./components/student/CourseList";
import CourseDetail from "./components/student/CourseDetail";
import CourseLearning from "./components/student/CourseLearning";
import StudySchedule from "./components/student/StudySchedule";
import Documents from "./components/student/Documents";
import TestScores from "./components/student/TestScores";
import StudentSettings from "./components/student/Settings";

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
            {/* Redirect từ /admin đến /admin/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />
            {/* Route con của admin */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="teachers" element={<TeacherList />} />
            <Route path="students" element={<Students />} />
            <Route path="courses" element={<Courses />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="tuition" element={<TuitionRecord />} />
            <Route path="reports" element={<SummaryReport />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Route cha cho student */}
          <Route path="/student" element={<StudentLayout />}>
            {/* Redirect từ /student đến /student/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />
            {/* Route con của student */}
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="courses" element={<CourseList />} />
            <Route path="courses/:courseId" element={<CourseDetail />} />
            <Route path="courses/:courseId/learn" element={<CourseLearning />} />
            <Route path="schedule" element={<StudySchedule />} />
            <Route path="documents" element={<Documents />} />
            <Route path="scores" element={<TestScores />} />
            <Route path="settings" element={<StudentSettings />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
