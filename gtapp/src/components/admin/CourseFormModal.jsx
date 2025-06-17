import React, { useState, useEffect } from "react";
import styles from "../../styles/CourseFormModal.module.css";

const TIME_SLOTS = [
  "7:00 - 9:00",
  "9:00 - 11:00",
  "13:00 - 15:00",
  "15:00 - 17:00",
  "17:00 - 19:00",
  "19:00 - 21:00",
];

const DAYS_OF_WEEK = [
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
];

const CourseFormModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: "",
    fee: "",
    mainTeacher: "",
    startDate: "",
    image: null,
    imagePreview: null,
    schedule: DAYS_OF_WEEK.reduce((acc, day) => {
      acc[day] = [];
      return acc;
    }, {}),
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        imagePreview: initialData.img,
        schedule: initialData.schedule || DAYS_OF_WEEK.reduce((acc, day) => {
          acc[day] = [];
          return acc;
        }, {}),
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleTimeSlotChange = (day, timeSlot, checked) => {
    setFormData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: checked
          ? [...prev.schedule[day], timeSlot]
          : prev.schedule[day].filter((slot) => slot !== timeSlot),
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>{initialData ? "Chỉnh sửa khóa học" : "Thêm khóa học mới"}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Hình ảnh khóa học:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.fileInput}
            />
            {formData.imagePreview && (
              <img
                src={formData.imagePreview}
                alt="Preview"
                className={styles.imagePreview}
              />
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Tên khóa học:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Học phí:</label>
            <input
              type="number"
              name="fee"
              value={formData.fee}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Giáo viên phụ trách:</label>
            <input
              type="text"
              name="mainTeacher"
              value={formData.mainTeacher}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Ngày bắt đầu:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Lịch học:</label>
            <div className={styles.scheduleContainer}>
              {DAYS_OF_WEEK.map((day) => (
                <div key={day} className={styles.daySchedule}>
                  <h4>{day}</h4>
                  <div className={styles.timeSlots}>
                    {TIME_SLOTS.map((timeSlot) => (
                      <label key={timeSlot} className={styles.timeSlot}>
                        <input
                          type="checkbox"
                          checked={formData.schedule[day]?.includes(timeSlot) || false}

                          onChange={(e) =>
                            handleTimeSlotChange(day, timeSlot, e.target.checked)
                          }
                        />
                        {timeSlot}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              {initialData ? "Cập nhật" : "Thêm khóa học"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseFormModal; 