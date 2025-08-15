import React, { useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
// import styles from "../../styles/StudentStudySchedule.module.css";

const { RangePicker } = DatePicker;

const StudySchedule = () => {
  const [dateRange, setDateRange] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);

  const scheduleData = [
    {
      id: 1,
      course: "Khoá học toán cơ bản 6",
      teacher: "Cô Nguyễn Thị Anh",
      time: "15:00-16:30",
      day: "Thứ 3",
      date: "12/08/2025",
      room: "Phòng 101",
      status: "Sắp diễn ra"
    },
    {
      id: 2,
      course: "Khoá học toán cơ bản 7",
      teacher: "Thầy Trần Văn Bình",
      time: "16:30-18:00",
      day: "Thứ 4",
      date: "13/08/2025",
      room: "Phòng 102",
      status: "Sắp diễn ra"
    },
    {
      id: 3,
      course: "Khoá học tiếng Anh cơ bản",
      teacher: "Cô Sarah Johnson",
      time: "14:00-15:30",
      day: "Thứ 5",
      date: "14/08/2025",
      room: "Phòng 103",
      status: "Sắp diễn ra"
    },
    {
      id: 4,
      course: "Khoá học Vật lý cơ bản",
      teacher: "Thầy Lê Văn Cường",
      time: "09:00-10:30",
      day: "Thứ 6",
      date: "15/08/2025",
      room: "Phòng 104",
      status: "Chưa bắt đầu"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Sắp diễn ra":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-600",
          dot: "bg-blue-500"
        };
      case "Đang diễn ra":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-600",
          dot: "bg-green-500"
        };
      case "Đã hoàn thành":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-600",
          dot: "bg-green-500"
        };
      case "Chưa bắt đầu":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          text: "text-yellow-600",
          dot: "bg-yellow-500"
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          text: "text-gray-600",
          dot: "bg-gray-500"
        };
    }
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  // Organize sessions by day and time for timetable display
  const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
  const times = ["09:00-10:30", "14:00-15:30", "15:00-16:30", "16:30-18:00"];

  const timetableMap = {};
  days.forEach(day => {
    timetableMap[day] = {};
    times.forEach(time => {
      timetableMap[day][time] = null;
    });
  });

  scheduleData.forEach(session => {
    if (timetableMap[session.day] && timetableMap[session.day][session.time] === null) {
      timetableMap[session.day][session.time] = session;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lịch học của tôi</h1>
          <p className="text-gray-600">Quản lý và theo dõi lịch học của bạn</p>
        </div>

        {/* Date Range Picker */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Chọn khoảng thời gian</h2>
          <RangePicker
            onChange={handleDateChange}
            size="large"
            className="w-full max-w-md"
            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
          />
        </div>

        {/* Weekly Timetable */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Thời khóa biểu tuần</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Thời gian
                  </th>
                  {days.map(day => (
                    <th key={day} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 last:border-r-0">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {times.map(time => (
                  <tr key={time} className="hover:bg-gray-50">
                    <td className="px-4 py-6 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200 bg-gray-50">
                      {time}
                    </td>
                    {days.map(day => {
                      const session = timetableMap[day][time];
                      const colors = session ? getStatusColor(session.status) : null;
                      
                      return (
                        <td key={`${day}-${time}`} className="px-2 py-3 border-r border-gray-200 last:border-r-0 align-top">
                          {session ? (
                            <div 
                              className={`${colors.bg} ${colors.border} border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow duration-200`}
                              onClick={() => setSelectedSession(session)}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-gray-900 text-sm leading-tight">
                                  {session.course}
                                </h4>
                                <div className={`w-2 h-2 rounded-full ${colors.dot} flex-shrink-0 ml-2 mt-1`}></div>
                              </div>
                              <p className="text-xs text-gray-600 mb-1">{session.teacher}</p>
                              <p className="text-xs text-gray-500 mb-2">{session.room}</p>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                                {session.status}
                              </span>
                            </div>
                          ) : (
                            <div className="h-20 flex items-center justify-center text-gray-400 text-sm">
                              —
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Course List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Danh sách khóa học</h2>
          </div>
          
          <div className="p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {scheduleData.map(session => {
                const colors = getStatusColor(session.status);
                return (
                  <div 
                    key={session.id}
                    className={`${colors.bg} ${colors.border} border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow duration-200`}
                    onClick={() => setSelectedSession(session)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                        {session.course}
                      </h3>
                      <div className={`w-3 h-3 rounded-full ${colors.dot} flex-shrink-0 ml-2`}></div>
                    </div>
                    
                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="flex items-center">
                        <span className="font-medium">Giáo viên:</span>
                        <span className="ml-1">{session.teacher}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Thời gian:</span>
                        <span className="ml-1">{session.day}, {session.time}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Phòng học:</span>
                        <span className="ml-1">{session.room}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Ngày:</span>
                        <span className="ml-1">{session.date}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                        {session.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Session Detail Modal */}
        {selectedSession && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedSession.course}
                </h3>
                <button
                  onClick={() => setSelectedSession(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Giáo viên:</span>
                  <span className="ml-2 text-gray-900">{selectedSession.teacher}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Thời gian:</span>
                  <span className="ml-2 text-gray-900">{selectedSession.day}, {selectedSession.time}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Phòng học:</span>
                  <span className="ml-2 text-gray-900">{selectedSession.room}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Ngày:</span>
                  <span className="ml-2 text-gray-900">{selectedSession.date}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Trạng thái:</span>
                  <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedSession.status).bg} ${getStatusColor(selectedSession.status).text}`}>
                    {selectedSession.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudySchedule;
