import React, { useState, useEffect } from "react";
import teacherCourseService from "../../services/teacherCourseService";
import teacherService from "../../services/teacherService";
import styles from "../../styles/AssignTeacherModal.module.css";
import CurrencyInput from "../reusable/CurrencyInput";
const AssignTeacherModal = ({ isOpen, onClose, course, onSubmitDone }) => {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    teacherId: "",
    assignedRole: "TEACHER",
    hourlyRate: 0,
  });

  useEffect(() => {
    const fetchTeachers = async () => {
      const list = await teacherService.getAllTeachers(); // gọi API lấy list giáo viên
      setTeachers(list);
    };
    if (isOpen) {
      fetchTeachers();
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    try {
      await teacherCourseService.add({
        teacherId: form.teacherId,
        assignedRole: form.assignedRole,
        hourlyRate: form.hourlyRate,
        courseId: course.courseId,
      });
      onSubmitDone();
      onClose();
    } catch (err) {
      alert("Thất bại khi phân công!");
    }
  };

  if (!isOpen) return null;
  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.modal}>
        <h2>Phân công giáo viên cho: {course?.nameCourse}</h2>

        <label>Giáo viên</label>
        <select
          value={form.teacherId}
          onChange={(e) => setForm({ ...form, teacherId: e.target.value })}
        >
          <option value="">--Chọn giáo viên--</option>
          {teachers.map((t) => (
            <option key={t.teacherId} value={t.teacherId}>
              {t.fullName}
            </option>
          ))}
        </select>

        <label>Vai trò</label>
        <select
          value={form.assignedRole}
          onChange={(e) => setForm({ ...form, assignedRole: e.target.value })}
        >
          <option value="TEACHER">Chính</option>
          <option value="ASSISTANT">Trợ giảng</option>
        </select>

        <label>Lương theo giờ (VNĐ)</label>
        <CurrencyInput
          value={form.hourlyRate}
          onChange={(val) => setForm({ ...form, hourlyRate: val })}
          placeholder="Nhập lương theo giờ"
        />

        <div className={styles["btn-row"]}>
          <button className={styles["cancel-btn"]} onClick={onClose}>
            Huỷ
          </button>
          <button className={styles["confirm-btn"]} onClick={handleSubmit}>
            Xác nhận
          </button>
        </div>
      </div>
    </>
  );
};

export default AssignTeacherModal;
