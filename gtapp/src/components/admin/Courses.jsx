import React, { useState, useEffect } from "react";
import styles from "../../styles/Courses.module.css";
import { FaEye, FaEdit, FaClock } from "react-icons/fa";
import CourseFormModal from "./CourseFormModal";
import courseService from "../../services/courseService";
import { CourseType } from "../../constants/course";
import DeleteConfirm from "../reusable/DeleteConfirm";
import AssignTeacherModal from "./AssignTeacherModal";
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [selectedType, setSelectedType] = useState("Tất cả");

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const openAssignTeacherModal = (course) => {
    setSelectedCourse(course);
    setIsAssignOpen(true);
  };

  const fetchCourses = async () => {
    const params = {
      q: searchTerm || undefined,
      status: selectedStatus === "Tất cả" ? undefined : selectedStatus,
      type: selectedType === "Tất cả" ? undefined : selectedType,
    };
    const res = await courseService.fetchCourses(params);
    setCourses(res);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAdd = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const handleEdit = (c) => {
    setEditingCourse({
      ...c,
      nameCourse: c.nameCourse,
      tuitionFee: c.tuitionFee,
      description: c.description,
      duration: c.duration,
      type: c.type,
      imageUrl: c.imageUrl,
    });
    setIsModalOpen(true);
  };

  const handleSubmitDone = () => {
    fetchCourses();
  };

  const paginate = (p) => setCurrentPage(p);

  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(courses.length / coursesPerPage);

  return (
    <div className={styles.container}>
      {/* Search + Filter */}
      <div className={styles["search-section"]}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm theo tên"
        />
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="Tất cả">Tất cả trạng thái</option>
          <option value="ACTIVE">Đang diễn ra</option>
          <option value="INACTIVE">Chưa bắt đầu</option>
          <option value="COMPLETED">Đã hoàn thành</option>
        </select>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="Tất cả">Tất cả loại</option>
          {Object.entries(CourseType).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
        <button onClick={handleAdd}>Thêm khóa học</button>
      </div>

      {/* LIST */}
      <div className={styles["course-list"]}>
        {currentCourses.map((c) => (
          <div key={c.courseId} className={styles["course-card"]}>
            <img
              src={
                c.imageUrl ||
                "https://via.placeholder.com/300x200?text=No+Image"
              }
              alt={c.nameCourse}
              className={styles.image}
            />
            <div className={styles.content}>
              <div className={styles.title}>{c.nameCourse}</div>
              <div className={styles.info}>Người tạo: {c.createdBy}</div>
              <div className={styles.info}>Loại: {CourseType[c.type]}</div>
              <div className={styles.info}>
                Học phí: {c.tuitionFee.toLocaleString("vi-VN")} ₫
              </div>
              <div className={styles.description}>Mô tả: {c.description}</div>
              <div className={styles.info}>
                Thời lượng: {c.duration} phút/buổi
              </div>
              {/* <div className={styles.schedule}>
                <FaClock className={styles.scheduleIcon} />
                <button onClick={() => openAssignTeacherModal(c)}>
                  Phân công GV
                </button>
              </div> */}

              <div className={styles.actions}>
                <label className={styles[`status-${c.status}`]}>
                  {c.status}
                </label>
                <div className={styles["button-group"]}>
                  <button
                    className={styles["edit-button"]}
                    onClick={() => handleEdit(c)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className={styles["assign-button"]}
                    onClick={() => openAssignTeacherModal(c)}
                  >
                    Phân công GV
                  </button>
                  <DeleteConfirm
                    title="Xoá khoá học này?"
                    onConfirm={async () => {
                      await courseService.deleteCourse(c.courseId);
                      fetchCourses();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? styles.active : ""}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      <CourseFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitDone={handleSubmitDone}
        initialData={editingCourse}
      />
      <AssignTeacherModal
        isOpen={isAssignOpen}
        onClose={() => setIsAssignOpen(false)}
        course={selectedCourse}
        onSubmitDone={fetchCourses}
      />
    </div>
  );
};

export default Courses;
