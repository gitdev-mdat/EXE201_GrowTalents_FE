import api from "./client";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

const attendance = {
  // Get classes assigned to a teacher
  getTeacherClasses: (teacherId) => 
    api.get(API_ENDPOINTS.ATTENDANCE.TEACHER_CLASSES(teacherId)),
  
  // Create new attendance record
  createAttendance: (data) => 
    api.post(API_ENDPOINTS.ATTENDANCE.CREATE, data),
  
  // Update existing attendance record
  updateAttendance: (id, data) => 
    api.put(API_ENDPOINTS.ATTENDANCE.UPDATE(id), data),
  
  // Get attendance history for a teacher
  getAttendanceHistory: (teacherId, params) => 
    api.get(API_ENDPOINTS.ATTENDANCE.HISTORY(teacherId), { params }),
  
  // Get attendance by session ID
  getAttendanceBySession: (sessionId) => 
    api.get(API_ENDPOINTS.ATTENDANCE.BY_SESSION(sessionId)),
  
  // Get attendance by course and date
  getAttendanceByCourse: (courseId, params) => 
    api.get(API_ENDPOINTS.ATTENDANCE.BY_COURSE(courseId), { params }),
  
  // Get students by class ID
  getStudentsByClass: (classId) => 
    api.get(API_ENDPOINTS.CLASSES.GET_STUDENTS(classId)),
  
  // Delete attendance record
  deleteAttendance: (id) => 
    api.delete(API_ENDPOINTS.ATTENDANCE.DELETE(id)),
  
  // Get attendance statistics
  getAttendanceStats: (teacherId, params) => 
    api.get(API_ENDPOINTS.ATTENDANCE.STATS(teacherId), { params }),
  
  // Generate attendance report
  generateAttendanceReport: (params) => 
    api.get(API_ENDPOINTS.ATTENDANCE.REPORT, { params })
};

export default attendance;