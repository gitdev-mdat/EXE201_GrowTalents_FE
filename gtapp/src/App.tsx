import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import {
  CircularProgress,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import ErrorBoundary from "./components/ErrorBoundary";
import HomePage from "./pages/HomePage";
import CourseDetailPage from "./pages/CourseDetailPage";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./components/admin/AdminLayout";
import Students from "./components/admin/Students";
import Courses from "./components/admin/Courses";
import Dashboard from "./components/admin/Dashboard";
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
import TestDetail from "./components/student/TestDetail";
import StudentSettings from "./components/student/Settings";

// Teacher components
import TeacherLayout from "./components/teacher/TeacherLayout";
import TeacherDashboard from "./components/teacher/Dashboard";
import TeacherAttendance from "./components/teacher/Attendance";
import TeacherScores from "./components/teacher/Scores";
import TeacherDocuments from "./components/teacher/Documents";
import TeacherSchedule from "./components/teacher/Schedule";
import TeacherSettings from "./components/teacher/Settings";
import QuizCreator from "./components/teacher/QuizCreator";
import Semester from "./components/admin/Semester";

// import HeroSection from "./components/HeroSection";
// import AboutUsSection from "./components/AboutUsSection";
// import CourseSection from "./components/CourseSection";
// import AchievementSection from "./components/AchievementSection";
// import ContactSection from "./components/ContactSection";

// Loading component for Suspense
const LoadingSpinner = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    flexDirection="column"
  >
    <CircularProgress size={60} />
    <Box mt={2} fontSize="1.2rem" color="text.secondary">
      Đang tải...
    </Box>
  </Box>
);

// Material-UI theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ConfigProvider>
          <Router>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Route chuyển hướng từ "/" đến "/home" */}
                <Route path="/" element={<Navigate to="/home" replace />} />

                {/* Routes không liên quan đến admin */}
                <Route path="/home" element={<HomePage />} />
                <Route
                  path="/home/course-detail"
                  element={<CourseDetailPage />}
                />
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
                  <Route path="semester" element={<Semester />} />
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
                  <Route
                    path="courses/:courseId/learn"
                    element={<CourseLearning />}
                  />
                  <Route path="schedule" element={<StudySchedule />} />
                  <Route path="documents" element={<Documents />} />
                  <Route path="test-scores" element={<TestScores />} />
                  <Route path="test-detail/:testId" element={<TestDetail />} />
                  <Route path="settings" element={<StudentSettings />} />
                </Route>

                {/* Route cha cho teacher */}
                <Route path="/teacher" element={<TeacherLayout />}>
                  {/* Redirect từ /teacher đến /teacher/dashboard */}
                  <Route index element={<Navigate to="dashboard" replace />} />
                  {/* Route con của teacher */}
                  <Route path="dashboard" element={<TeacherDashboard />} />
                  <Route path="attendance" element={<TeacherAttendance />} />
                  <Route path="scores" element={<TeacherScores />} />
                  <Route path="quiz-creator" element={<QuizCreator />} />
                  <Route path="documents" element={<TeacherDocuments />} />
                  <Route path="schedule" element={<TeacherSchedule />} />
                  <Route path="settings" element={<TeacherSettings />} />
                </Route>
              </Routes>
            </Suspense>
          </Router>
        </ConfigProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
