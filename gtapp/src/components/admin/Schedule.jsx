import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "../../styles/Schedule.module.css";

const Schedule = () => {
  const events = [
    {
      title: "Toán cơ bản 6",
      start: new Date(2024, 11, 20, 10, 0),
      end: new Date(2024, 11, 20, 12, 30),
      status: "Đã-dạy",
    },
    {
      title: "Sinh học nâng cao 8",
      start: new Date(2024, 11, 20, 14, 30),
      end: new Date(2024, 11, 20, 16, 0),
      status: "Chưa-dạy",
    },
  ];

  const [selectedEvent, setSelectedEvent] = useState(null); // Sự kiện được chọn
  const [isModalOpen, setIsModalOpen] = useState(false); // Hiển thị modal
  const [isClassAccepted, setIsClassAccepted] = useState(false); // Trạng thái "Nhận lớp"

  const handleEventClick = (info) => {
    const event = info.event;
    setSelectedEvent(event);
    setIsClassAccepted(false); // Reset trạng thái "Nhận lớp"
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleAcceptClass = () => {
    setIsClassAccepted(true);
  };

  const handleAttendance = () => {
    alert("Điểm danh thành công!");
  };

  const renderEventContent = (arg) => {
    const status = arg.event.extendedProps.status;

    const eventClass =
      status === "Đã-dạy" ? styles.eventTaught : styles.eventPending;

    return (
      <div className={`${styles.eventContent} ${eventClass}`}>
        <strong className={styles.eventTitle}>{arg.event.title}</strong>
        <em className={styles.eventStatus}>{status}</em>
      </div>
    );
  };

  return (
    <div className={styles.scheduleContainer}>
      <div className={styles.calendarWrapper}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          displayEventTime={false}
          eventContent={renderEventContent}
          height="100%"
        />
      </div>

      {/* Modal hiển thị chi tiết sự kiện */}
      {isModalOpen && selectedEvent && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>{selectedEvent.title}</h2>
            <p>
              <strong>Trạng thái:</strong> {selectedEvent.extendedProps.status}
            </p>
            {selectedEvent.extendedProps.status === "Đã-dạy" && (
              <>
                <p>
                  <strong>Thời gian bắt đầu:</strong>{" "}
                  {selectedEvent.start.toLocaleString()}
                </p>
                <p>
                  <strong>Thời gian kết thúc:</strong>{" "}
                  {selectedEvent.end.toLocaleString()}
                </p>
              </>
            )}
            {selectedEvent.extendedProps.status === "Chưa-dạy" && (
              <>
                {!isClassAccepted ? (
                  <button
                    onClick={handleAcceptClass}
                    className={styles.acceptButton}
                  >
                    Nhận lớp
                  </button>
                ) : (
                  <button
                    onClick={handleAttendance}
                    className={styles.attendanceButton}
                  >
                    Điểm danh
                  </button>
                )}
              </>
            )}

            <button onClick={handleCloseModal} className={styles.closeButton}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
