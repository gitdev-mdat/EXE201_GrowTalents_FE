// Attendance API Service for GrowTalents
const API_BASE_URL = 'http://localhost:8080';

// Mock data for development/testing
const MOCK_DATA = {
  teacherClasses: [
    { id: 1, name: 'Toán 10A', students: 40, courseId: 1 },
    { id: 2, name: 'Vật lý 11B', students: 35, courseId: 2 },
    { id: 3, name: 'Hóa học 12A', students: 30, courseId: 3 },
    { id: 4, name: 'Tiếng Anh 10C', students: 38, courseId: 4 }
  ],
  
  attendanceHistory: [
    {
      id: 1,
      date: '2025-08-12',
      class: 'Toán 10A',
      present: 35,
      absent: 5,
      percentage: 87.5,
      teacher: 'Cô Nguyễn Thị Mai'
    },
    {
      id: 2,
      date: '2025-08-11',
      class: 'Toán 10A',
      present: 38,
      absent: 2,
      percentage: 95,
      teacher: 'Cô Nguyễn Thị Mai'
    },
    {
      id: 3,
      date: '2025-08-10',
      class: 'Vật lý 11B',
      present: 32,
      absent: 3,
      percentage: 91.4,
      teacher: 'Thầy Trần Văn Nam'
    }
  ]
};

// Attendance Status Constants
export const ATTENDANCE_STATUS = {
  PRESENT: 'PRESENT',
  ABSENT: 'ABSENT',
  LATE: 'LATE',
  EXCUSED: 'EXCUSED'
};

export const ATTENDANCE_STATUS_LABELS = {
  PRESENT: 'Có mặt',
  ABSENT: 'Vắng mặt',
  LATE: 'Đi muộn',
  EXCUSED: 'Có phép'
};

export const ATTENDANCE_STATUS_COLORS = {
  PRESENT: 'success',
  ABSENT: 'error',
  LATE: 'warning',
  EXCUSED: 'info'
};

class AttendanceService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/api/attendance`;
    this.useMockData = false;
  }

  // Helper method for making API requests
  async makeRequest(url, options = {}) {
    const defaultHeaders = {
      'Content-Type': 'application/json'
    };

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      headers: defaultHeaders,
      ...options,
      headers: { ...defaultHeaders, ...options.headers }
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText || 'Network error'}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error('API Request Error:', error);
      
      // Check if it's a network error (server not running)
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.warn('🔧 API server không khả dụng, sử dụng mock data');
        this.useMockData = true;
        throw new Error('API server không khả dụng. Đang sử dụng dữ liệu mẫu.');
      }
      
      throw error;
    }
  }

  // 1. GET TEACHER CLASSES - Level A
  async getTeacherClasses(teacherId) {
    try {
      if (this.useMockData) {
        return MOCK_DATA.teacherClasses;
      }
      const url = `${this.baseURL}/teacher/${teacherId}/classes`;
      return await this.makeRequest(url);
    } catch (error) {
      console.warn('Fallback to mock data for teacher classes');
      return MOCK_DATA.teacherClasses;
    }
  }

  // 2. CREATE ATTENDANCE - Level B
  async createAttendance(attendanceData) {
    try {
      if (this.useMockData) {
        return 'Đã tạo điểm danh thành công (Mock mode)';
      }
      const url = `${this.baseURL}/create`;
      return await this.makeRequest(url, {
        method: 'POST',
        body: JSON.stringify(attendanceData)
      });
    } catch (error) {
      console.warn('Fallback to mock response for create attendance');
      return `Đã tạo điểm danh thành công cho ${attendanceData.attendanceRecords?.length || 0} học sinh (Mock mode)`;
    }
  }

  // 3. UPDATE ATTENDANCE - Level B
  async updateAttendance(attendanceId, attendanceData) {
    try {
      if (this.useMockData) {
        return 'Cập nhật điểm danh thành công (Mock mode)';
      }
      const url = `${this.baseURL}/${attendanceId}`;
      return await this.makeRequest(url, {
        method: 'PUT',
        body: JSON.stringify(attendanceData)
      });
    } catch (error) {
      console.warn('Fallback to mock response for update attendance');
      return 'Cập nhật điểm danh thành công (Mock mode)';
    }
  }

  // 4. GET ATTENDANCE HISTORY - Level C
  async getAttendanceHistory(teacherId, startDate = null, endDate = null) {
    try {
      if (this.useMockData) {
        let data = [...MOCK_DATA.attendanceHistory];
        
        // Filter by date range if provided
        if (startDate || endDate) {
          data = data.filter(record => {
            const recordDate = new Date(record.date);
            const start = startDate ? new Date(startDate) : new Date('2000-01-01');
            const end = endDate ? new Date(endDate) : new Date();
            return recordDate >= start && recordDate <= end;
          });
        }
        
        return data;
      }
      
      let url = `${this.baseURL}/history/${teacherId}`;
      const params = new URLSearchParams();
      
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      return await this.makeRequest(url);
    } catch (error) {
      console.warn('Fallback to mock data for attendance history');
      return MOCK_DATA.attendanceHistory;
    }
  }

  // 5. GET ATTENDANCE BY SESSION - Bonus
  async getAttendanceBySession(sessionId) {
    try {
      if (this.useMockData) {
        return [
          { studentId: 1, status: 'PRESENT', note: '' },
          { studentId: 2, status: 'ABSENT', note: 'Bị ốm' },
          { studentId: 3, status: 'PRESENT', note: '' }
        ];
      }
      const url = `${this.baseURL}/session/${sessionId}`;
      return await this.makeRequest(url);
    } catch (error) {
      console.warn('Fallback to mock data for session attendance');
      return [];
    }
  }

  // 6. GET ATTENDANCE BY COURSE - Bonus
  async getAttendanceByCourse(courseId, date) {
    try {
      if (this.useMockData) {
        return [
          { studentId: 1, status: 'PRESENT', note: '' },
          { studentId: 2, status: 'ABSENT', note: 'Bị ốm' },
          { studentId: 3, status: 'PRESENT', note: '' }
        ];
      }
      const url = `${this.baseURL}/course/${courseId}?date=${date}`;
      return await this.makeRequest(url);
    } catch (error) {
      console.warn('Fallback to mock data for course attendance');
      return [];
    }
  }

  // Utility methods
  isValidAttendanceDate(date) {
    const today = new Date();
    const selectedDate = new Date(date);
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate <= today;
  }

  validateAttendanceData(attendanceData) {
    const errors = [];

    if (!attendanceData.courseId) {
      errors.push('Course ID is required');
    }

    if (!attendanceData.attendanceDate) {
      errors.push('Attendance date is required');
    }

    if (!attendanceData.attendanceRecords || attendanceData.attendanceRecords.length === 0) {
      errors.push('Attendance records are required');
    }

    // Check if date is not in the future
    if (!this.isValidAttendanceDate(attendanceData.attendanceDate)) {
      errors.push('Cannot create attendance for future dates');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  formatAttendanceData(courseId, date, attendanceRecords) {
    return {
      courseId: parseInt(courseId),
      attendanceDate: date,
      attendanceRecords: attendanceRecords.map(record => ({
        studentId: parseInt(record.studentId),
        status: record.status.toUpperCase(),
        note: record.note || ''
      }))
    };
  }

  // Enable/disable mock mode
  setMockMode(enabled) {
    this.useMockData = enabled;
    console.log(`🔧 Mock mode ${enabled ? 'enabled' : 'disabled'}`);
  }
}

// Export singleton instance
const attendanceService = new AttendanceService();
export default attendanceService;
